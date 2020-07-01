<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
export default {
	onLaunch() {
		// #ifdef APP-PLUS
		// plus.navigator.closeSplashscreen()
		// 锁定屏幕方向
		plus.screen.lockOrientation('portrait-primary') //锁定
		// #endif
		uni.getSystemInfo({
			success(res) {
				Vue.prototype.safeArea = res.safeArea
				// #ifndef MP
				Vue.prototype.StatusBar = res.statusBarHeight
				Vue.prototype.CustomBar = res.statusBarHeight + 45
				// #endif

				// #ifdef MP-WEIXIN || MP-QQ
				Vue.prototype.StatusBar = res.statusBarHeight
				let capsule = wx.getMenuButtonBoundingClientRect()
				if (capsule) {
					Vue.prototype.Custom = capsule
					Vue.prototype.CustomBar = capsule.bottom + capsule.top - res.statusBarHeight
				} else {
					Vue.prototype.CustomBar = res.statusBarHeight + 50
				}
				// #endif

				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = res.statusBarHeight
				Vue.prototype.CustomBar = res.statusBarHeight + res.titleBarHeight
				// #endif
			}
		})
		uni.getStorage({
			key: 'locale',
			success: e => {
				this.$i18n.locale = e.data
			}
		})
	},
	onShow() {
		this.checkUpgrade()
	},
	onHide() {},
	methods: {
		async checkUpgrade() {
			// 检测升级
			let params = {
				// #ifdef APP-PLUS
				appid: plus.runtime.appid,
				version: plus.runtime.version,
				os: plus.os.name === 'iOS' ? 2 : 1
				// #endif
			}
			let {
				data: { type, url, desc, anurl: Android, iosurl: iOS }
			} = await this.$http.post('login.upgrade', params, { isAuth: false, tipConfig: { isLoading: false, isErrorDefaultTip: false } })
			// #ifdef H5
			this.setState({ key: 'downloadURL', value: { Android, iOS } })
			// #endif
			 // #ifdef APP-PLUS 
			if (type != 0) {
				// 提醒用户更新
				this.setState({ key: 'isUpgrade', value: type == 2 })
				let res = await this.$uni.showModal({ title: this.i18n.updateTip, showCancel: true, content: desc })
				res.confirm && plus.runtime.openURL(url)
				res.cancel && (type == 2 ? plus.runtime.quit() : null)
			}
			// #endif
		}
	}
}
</script>

<style lang="less">
/*每个页面公共css */
@import './style/bg.css';
@import './style/color.less';
@import './style/colorui/main.css';
@import './style/colorui/icon.css';
@import './components/parse/parse.css';
@import './style/base.less';
</style>
