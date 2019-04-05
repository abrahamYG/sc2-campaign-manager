/**
* Mocking client-server processing
*/
import _authors from './authors.json'

const TIMEOUT = 100

export default {
	getAuthors: (callback, timeout) => {
		setTimeout(() => {
			callback(_authors)
		}, 
		timeout || TIMEOUT)
	},
	getAuthor: (id, callback, timeout) => {
		setTimeout(() => {
			const author = _authors.find((element) => element.id === id)
			callback(author)
		},
		timeout || TIMEOUT)
	},
	downloadAuthors: (payload, callback, timeout) => {
		setTimeout(() => {
			callback()
		}, 
		timeout || TIMEOUT)
	}
}
