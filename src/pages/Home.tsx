import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Campaign, { ICampaign } from '../classes/Campaign'
import NavBar from '../components/NavBar';
import CampaignPane from '../containers/CampaignPane';
import MapMakerPane from '../containers/MapMakerPane'
import SettingsPane from '../containers/SettingsPane'
import { setCampaigns, setCampaignsLocal, setCampaignsRemote } from '../store/campaign/actions';
import { MapDispatchToProps, connect } from 'react-redux';

interface IHomeState {
	"campaigns": Array<ICampaign>,
	"authors": Array<Object>,
	"selectedCampaign": ICampaign,
	"selectedCampaignAuthor": Object,
	"selectedPane": string
}

interface IHomeProps {
	setCampaigns?: typeof setCampaigns
	setCampaignsLocal?: typeof setCampaignsLocal
	setCampaignsRemote?: typeof setCampaignsRemote
}

class Home extends Component<any, IHomeState> {
	constructor(props: IHomeProps) {
		super(props);
		const selectedPaneLocal = (localStorage.getItem('selectedPane') !== null) ? localStorage.getItem('selectedPane') : "campaigns";
		const selectedCampaignLocal = (localStorage.getItem('selectedCampaign') !== null) ? localStorage.getItem('selectedCampaign') : null;
		console.log("Home props")
		Campaign.getCampaignsRemote().then((campaigns) =>{
			props.setCampaignsRemote(campaigns.map(
				campaign => {return {...campaign, installed:Campaign.isCampaignInstalled(campaign)}}
			));
		})
		Campaign.getCampaignsLocal().then((campaigns) =>{
			console.log(campaigns)
			props.setCampaignsLocal(campaigns.map(
				campaign => {return {...campaign, installed:Campaign.isCampaignInstalled(campaign)}}
			));
		})
		//props.setCampaignsRemote();
		//props.setCampaignsLocal();
		//setCampaignsLocal

		//Campaign.getCampaignsLocal().then((campaigns: any) =>this.setState({campaigns}))
		//Campaign.getCampaignsRemote().then((campaigns: any) =>this.setState({campaigns}))



		/* const conn = new scrapper.MapsterConnection();

		(async function() {
			const projectName = 'thoughts-in-chaos';
			const result = await conn.getProjectOverview(projectName);
			console.log(result);
		})(); */

	}

	render() {
		
		return (
			<Router>
				<>
				<NavBar />
				<main className="container-fluid w-100 h-100">
					<Route path="/" exact render={()=><Redirect to="/campaign"/>} />
					<Route path="/campaign" component={CampaignPane} />
					<Route path="/mapmakers" component={MapMakerPane} />
					<Route path="/settings" component={SettingsPane} />
				</main>
				</>
			</Router>
		);
	}
}

const mapDispatchToProps:MapDispatchToProps<IHomeProps,IHomeProps> = (dispatch,ownProps) =>{
	return {
		...ownProps,
		setCampaigns: (campaigns) => {
			return dispatch(setCampaigns(campaigns));
		},
		setCampaignsLocal: (campaigns) => {
			return dispatch(setCampaignsLocal(campaigns));
		},
		setCampaignsRemote: (campaigns) => {
			return dispatch(setCampaignsRemote(campaigns));
		}
	};
}

export default connect(
	null,//mapStateToProps,
	mapDispatchToProps
  )(Home);
