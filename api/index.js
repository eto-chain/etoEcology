let API = {}
try {

	const apiContext = require.context('@/api/modules', true, /\.js$/)
	apiContext.keys().forEach((modules) => {
		let attr = modules.replace(/(^\.\/)|(\.js$)/g, '')
		API[attr] = apiContext(modules).default
	})

} catch (e) {}

export default API
