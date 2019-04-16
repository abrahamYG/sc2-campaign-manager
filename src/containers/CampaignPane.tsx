import React from 'react';
import {ipcRenderer} from 'electron';
import update from 'immutability-helper';
import CampaignList from '../components/CampaignList';
import CampaignDetails from '../components/CampaignDetails';
import Campaign, {ICampaign} from '../classes/Campaign'
import msg from '../constants/ipcmessages';

interface ICampaignPaneProps {
	"onDownloadCampaignClick": Function, 
	"selectedCampaignAuthor": Object
}

interface ICampaignPaneState {
	"campaigns": Array<ICampaign>, 
	"authors": Array<Object>,
	"selectedCampaign": ICampaign, 
	"selectedCampaignAuthor": Object
}

class CampaignPane extends React.Component<any, ICampaignPaneState> {
	
	constructor(props:any){
		super(props);
		this.state = {
			"campaigns": [], 
			"authors": null,
			"selectedCampaign": null, 
			"selectedCampaignAuthor": null
		};
		Campaign.getCampaignsRemote().then((campaigns:Array<ICampaign>) =>this.setState({campaigns}))
	}
	handleCampaignItemClick = (campaign:ICampaign) => {
		localStorage.setItem('selectedCampaign',campaign.id)
		this.setState({selectedCampaign: campaign});
	};

	handleDownloadClick = (campaign:ICampaign) => {
		console.group("handleDownloadClick")
		console.log(campaign)
		const {id} = campaign;
		console.log(`isCampaignInstalled ${id}`,Campaign.isCampaignInstalled(campaign));
		Campaign.downloadCampaign(campaign);
		console.groupEnd();
	}
	
	componentDidMount(){
		const campaigns = [...this.state.campaigns];
		campaigns.map((campaign, index) =>{
			const newcampaign = update(campaign, {
				installed: {$set: Campaign.isCampaignInstalled(campaign)}
			});
			campaigns[index] = newcampaign;
			//campaign.						
		})

		const newState = update(this.state, {
			campaigns: {$set: campaigns}
		})

		this.setState(newState);

		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_STATUS, (event:any, arg:any) => {
			const campaigns = [...this.state.campaigns];
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = campaigns[index];
			campaign.progress = arg.progress.toFixed(2);
			console.log("DOWNLOAD_CAMPAIGN_STATUS", campaign)
			campaigns[index] = campaign;
			this.setState({campaigns})
		});
	}
	render(){
		const {selectedCampaign, campaigns} = this.state;
		console.log(this.state)
		const {selectedCampaignAuthor, onDownloadCampaignClick} = this.props;
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
						selectedCampaignAuthor={selectedCampaignAuthor}
						onDownloadCampaignClick={this.handleDownloadClick}
					/>
					}
					{(!selectedCampaign) &&
						<div>
						<h3>No campaing selected</h3>
						</div>
					}
				</section>
			</div>
		);
	}
}

export default CampaignPane;