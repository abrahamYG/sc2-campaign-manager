/**
* Mocking client-server processing
*/
import _campaigns from './campaigns.json'
import _campaignsources from './campaign-sources'
import _campaignSchema from './campaign-schema.json'
import {ipcRenderer} from 'electron';

const TIMEOUT = 0
const DOWNLOAD_MAP = "downloadMap";
const DOWNLOAD_MAP_STATUS = "downloadMapProgress";
let _remoteCampaigns = null;


const download = function(url) {
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = url;
        tempLink.setAttribute('download', ""); 
        
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    
}

const getCampaignRemote = async function (source) {
	const response = await fetch(source);
	const campaign = await response.json();
	return campaign;
}
const getCampaignFromSources = async function(){
	let results = await Promise.all(_campaignsources.map(source => getCampaignRemote(source)));
	_remoteCampaigns = results;
	return results;
}


const downloadMap = async function(map){
	const url = "https://github.com/danielthepirate/StarCraftPlus/blob/master/Build/AXAscensionToAiur.SC2Map?raw=true" 
	ipcRenderer.send(DOWNLOAD_MAP, url);
	ipcRenderer.on(DOWNLOAD_MAP_STATUS, (event, arg) => {
		console.log("downloadMap event",event) // prints "pong"
		console.log("downloadMap arg",arg) // prints "pong"
	});
}

export default {
	getCampaigns: async (callback, timeout) => {
		setTimeout(() => {
			callback(_campaigns)
		}, 
		timeout || TIMEOUT)
	},
	getCampaign: (id, callback, timeout) => {
		
		setTimeout(() => {
			let campaign = _campaigns.find((element) => element.id === id);
			callback(campaign)
		},
		timeout || TIMEOUT)
	},
	getCampaignSchema: (callback, timeout) => {
		setTimeout(() => {
			callback(_campaignSchema)
		}, 
		timeout || TIMEOUT)
	},
	getCampaignFromSources:getCampaignFromSources,
	downloadCampaigns: (payload, callback, timeout) => {
		setTimeout(() => {
			callback()
		}, 
		timeout || TIMEOUT)
	},
	downloadMap: downloadMap
	
}