import { combineReducers } from "redux";
//import visibilityFilter from "./visibilityFilter";
import campaignReducer from "./campaignReducer";

const rootReducer = combineReducers({ 
	campaignState: campaignReducer, 
	//visibilityFilter 
});

//export type AppState = ReturnType<typeof rootReducer>
export default rootReducer;