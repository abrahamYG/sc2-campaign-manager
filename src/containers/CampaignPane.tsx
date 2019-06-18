import React from 'react';
import {ipcRenderer} from 'electron';
import update from 'immutability-helper';
import CampaignList from '../components/CampaignList';
import CampaignDetails from '../components/CampaignDetails';
import Campaign, {ICampaign} from '../classes/Campaign'
import msg from '../constants/ipcmessages';
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AppState } from '../store';
import { setCampaigns, setCampaign } from '../store/campaign/actions';
interface ICampaignPaneProps {
	"campaigns":Array<ICampaign>,
	"selectedCampaign":ICampaign,
	"setCampaigns"?:typeof setCampaigns,
	setCampaign:typeof setCampaign,
	"selectedCampaignAuthor":object
	"onDownloadCampaignClick": (campaign:ICampaign) =>void

}

interface ICampaignPaneState {
	"campaigns": Array<ICampaign>, 
	"authors": Array<Object>,
	"selectedCampaign": ICampaign, 
	"selectedCampaignAuthor": Object
}

class CampaignPane extends React.Component<ICampaignPaneProps, ICampaignPaneState> {
	
	constructor(props:ICampaignPaneProps){
		super(props);
	}
	handleCampaignItemClick = (campaign:ICampaign) => {
		localStorage.setItem('selectedCampaign',campaign.id)
		//this.setState({selectedCampaign: campaign});
	};

	handleDownloadClick = Campaign.downloadCampaign;
	handlePlayClick = Campaign.playCampaign;
	
	componentDidMount(){
		const campaigns = this.props.campaigns.map((campaign, index) =>{
			return {...campaign, installed:Campaign.isCampaignInstalled(campaign)}
		});
		this.props.setCampaigns(campaigns);
		//this.setState({campaigns});
		
		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_STATUS, (event:any, arg:any) => {
			const campaigns = [...this.props.campaigns];
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = {
				...campaigns[index],
				progress: arg.progress.toFixed(2)
			};
			campaigns[index] = campaign;
			this.props.setCampaign(campaign,index)
			console.log("DOWNLOAD_CAMPAIGN_STATUS",campaign.progress)
			//this.setState({campaigns})
		});
		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_FINISH, (event:any, arg:any) => {
			const campaigns = [...this.props.campaigns];
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = {
				...campaigns[index],
				installed:Campaign.isCampaignInstalled(campaigns[index])
			};
			console.log("DOWNLOAD_CAMPAIGN_FINISH", campaign)
			this.props.setCampaign(campaign,index)
		});
	}
	render(){
		const {selectedCampaign,campaigns} = this.props
		console.log(this.props)
		return (
			<div className="row">
				<section className="sidebar col-3 bg-secondary pr-0 pl-0">
				{(campaigns) &&
					<CampaignList />
				}
				</section>
				<section className="campaign-details-pane col bg-white">
					{(selectedCampaign) &&
					<CampaignDetails 
						onDownloadCampaignClick={this.handleDownloadClick}
						onPlayCampaignClick={this.handlePlayClick}
					/>
					}
					{(!selectedCampaign) &&
						<div>
						<h3>Please select a Campaign</h3>
						</div>
					}
				</section>
			</div>
		);
	}
}


const mapStateToProps:MapStateToProps<ICampaignPaneProps,ICampaignPaneProps,AppState> = (state, ownprops) => {
	const {campaignState} = state
	const {campaigns, selectedIndex} = campaignState;
	return {
		...ownprops,
		...campaignState,
		selectedCampaign:campaigns[selectedIndex]
	};
};


const mapDispatchToProps:MapDispatchToProps<ICampaignPaneProps,ICampaignPaneProps> = (dispatch,ownProps) => {
	return {
		...ownProps,
		setCampaigns: (campaigns) => {
			return dispatch(setCampaigns(campaigns));
		},
		setCampaign: (campaign,index) => {
			return dispatch(setCampaign(campaign,index));
		}
	};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	mapDispatchToProps,
  )(CampaignPane);
//export default CampaignList