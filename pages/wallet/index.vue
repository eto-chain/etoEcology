<template>
	<view class="wallet clearfix lh1">
		<view class="" :style="[{ height: StatusBar + 'px' }]"></view>
		
		<view class="mx15 mt10 radius-5 ovh relative">
			<image class="wp100 h125" src="/static/wallet/wallet-bg.png" mode=""></image>
			<view class="poa-cover flex-text">
				<view class="flex-1 mx15">
					<view class="color-white-5 f12">{{ i18n.text }}</view>
					<view class="f22 mt10 mb10">{{ balance }}</view>
					<view class="f12 mt5">≈${{ yue }}</view>
				</view>
			</view>
		</view>
		
		<view class="mx15 radius-5 mt10 px15 bg-background py5">
			<view class="h90 flex align-center justify-between border-white-7" :class="index != 0?'solid-top':''" v-for="(item,index) in list" :key="index" @click="pushUrl(item,index)">
				<view class="flex-text">
					<image class="block35 mr15" :src="'/static/wallet/wallet-icon-' + index + '.png'" mode=""></image>
					<view class="">{{ item.name }}</view>
				</view>
				<view class="f16">{{ item.balance }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			balance: '0',
			yue: '0',
			list: [
				{ id: 1, name: 'USDT', balance: '0.0000', type: 'USDT' },
				{ id: 2, name: 'ANC', balance: '0.0000', type: 'CEE' },
				{ id: 3, name: 'ANC授信', balance: '0.0000', type: 'SX' },
				// { id: 4, name: 'CE', balance: '0.0000', type: 'CE' },
				{ id: 4, name: '生态积分', balance: '0.0000', type: 'JF' }
			]
		}
	},
	onShow() {
		this.getData()
	},
	methods: {
		async getData(){
			let { data: { usdtNum, ceeNum, sxNum,stNum, total, totalMy } } = await this.$http.post('wallet.index', {}, { tipConfig: { isErrorDefaultTip: false } })
			this.balance = total
			this.yue = totalMy
			this.list[0].balance = usdtNum
			this.list[1].balance = ceeNum
			this.list[2].balance = sxNum
			this.list[3].balance = stNum
		},
		pushUrl(item,index){
			// console.log(item)  
			// if(index == 2){
			// 	uni.showToast({
			// 		title: this.i18n.tip, 
			// 		icon: 'none'
			// 	})
			// }else{
			// 	this.pushPage('/pages/wallet/walletD', { name: item.name, money: item.balance, type: index, types: item.type })
			// }
			this.pushPage('/pages/wallet/walletD', { name: item.name, money: item.balance, type: index, types: item.type })
		}
	}
}
</script>

<style lang="less">
</style>
