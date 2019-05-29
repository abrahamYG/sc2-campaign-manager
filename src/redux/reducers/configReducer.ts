import { ConfigActionTypes,SET_CONFIG,GET_CONFIG } from "../types/actions/config";
import {IConfigState} from '../types'
import _ from 'lodash';



const configState:IConfigState = {
	config:{
		campaignSources:[],
		campaignLocalSources:[],
		installDir:"",
		runCommand:"",
		runParams:""
	}
};

export default function(state = configState, action:ConfigActionTypes) {
	switch (action.type) {
		case SET_CONFIG: {
			const config = action.payload;
			return {
				...state, 
				config
			};
		}
		case GET_CONFIG: {
			const config = action.payload;
			return state;
		}
		default:
		return state;
	}
}