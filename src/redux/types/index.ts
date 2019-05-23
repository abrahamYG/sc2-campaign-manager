import {ICampaign} from '../../classes/Campaign'

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