import React, { FC, useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import CampaignList from '../components/CampaignList';
import CampaignDetails from '../components/CampaignDetails';
import Campaign, { ICampaign } from '../classes/Campaign'
import msg from '../constants/ipcmessages';
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AppState } from '../store';
import { setCampaigns, setCampaign } from '../store/campaign/actions';
import { filterCampaigns, sortCampaigns,IFilter } from '../store/campaign/selectors';
interface ICampaignPaneProps {
	campaigns: Array<ICampaign>,
	selectedCampaign: ICampaign,
	setCampaigns?: typeof setCampaigns,
	setCampaign: typeof setCampaign,
	selectedCampaignAuthor: object
	onDownloadCampaignClick: (campaign: ICampaign) => void

}

interface ICampaignPaneState {
	campaigns: Array<ICampaign>,
	authors: Array<Object>,
	selectedCampaign: ICampaign,
	selectedCampaignAuthor: Object
}

export const NewCampaignPane: FC<ICampaignPaneProps> = props => {
	
	useEffect(()=>{
		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_FINISH, (event: any, arg: any) => {
			const {campaigns} = props;
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = {
				...campaigns[index],
				installed: Campaign.isCampaignInstalled(campaigns[index])
			};
			console.log("DOWNLOAD_CAMPAIGN_FINISH", campaign)
			props.setCampaign(campaign, index)
		});
	},[])

	const [selectedId, setSelectedId]= useState("");
	const [filter, setFilter] = useState<IFilter>({key:"name",val:""});
	const campaigns = filterCampaigns(
		sortCampaigns(props.campaigns,"name"),
		filter
	);

	useEffect(()=>{
		//setFilter(["author","CybrosX"])
	},[])

	const handleDownloadClick = Campaign.downloadCampaign;
	const handlePlayClick = Campaign.playCampaign;
	
	return (
		<div className="row">
			<section className="sidebar col-3 bg-secondary pr-0 pl-0">
				{(campaigns) &&
					<CampaignList 
						onFilterSet={setFilter}
						filter={filter}
						campaigns={campaigns}
						selectedId={selectedId} 
						onItemClick={setSelectedId}
					/>
				}
			</section>
			<section className="campaign-details-pane col bg-white">
				{(selectedId !== "") &&
					<CampaignDetails
						selectedId={selectedId} 
						onDownloadCampaignClick={handleDownloadClick}
						onPlayCampaignClick={handlePlayClick}
					/>
				}
				{(selectedId === "") &&
					<div>
						<h3>Please select a Campaign</h3>
					</div>
				}
			</section>
		</div>
	);
}
/*
class CampaignPane extends React.Component<ICampaignPaneProps, ICampaignPaneState> {

	constructor(props: ICampaignPaneProps) {
		super(props);
	}
	handleCampaignItemClick = (campaign: ICampaign) => {
		localStorage.setItem('selectedCampaign', campaign.id)
		//this.setState({selectedCampaign: campaign});
	};

	handleDownloadClick = Campaign.downloadCampaign;
	handlePlayClick = Campaign.playCampaign;

	componentDidMount() {
		const campaigns = this.props.campaigns.map((campaign, index) => {
			return { ...campaign, installed: Campaign.isCampaignInstalled(campaign) }
		});
		this.props.setCampaigns(campaigns);
		//this.setState({campaigns});

		ipcRenderer.on(msg.DOWNLOAD_CAMPAIGN_STATUS, (event: any, arg: any) => {
			const campaigns = [...this.props.campaigns];
			const index = campaigns.findIndex(c => c.id === arg.campaignId)
			const campaign = {
				...campaigns[index],
				progress: arg.progress.toFixed(2)
			};
			campaigns[index] = campaign;
			this.props.setCampaign(campaign, index)
			console.log("DOWNLOAD_CAMPAIGN_STATUS", campaign.progress)
			//this.setState({campaigns})
		});
		
	}
	render() {
		const { selectedCampaign, campaigns } = this.props
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
							selectedId=""
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
*/

const mapStateToProps: MapStateToProps<ICampaignPaneProps, ICampaignPaneProps, AppState> = (state, ownprops) => {
	const { campaignState } = state
	const { campaigns, selectedIndex } = campaignState;
	return {
		...campaignState,
		campaigns,
		selectedCampaign: campaigns[selectedIndex],
		...ownprops
	};
};


const mapDispatchToProps: MapDispatchToProps<ICampaignPaneProps, ICampaignPaneProps> = (dispatch, ownProps) => {
	return {
		setCampaigns: (campaigns) => {
			return dispatch(setCampaigns(campaigns));
		},
		setCampaign: (campaign, index) => {
			return dispatch(setCampaign(campaign, index));
		},
		...ownProps
	};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	mapDispatchToProps,
)(NewCampaignPane);
//export default CampaignList