import { combineReducers } from "redux";
//import visibilityFilter from "./visibilityFilter";
import campaignReducer from "./campaignReducer";
import configReducer from "./configReducer";

const rootReducer = combineReducers({ 
	campaignState: campaignReducer, 
	configState: configReducer
	//visibilityFilter 
});

//export type AppState = ReturnType<typeof rootReducer>
export default rootReducer;