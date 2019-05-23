import { CampaignActionTypes, ADD_CAMPAIGN, SELECT_CAMPAIGN, SET_CAMPAIGNS, SET_CAMPAIGNS_LOCAL } from "../types/actionTypes";
import {ICampaignState} from '../types'
import _ from 'lodash';



const campaignState:ICampaignState = {
	campaigns: [],
	campaignsLocal:[],
	campaignsById:{},
	campaignIds:[],
	selectedCampaign: null,
	selectedId: ""
};

export default function(state = campaignState, action:CampaignActionTypes) {
	switch (action.type) {
		case SET_CAMPAIGNS: {
			const campaigns = action.payload;
			const campaignsById = _.keyBy(campaigns, c=>c.id);
			const campaignIds = campaigns.map(c=> c.id)
			return {
				...state, 
				campaigns,
				campaignsById,
				campaignIds
			};
		}
		case SET_CAMPAIGNS_LOCAL: {
			const campaignsLocal = action.payload;
			return {
				...state, 
				campaignsLocal
			};
		}
		case ADD_CAMPAIGN: {
			const campaign = action.payload;
			const {id} = campaign;
			return {
				...state,
				campaigns: [...state.campaigns, campaign],
				campaignsById: {...state.campaignsById, [id]: campaign},
				campaignIds: [ ...state.campaignIds, id]
			};
		}
		case SELECT_CAMPAIGN: {
			const selectedCampaign = action.payload;
			const selectedId = selectedCampaign.id;
			return {...state, selectedCampaign, selectedId};
		}
		default:
		return state;
	}
}
