<template>
	<view class="recharge clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="text-center mt30">{{ i18n.text }}</view>
		<view class="flex-text mt10">
			<view class="px10 py10 bg-white">
				<tkiQrcod cid="qrcode" ref="qrcode" :val="qrcode" onval :icon="icon" :size="280" loadMake :showLoading="false"/>
			</view>
		</view>
		<view class="mx20 ellipsis mt10 text-center">{{ qrcode }}</view>
		<view class="h45 f15 bg-theme color-black flex-text radius-5 mt30 mx20" @click="copy(qrcode)">{{ i18n.btnTxt }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import tkiQrcod from '@/components/tki-qrcode/tki-qrcode.vue'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	components: { tkiQrcod,'cu-custom':cuCusstom },
	data(){
		return{
			icon: '/static/wallet/qrCode-img.png',
			qrcode: ''
		}
	},
	onLoad(e) {
		this.getData(e.type)
	},
	methods: {
		async getData(e){
			let { data } = await this.$http.post('wallet.recharge', { type: e })
			this.qrcode = data
		}
	}
}
</script>

<style lang="less">
</style>
