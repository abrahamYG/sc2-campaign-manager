import { Middleware } from "redux";
import { AppState } from "..";
import { CampaignActionTypes, SET_CAMPAIGNS_LOCAL, SET_CAMPAIGNS_REMOTE, SET_CAMPAIGN_LOCAL } from "./types";
import { setCampaigns } from "./actions";


export const consolidateCampaigns:Middleware<void,AppState> =  store => next => (action:CampaignActionTypes) => {
    let result = next(action)
    if (
        (action.type === SET_CAMPAIGNS_LOCAL) || 
        (action.type === SET_CAMPAIGNS_REMOTE) || 
        (action.type === SET_CAMPAIGN_LOCAL)
    ){
        const {campaignsLocal, campaignsRemote} = store.getState().campaignState;
        store.dispatch(setCampaigns([...campaignsRemote, ...campaignsLocal]));
    }
    return result;
}