import {ipcRenderer} from 'electron';
import { useGlobal } from 'reactn';
const path = require('electron').remote.require('path');


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
	"entryPoint":string,
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
	static getCampaignSources = ():string => {
		return _campaignsources.join("\n");
	}
	
	static getCampaignRemote = async (source:string) => {
		const response:Response = await fetch(source);
		const campaign:Object = await response.json();
		return campaign;
	}
	static getCampaignRunCommand = (campaign:ICampaign):string => {
		console.group("getCampaignRunCommand");
		const command = Config.getRunCommand();
		console.log("command", command)
		console.groupEnd();
		return command;
	}
	static getCampaignRunParams = (campaign:ICampaign):Array<string> => {
		console.group("getCampaignRunParams");
		const entryPoint = (campaign.entryPoint)?campaign.entryPoint:campaign.maps[0].destination;
		const params = Config.getRunParams().map(e=>e.replace("{map}",path.join(Campaign.getCampaignsInstallDir(),entryPoint));)
		
		console.log("params", params)
		console.groupEnd();
		return params;
	}
	
	static getCampaignsRemote = async () => {
		const campaigns:object = await Promise.all(Config.getSources().map((source:string) => Campaign.getCampaignRemote(source)));
		return campaigns;
	}

	static getCampaignsInstallDir = ():string => {
		return Config.getInstallDir();
	}
	static getCampaignsInstalled = (campaigns:Array<ICampaign>) => {
		const installedCampaigns:Array<ICampaign> = []
		campaigns.map(campaign => {
			const installedCampaign = {...campaign }
			installedCampaigns.push(installedCampaign)
			installedCampaign.installed = Campaign.isCampaignInstalled(installedCampaign);
		})
		return installedCampaigns;
	}
	static isCampaignInstalled = (campaign:ICampaign) => {
		console.group("isCampaignInstalled")
		console.log("campaign",campaign);

		let installed = true;
		const installDir = Campaign.getCampaignsInstallDir();
		const fs = require('electron').remote.require('fs');
		const path = require('electron').remote.require('path');
		

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
		ipcRenderer.send(msg.DOWNLOAD_CAMPAIGN, {...campaign, installDir:Campaign.getCampaignsInstallDir()});
	}
	static playCampaign = (campaign:ICampaign) => {
		console.group("playCampaign")
		const data = {
			...campaign, 
			installDir:Campaign.getCampaignsInstallDir(), 
			command: Campaign.getCampaignRunCommand(campaign),
			params:Campaign.getCampaignRunParams(campaign)
		};
		console.log("data", data);
		ipcRenderer.send(msg.PLAY_CAMPAIGN, data);
		console.groupEnd();
	}
}