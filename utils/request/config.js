import baseURL from './baseURL'
import md5 from 'blueimp-md5'
const appid = '1821563B1E81CDFF6365BDA4DFDA2827'
const key = 'C619F7BB24A103AC624E9BDA2A20552A'
export default {
	baseURL: baseURL.API,
	getTimeStamp: () => {
		return new Date().getTime()
	},
	getSign: () => {
		return md5(`appid=${appid}&method=check_sign&key=${key}`).toUpperCase()
	},

	// - 关于接口loading的配置
	loading: {
		limitTime: 2000, // - 接口请求在xxxms内完成则不展示loading
		show: () => {
			uni.showLoading({
				title: 'Loading',
				mask: true
			})
		},
		hide: () => {
			uni.hideLoading()
			uni.stopPullDownRefresh()
		}
	},
	// - 接口请求的默认配置
	tipConfig: {
		storeLoadingMore: true, // - store isLoading变量 用于请求按钮loaing
		storeLoading: false, // - store isLoading变量 用于请求按钮loaing
		storeBlock: false, // - store isBlock变量 用于页面加载
		isLoading: false, // - 是否展示loading，默认为true
		isErrorDefaultTip: true, // - 是否展示默认错误提示，默认为true
		isSuccessDefaultTip: false, // - 是否展示默认成功提示，默认为false
		errorAction: false, // - 是否使用自定义的错误处理方法，默认为false，如设置true则需在views层catch错误
		successAction: true, // - 是否使用自定义的成功处理方法，默认为true
		isErrorBack: false, // - 错误是否返回，默认为false
		isSuccessBack: false // - 成功是否返回，默认为false
	},
	// - 运行成功的判别标识  例如res.returnCode === '0'即成功
	resSuccess: {
		key: 'code', // - 与后台规定的表示响应成功的变量
		value: 1, // - 与后台规定的表示响应成功code
		tipShow: res => {
			uni.showToast({
				title: (res && (res.resule || '网络异常，请稍后重试')) || '网络异常，请稍后重试',
				icon: 'success',
				mask: true
			})
		}
	},
	// - 登录失效
	isLogout: {
		key: 'code', // - 与后台规定的表示响应成功的变量
		value: 10, // - 与后台规定的表示响应成功code
		tipShow: res => {
			uni.showToast({
				title: (res && (res.resule || '网络异常，请稍后重试')) || '网络异常，请稍后重试',
				icon: 'none',
				mask: true
			})
		}
	},
	// - 异常情况
	resError: {
		tipShow: err => { // - 异常默认提示的方法
			uni.showToast({
				title: (err && (err.resule || '网络异常，请稍后重试')) || '网络异常，请稍后重试',
				icon: 'none',
				mask: true
			})
		}
	}
}
