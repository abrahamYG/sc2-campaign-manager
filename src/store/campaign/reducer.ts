import { CampaignActionTypes, ADD_CAMPAIGN, SELECT_CAMPAIGN, SET_CAMPAIGNS, SET_CAMPAIGNS_LOCAL, SELECT_CAMPAIGN_LOCAL, SET_CAMPAIGN_LOCAL, SELECT_CAMPAIGN_REMOTE, SET_CAMPAIGNS_REMOTE } from "./types";
import _ from 'lodash';
import { Reducer } from "redux";
import { ICampaignState } from "./types";



const campaignState:ICampaignState = {
	campaigns: [],
	campaignsRemote:[],
	campaignsLocal:[],
	campaignsById:{},
	campaignIds:[],
	selectedId: "",
	selectedIdLocal:"",
	selectedIndex:-1,
	selectedIndexRemote:-1,
	selectedIndexLocal:-1
};

 const campaignReducer:Reducer<ICampaignState,CampaignActionTypes> =(state = campaignState, action) => {
	switch (action.type) {
		case SET_CAMPAIGNS: {
			const campaigns = [...action.payload];
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
		
		case SET_CAMPAIGNS_REMOTE: {
			const campaignsRemote = action.payload;
			return {
				...state, 
				campaignsRemote
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
			const {campaign:selectedCampaign,index} = action.payload;
			const selectedId = selectedCampaign.id;
			const selectedIndex = index;
			return {...state, selectedCampaign, selectedId,selectedIndex};
		}
		case SELECT_CAMPAIGN_LOCAL: {
			const selectedIndexLocal = action.payload.index
			return {...state, selectedIndexLocal};
		}
		
		case SELECT_CAMPAIGN_REMOTE: {
			const selectedIndexRemote = action.payload.index
			return {...state, selectedIndexRemote};
		}
		case SET_CAMPAIGN_LOCAL: {
			const {campaign, index} = action.payload;
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

export default campaignReducer;