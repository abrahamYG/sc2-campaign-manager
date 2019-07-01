import React, { useState, FC } from 'react';
import Config, {IConfig} from '../classes/Config'
import SettingsForm from '../components/SettingsForm'
import { connect } from "react-redux";
import { AppState } from '../store';
import { setConfig } from '../store/config/actions';


export const SettingsPane: FC = (props:any) =>{
	const [installDir, setInstallDir] = useState(Config.getInstallDir());
	const [runCommand, setRunCommand] = useState(Config.getRunCommand());
	const [runParams, setRunParams] = useState(Config.getRunParams().join(" "));
	const [feed, setFeed] = useState(Config.getFeed());
	const [campaignSources, setCampaignSources] = useState(Config.getSources().join("\n"));
	const [campaignLocalSources, setCampaignLocalSources] = useState(Config.getLocalSources().join("\n"));
	const [disabledForm, setDisabledForm] = useState(false);
	const {config, onClick} = props
	
	const formProps ={installDir, setInstallDir,
		runCommand, setRunCommand,
		runParams, setRunParams,
		feed, setFeed,
		disabledForm, setDisabledForm,
		campaignSources, setCampaignSources,
		campaignLocalSources, setCampaignLocalSources,
	fullForm: true}
	const handleSave = ():void => {
		Config.writeToDisk({
			installDir, 
			runCommand, 
			runParams,
			feed,
			campaignSources:campaignSources.split("\n"),
			campaignLocalSources:campaignLocalSources.split("\n")
		});
	}
	return(
		<div>
		<header className="modal-header">
			<h5 className="modal-title">Settings</h5>
		</header>
		<section className="settings-pane modal-body">
			<p></p>
			<SettingsForm {...formProps} />
		</section>
		<footer className="modal-footer">
		{/*
			<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
		*/}
			<button onClick={handleSave} type="button" className="btn btn-primary">Save changes</button>
		</footer>
		</div>
	);
}


const mapStateToProps = (state:AppState,ownProps:any):any => {
	const {configState} = state;
	return {...configState,...ownProps};
};


const mapDispatchToProps = (dispatch:any) => {
	return {
		onClick: (config:IConfig) => {
			dispatch(setConfig(config));
		}
	};
};

export default connect(
	mapStateToProps,//mapStateToProps,
	mapDispatchToProps
  )(SettingsPane);