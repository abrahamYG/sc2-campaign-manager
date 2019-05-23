
import React from 'react';
import { ICampaign } from '../classes/Campaign';
import CampaignListItem from './CampaignListItem'
import {ICampaignState} from '../redux/types'
import { connect } from "react-redux";
import { AppState } from '../redux/store';
interface ICampaignListProps{
	"campaigns":Array<ICampaign>, 
	"selectedCampaign":ICampaign, 
	"selectedId":string, 
	"onClick"?:(campaign:ICampaign)=>void,
	
}



const CampaignList = (props:ICampaignListProps) => {
	const {onClick} = props;
	const {campaigns, selectedId} = props;
	console.log("CampaignList",props)
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			{campaigns.map((campaign) =>
				<CampaignListItem 
					key={campaign.id} 
					campaign={campaign} 
					onClick={onClick} 
					selectedId={selectedId} 
				/>
			)}
		</nav>
		
	);
	
}


const mapStateToProps = (state:AppState,ownProps:ICampaignListProps):ICampaignListProps => {
	const {campaignState} = state;
	return campaignState;
};

export default connect(
	mapStateToProps,//mapStateToProps,
	null
  )(CampaignList);
//export default CampaignList;