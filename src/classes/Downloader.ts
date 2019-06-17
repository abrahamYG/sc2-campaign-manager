import { ICampaign, ISC2Component } from "./Campaign";
import download = require("download");

interface ISource {
    url?:string,
    format?:string,
    files?:Array<ISC2Component>,
    progress?:number
}

export default class Downloader {
    static downloads:ISource[] = [];
    static progress: number = 0;
    static pushCampaign(campaign:ICampaign){
        let sources: {[key: string]: ISource} = {};
        const mods = [...campaign.mods, ...campaign.maps];
        mods.forEach(mod =>{
            const {source, sourceFormat} = mod;
            sources = {
                [source]: {
                    format: sourceFormat,
                    files:[]
                },
                ...sources
            }
            this.downloads.push({ url: source, format:sourceFormat, progress:0})
            
			if(sources[source].format === "zip") {
				sources[source].files.push(mod);
			}
			else{ 
				sources[mod.source].files = [mod];
			}
        });
    }
}