import './App.scss';
import React, {useState} from "reactn";
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
	const [configured, setConfigured] = useState(false&& Config.configFileExists());
	return (
		<>
		{!configured && <InitialSetup onSave={setConfigured}/>}
		{configured && <Home/>}
		</>
	
	);
}

export default hot(module)(App); 
