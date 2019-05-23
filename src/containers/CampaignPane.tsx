import React from 'react';
import {ipcRenderer} from 'electron';
import update from 'immutability-helper';
import CampaignList from '../components/CampaignList';
import CampaignDetails from '../components/CampaignDetails';
import Campaign, {ICampaign} from '../classes/Campaign'
import msg from '../constants/ipcmessages';
import  {ICampaignState} from '../redux/types';
import { connect } from "react-redux";
import {setCampaigns} from '../redux/actions'
import {AppState} from "../redux/store";
interface ICampaignPaneProps {
	"campaigns":Array<ICampaign>,
	"selectedCampaign":ICampaign,
	"setCampaigns"?:(campaigns:Array<ICampaign>)=>void,
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
		this.state = {
			"campaigns": [], 
			"authors": null,
			"selectedCampaign": null, 
			"selectedCampaignAuthor": null
		};
		Campaign.getCampaignsRemote().then((campaigns:Array<ICampaign>) =>{
			campaigns.map((campaign, index) =>{
				const newcampaign = update(campaign, {
					installed: {$set: Campaign.isCampaignInstalled(campaign)}
				});
				campaigns[index] = newcampaign;
				//campaign.	

			})
			//this.setState({campaigns})
			
		})
		Campaign.getCampaignsLocal().then((campaigns: Array<ICampaign>) =>{
			//this.setState({campaigns})
			props.setCampaigns(campaigns);

		})
	}
	handleCampaignItemClick = (campaign:ICampaign) => {
		localStorage.setItem('selectedCampaign',campaign.id)
		//this.setState({selectedCampaign: campaign});
	};

	handleDownloadClick = (campaign:ICampaign) => {
		console.group("handleDownloadClick")
		console.log(campaign)
		const {id} = campaign;
		console.log(`isCampaignInstalled ${id}`,Campaign.isCampaignInstalled(campaign));
		Campaign.downloadCampaign(campaign);
		console.groupEnd();
	}
	handlePlayClick = (campaign:ICampaign) => {
		console.group("handlePlayClick")
		console.log(campaign)
		const {id} = campaign;
		Campaign.playCampaign(campaign);
		console.groupEnd();
	}
	
	componentDidMount(){
		const campaigns = this.props.campaigns.map((campaign, index) =>{
			return {...campaign, installed:Campaign.isCampaignInstalled(campaign)}
		});
		setCampaigns(campaigns);
		//this.setState({campaigns});

		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_STATUS, (event:any, arg:any) => {
			const campaigns = [...this.props.campaigns];
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = campaigns[index];
			campaign.progress = arg.progress.toFixed(2);
			console.log("DOWNLOAD_CAMPAIGN_STATUS", campaign)
			campaigns[index] = campaign;
			this.setState({campaigns})
		});
		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_FINISH, (event:any, arg:any) => {
			const campaigns = [...this.state.campaigns];
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = campaigns[index];
			campaign.installed = Campaign.isCampaignInstalled(campaign);
			console.log("DOWNLOAD_CAMPAIGN_FINISH", campaign)
			campaigns[index] = campaign;
			this.setState({campaigns})
		});
	}
	render(){
		const {} = this.state;
		const {selectedCampaign,campaigns} = this.props
		console.log(this.state)
		return (
			<div className="row">
				<section className="sidebar col-3 bg-secondary pr-0 pl-0">
					{(campaigns) &&
					<CampaignList 
						onClick={this.handleCampaignItemClick} 
						campaigns={campaigns}
						selectedCampaign={selectedCampaign}
						selectedId={(selectedCampaign)?selectedCampaign.id:""}
						
					/>
					}
				</section>
				<section className="campaign-details-pane col bg-light">
					{(selectedCampaign) &&
					<CampaignDetails 
						selectedCampaign={selectedCampaign}
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


const mapStateToProps = (state:AppState, ownprops: ICampaignPaneProps):any => {
	const {campaignState} = state
	return {...ownprops,...campaignState};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	{setCampaigns}
  )(CampaignPane);
//export default CampaignList