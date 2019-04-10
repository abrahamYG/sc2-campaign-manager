export default {
	get installDir():string {
		if (!this._installDir) {
		  this._installDir = "c:/temp/"
		}
		return this._installDir
	  }

}