import './App.scss';
import React from "reactn";
import { setGlobal } from 'reactn';
import Home from "./pages/Home";
import TitleBar from './components/TitleBar'
import { hot } from "react-hot-loader";

setGlobal({
	"campaigns": [], 
	"installedCampaigns":{},
	"authors": null,
	"selectedCampaign": null, 
	"selectedCampaignAuthor": null,
	campaignCount:0
});

function App() {
	return (<Home/>);
}

export default hot(module)(App); 
