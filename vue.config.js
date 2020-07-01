module.exports = {
	devServer: {
		proxy: {
			'/install': {
				target: 'http://client.eto-chain.com',
				// target: 'http://47.52.205.185:8094',
				ws: true,
				changeOrigin: true
			},
		}
	}
}
