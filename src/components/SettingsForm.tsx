import React from 'react';

export default function SettingsForm(props:any){
	const {
		installDir, setInstallDir,
		runCommand, setRunCommand,
		runParams, setRunParams,
		campaignSources, setCampaignSources,
		disabledForm, setDisabledForm,
		fullForm
	} = props;
	
	return(
	<form>
		<fieldset disabled={disabledForm}>
			<div className="form-group">
				<label htmlFor="installdir">StarCraft II Installation Directory</label>
				<input 
					value={installDir}
					onChange={e => setInstallDir(e.target.value)}
					type="text" 
					className="form-control" 
					name="installdir" 
					aria-describedby="installdirHelp" 
					placeholder="Enter a directory" 
				/>
				<small id="installdirHelp" className="form-text text-muted">
					This is the directory where maps and mods for the campaings you download will be placed.
					It was inferred from your settings, but make sure it is correctly set.
				</small>
			</div>
			<div className="form-group">
				<label htmlFor="runcommand">StarCraft II Run Map Command</label>
				<input 
					value={runCommand}
					onChange={e => setRunCommand(e.target.value)}
					type="text" 
					className="form-control" 
					name="runcommand" 
					aria-describedby="runcommandHelp" 
					placeholder="Enter a command" 
				/>
				<small id="runcommandHelp" className="form-text text-muted">
					This value is used to run StarCraft II  and directly load the campaign of your choice.
					It was inferred from your settings, but make sure it is correctly set, in particular on Linux.
				</small>
				<label htmlFor="runParams">StarCraft II Run Map Parameters</label>
				<input 
					value={runParams}
					onChange={e => setRunParams(e.target.value)}
					type="text" 
					className="form-control" 
					name="runParams" 
					aria-describedby="runParamsHelp" 
					placeholder="Enter a set of parameters" 
				/>
				<small id="runParamsHelp" className="form-text text-muted">
					These are parameters used to run the map and set additional settings when running StarcCraft II.
					If you are not sure what to write here, you can happily leave the default values.
				</small>
			</div>
			</fieldset>
			{fullForm &&
			<fieldset disabled={disabledForm}>
				<div className="form-group">
				<label htmlFor="runcommand">Campaign Sources</label>
				<textarea 
					name="campaignSources"
					aria-describedby="campaignSourcesHelp" 
					value={campaignSources} 
					onChange={e => setCampaignSources(e.target.value)} 
					className="form-control"
					rows={4}
				/>
				<small id="campaignSourcesHelp" className="form-text text-muted">
					These are the sources the app uses to retrieve campaign data.
					If you have an specific set of sources you are free to add them, 
					otherwise you can leave the default settings just fine.
				</small>
				</div>
			</fieldset>
			}
	</form>
	);

}