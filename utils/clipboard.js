// #ifdef H5
import ClipboardJS from 'clipboard'
const Types = {
	isFunction: (obj) => {
		let type = Object.prototype.toString.call(obj)
		return type == '[object Function]'
	},
	isObject: (obj) => {
		let type = Object.prototype.toString.call(obj)
		return type == '[object Object]'
	},
	isString: (obj) => {
		let type = Object.prototype.toString.call(obj)
		return type == '[object String]'
	}
}
const setClipboardData = function(options) {
	let {
		data,
		event,
		success,
		fail,
		complete
	} = options
	let cb = new ClipboardJS('.null', {
		text: () => data
	})
	cb.on('success', function(res) {
		success && success(res)
		complete && complete(res)
		cb.off('error')
		cb.off('success')
		cb.destroy()
	})
	cb.on('error', function(err) {
		fail && fail(err)
		complete && complete(err)
		cb.off('error')
		cb.off('success')
		cb.destroy()
	})
	cb.onClick(event)
}

uni.setClipboardData = options => {
	return new Promise((resolve, reject) => {
		let emptyFun = function() {}
		let config = {
			data: null,
			event: null,
			success: emptyFun,
			fail: emptyFun,
			complete: emptyFun
		}
		if (options && Types.isObject(options)) {
			config = Object.assign({}, config, options)
		}
		if (options && Types.isString(options)) {
			config = Object.assign({}, config, {
				data: options
			})
		}
		let data = config.data
		let success = config.success || emptyFun
		let fail = config.fail || emptyFun
		let complete = config.complete || emptyFun
		let e = config.event || window.event || {}
		setClipboardData({
			data: config.data,
			event: e,
			success: (res) => {
				success && Types.isFunction(success) && success(res)
				resolve(res)
			},
			fail: (err) => {
				fail && Types.isFunction(fail) && fail(err)
				reject(err)
			},
			complete: (comp) => {
				complete && Types.isFunction(complete) && complete(comp)
				resolve(complete)
			}
		})
	})
}
// #endif
