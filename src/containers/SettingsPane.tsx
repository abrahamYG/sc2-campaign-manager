import React, { useState } from 'react';
import Config from '../classes/Config'
import SettingsForm from '../components/SettingsForm'


export default function SettingsPane(props:any){
	const [installDir, setInstallDir] = useState(Config.getInstallDir());
	const [runCommand, setRunCommand] = useState(Config.getRunCommand());
	const [runParams, setRunParams] = useState(Config.getRunParams().join(" "));
	const [campaignSources, setCampaignSources] = useState(Config.getSources().join("\n"));
	const [disabledForm, setDisabledForm] = useState(false);
	const formProps ={installDir, setInstallDir,
		runCommand, setRunCommand,
		runParams, setRunParams,
		disabledForm, setDisabledForm,
		campaignSources, setCampaignSources,
	fullForm: true}
	const handleSave = ():void => {
		Config.writeToDisk({
			installDir, 
			runCommand, 
			runParams,
			campaignSources:campaignSources.split("\n")
		});
	}
	return(
		<>
		<header className="modal-header">
						<h5 className="modal-title">Settings</h5>
						{/*
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						*/}
					</header>
					<section className="modal-body">
						<p></p>
							<SettingsForm {...formProps} />
					</section>
		<footer className="modal-footer">
		{/*
			<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
		*/}
			<button onClick={handleSave} type="button" className="btn btn-primary">Save changes</button>
		</footer>
		</>
	);
}