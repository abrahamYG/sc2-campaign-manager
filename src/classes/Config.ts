const os = require('electron').remote.require('os');
const {app} = require('electron').remote.require('electron');
const {Registry} = require('electron').remote.require('rage-edit')
const {currentPlatform, platforms} = require("./Platform")


export default {

	get installDir():string {
		if (!this._installDir) {
			if(currentPlatform === platforms.WINDOWS){
				Registry.get('HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\StarCraft II', 'InstallLocation').then((key:string) =>{
					console.log("Registry", key);
					this._installDir = key;
				})

			}
			this._installDir = os.homedir();
		
		}
		console.log("userData",app.getPath("userData"));
		return this._installDir
	},
	get runCommand():object {
		if (!this._runcommand) {
			this._runcommand = {
				WINDOWS:"SC2Switcher.exe -run {map} -reloadcheck -speed {speed}",
				MAC:"open {map} -a \"sc2switcher\"",
				LINUX:"wine \"C:\\Program Files (x86)\\StarCraft II\\StarCraft II.exe\""
			};
		}
		return this._runcommand;
	}
	
}