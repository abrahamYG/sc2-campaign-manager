import Campaign, { ICampaign, ISC2Component } from "./Campaign";
import download = require("download");
import _ from "lodash";
import electron, { remote, ipcRenderer } from "electron";
import path from "path";
import fs from "fs-extra";
import { Progress } from "got";
import yauzl from "yauzl";
import msg from "../constants/ipcmessages";
import store from "../configureStore";
import { setCampaign } from "../store/campaign/actions";

const app: Electron.App = remote.require("electron").app;
interface ISource {
	url?: string;
	name: string;
	format?: string;
	files?: Array<ISC2Component>;
	progress?: number;
	campaignId?: string;
}

interface IDownload {
	sources: ISource[];
	progress: number;
}
interface IDownloadSet {
	[key: string]: IDownload;
}

const getCampaignFromStore = (campaignId:string) => {
	const campaigns = store.getState().campaignState.campaigns;
	const campaignIndex = campaigns.findIndex(c => c.id === campaignId);
	return campaigns[campaignIndex]
		
}

const setCampaignInStore = (campaignId:string,campaign:ICampaign) => {
	const campaigns = store.getState().campaignState.campaigns;
	const campaignIndex = campaigns.findIndex(c => c.id === campaignId);
	store.dispatch(setCampaign(campaign,campaignIndex));
}

export default class Downloader {
	static downloads: IDownloadSet;
	static progress: number = 0;

	static pushCampaign(campaign: ICampaign) {

		console.log("pushCampaign");

		const mods: Array<ISC2Component> = [...campaign.mods, ...campaign.maps];
		const sources = _.uniqWith<ISource>(
			mods.map(
				({ source: url, sourceFormat: format }): ISource => ({
					url,
					name: path.basename(url),
					format,
					files: mods.filter(mod => mod.source === url),
					progress: 0,
					campaignId: campaign.id
				})
			),
			_.isEqual
		);

		console.log("Downloader.pushCampaign urls", sources);
		this.downloads = {
			...this.downloads,
			[campaign.id]: { sources, progress: 0 }
		};
		console.log("Downloader downloads", this.downloads);
		const promises = sources.map((source, index) =>
			this.downloadSource(source, index)
		);
		Promise.all(promises).then(data => {
			console.log("downloads have finished for", campaign.id);
			const newCampaign:ICampaign = {
				...getCampaignFromStore(campaign.id),
				installed:Campaign.isCampaignInstalled(getCampaignFromStore(campaign.id)),
				progress:0,
				state:"ready"
			};
			setCampaignInStore(newCampaign.id,newCampaign)
		});
		
		const newCampaign:ICampaign = {
			...getCampaignFromStore(campaign.id),
			state:"downloading"
		};
		setCampaignInStore(newCampaign.id,newCampaign)
		
	}
	static async downloadSource(source: ISource, index: number) {
		let timer = Date.now();
		const tempPath = path.join(
			app.getPath("temp"),
			app.getName(),
			source.campaignId
		);
		let tempName = source.name;
		let tempFullName = path.join(tempPath, tempName);
		fs.ensureDirSync(tempPath);

		const dl = download(source.url)
			.on("response", response => {
				console.log(response);
				tempName = path.basename(response.url);
				tempFullName = path.join(tempPath, tempName);
				const ws = fs.createWriteStream(tempFullName);
				ws.once("close", () => {
					console.log("close streamm");
					if (source.format === "zip") {
						this.extractContents(source, tempFullName);
					} else {
						this.copyMaps(source.files[0], tempFullName);
					}
					const newCampaign:ICampaign = {
						...getCampaignFromStore(source.campaignId),
						installed:Campaign.isCampaignInstalled(getCampaignFromStore(source.campaignId)),
						state:"ready"
					};
					setCampaignInStore(newCampaign.id,newCampaign)
				});
				dl.pipe(ws);
			})
			.on("downloadProgress", (progress: Progress) => {
				if (Date.now() - timer > 1000 || progress.percent >= 1) {
					this.onDownloadProgress(source, index, progress);
					timer = Date.now();
				}
			});
		return dl;
	}
	static copyMaps(mod: ISC2Component, originPath: string) {
		const destBaseDir = Campaign.getCampaignsInstallDir();
		const destBasename = mod.destination;
		const destPath = path.join(destBaseDir, destBasename);
		console.log("nozip: ", destPath);
		fs.ensureDirSync(path.dirname(destPath));
		fs.copyFileSync(originPath, destPath);
	}
	static extractContents(source: ISource, zipPath: string) {
		console.log("extractContents zipPath", zipPath);
		console.log("extractContents yazul", yauzl);
		const installPath = Campaign.getCampaignsInstallDir();
		ipcRenderer.send(msg.UNZIP_CAMPAIGN, {
			source,
			zipPath,
			installPath
		});
		//YAUZL doesnt seem to work within the renderer part of electron, hmph!
		/*
		yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
			if (err) {
				throw err;
			}
			zipfile.readEntry();
			zipfile.on("entry", (entry: yauzl.Entry) => {
				console.log(entry.fileName);
				if (/\/$/.test(entry.fileName)) {
					zipfile.readEntry();
				} else {
					const mod = source.files.find(
						mod => entry.fileName === mod.fileEntry
					);
					if (mod) {
						const entryBasePath = Campaign.getCampaignsInstallDir();
						const entryBaseName = mod.destination;
						const entryFullPath = path.join(
							entryBasePath,
							entryBaseName
						);
						console.log("entryFullPath", entryFullPath);
						fs.ensureDirSync(path.dirname(entryFullPath));
						const ds = fs.createWriteStream(entryFullPath);
						zipfile.openReadStream(entry, function(
							err,
							readStream
						) {
							if (err) throw err;
							readStream.on("end", function() {
								zipfile.readEntry();
							});
							readStream.pipe(ds);
						});
					} else {
						zipfile.readEntry();
					}
				}
			});
			zipfile.once("end", function() {
				zipfile.close();
			});
		});
		*/
	}
	static onDownloadProgress(
		source: ISource,
		index: number,
		progress: Progress
	) {
		const newSource = {
			...source,
			progress: progress.percent
		};
		const { campaignId } = source;
		const downloads = this.downloads;
		const sources = Object.assign([...downloads[campaignId].sources], {
			[index]: newSource
		});

		const download: IDownload = {
			...downloads[campaignId],
			sources,
			progress:
				sources
					.map(src => src.progress)
					.reduce(
						(total, progress, index, array) => total + progress,
						0.0
					) / sources.length
		};
		this.downloads = {
			...this.downloads,
			[campaignId]: download
		};
		console.log(campaignId, download.progress);
		const newCampaign:ICampaign = {
			...getCampaignFromStore(campaignId),
			progress:download.progress
		};
		setCampaignInStore(campaignId,newCampaign)
	}
}
