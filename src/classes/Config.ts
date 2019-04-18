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
		const jsonConfigs = JSON.stringify(configs,null,4);
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
	static installDirFromRegistry:string = "";
	static async getInstallDirFromRegistry() {
		if (currentPlatform === platforms.WINDOWS) {
			const result = await Registry.get('HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\StarCraft II', 'InstallLocation');
			this.installDirFromRegistry = result? result:os.homedir();
			return this.installDirFromRegistry;
		}
		else{
			//return this.installDir;
		}
	}
	static getInstallDir():string {
		let dir:any = {
			WINDOWS:this.installDirFromRegistry?this.installDirFromRegistry:"C:\\Program Files (x86)\\StarCraft II",
			MAC:"/Applications/StarCraft II",
			LINUX:"C:\\Program Files (x86)\\StarCraft II"
		};
		console.log("this.installDirFromRegistry",this.installDirFromRegistry);
		console.log("dir[currentPlatform]",dir[currentPlatform]);
		return Config.configFileExists()? (Config.loadFromDisk().installDir):dir[currentPlatform];
	}
	static getRunCommand():string {
		const commands:any = {
			WINDOWS:path.join(Config.getInstallDir(),"Support64/" ,"SC2Switcher_x64.exe")
			MAC:"open {map}",
			LINUX:"wine \"C:\\Program Files (x86)\\StarCraft II\\StarCraft II.exe\""
		};
		return Config.configFileExists()? (Config.loadFromDisk().runCommand):commands[currentPlatform];
	}
	static getRunParams():Array<string> {
		const defaultParams:any = {
			WINDOWS:'-run {map} -reloadcheck',
			MAC:"-a \"sc2switcher\"",
			LINUX:"-run {map} -reloadcheck"
		};
		const params = Config.configFileExists()&&Config.loadFromDisk().params? (Config.loadFromDisk().params):defaultParams[currentPlatform];
		return params.split(" ");
	}
	
}