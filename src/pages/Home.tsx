import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Campaign, {ICampaign} from '../classes/Campaign'
import { setGlobal } from 'reactn';
import NavBar from '../components/NavBar';
import CampaignPane from '../containers/CampaignPane';
import MapMakerPane from '../containers/MapMakerPane'
import SettingsPane from '../containers/SettingsPane'

interface IHomeState {
	"campaigns": Array<ICampaign>, 
	"authors": Array<Object>,
	"selectedCampaign": Object, 
	"selectedCampaignAuthor": Object,
	"selectedPane": string
}



class Home extends Component<any,IHomeState> {
    constructor(props:Object) {
		super(props);
		const selectedPaneLocal = (localStorage.getItem('selectedPane')!==null)?localStorage.getItem('selectedPane'):"campaigns";
		const selectedCampaignLocal = (localStorage.getItem('selectedCampaign')!==null)?localStorage.getItem('selectedCampaign'):null;
		this.state = {
			"campaigns": [], 
			"authors": null,
			"selectedCampaign": null, 
			"selectedCampaignAuthor": null,
			"selectedPane": selectedPaneLocal
		};
		
		//Campaign.getCampaignsLocal().then((campaigns: any) =>this.setState({campaigns}))
		//Campaign.getCampaignsRemote().then((campaigns: any) =>this.setState({campaigns}))
		
		
		
		/* const conn = new scrapper.MapsterConnection();

		(async function() {
			const projectName = 'thoughts-in-chaos';
			const result = await conn.getProjectOverview(projectName);
			console.log(result);
		})(); */
		
	}

	handleDownloadCampaignClick = (campaign:ICampaign) => {
		console.log("Downloading "+campaign.id);
	};

	render() {
		const {
			selectedPane, 
			campaigns,
			selectedCampaign, 
			selectedCampaignAuthor
		} = this.state
		const onDownloadCampaignClick = this.handleDownloadCampaignClick;
		return (
		<Router>
			<>
			<NavBar />
			<main className="container-fluid w-100 h-100">
				<Route path="/" exact component={CampaignPane} />
				<Route path="/campaign" render={()=>
					<CampaignPane 
						campaigns={campaigns}
						selectedCampaign={selectedCampaign}
						selectedCampaignAuthor={selectedCampaignAuthor}
						onDownloadCampaignClick={onDownloadCampaignClick}
					/>
				} />
				<Route path="/mapmakers" render={()=>
					<MapMakerPane
						campaigns={campaigns}
						selectedCampaign={selectedCampaign}
					/>
				 } />
				<Route path="/settings" component={SettingsPane} />
			</main>
			</>
		</Router>
		);
	}   
}
	
export default Home;
