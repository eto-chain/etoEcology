<template>
	<view class="home clearfix lh1">
		<view class="" :style="[{ height: StatusBar + 'px' }]"></view>

		<view class="mx15 mt10 radius-5 ovh">
			<!-- <image class="wp100 bannerH block" v-if="banner.length == 0" src="/static/home/bannmer.jpg" mode="aspectFill"></image> -->
			<swipers :slides="banner" srcName="src" :height="320"></swipers>
		</view>

		<view class="flex-text px15 h40">
			<image class="block20 block mr10" src="/static/home/notice.png" mode=""></image>
			<view class="flex-1 f13">
				<view class="" v-if="notice.length == 0">{{ i18n.noNotice }}</view>
				<swipers v-if="notice.length != 0" :slides="notice" srcName="title" :indicator-dots="false" :height="40" text
				 vertical　@click="pushNews"></swipers>
			</view>
		</view>

		<view class="mx15 relative h55">
			<!-- <image class="wp100 menuBg" src="/static/home/menu-bg.png" mode=""></image> -->
			<view class="poa-cover flex-text f13">
				<view class="flex-1 flex-text">
					<view class="flex-text flex-v flex-1 h50" @click="pushConduct">
						<image class="block25" src="/static/home/home-menu-1.png" mode=""></image>
						<view class="mt8">{{ i18n.menu[0] }}</view>
					</view>
					<view class="flex-text flex-v flex-1 h50" @click="pushPage('/pages/home/profit')">
						<image class="block25" src="/static/home/home-menu-2.png" mode=""></image>
						<view class="mt8">{{ i18n.menu[1] }}</view>
					</view>
					<view class="flex-text flex-v flex-1 h50" @click="pushPage('/pages/home/reborn')">
						<image class="block25" src="/static/home/home-menu-3.png" mode=""></image>
						<view class="mt8">{{ i18n.menu[2] }}</view>
					</view>
					<view class="flex-text flex-v flex-1 h50" @click="pushExchange">
						<image class="block25" src="/static/home/home-menu-4.png" mode=""></image>
						<view class="mt8">{{ i18n.menu[3] }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="mx15 radius-5 ovh mt15">
			<image class="wp100 h100" src="/static/home/banner.png" mode=""></image>
		</view>

		<view class="mx15 mt15 mb10 radius-5" v-if="list.length != 0">
			<!-- 行情 -->
			<view class="h40 flex align-center flex-text">
				<view class="flex-text">
					<view class="line"></view>
					<view class="circle"></view>
				</view>
				<view class="px20">{{ i18n.listTxt }}</view>
				<view class="flex-text">
					<view class="circle"></view>
					<view class="line"></view>
				</view>
			</view>
			<view class="">
				<view class="h1 lineBg"></view>
				<view class="flex-text h80 bg-background px15 mb10" v-for="(item,index) in list" :key="index">
					<view class="flex align-center flex-1">
						<view class="block30 bg-white mr10 round ovh">
							<image class="block30" :src="item.logo" mode=""></image>
						</view>
						<view class="f16">{{ item.symbol }}</view>
					</view>
					<view class="flex-1 text--right">
						<view class="f16">${{ item.priceUsd }}</view>
						<view class="f12 mt5">￥{{ item.cny }}</view>
					</view>
					<view class="flex-1 text--right f16" :class="item.percentChange24h >= 0?'color-success':'color-warning'">{{ item.percentChange24h >= 0?'+' + item.percentChange24h:item.percentChange24h }}%</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog bg-background">
				<view class="cu-bar justify-end">
					<view class="content">{{ i18n.modalTitle }}</view>
					<view class="action" @tap="HideModal">
						<text class="cuIcon-close color-white-5"></text>
					</view>
				</view>
				<view class="padding-xl text-left">
					<view class="flex align-center justify-between h40">
						ID
						<view class="">{{ i18n.modalTxt }}</view>
					</view>
					<view class="h50 flex align-center justify-between border-white-3 solid-top">
						{{ userInfo.name }}
						<view class="bg-theme radius-5 h30 flex-text w50 color-black" @click="jihuoId()">{{ i18n.modalBtn }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	import Swipers from '../../components/swipers/swipers.vue'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				banner: [],
				notice: [],
				list: [],
				jihuo: []
			}
		},
		onLoad() {
			this.getData()
			this.getList()
			// this.getJihuo()
		},
		onShow() {
			if (this.banner.length == 0) {
				this.getData()
			}
			this.getUser()
			if (this.userInfo.activationStatus == 0) {
				// uni.showToast({
				// 	title: this.i18n.tips,
				// 	icon: 'none'
				// })
				this.ShowModal('Modal')
			}
			this.dingshi()
		},
		onUnload() {
			clearInterval(this.timer)
		},
		onHide() {
			clearInterval(this.timer)
		},
		components: {
			'swipers': Swipers
		},
		methods: {
			pushConduct() {
				// uni.showToast({
				// 	title: this.i18n.noOpenYet,
				// 	icon: 'none',
				// 	mask: true
				// })
				this.pushPage('/pages/home/conduct')
			},
			pushExchange() {
				// uni.showToast({
				// 	title: this.i18n.noOpenYet,
				// 	icon: 'none',
				// 	mask: true
				// })
				this.pushPage('/pages/home/exchange')
			},
			async getData() {
				let {
					data: {
						limg,
						noticeList
					}
				} = await this.$http.post('home.index', {}, {
					tipConfig: {
						isErrorDefaultTip: false
					}
				})
				this.notice = noticeList
				this.banner = limg
			},
			dingshi() {
				this.timer = setInterval(() => {
					this.getList()
				}, 5000)
			},
			async getList() {
				let {
					data: {
						quotation
					}
					// } = await this.$http.post('home.index', {}, { tipConfig: { isErrorDefaultTip: false } })
				} = await this.$http.post('home.index')
				this.list = quotation

			},
			async getJihuo() {
				let {
					data
				} = await this.$http.post('home.indexTan')
				this.jihuo = data
				if (data.length != 0) {
					this.ShowModal('Modal')
				} else {
					this.HideModal()
				}
			},
			async jihuoId() {
				await this.$http.post('home.jihuoTan').then(res => {
					uni.showToast({
						title: this.i18n.tip,
						icon: 'none',
						mask: true
					})
				}).catch(err => console.log(err))

				this.HideModal()
				this.getUser()
				// this.getJihuo()
			},
			pushNews(e) {
				this.pushPage('/pages/user/article', {
					id: e.Id
				})
			}
		}
	}
</script>

<style lang="less">
	.menuBg {
		height: 210rpx;
	}

	.lineBg {
		background-color: rgba(255, 255, 255, .2);
	}

	.bannerH {
		height: 320rpx;
	}
</style>
