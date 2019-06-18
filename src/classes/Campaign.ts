import {ipcRenderer} from 'electron';
import path from 'path';
import fs from 'fs';
import {promisify} from 'util';
//const path = require('electron').remote.require('path');
//const fs = require('electron').remote.require('fs');
//const { promisify } = require('electron').remote.require('util')
import yauzl from 'yauzl';
import {remote} from 'electron'

const {app,dialog} = remote.require('electron');
import download from 'download'

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const fsPromises = fs.promises;

import Config from './Config';
import msg from '../constants/ipcmessages';
import Downloader from './Downloader';
/**
 * Interface type for Campaign Objects
 */
export interface IScreenshot {
	src:string,
	description?:string
}

export interface IPatchNote {
	version:string,
	date:string,
	notes:string
}
export interface ICampaign {
	/**Campaign Id*/
	"id":string,
	"name":string,
	"author":string,
	"thumbnail":string,
	"description":string,
	"progress":number,
	"installed":boolean,
	"entryPoint":string,
	/**Maps used by the campaign */
	"maps":Array<ISC2Map>,
	"mods":Array<ISC2Mod>,
	"lastUpdated":string,
	"patchNotes":Array<IPatchNote>,
	"screenshots":Array<IScreenshot>,
	"videos"?:Array<string>,
	[key: string]: string|number|object|boolean|ISC2Map|ISC2Mod
};

export interface ISC2Component{
	"name": string,
	"description": string,
	"destination": string,
	"source": string,
	"sourceFormat": string,
	"fileEntry": string
}
/**
 * Defines a Map within a campaign
 */
export interface ISC2Map extends ISC2Component {};

export interface ISC2Mod  extends ISC2Component{};

export interface IAuthor {
	"id":string,
	"name":string,
	"email":string,
	"campaigns":Array<object>

}
export default class Campaign {
	static getCampaignLocal = async (source:string):Promise<ICampaign> => {
		const fullPath = source;// path.join(app.getPath("userData"),"manifests/", source)
		
		const response:Buffer = await readFileAsync(fullPath);
		const json = response.toString();
		const campaign:ICampaign = JSON.parse(json);
		return campaign;
	}
	
	static writeToDisk(campaign:ICampaign):boolean{
		const campaignJSON = JSON.stringify(campaign,null,4);
		const campaignFile = path.join(Config.getLocalSourcesPath(),campaign.id+".json");
		fs.writeFileSync(campaignFile, campaignJSON);
		return true;
	}
	static getCampaignRemote = async (source:string) => {
		const response:Response = await fetch(source);
		const campaign:ICampaign = await response.json();
		return campaign;
	}
	static getRunCommand = (campaign:ICampaign):string => {
		console.group("getCampaignRunCommand");
		const entryPoint = (campaign.entryPoint)?campaign.entryPoint:campaign.maps[0].destination;
		const entryPointPath = path.join(Campaign.getCampaignsInstallDir(),entryPoint)
		const command = Config.getRunCommand().replace("{map}",entryPointPath);
		console.log("command", command)
		console.groupEnd();
		return command;
	}
	static getRunParams = (campaign:ICampaign,mapIndex:number):Array<string> => {
		console.group("getCampaignRunParams")
		console.log(mapIndex);
		const {entryPoint, maps} = campaign
		const entry = (mapIndex>=0)?maps[mapIndex].destination:(entryPoint)?entryPoint:maps[0].destination
		const entryPath = path.join(Campaign.getCampaignsInstallDir(),entry)
		const params = Config.getRunParams().map(e=>e.replace("{map}",entryPath))
		
		console.log("params", params)
		console.groupEnd();
		return params;
	}
	
	static getCampaignsRemote = async (): Promise<Array<ICampaign>> => {
		const campaigns:Array<ICampaign> = await Promise.all(Config.getSources().map((source:string) => Campaign.getCampaignRemote(source)));
		return campaigns;
	}
	static getCampaignsLocal = async ():Promise<Array<ICampaign>> => {
		const campaigns = await Promise.all(Config.getLocalSources().map((source:string) => {
			return Campaign.getCampaignLocal(source) 
		}));
		console.log("getCampaignsLocal",campaigns)
		return campaigns;
	}
	static getCampaignsInstallDir = ():string => {
		return Config.getInstallDir();
	}
	static getCampaignsInstalled = (campaigns:Array<ICampaign>) => {
		return campaigns.map(campaign => {
			return {...campaign, installed: Campaign.isCampaignInstalled(campaign) }
		})
	}
	static isCampaignInstalled = (campaign:ICampaign) => {
		const installDir = Campaign.getCampaignsInstallDir();
		const mapsExist = campaign.maps.reduce((existtotal, map) => {
			return existtotal && fs.existsSync(path.join(installDir,map.destination))
		},true);
		const modsExist = campaign.mods.reduce((existtotal, mod) => {
			return existtotal && fs.existsSync(path.join(installDir,mod.destination))
		},true);
		return mapsExist && modsExist;
	}

	static downloadCampaign = (campaign:ICampaign) => {
		const installDir = Campaign.getCampaignsInstallDir();
		Downloader.pushCampaign(campaign);
		ipcRenderer.send(msg.DOWNLOAD_CAMPAIGN, {...campaign, installDir:Campaign.getCampaignsInstallDir()});
		
	}
	static playCampaign = (campaign:ICampaign,mapIndex:number=-1) => {

		console.group("playCampaign")
		const data = {
			...campaign, 
			installDir:Campaign.getCampaignsInstallDir(), 
			command: Campaign.getRunCommand(campaign),
			params:Campaign.getRunParams(campaign,mapIndex)
		};
		console.log("data", data);
		ipcRenderer.send(msg.PLAY_CAMPAIGN, data);
		console.groupEnd();
	}
	static emptyMap = ():ISC2Map => {
		return {
			"name": "",
			"description": "",
			"destination": "",
			"source": "",
			"sourceFormat": "",
			"fileEntry": ""
		};
	}
	static emptyCampaign = ():ICampaign => {
		return {
			"id":"",
			"name":"",
			"thumbnail":"",
			"progress":0,
			"author":"",
			"description":"",
			"maps":[],
			"mods":[],
			"lastUpdated":"",
			"patchNotes":[],
			"screenshots":[],
			"entryPoint":"",
			"installed":false
		};
	}
}

export const playCampaign = Campaign.playCampaign;