import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

Vue.mixin({
	data() {
		return {
			query: {},
			modalName: null,
			List: [],
			page: 1,
			finish: false
		}
	},
	computed: {
		...mapState(['version', 'isUpgrade', 'ordertabs','symbolActive', 'token', 'userInfo', 'loadingMore', 'isLoading', 'isBlock', 'update', 'baseURL','selAddress']),
		customBar() {
			return this.CustomBar
		},
		i18n() {
			//this.$mp ---- {mpType:'page',page{...},query:{....},status: ''}
			//this.$mp.page  ---{...}
			//this.$mp.page.route------'pages/login/index'
			if (this.$mp && this.$mp.page && this.$mp.page.route) {
				let attr = this.$mp.page.route.split('/')
				let latest = attr[attr.length - 1]
				//latest -----index
				let language = (latest == 'index' || latest == 'detail') ?
					attr[attr.length - 2] :
					attr[attr.length - 1]
					//language ----- login
				let i18n = { ...this.$t('common'), ...this.$t(language) }
				return i18n
			}
			
			return this.$t('common')
		},
		language() {
			let l = []
			if (this.$i18n) {
				let messages = this.$i18n.messages
				Object.keys(messages).forEach(v => {
					l.push({ name: messages[v].name, locale: v })
				})
			}
			return l
		},
		languageActive() {
			return this.$i18n.locale
		},
		scrollView() {
			const height = this.safeArea.bottom - this.CustomBar
			const main = `height: ${height}px`
			const headbar = `height: ${height - uni.upx2px(100)}px`
			const wallet = `height: ${height - uni.upx2px(410)}px`
			const trading = `height: ${height - uni.upx2px(600)}px`
			const team = `height: ${height - uni.upx2px(400)}px`
			return { main, headbar, wallet, trading, team }
		}
	},
	onLoad(query) {
		this.query = query
		// if (this.$mp.page.route != 'pages/shop/goods') {
		uni.setNavigationBarColor({ backgroundColor: 'transparent', frontColor: this.navbarColor ? '#000000' : '#ffffff' })
		// }
		this.setRules()
	},
	onTabItemTap() {
		this.$t('tabbar').forEach((text, index) => {
			uni.setTabBarItem({ index: index, text: text })
		})
	},
	onBackPress(e) {
		if (this.modalName) {
			this.HideModal()
			return true
		}
		// #ifdef APP-PLUS
		if (this.isUpgrade) {
			plus.runtime.quit()
			return true
		}
		// #endif
	},
	methods: {
		...mapActions(['getUser', 'setUpdate', 'setState','setOrder']),
		clearData() {
			this.List = []
			this.page = 1
			this.finish = false
		},
		ShowModal(modalName) {
			this.modalName = modalName
		},
		HideModal(e) {
			this.modalName = null
		},
		async copy(data, toast) {
			await uni.setClipboardData({ data })
			this.$uni.showToast({ title: this.i18n.isCopy || toast, icon: 'success' })
			this.modalName && this.HideModal()
		},
		formValidate() {
			this.$refs.form.validate(res => {
				if (res) {
					this.formSubmit()
				}
			})
		},
		setRules() {
			this.$nextTick(() => {
				if (this.$refs.form && this.rules) {
					this.$refs.form.setRules(this.rules)
				}
			})
		},
		async pushPage(path, query = {}, mode = 'push') {
			await this.$Router[mode]({ path, query, })
			this.modalName && this.HideModal()
		}
	}
})
