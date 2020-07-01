<template>
	<view class="safety clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 mt10 radius-5 flex align-center justify-between px10 h45 bg-background" @click="pushPage('/pages/user/changePw', { type: 0 })">
			<view class="">{{ i18n.menu[0] }}</view>
			<text class="cuIcon-right color-white-5"></text>
		</view>
		<view class="mx15 mt10 radius-5 flex align-center justify-between px10 h45 bg-background" @click="pushPage('/pages/user/changePw', { type: 1 })">
			<view class="">{{ i18n.menu[1] }}</view>
			<text class="cuIcon-right color-white-5"></text>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	components: { 'cu-custom': cuCusstom },
	data(){
		return{
			
		}
	}
}
</script>

<style lang="less">
</style>
