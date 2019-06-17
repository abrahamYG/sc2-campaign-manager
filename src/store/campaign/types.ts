import {ICampaign} from '../../classes/Campaign'
import { Action, AnyAction } from 'redux';

export const ADD_CAMPAIGN = "ADD_CAMPAIGN";
export const SELECT_CAMPAIGN = "SELECT_CAMPAIGN";
export const SELECT_CAMPAIGN_LOCAL = "SELECT_CAMPAIGN_LOCAL";
export const SELECT_CAMPAIGN_REMOTE = "SELECT_CAMPAIGN_REMOTE";

export const SET_CAMPAIGNS = "SET_CAMPAIGNS";
export const SET_CAMPAIGNS_LOCAL = "SET_CAMPAIGNS_LOCAL";
export const SET_CAMPAIGNS_REMOTE = "SET_CAMPAIGNS_REMOTE";

export const SET_CAMPAIGN = "SET_CAMPAIGN";
export const SET_CAMPAIGN_LOCAL = "SET_CAMPAIGN_LOCAL";

export const SET_FILTER = "SET_FILTER";

export interface ICampaignState {
	campaigns:Array<ICampaign>,
	campaignsLocal:Array<ICampaign>,
	campaignsRemote:Array<ICampaign>,
	campaignsById:{[key: string]: ICampaign},
	campaignIds:Array<string>,
	selectedId: string,
	selectedIdLocal:string,
	selectedIndex:number,
	selectedIndexRemote:number
	selectedIndexLocal:number
}

interface ISelectCampaignPayload {
	campaign: ICampaign
	index:number
}

export interface SetCampaignsAction  extends Action<typeof SET_CAMPAIGNS>{
	payload: Array<ICampaign>
}


export interface SetCampaignsLocalAction extends Action<typeof SET_CAMPAIGNS_LOCAL> {
	payload: Array<ICampaign>
}


export interface SetCampaignsRemoteAction  extends Action<typeof SET_CAMPAIGNS_REMOTE> {
	payload: Array<ICampaign>
}


export interface AddCampaignAction  extends Action<typeof ADD_CAMPAIGN>{
	payload: ICampaign
}

export interface SelectCampaignAction extends Action<typeof SELECT_CAMPAIGN> {
	payload:ISelectCampaignPayload
}


export interface SelectCampaignLocalAction  extends Action<typeof SELECT_CAMPAIGN_LOCAL>{
	payload: ISelectCampaignPayload
}

export interface SelectCampaignRemoteAction extends Action<typeof SELECT_CAMPAIGN_REMOTE> {
	payload: ISelectCampaignPayload
}

export interface SetCampaignAction extends Action<typeof SET_CAMPAIGN>{
	payload: ISelectCampaignPayload
}
export interface SetCampaignLocalAction extends Action<typeof SET_CAMPAIGN_LOCAL>{
	payload: ISelectCampaignPayload
}

export type CampaignActionTypes = SetCampaignsAction | 
									AddCampaignAction | 
									SelectCampaignAction | 
									SetCampaignsRemoteAction |
									SetCampaignsLocalAction | 
									SelectCampaignLocalAction |
									SelectCampaignRemoteAction | 
									SetCampaignAction |
									SetCampaignLocalAction;


