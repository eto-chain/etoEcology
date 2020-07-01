// Plugin
import baseURL from '@/utils/request/baseURL'
import request from '@/utils/request'
import utils from '@/utils'
import dayjs from 'dayjs'

export default {
	/**
	 * 自定义方法
	 * 组件内使用： this.$validator, this.$http
	 * 全局使用： Vue.validator, Vue.http
	 */
	install(Vue) {
		const attr = { configurable: false, writable: true, enumerable: false }
		const $pattern = { ...attr, value: utils.pattern }
		// const $validator = { ...attr, value: utils.validator }
		const $utils = { ...attr, value: utils.utils }
		const $uni = { ...attr, value: utils.$uni }
		const $dayjs = { ...attr, value: dayjs }
		const $baseURL = { ...attr, value: baseURL }
		const $http = { ...attr, value: request }

		Object.defineProperties(Vue.prototype, {
			$pattern,
			// $validator,
			$utils,
			$uni,
			$dayjs,
			$baseURL,
			$http,
		})
		Object.defineProperties(Vue, {
			pattern: $pattern,
			// validator: $validator,
			utils: $utils,
			uni: $uni,
			dayjs: $dayjs,
			baseURL: $baseURL,
			http: $http,
		})
	}
}
