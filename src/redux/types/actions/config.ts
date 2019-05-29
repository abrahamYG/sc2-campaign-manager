import {IConfig} from '../../../classes/Config'

export const GET_CONFIG = "GET_CONFIG";
export const SET_CONFIG = "SET_CONFIG";

interface SetConfigAction {
	type: typeof SET_CONFIG
	payload: IConfig
}


interface GetConfigAction {
	type: typeof GET_CONFIG
	payload: IConfig
}
export type ConfigActionTypes = SetConfigAction | GetConfigAction