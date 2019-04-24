import React from 'react';
import Config from '../classes/Config'

export default function SettingsForm(props:any){
	const {
		installDir, setInstallDir,
		runCommand, setRunCommand,
		runParams, setRunParams,
		campaignSources, setCampaignSources,
		disabledForm, setDisabledForm,
		fullForm
	} = props;
	const openInstallDirDialog = ()=> {
		Config.showInstallDirOpenDialog(installDir, (filePaths:Array<string>)=>{
			setInstallDir(filePaths[0]);
		});

	}
	return(
	<form>
		<fieldset className="form-group" disabled={disabledForm}>
			<label htmlFor="installdir">StarCraft II Installation Directory</label>
				<div className="input-group">
					<input 
						value={installDir}
						onChange={e => setInstallDir(e.target.value)}
						type="text" 
						className="form-control" 
						name="installdir" 
						aria-describedby="installdirHelp" 
						placeholder="Enter a directory" 
					/>
					<div className="input-group-append">
						<button 
							className="btn btn-info" 
							type="button"
							onClick={openInstallDirDialog}
						>
							Browse...
						</button>
					</div>
				</div>
				<small id="installdirHelp" className="form-text text-muted">
					StarCraft II requires its maps and mods files to be placed on its installation directory.
					Default value will be taken from your possible installation directory, make sure it is correctly set.
				</small>
			</fieldset>
			{fullForm &&
			<fieldset className="form-group">
				<label htmlFor="runcommand">StarCraft II Run Map Command</label>
				<div className="input-group">
					<input 
						value={runCommand}
						onChange={e => setRunCommand(e.target.value)}
						type="text" 
						className="form-control" 
						name="runcommand" 
						aria-describedby="runcommandHelp" 
						placeholder="Enter a command" 
					/>
					<div className="input-group-append">
						<button 
							className="btn btn-info" 
							type="button"
							onClick={openInstallDirDialog}
						>
							Browse...
						</button>
					</div>
				</div>
				<small id="runcommandHelp" className="form-text text-muted">
					This value is used to run StarCraft II  and directly load the campaign of your choice.
					Default value is guessed based on the possible StarCraft II Installation directory, but make sure it is correctly set.
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
			</fieldset>
			}
	</form>
	);

}