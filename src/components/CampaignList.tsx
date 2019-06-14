
import React from 'react';
import { ICampaign } from '../classes/Campaign';
import CampaignListItem from './CampaignListItem'
import { connect, MapStateToProps } from "react-redux";
import { AppState } from '../store';
interface ICampaignListProps{
	"campaigns"?:Array<ICampaign>, 
	"selectedIndex"?:number,
	"selectedId"?:string
}



const CampaignList = (props:ICampaignListProps) => {
	const {campaigns, selectedIndex} = props;
	console.log("CampaignList",props)
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			{campaigns.map((campaign,index) =>
				<CampaignListItem 
					key={campaign.id} 
					index={index}
					campaign={campaign} 
					selectedIndex={selectedIndex} 
				/>
			)}
		</nav>
		
	);
	
}


const mapStateToProps:MapStateToProps<ICampaignListProps,ICampaignListProps,AppState> = (state,ownProps) => {
	const {campaignState} = state;
	return {...ownProps, ...campaignState};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	null
  )(CampaignList);
//export default CampaignList;