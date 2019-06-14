import React from 'react';
import Campaign, { ICampaign } from '../classes/Campaign';
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import ManifestListItem from './ManifestListItem';
import { AppState } from '../store';
import { setCampaignsLocal } from '../store/campaign/actions';



interface IManifestListProps{
	"campaigns"?:Array<ICampaign>, 
	"selectedIndex"?:number, 
	"onClick"?:(campaign:ICampaign)=>void,
	setCampaigns:typeof setCampaignsLocal
	
}

const ManifestList = (props:IManifestListProps) => {
	const {campaigns, selectedIndex} = props;
	const addCampaign = () => {
		const id = prompt("Enter an ID","");
		const campaign:ICampaign = {...Campaign.emptyCampaign(), "id":id}
		props.setCampaigns([...campaigns,campaign])
	}
	console.log("ManifestList",props)
	return (
		<nav className="campaign-list-pane list-group list-group-flush">
			
			<div className="btn-group mb-2" role="group" aria-label="">
				<button 
					type="button"
					className="btn btn-primary"
					onClick={addCampaign}
				>
					Add Campaign
				</button>
				
			</div>
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


const mapDispatchToProps:MapDispatchToProps<IManifestListProps,IManifestListProps> = (dispatch,ownProps) => {
	return {
		...ownProps,
		setCampaigns: (campaigns) => {
			return dispatch(setCampaignsLocal(campaigns));
		}
	};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	mapDispatchToProps
  )(ManifestList);