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
	selectedCampaign:ICampaign,
	selectedId: string
}

export interface IConfigState {
	config:IConfig
}