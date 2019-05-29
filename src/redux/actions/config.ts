import {GET_CONFIG, SET_CONFIG, ConfigActionTypes} from "../types/actions/config";

import {IConfig} from "../../classes/Config"


export const getConfig = (config:IConfig):ConfigActionTypes => ({
	type: GET_CONFIG,
	payload: config
});

export const setConfig = (config:IConfig):ConfigActionTypes => {
	return ({
		type: SET_CONFIG,
		payload: config
	})
};

