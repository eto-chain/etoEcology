
const URL = 'http://client.eto-chain.com'
// const URL = 'http://47.52.205.185:8094'	
// #ifndef H5
const API = URL + '/install'
// #endif
// #ifdef H5
// const API = process.env.NODE_ENV === 'production' ? (URL + '/install') : '/WeChat'
const API = '/install'
// #endif

export default {
	// domain,
	URL,
	API
}
