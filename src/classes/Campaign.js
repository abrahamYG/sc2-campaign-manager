import {ipcRenderer} from 'electron';
import { useGlobal } from 'reactn';


import _campaignsources from '../api/campaign-sources.json';
import _campaigns from '../api/campaigns.json'

import Config from './Config';
import msg from '../constants/ipcmessages';

export default class Campaign {
	
	static getCampaignRemote = async (source) => {
		const response = await fetch(source);
		const campaign = await response.json();
		return campaign;
	}
	static getCampaignsRemote = async () => {
		const campaigns = await Promise.all(_campaignsources.map(source => Campaign.getCampaignRemote(source)));
		return _campaigns;
	}

	static getCampaignsInstallDir = () => {
		return Config.installDir;
	}
	static getCampaignsInstalled = (campaigns) => {
		const installDir = Config.installDir;
		const installedCampaigns = []
		installedCampaigns.map(campaign => {
			const installedCampaign = {...campaign}
			installedCampaigns.push(installedCampaign)
			installedCampaign.installed = isCampaignInstalled(installedCampaign);
		})
		return installedCampaigns;
	}
	static isCampaignInstalled = (campaign) => {
		let installed = true;
		const installDir = Config.installDir;
		const fs = require('electron').remote.require('fs');
		const path = require('electron').remote.require('path');
		
		console.group("isCampaignInstalled")
		console.log("campaign",campaign);

		const mapsExist = campaign.maps.reduce((existtotal, map) => {
			return existtotal && fs.existsSync(path.join(installDir,map.file))
		},true);
		console.log("mapsExist",mapsExist);
		const modsExist = campaign.mods.reduce((existtotal, mod) => {
			return existtotal && fs.existsSync(path.join(installDir,mod.file))
		},true);
		console.log("modsExist",modsExist);
		installed = mapsExist && modsExist;
		return installed;
		console.groupEnd()
	}

	static downloadCampaign = (campaign) => {
		console.log("downloadCampaign")
		campaign.mods.map((mod) => {
			//ipcRenderer.send(msg.DOWNLOAD_MAP, {...mod, installDir:Config.installDir});
		});
		campaign.maps.map((map) => {
			//ipcRenderer.send(msg.DOWNLOAD_MAP, {...map, installDir:Config.installDir});
			
		});
		ipcRenderer.send(msg.DOWNLOAD_CAMPAIGN, {...campaign, installDir:Config.installDir});
		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_STATUS, (event, arg) => {
			console.log("downloadMap event",event) // prints "pong"
			console.log("downloadMap arg",arg)
			
		});
		
	}
	
	
}