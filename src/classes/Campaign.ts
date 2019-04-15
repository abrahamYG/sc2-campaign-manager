import {ipcRenderer} from 'electron';
import { useGlobal } from 'reactn';


import _campaignsources from '../api/campaign-sources';
//import _campaigns from '../api/campaigns.json'

import Config from './Config';
import msg from '../constants/ipcmessages';

export interface ICampaign {
	"id":string,
	"name":string,
	"author":string,
	"description":string,
	"progress":number,
	"installed":boolean,
	"maps":Array<IMap>,
	"mods":Array<IMod>,
	"lastUpdated":string,
	"patchNotes":Array<object>,
	"screenshots":Array<string>,

}

interface ISC2Component{
	"name": string,
	"description": string,
	"destination": string,
	"source": string,
	"sourceFormat": string,
	"fileEntry": string
}
export interface IMap extends ISC2Component {};

export interface IMod  extends ISC2Component{};

export interface IAuthor {
	"id":string,
	"name":string,
	"email":string,
	"campaigns":Array<object>

}

export default class Campaign {
	
	static getCampaignRemote = async (source:string) => {
		const response:Response = await fetch(source);
		const campaign:Object = await response.json();
		return campaign;
	}
	static getCampaignsRemote = async () => {
		const campaigns:object = await Promise.all(_campaignsources.map((source:string) => Campaign.getCampaignRemote(source)));
		return campaigns;
	}

	static getCampaignsInstallDir = ():string => {
		return Config.installDir;
	}
	static getCampaignsInstalled = (campaigns:Array<ICampaign>) => {
		const installedCampaigns:Array<ICampaign> = []
		campaigns.map(campaign => {
			const installedCampaign = {...campaign}
			installedCampaigns.push(installedCampaign)
			installedCampaign.installed = Campaign.isCampaignInstalled(installedCampaign);
		})
		return installedCampaigns;
	}
	static isCampaignInstalled = (campaign:ICampaign) => {
		let installed = true;
		const installDir = Config.installDir;
		const fs = require('electron').remote.require('fs');
		const path = require('electron').remote.require('path');
		
		console.group("isCampaignInstalled")
		console.log("campaign",campaign);

		const mapsExist = campaign.maps.reduce((existtotal, map) => {
			return existtotal && fs.existsSync(path.join(installDir,map.destination))
		},true);
		console.log("mapsExist",mapsExist);
		const modsExist = campaign.mods.reduce((existtotal, mod) => {
			return existtotal && fs.existsSync(path.join(installDir,mod.destination))
		},true);
		console.log("modsExist",modsExist);
		installed = mapsExist && modsExist;
		console.groupEnd()
		return installed;
	}

	static downloadCampaign = (campaign:ICampaign) => {
		console.log("downloadCampaign")
		ipcRenderer.send(msg.DOWNLOAD_CAMPAIGN, {...campaign, installDir:Config.installDir});
	}
}