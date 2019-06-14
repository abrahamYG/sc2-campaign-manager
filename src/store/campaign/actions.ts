import { CampaignActionTypes, ADD_CAMPAIGN, SELECT_CAMPAIGN, SET_FILTER, SET_CAMPAIGNS, SET_CAMPAIGNS_LOCAL, SELECT_CAMPAIGN_LOCAL, SET_CAMPAIGN_LOCAL, AddCampaignAction, SelectCampaignAction, SelectCampaignLocalAction, SetCampaignsAction, SetCampaignsLocalAction, SetCampaignLocalAction, SetCampaignsRemoteAction, SET_CAMPAIGNS_REMOTE } from "./types";
import { ICampaign } from "../../classes/Campaign";
import { ActionCreator, bindActionCreators,Dispatch, Action } from "redux";

let nextTodoId = 0;

export const addCampaign = (campaign:ICampaign):AddCampaignAction => ({
	type: ADD_CAMPAIGN,
	payload: campaign
});

export const selectCampaign = (campaign:ICampaign, index:number):SelectCampaignAction => ({
	type: SELECT_CAMPAIGN,
	payload:{ campaign,index}
});

export const selectCampaignLocal = (campaign:ICampaign, index:number):SelectCampaignLocalAction => ({
	type: SELECT_CAMPAIGN_LOCAL,
	payload: {campaign,index}
});

export const setCampaigns = (campaigns:Array<ICampaign>):SetCampaignsAction => ({
	type: SET_CAMPAIGNS,
	payload: campaigns
});



export const setCampaignsRemote = (campaigns:Array<ICampaign>):SetCampaignsRemoteAction => ({
	type: SET_CAMPAIGNS_REMOTE,
	payload: campaigns
});


export const setCampaignsLocal = (campaigns:Array<ICampaign>):SetCampaignsLocalAction => ({
	type: SET_CAMPAIGNS_LOCAL,
	payload: campaigns
});


export const setCampaignLocal = (campaign:ICampaign, index:number):SetCampaignLocalAction => ({
	type: SET_CAMPAIGN_LOCAL,
	payload: {campaign,index}
});

//export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
