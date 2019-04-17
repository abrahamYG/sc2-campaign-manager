import './App.scss';
import React from "reactn";
import { setGlobal } from 'reactn';
import { hot } from "react-hot-loader";
import Config from './classes/Config';
import Home from "./pages/Home";
import InitialSetup from './pages/InitialSetup'

setGlobal({
	"campaigns": [], 
	"installedCampaigns":{},
	"authors": null,
	"selectedCampaign": null, 
	"selectedCampaignAuthor": null,
	"campaignCount":0
});

function App() {
	const loadInitialSetup = !Config.configFileExists();
	return (
		<>
		{loadInitialSetup && <InitialSetup/>}
		{!loadInitialSetup && <Home/>}
		</>
	
	);
}

export default hot(module)(App); 
