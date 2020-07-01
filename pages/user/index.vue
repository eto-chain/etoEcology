<template>
	<view class="user clearfix lh1">
		<view class="" :style="[{ height: StatusBar + 'px' }]"></view>
		
		<view class="mx15 mt10 radius-5 ovh relative">
			<image class="wp100 h150" src="/static/user/user-bg.png" mode=""></image>
			<view class="poa-cover flex-text flex-v">
				<image class="block70 round" :src="userInfo.avatar" mode=""></image>
				<view class="flex-text mt10">
					<view class="mr2">{{ userInfo.name }}<text class="ml5" v-if="userInfo.activationStatus == 0">({{ i18n.noGrade }})</text></view>
					<image class="block20" v-if="userInfo.activationStatus == 1" :src="'/static/user/vip-' + userInfo.grade + '.png'" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="mx15 mt15 radius-5 bg-background px15 py15">
			<view class="h55 flex align-center justify-between" v-for="(item,index) in list" :key="index" @click="pushUrl(item,index)">
				<view class="flex-text">
					<image class="block20 mr15" :src="item.icon" mode=""></image>
					{{ item.text }}
				</view>
				<text class="cuIcon-right color-white-5"></text>
			</view>
			<view class="h55 flex align-center justify-between" @click="pushPage('/pages/shop/order')">
				<view class="flex-text">
					<image class="block20 mr15" src="/static/user/dingdan.png" mode=""></image>
					{{ i18n.text[7] }}
				</view>
				<text class="cuIcon-right color-white-5"></text>
			</view>
			<view class="h55 flex align-center justify-between" @click="pushPage('/pages/shop/address/index')">
				<view class="flex-text">
					<image class="block20 mr15" src="/static/user/dizhi.png" mode=""></image>
					{{ i18n.text[8] }}
				</view>
				<text class="cuIcon-right color-white-5"></text>
			</view>
			<view class="h55 flex align-center justify-between" @click="ShowModal('Modal2')">
				<view class="flex-text">
					<image class="block20 mr15" src="/static/user/menu-7.png" mode=""></image>
					{{ i18n.text[6] }}
				</view>
				<text class="cuIcon-right color-white-5"></text>
			</view>
			<view class="h55 flex align-center justify-between" @click="signOut">
				<view class="flex-text">
					<image class="block20 mr15" src="/static/user/menu-6.png" mode=""></image>
					{{ i18n.text[5] }}
				</view>
				<text class="cuIcon-right color-white-5"></text>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog bg-background wp70 pb15">
				<view class="relative">
					<image class="wp100" src="/static/user/my-service.png" mode="widthFix" style="position: absolute;"></image>
					<view class="cuIcon-close color-black closeBtn f18" @click="HideModal"></view>
				</view>
				<view class="text-center f13 mt10">{{ i18n.modalTxt }}</view>
				<view class="text-center mt10">{{ wechat }}</view>
				<view class="wp50 flex-text h35 bg-theme color-black radius-5 auto mt15" @click="Copy">{{ i18n.modalBtn }}</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal2'?'show':''">
			<view class="cu-dialog bg-background wp70 pb15">
				<view class="cu-bar justify-end">
					<view class="content">{{ i18n.modalTitle }}</view>
					<view class="action" @tap="HideModal">
						<text class="cuIcon-close color-white-5 f18"></text>
					</view>
				</view>
				<view class="bg-background pb15">
					<view class="wp70 auto flex align-center justify-between h40" v-for="(item,index) in language" :key="index" @click="chooseL(index)">
						<view :class="index == active?'color-theme':''">{{ item.name }}</view>
						<text class="cuIcon-check f17 color-theme" v-if="index == active"></text>
					</view>
					<view class="wp60 flex-text h35 f15 radius-5 bg-theme color-black mt20 auto" @click="confirm">{{ i18n.confirm }}</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal3'?'show':''">
			<view class="cu-dialog bg-background pb15" style="width: 256px;height: 296px;">
					<image class="wp100" src="/static/user/me_service.png" mode="widthFix" style="position: absolute;width: 100%;height: 100%;"></image>
					<view class="cuIcon-close color-black closeBtn f18" @click="HideModal"></view>
				<view class="text-center f15" style="position: absolute;bottom: 100px;left:50%;transform: translateX(-50%);">{{ i18n.modalTxt }}</view>
				<view class="text-center f20 mt10" style="position: absolute;bottom: 65px;left:50%;transform: translateX(-50%);">{{ wechat }}</view>
				<view class="wp50 flex-text h35 bg-theme color-black radius-5 auto mt15" style="position: absolute;bottom: 15px;left:50%;transform: translateX(-50%)" @click="Copy">{{ i18n.modalBtn }}</view>
			</view>
		</view>
		
		
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog bg-background wp80">
				<view class="">
					<view class="f16 h80 flex-text">{{ i18n.tip }}</view>
					<view class="h45 solid-top border-width-2 border-white-3 flex-text f15">
						<view class="flex-1" @tap="HideModal">{{ i18n.cancel }}</view>
						<view class="w2 h25 bg-white-3"></view>
						<view class="flex-1 color-theme" @click="outConfirm">{{ i18n.confirm }}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script language="javascript" src="https://wapi.pop800.com/800.js?n=745538&s=01&p=l&l=cn"></script>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			wechat: '',
			active: ''
		}
	},
	computed: {
		list(){
			return [
				{ text: this.i18n.text[0], icon: '/static/user/menu-1.png', url: '/pages/user/team' },
				{ text: this.i18n.text[1], icon: '/static/user/menu-2.png', url: '/pages/user/share' },
				{ text: this.i18n.text[2], icon: '/static/user/menu-3.png' },
				{ text: this.i18n.text[3], icon: '/static/user/menu-4.png', url: '/pages/user/system' },
				{ text: this.i18n.text[4], icon: '/static/user/menu-5.png', url: '/pages/user/safety' }
			]
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
		}
	},
	onLoad() {
		
	},
	onShow() {
		let idx = this.language.findIndex(item => {
			return item.locale == this.$i18n.locale
		})
		this.active = idx
		this.getInfo()
		this.getUser()
	},
	methods: {
		// ...mapActions(['logout','delToken']),
		...mapActions(['logout']),
		pushUrl(item,index){
			if(index == 2){
				// plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=&version=1&src_type=web')
				// plus.runtime.openURL('http://47.52.205.185:8094/POP800.html')
				this.ShowModal('Modal3')
			}else if(index == 1){
				if(this.userInfo.activationStatus == 0){
					uni.showToast({
						title: this.i18n.tips,
						icon: 'none'
					})
					return
				}
				this.pushPage(item.url)
			}else{
				this.pushPage(item.url)
			}
		},
		Copy(){
			this.copy(this.wechat)
			this.HideModal()
		},
		signOut(){
			this.ShowModal('DialogModal')
		},
		outConfirm(){
			// this.delToken('token');
			this.logout()
			this.$Router.replaceAll('/pages/login/index')
		},
		confirm(){
			this.$i18n.locale = this.language[this.active].locale
			this.$t('tabbar').forEach((text, index) => {
				uni.setTabBarItem({ index: index, text: text })
			})
			this.HideModal()
		},
		chooseL(index){
			this.active = index
		},
		async getInfo(e){
			let { customerService } = await this.$http.post('user.service', {}, { tipConfig: { isErrorDefaultTip: false } })
			this.wechat = customerService
			if(e){
				this.ShowModal('Modal')
			}
		}
	}
}
</script>

<style lang="less">
.closeBtn{
	position: absolute;
	right: 20rpx;
	top: 20rpx;
}
.bg-white-3{
	background-color: rgba(255,255,255,.3);
}
</style>
