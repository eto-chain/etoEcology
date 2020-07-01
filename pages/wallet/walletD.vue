<template>
	<view class="walletD clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack> 
			<block slot="content">{{ name }}</block>
		</cu-custom>
		
		<view class="mx15 radius-5 ovh relative mt10">
			<image class="wp100 h120" src="/static/wallet/walletD-bg.png" mode=""></image>
			<view class="poa-cover flex-text">
				<view class="flex-1 mx15 ovh">
					<view class="f16">{{ name }}</view>
					
					<view class="flex align-end justify-between mt30 ovh">
						<view class="ovh flex-1 mr10">
							<view class="f12 color-white-5">{{ i18n.usable }}</view>
							<view class="f16 mt10 ellipsis">{{ balance }}</view>
						</view>
						<view class="flex-text">
							<!-- <view class="h28 w50 f12 mr10 radius-5 bg-theme color-black flex-text" v-if="type == 0 || type == 1" @click="pushPage('/pages/wallet/recharge', { type: types })">{{ i18n.btnTxt[0] }}</view>
							<view class="h28 w50 f12 mr10 radius-5 bg-theme color-black flex-text" v-if="type == 0 || type == 1" @click="pushPage('/pages/wallet/withdrawal', { type: types })">{{ i18n.btnTxt[1] }}</view>
							<view class="h28 w50 f12 radius-5 bg-theme color-black flex-text" v-if="type != 4" @click="pushPage('/pages/wallet/transfer', { type: types })">{{ i18n.btnTxt[2] }}</view> -->
							<view class="h28 w50 f12 mr10 radius-5 bg-theme color-black flex-text" v-if="type == 0 || type == 1" @click="pushNoOpen(0)">{{ i18n.btnTxt[0] }}</view>
							<view class="h28 w50 f12 mr10 radius-5 bg-theme color-black flex-text" v-if="type == 0 || type == 1" @click="pushNoOpen(1)">{{ i18n.btnTxt[1] }}</view>
							<view class="h28 w50 f12 radius-5 bg-theme color-black flex-text" v-if="type != 4&&name!= 'ANC授信'&&name!= '生态积分'" @click="pushNoOpen(2)">{{ i18n.btnTxt[2] }}</view>
							<view class="h28 w50 f12 mr10 radius-5 bg-theme color-black flex-text" v-if="type == 3" @click="pushNoOpen(3)">{{ i18n.btnTxt[3] }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="mx15 mt8 h30 flex align-center">{{ i18n.listTxt }}</view>
		
		<view class="mx15 radius-5 bg-background px10">
			<view class="h60 flex align-center justify-between border-white-3" :class="index != 0?'solid-top':''" v-for="(item,index) in list" :key="index">
				<view class="">
					<view class="f13">{{ item.type }}</view>
					<view class="f12 color-white-5 mt8">{{ item.time }}</view>
				</view>
				<view class="f16">{{ item.num }}</view>
			</view>
		</view>
		
		<view class="cu-load f12 color-info" :class="loadingMore ? 'loading' : 'over'">{{ loadingMore ? i18n.loading : i18n.over }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	data(){
		return{
			name: '',
			balance: '',
			type: '',
			types: '',
			
			list: []
		}
	},
	onLoad(e) {
		this.name = e.name
		this.balance = e.money
		this.type = e.type
		this.types = e.types
	},
	onShow() {
		this.clearData()
		this.getData()
	},
	onReachBottom() {
		this.getData()
	},
	components: {
		'cu-custom':cuCusstom
	},
	methods: {
		pushNoOpen(index){
			if(index==0){
				this.pushPage('/pages/wallet/recharge?type='+this.types+'')
			}else if(index==1){
				this.pushPage('/pages/wallet/withdrawal?type='+this.types+'')
			}else if(index==2){
				this.pushPage('/pages/wallet/transfer?type='+this.types+'')
			}else if(index==3){
				this.pushPage('/pages/wallet/exchange')
			}
			// uni.showToast({
			// 	title: this.i18n.noOpenYet,
			// 	icon: 'none',
			// 	mask: true
			// })
			// this.pushPage('/pages/wallet/recharge')
		},
		async getData(){
			if (this.finish) return
			let { data: { total, list } } = await this.$http.post('wallet.walletInfo', { page: this.page, type: this.types })
			this.balance = total
			this.finish = list.length < 10
			!this.finish && (this.page += 1)
			this.list = [...this.list, ...list]
		},
		clearData(){
			this.page = 1
			this.finish = false
			this.list = []
		}
	}
}
</script>

<style lang="less">
</style>
