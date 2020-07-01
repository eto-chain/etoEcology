<template>
	<view class="share clearfix flex-text flex-v hv100">
		<cu-custom bgColor="bg-transparent" :isBack="isShare">
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<image class="wp100 hv100 fixed fixed-top" src="/static/user/share-bg.png" mode=""></image>
		
		<view class="relative z-index-101 flex-text flex-v mt-50">
			<image class="block65" src="/static/user/touxiang@2x.png" mode=""></image>
			<view class="f22 mt30">{{ i18n.text }}</view>
			<view class="f12 mt30">{{ i18n.code }}</view>
			<view class="color-theme f24 h35 flex-text">{{ code }}</view>
			<view class="px10 py10 bg-white mt5">
				<tki-qrcode cid="qrcode" ref="qrcode" :val="qrcode" onval :icon="icon" :size="280" loadMake :showLoading="false" @result="result"/>
			</view>
			<view class="f12 mt5">{{ i18n.scanTxt }}</view>
			
			<view class="bg-theme color-black h35 radius-5 w80 flex-text f12 mt40" @click="saveIamge" data-provider="save" data-scene="">{{ i18n.btnTxt }}</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import tkiQrcod from '@/components/tki-qrcode/tki-qrcode.vue'
import share from '@/mixins/share'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	mixins: [ share ],
	data(){
		return{
			code: '',
			icon: '/static/wallet/qrCode-img.png',
			qrcode: '',
			
			isShare: true,
			qrImg: ''
		}
	},
	onLoad() {
		this.getData()
	},
	components: {
		'cu-custom':cuCusstom,
		'tki-qrcode': tkiQrcod
	},
	methods: {
		async getData(){
			let { data: { userinfo, src } } = await this.$http.post('user.share')
			this.code = userinfo.code
			this.qrcode = src
		},
		result(e){
			this.qrImg = e
		},
		saveIamge(e) {
			if(!this.qrImg){
				uni.showToast({
					title: this.i18n.tip,
					icon: 'none'
				})
			}else{
				this.isShare = false
				this.share(e)
			}
		}
	}
}
</script>

<style lang="less">
.z-index-101{
	z-index: 101;
}
.mt-50{
	margin-top: -100rpx;
}
</style>
