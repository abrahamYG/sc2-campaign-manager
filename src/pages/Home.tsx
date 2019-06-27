import React, { Component, FC } from 'react';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Campaign, { ICampaign } from '../classes/Campaign'
import NavBar from '../components/NavBar';
import CampaignPane from '../containers/CampaignPane';
import MapMakerPane from '../containers/MapMakerPane'
import SettingsPane from '../containers/SettingsPane'
import { setCampaigns, setCampaignsLocal, setCampaignsRemote, getCampaignsLocal, getCampaignsRemote } from '../store/campaign/actions';
import { MapDispatchToProps, connect } from 'react-redux';
import Downloader from '../classes/Downloader';

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
	getCampaignsLocal?: typeof getCampaignsLocal
	getCampaignsRemote?: typeof getCampaignsRemote 
}


export const NewHome:FC<IHomeProps> = props  => {
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

class Home extends Component<IHomeProps, IHomeState> {
	constructor(props: IHomeProps) {
		super(props);
		const selectedPaneLocal = (localStorage.getItem('selectedPane') !== null) ? localStorage.getItem('selectedPane') : "campaigns";
		const selectedCampaignLocal = (localStorage.getItem('selectedCampaign') !== null) ? localStorage.getItem('selectedCampaign') : null;
		console.log("Home props")
		
		props.getCampaignsRemote();
		props.getCampaignsLocal();
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
		setCampaigns: campaigns => dispatch(setCampaigns(campaigns)),
		setCampaignsLocal: campaigns => dispatch(setCampaignsLocal(campaigns)),
		setCampaignsRemote: campaigns => dispatch(setCampaignsRemote(campaigns)),
		getCampaignsLocal,
		getCampaignsRemote
	};
}

export default connect(
	null,//mapStateToProps,
	mapDispatchToProps
  )(Home);
