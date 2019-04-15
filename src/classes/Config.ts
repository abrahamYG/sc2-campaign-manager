export default {
	get installDir():string {
		if (!this._installDir) {
			this._installDir = "c:/temp/"
		}
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