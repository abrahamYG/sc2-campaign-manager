import { Middleware, Dispatch, Action, AnyAction, ActionCreator } from "redux";
import { SetCampaignsAction, CampaignActionTypes, SET_CAMPAIGNS_LOCAL, SET_CAMPAIGNS_REMOTE } from "./campaign/types";
import { AppState } from ".";
import { setCampaigns, selectCampaignLocal } from "./campaign/actions";
import { ConfigActionTypes } from "./config/types";
import { consolidateCampaigns } from "./campaign/middleware";

export const logger:Middleware<void,AppState> =  store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result
}




export const crashReporter:Middleware<void,AppState> = store => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error('Caught an exception!', err)
        throw err
    }
}

export const middleware = [crashReporter, logger, consolidateCampaigns];