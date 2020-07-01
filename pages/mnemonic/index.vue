<template>
	<view class="mnemonic clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx40 mt40">
			<view class="f13 lh16">{{ i18n.text }}</view>
			<view class="h65 radius-5 mt15 bg-background flex align-center justify-between flex-wrap px10 color-theme">
				<view class="" v-for="(item,index) in list" :key="index">{{ item }}</view>
			</view>
			
			<view class="h45 f15 flex-text bg-theme color-black radius-5 mt30" @click="pushPage('/pages/mnemonic/second')">{{ i18n.btnTxt }}</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default{
	data(){
		return{
			list: ['time', 'will', 'tell', 'come', 'creat', 'appaer']
		}
	}
}
</script>

<style lang="less">
</style>
