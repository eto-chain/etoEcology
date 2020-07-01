import Vue from 'vue'
import baseURL from '@/utils/request/baseURL'

const token = uni.getStorageSync('token')
const users = uni.getStorageSync('users')
const userInfo = uni.getStorageSync('userInfo') 
const address = uni.getStorageSync('address')
const state = {
	version: '1.0.1',
	isUpgrade: false,
	baseURL: baseURL,
	token: token,
	users: users,
	userInfo: userInfo,
	address: address,
	selAddress: {},
	symbolActive: 0,
	update: false,
	loadingMore: false,
	isLoading: false,
	isBlock: false,
	ordertabs:0,
	downloadURL: { 'Android': '', 'iOS': '' }
}

const mutations = {
	SET_STATE: (state, { key, value }) => {
		state[key] = value
	},
	SET_UPDATE: (state, data) => {
		state.update = data
	},
	SET_LOADINGMORE: (state, data) => {
		state.loadingMore = data
	},
	SET_ISLOADING: (state, data) => {
		state.isLoading = data
	},
	SET_ISBLOCK: (state, data) => {
		state.isBlock = data
	},
	SET_ADDRESS: (state, data) => {
		state.selAddress = data
	},
	SET_TOKEN: (state, data) => {
		state.token = data
	},
	SET_ORDER: (state, data) => {
		state.ordertabs = data
	},
	SET_USER_INFO: (state, data) => {
		state.userInfo = { ...state.userInfo, ...data }
	},
	UPDATE_USER: ({ userInfo }, { attr, value }) => {
		userInfo[attr] = value
	}
}

const actions = {
	setState({ commit }, data) {
		commit('SET_STATE', data)
	},
	setUpdate({ commit }, data) {
		commit('SET_UPDATE', data)
	},
	setToken({ commit }, data) {
		commit('SET_TOKEN', data)
		uni.setStorageSync('token', data)
	},
	// delToken({commit},data) {
	// 	uni.removeStorage('token')
	// },
	setAddress({commit}, data) {
		commit('SET_ADDRESS', data)
	},
	setUsers({ commit }, data) {
		commit('SET_STATE', { key: 'users', value: data })
		uni.setStorageSync('users', data)
	},
	setOrder({ commit }, data) {
		commit('SET_ORDER', data)
	},
	setUserInfo({ commit }, data) {
		commit('SET_USER_INFO', data)
		uni.setStorageSync('userInfo', data)
	},
	async getUser({ commit }) {
		await Vue.http.post('user.info', {}, { tipConfig: { isLoading: false, isErrorDefaultTip: false } })
		.then(res=>{
			let data = res.data;
			commit('SET_USER_INFO',data)
			uni.setStorageSync('userInfo', data)
			let users = { ...state.users }
			if (!users[data.mobile]) { users[data.mobile] = {} }
			users[data.mobile].avatar = data.avatar
			users[data.mobile].expires = Vue.dayjs().add(1, 'month').unix()
			commit('SET_STATE', { key: 'users', value: users })
			uni.setStorageSync('users', users)
		}).catch(err=> console.log(err))
	},
	async logout({ commit }) {
		commit('SET_USER_INFO', '')
		commit('SET_TOKEN', '')
		uni.setStorageSync('token', '')
		uni.setStorageSync('users', '')
		uni.setStorageSync('userInfo', '')
		uni.setStorageSync('address', '')
		uni.setStorageSync('shareImg', '')
	},
	updateUser({ commit }, data) {
		commit('UPDATE_USER', data)
	}
}

export default { state, mutations, actions }
