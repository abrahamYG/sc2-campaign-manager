import {ICampaign} from '../../classes/Campaign'

export const ADD_CAMPAIGN = "ADD_CAMPAIGN";
export const SELECT_CAMPAIGN = "SELECT_CAMPAIGN";
export const SET_CAMPAIGNS = "SET_CAMPAIGNS";
export const SET_CAMPAIGNS_LOCAL = "SET_CAMPAIGNS_LOCAL";
export const SET_FILTER = "SET_FILTER";

interface SetCampaignsAction {
	type: typeof SET_CAMPAIGNS
	payload: Array<ICampaign>
}


interface SetCampaignsLocalAction {
	type: typeof SET_CAMPAIGNS_LOCAL
	payload: Array<ICampaign>
}

interface AddCampaignAction {
	type: typeof ADD_CAMPAIGN
	payload: ICampaign
}

interface SelectCampaignAction {
	type: typeof SELECT_CAMPAIGN
	payload: ICampaign
}

export type CampaignActionTypes = SetCampaignsAction | AddCampaignAction | SelectCampaignAction | SetCampaignsLocalAction;