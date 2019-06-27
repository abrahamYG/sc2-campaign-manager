import { CampaignActionTypes, 
	ADD_CAMPAIGN, 
	SELECT_CAMPAIGN, 
	SET_FILTER, 
	SET_CAMPAIGNS, 
	SET_CAMPAIGNS_LOCAL, 
	SELECT_CAMPAIGN_LOCAL, 
	SET_CAMPAIGN,
	SET_CAMPAIGN_LOCAL, AddCampaignAction, SelectCampaignAction, SelectCampaignLocalAction, SetCampaignsAction, SetCampaignsLocalAction, SetCampaignLocalAction, SetCampaignsRemoteAction, SET_CAMPAIGNS_REMOTE, SetCampaignAction } from "./types";
import Campaign, { ICampaign } from "../../classes/Campaign";
import { ActionCreator, bindActionCreators,Dispatch, Action } from "redux";
import store from "../../configureStore";

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


export const setCampaign = (campaign:ICampaign, index:number):SetCampaignAction => ({
	type: SET_CAMPAIGN,
	payload: {campaign,index}
});

export const setCampaignLocal = (campaign:ICampaign, index:number):SetCampaignLocalAction => ({
	type: SET_CAMPAIGN_LOCAL,
	payload: {campaign,index}
});

export const getCampaignsRemote = async () => {
	const campaigns  = await Campaign.getCampaignsRemote()
	setCampaignsRemote(campaigns.map(
		campaign => ({
			...campaign,
			state:"ready",
			installed:Campaign.isCampaignInstalled(campaign)
		})
	))
}


export const getCampaignsLocal = async () => {
	const campaigns  = await Campaign.getCampaignsLocal()
	console.log("getcampaignslocal",campaigns)
	store.dispatch(setCampaignsLocal(campaigns.map(
		campaign => ({
			...campaign,
			state:"ready",
			installed:Campaign.isCampaignInstalled(campaign)
		})
	))) 
}

//export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
