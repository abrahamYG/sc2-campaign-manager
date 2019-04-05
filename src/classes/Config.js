export default {
	get installDir() {
		if (!this._installDir) {
		  this._installDir = "c:/temp/"
		}
		return this._installDir
	  }

}