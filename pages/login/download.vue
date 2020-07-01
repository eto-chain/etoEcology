<template>
	<view class="download clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="flex-text flex-v mt50">
			<image class="block85" src="/static/user/share-logo.png" mode=""></image>
			<view class="lh16 text-center mt40 wp70 f15">{{ i18n.text }}</view>
			
			<view class="h35 solid border-theme radius-5 flex-text px15 mt30" @click="download('Android')">
				<image class="block20 mr5" src="/static/download-android.png" mode=""></image>
				<view class="flex-1 text-center w100">{{ i18n.btnTxt[0] }}</view>
			</view>
			<view class="h35 solid border-theme radius-5 flex-text px15 mt15" @click="download('iOS')">
				<image class="block20 mr5" src="/static/download-iOS.png" mode=""></image>
				<view class="flex-1 text-center w100">{{ i18n.btnTxt[1] }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	data(){
		return{
			
		}
	},
	computed: {
		...mapState(['downloadURL'])
	},
	components: {
		'cu-custom':cuCusstom
	},
	methods: {
		download(p) {
			location.href = this.downloadURL[p];
		}
	}
}
</script>

<style lang="less">
</style>
