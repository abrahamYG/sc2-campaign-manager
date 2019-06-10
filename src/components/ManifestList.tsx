import React from 'react';
import { ICampaign } from '../classes/Campaign';
import { connect, MapStateToProps } from "react-redux";
import { AppState } from '../redux/store';
import {setConfig} from '../redux/actions'
import ManifestListItem from './ManifestListItem';



interface IManifestListProps{
	"campaigns"?:Array<ICampaign>, 
	"selectedIndex"?:number, 
	"onClick"?:(campaign:ICampaign)=>void,
	
}

const ManifestList = (props:IManifestListProps) => {
	const {campaigns, selectedIndex} = props;
	console.log("ManifestList",props)
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			{campaigns.map((campaign,index) =>
				<ManifestListItem 
					key={campaign.id} 
					index={index}
					campaign={campaign} 
					selectedIndex={selectedIndex} 
				/>
			)}
		</nav>
		
	);
	
}




const mapStateToProps:MapStateToProps<IManifestListProps,IManifestListProps,AppState> = (state,ownProps) => {
	const {campaignState} = state;
	const {campaignsLocal,selectedIndexLocal} = campaignState
	const props: typeof ownProps = {
		"campaigns":campaignsLocal, 
		"selectedIndex":selectedIndexLocal
	}
	
	return {...ownProps, ...props};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	null
  )(ManifestList);