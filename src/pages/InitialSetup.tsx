import React, { useState, useEffect } from 'react';
import Config from '../classes/Config'
import SettingsForm from '../components/SettingsForm'


export default function InitialSetup(props:any){
	const [installDir, setInstallDir] = useState(Config.getInstallDir());
	const [runCommand, setRunCommand] = useState(Config.getRunCommand());
	const [runParams, setRunParams] = useState(Config.getRunParams().join(" "));
	const [campaignSources, setCampaignSources] = useState(Config.getSources().join("\n"));
	const [campaignLocalSources, setCampaignLocalSources] = useState(Config.getLocalSources().join("\n"));
	const [disabledForm, setDisabledForm] = useState(true);
	const formProps ={installDir, setInstallDir,
		runCommand, setRunCommand,
		runParams, setRunParams,
		disabledForm, setDisabledForm,
		campaignSources, setCampaignSources,
		campaignLocalSources, setCampaignLocalSources,
	fullForm: false}
	const handleSave = ():void => {
		Config.writeToDisk({
			installDir, 
			runCommand:Config.getRunCommand(installDir), 
			runParams,
			campaignSources:campaignSources.split("\n")
		});
		props.onSave(true);
	}
	useEffect(() => {
		(async () =>{
			const result = await Config.getInstallDirFromRegistry();
			console.log("getInstallDirFromRegistry", result);
			setInstallDir((result)?result:Config.getInstallDir());
			setRunCommand((result)?Config.getRunCommand(result):runCommand);

			const sources:Array<string> = await Config.getSourcesRemote();
			setCampaignSources(sources?sources.join("\n"):campaignSources)
			setDisabledForm(false);
		})();
	}, []);
	return(
		<section className="modal d-block bg-dark" tabIndex={-1} role="dialog">
			<div className="modal-dialog modal-xl modal-dialog-centered" role="document">
				<div className="modal-content">
					<header className="modal-header">
						<h5 className="modal-title">First-time Set Up</h5>
						{/*
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						*/}
					</header>
					<section className="modal-body">
						<p>Welcome to the StarCraft II Custom Campaign Manager!</p>
						<p>Before we begin, we need to make sure everything is set up correctly. 
							Please review if the following settings are right.</p>
							<SettingsForm {...formProps} />
					</section>
					<footer className="modal-footer">
					{/*
						<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					*/}
						<button onClick={handleSave} type="button" className="btn btn-primary">Save changes</button>
					</footer>
				</div>
			</div>
		</section>
	);
}