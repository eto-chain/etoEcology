import Request from './request'
import Config from './config'
import store from '@/store'
import i18n from '@/language'
import API from '@/api'
import { jsonToUnderline, jsonToHump } from '@/utils/request/underlineHump'
const request = new Request();

// - 异常情况的错误处理
const errorFunction = (err, tipConfig, promise) => {
	// - 如果有异常需要提示
	if (!tipConfig.errorAction && tipConfig.isErrorDefaultTip) {
		Config.resError.tipShow(err)
		if (err[Config.isLogout.key] == Config.isLogout.value) {
			store.dispatch('logout')
			if (isReLaunch) return
			isReLaunch = true
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/index',
					success: () => {
						isReLaunch = false
					}
				})
			}, 800)
		}
	}
	navigateBack(tipConfig, 400)
	tipConfig.storeLoading && store.commit('SET_ISLOADING', false)
	tipConfig.storeBlock && store.commit('SET_ISBLOCK', true)
	store.commit('SET_LOADINGMORE', false)
	return promise.reject(err)
}
// - 成功情况的提示处理
const successFunction = (result, tipConfig, promise) => {
	// - 如果需要默认提示
	if (tipConfig.isSuccessDefaultTip) {
		Config.resSuccess.tipShow(result)
	}
	navigateBack(tipConfig, 200)
	tipConfig.storeLoading && store.commit('SET_ISLOADING', false)
	tipConfig.storeBlock && store.commit('SET_ISBLOCK', true)
	store.commit('SET_LOADINGMORE', false)
	return promise.resolve(result)
}

const navigateBack = (tipConfig, resCode) => {
	if (tipConfig.navigateBack && tipConfig.navigateBack > 0) {
		if ((tipConfig.isErrorBack && resCode == 400) || (tipConfig.isSuccessBack && resCode == 200)) {
			store.commit('SET_UPDATE', true)
			setTimeout(() => { uni.navigateBack({ delta: tipConfig.navigateBack }) }, 800)
		}
	}
}

let promises = [] // - 接收接口请求的promise数组
let loadingTimer = null // - loading的定时器
let isLoading = false
let isClear = false
let isReLaunch = false

request.setConfig(
	(config) => { /* 设置全局配置 */
		config.header = {
			...config.header,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		config.baseUrl = Config.baseURL; /* 根域名不同 */
		return config
	}
)

request.interceptor.request(
	(config, cancel) => {
		if (!Request.posUrl(config.url)) {
			const reqURL = config.url.split('.')
			config.url = API[reqURL[0]][reqURL[1]]
		}
		const connectId = Symbol(config.url) // - 创建本次请求的loading标识
		const tipConfig = { ...Config.tipConfig, ...config.tipConfig } // - 默认配置和传入的配置混合
		tipConfig.storeLoadingMore && store.commit('SET_LOADINGMORE', true)
		if (tipConfig.storeLoading && store.state.isLoading) {
			isClear = true
			clearTimeout(loadingTimer)
			loadingTimer = null
			Config.loading.hide()
			store.commit('SET_LOADINGMORE', false)
			cancel('请求中')
			return
		}
		tipConfig.storeLoading && store.commit('SET_ISLOADING', true)
		tipConfig.storeBlock && store.commit('SET_ISBLOCK', false)
		promises.push(connectId)
		config.connectId = connectId

		// - 开启loading
		isClear = false
		clearTimeout(loadingTimer) // - 多个接口时需要清除上一个loading
		loadingTimer = setTimeout(() => {
			!isClear && tipConfig.isLoading && Config.loading.show()
		}, Config.loading.limitTime)


		const token = uni.getStorageSync('token')
		const dataAttr = config.formData ? 'formData' : 'data'
		config[dataAttr].language = i18n.locale
		// config[dataAttr].version = store.state.version || plus.runtime.version
		// #ifdef APP-PLUS
		config[dataAttr].appid = plus.runtime.appid
		config[dataAttr].os = plus.os.name === 'iOS' ? 2 : 1
		// #endif
		config[dataAttr].timestamp = Config.getTimeStamp()
		config[dataAttr].sign = Config.getSign()
		jsonToUnderline(config[dataAttr])

		let isAuth = config.isAuth
		if (isAuth != undefined && isAuth == false) return config
		if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
			isClear = true
			tipConfig.storeLoading && store.commit('SET_ISLOADING', false)
			const index = promises.indexOf(connectId)
			clearTimeout(loadingTimer)
			loadingTimer = null
			promises.splice(index, 1)
			Config.loading.hide()
			cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
			setTimeout(() => { uni.reLaunch({ url: '/pages/login/index' }) }, 800)
			return
		}
		config.data && (config.header.Authorization = `Bearer ${token}`)
		config[dataAttr].token = token

		return config
	}
)

request.interceptor.response(
	(response, promise) => {
		const index = promises.indexOf(response.config.connectId)
		const tipConfig = { ...Config.tipConfig, ...response.config.tipConfig } // - 默认配置和传入的配置混合
		tipConfig.isLoading && (isLoading = true) // - 多个请求有一个有loading 就需要清除
		promises.splice(index, 1) // - 移除当前的loading标记
		if (promises.length === 0) {
			isClear = true
			clearTimeout(loadingTimer) // - 当请求在xxxms内完成则直接清除loading计时器
			loadingTimer = null
			isLoading && Config.loading.hide() // - 当promise全部加载完成则隐藏loading
		}
		// const result = typeof response.data == "string" ? JSON.parse(response.data) : response.data
		let result
		try {
			result = JSON.parse(response.data)
		} catch (e) {
			result = response.data
		}
		jsonToHump(result) // 下划线转驼峰
		if (result[Config.resSuccess.key] == Config.resSuccess.value) {
			return successFunction(result, tipConfig, promise)
		} else {
			return errorFunction(result, tipConfig, promise)
		}
	},
	(err, promise) => {
		const index = promises.indexOf(err.config.connectId)
		const tipConfig = { ...Config.tipConfig, ...err.config.tipConfig }
		tipConfig.isLoading && (isLoading = true)
		promises.splice(index, 1) // - 移除当前的loading标记
		if (promises.length === 0) {
			isClear = true
			clearTimeout(loadingTimer) // - 当请求在xxxms内完成则直接清除loading计时器
			loadingTimer = null
			isLoading && Config.loading.hide() // - 当promise全部加载完成则隐藏loading
		}
		return errorFunction(err, tipConfig, promise)
	}
)

export default request
