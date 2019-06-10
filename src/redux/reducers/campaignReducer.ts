import { CampaignActionTypes, ADD_CAMPAIGN, SELECT_CAMPAIGN, SET_CAMPAIGNS, SET_CAMPAIGNS_LOCAL, SELECT_CAMPAIGN_LOCAL, SET_CAMPAIGN_LOCAL } from "../types/actions/campaign";
import {ICampaignState} from '../types'
import _ from 'lodash';



const campaignState:ICampaignState = {
	campaigns: [],
	campaignsLocal:[],
	campaignsById:{},
	campaignIds:[],
	selectedId: "",
	selectedIdLocal:"",
	selectedIndex:-1,
	selectedIndexLocal:-1
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
			const selectedIndex = action.index;
			return {...state, selectedCampaign, selectedId,selectedIndex};
		}
		case SELECT_CAMPAIGN_LOCAL: {
			const selectedIndexLocal = action.index
			return {...state, selectedIndexLocal};
		}
		case SET_CAMPAIGN_LOCAL: {
			const {payload:campaign, index} = action;
			const {campaignsLocal} = state;
			return {
				...state,
				campaignsLocal:Object.assign(
					[...campaignsLocal], 
					{[index]:campaign}
				)
			}
		}
		default:
		return state;
	}
}
