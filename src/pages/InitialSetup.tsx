import React, { useState, useEffect } from 'react';
import Config from '../classes/Config'
export default function InitialSetup(props:any){
	const [installDir, setInstallDir] = useState(Config.getInstallDir());
	const [runCommand, setRunCommand] = useState(Config.getRunCommand());
	const [runParams, setRunParams] = useState(Config.getRunParams().join(" "));
	const [disabledForm, setDisabledForm] = useState(true);
	const handleSave = ():void => {
		Config.writeToDisk({installDir, runCommand, runParams});
		props.onSave(true);
	}
	useEffect(() => {
		(async () =>{
			const result = await Config.getInstallDirFromRegistry();
			console.log("getInstallDirFromRegistry", result);
			setInstallDir((result)?result:Config.getInstallDir());
			setRunCommand((result)?Config.getRunCommand():runCommand);
			setDisabledForm(false);
		})();
	}, []);
	return(
		<section className="modal d-block bg-dark" tabIndex={-1} role="dialog">
			<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
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
							</form>
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