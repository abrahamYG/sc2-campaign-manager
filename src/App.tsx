import './App.scss';
import React, {useState} from "react";
import { hot } from "react-hot-loader";
import Config from './classes/Config';
import Home from "./pages/Home";
import InitialSetup from './pages/InitialSetup'

import { Provider } from "react-redux";
import store from "./redux/store";


function App() {
	const loadInitialSetup = !Config.configFileExists();
	const [configured, setConfigured] = useState(Config.configFileExists());
	return (
		<Provider store={store}>
		{!configured && <InitialSetup onSave={setConfigured}/>}
		{configured && <Home/>}
		</Provider>
	
	);
}

export default hot(module)(App); 
