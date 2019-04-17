const os = require('electron').remote.require('os');
const path = require('electron').remote.require('path');
const {app} = require('electron').remote.require('electron');
const {Registry} = require('electron').remote.require('rage-edit')
const {currentPlatform, platforms} = require("./Platform")
const fs = require('fs');

export default class Config {
	static configFileExists():boolean{
		const configFile = path.join(app.getPath("userData"), "config.json")
		return fs.existsSync(configFile);
	}
	
	static loadFromDisk():any{
		let configs = {};
		const configFile = path.join(app.getPath("userData"), "config.json")
		const data = fs.readFileSync(configFile);
		configs = JSON.parse(data);
		
		return configs;
	}
	static writeToDisk(configs:object):boolean{
		const jsonConfigs = JSON.stringify(configs);
		const configFile = path.join(app.getPath("userData"), "config.json")
		fs.writeFile(configFile, jsonConfigs, 'utf8', (err:any) => {
			if (err) {
				console.log("An error occured while writing JSON Object to File.");
				return console.log(err);
			}
		 
			console.log("JSON file has been saved.");
		});
		return true;
	}
	static async getInstallDirFromRegistry() {
		if (currentPlatform === platforms.WINDOWS) {
			const result = await Registry.get('HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\StarCraft II', 'InstallLocation');
			return result;
		}
		else{
			//return this.installDir;
		}
	}
	static getInstallDir():string {
		return Config.configFileExists()? (Config.loadFromDisk().installDir):os.homedir();
	}
	static getRunCommand():string {
		const commands:any = {
			WINDOWS:"SC2Switcher.exe -run {map} -reloadcheck -speed {speed}",
			MAC:"open {map} -a \"sc2switcher\"",
			LINUX:"wine \"C:\\Program Files (x86)\\StarCraft II\\StarCraft II.exe\""
		};
		return Config.configFileExists()? (Config.loadFromDisk().runCommand):commands[currentPlatform];
	}
	
}