import { combineReducers } from "redux";
//import visibilityFilter from "./visibilityFilter";
import campaignReducer from "./campaign/reducer";
import configReducer from "./config/reducer";
import { Reducer } from "react";
import { IConfigState, ConfigActionTypes } from "./config/types";
import { ICampaignState, CampaignActionTypes } from "./campaign/types";

export interface AppState {
  campaignState: ICampaignState;
  configState: IConfigState;
}

const rootReducer: Reducer<AppState,CampaignActionTypes|ConfigActionTypes> = combineReducers<AppState,CampaignActionTypes|ConfigActionTypes>({
  campaignState: campaignReducer,
  configState: configReducer
  //visibilityFilter
});

//export type AppState = ReturnType<typeof rootReducer>
export default rootReducer;
