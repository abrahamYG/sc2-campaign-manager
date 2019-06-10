import {ICampaign} from '../../classes/Campaign'
import {IConfig} from  '../../classes/Config'
export interface ICampaignCollection {
	[key: string]: ICampaign
}

export interface ICampaignState {
	campaigns:Array<ICampaign>,
	campaignsLocal:Array<ICampaign>,
	campaignsById:ICampaignCollection,
	campaignIds:Array<string>,
	selectedId: string,
	selectedIdLocal:string,
	selectedIndex:number,
	selectedIndexLocal:number
}

export interface IConfigState {
	config:IConfig
}