// import checker from './checker.js'
import validator from './validator'
import num from './lutils/num'

const utils = {
	num,
	formatNumber: n => {
		const str = n.toString()
		return str[1] ? str : `0${str}`
	},
}
const $uni = {
	showToast(option) {
		return new Promise((resolve, reject) => {
			uni.showToast({
				icon: 'none',
				mask: true,
				...option,
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				}
			})
		})
	},
	hideToast() {
		uni.hideToast()
	},
	showLoading(option) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中',
				mask: true,
				...option,
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				}
			})
		})
	},
	hideLoading() {
		uni.hideLoading()
	},
	showModal(option) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: '提示',
				confirmColor: '#187df9',
				...option,
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				}
			})
		})
	},
	showActionSheet(option) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				...option,
				success(res) {
					resolve(res)
				},
				fail(error) {
					reject(error)
				}
			})
		})
	}
}

export default {
	utils,
	$uni,
	pattern: validator.Pattern,
	// validator: validator.validator,
	// checker
}
