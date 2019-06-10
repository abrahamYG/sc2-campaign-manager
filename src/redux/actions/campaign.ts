import { CampaignActionTypes, ADD_CAMPAIGN, SELECT_CAMPAIGN, SET_FILTER, SET_CAMPAIGNS, SET_CAMPAIGNS_LOCAL, SELECT_CAMPAIGN_LOCAL, SET_CAMPAIGN_LOCAL } from "../types/actions/campaign";
import { ICampaign } from "../../classes/Campaign";

let nextTodoId = 0;

export const addCampaign = (campaign:ICampaign):CampaignActionTypes => ({
	type: ADD_CAMPAIGN,
	payload: campaign
});

export const selectCampaign = (campaign:ICampaign, index:number):CampaignActionTypes => {
	return ({
		type: SELECT_CAMPAIGN,
		payload: campaign,
		index
	})
};


export const selectCampaignLocal = (campaign:ICampaign, index:number):CampaignActionTypes => {
	return ({
		type: SELECT_CAMPAIGN_LOCAL,
		payload: campaign,
		index
	})
};

export const setCampaigns = (campaigns:Array<ICampaign>):CampaignActionTypes => {
	return ({
		type: SET_CAMPAIGNS,
		payload: campaigns
	})
};


export const setCampaignsLocal = (campaigns:Array<ICampaign>):CampaignActionTypes => {
	return ({
		type: SET_CAMPAIGNS_LOCAL,
		payload: campaigns
	})
};


export const setCampaignLocal = (campaign:ICampaign, index:number):CampaignActionTypes => {
	return ({
		type: SET_CAMPAIGN_LOCAL,
		payload: campaign,
		index
	})
};

//export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
