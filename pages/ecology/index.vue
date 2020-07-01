<template>
	<view class="ecology clearfix lh1 hv100 ">
		<view class="mx15 bg-servies flex align-center radius-5 flex-wrap pb30 mt40 box-shadow ">
			<view v-for="(item,index) in i18n.list" class="flex align-center flex-direction wp33 mt30 py15" :key="index" @click="toast(item,index)">
				<image :src="'/static/app/list'+index+'.png'" class="block32" mode=""></image>
				<text class="mt5">{{item}}</text>
			</view>
		</view>
	</view>
</template> 

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			
		}
	},
	onLoad() {

	},
	methods: {
		toast(item,index){
			if(index==2){
				this.$Router.pushTab('/pages/home/index')
			} else if(index==1){
				uni.navigateTo({
					url:'/pages/shop/index'
				})
			} else if(index==0){
				this.getUser();
				this.goto('../web', 'http://client.eto-chain.com/notice.html?address='+this.userInfo.id+'&symbol=ETO');
			}
		}
	}
}
</script>

<style lang="less">
.block32{
	width: 64rpx;
	height: 64rpx;
}
.wp33{
	width: 33.3%;
}
.h130{
	height: 260rpx;
}
.pb30{
	padding-bottom: 60rpx;
}
.bg-servies{
	background-color: #1B1A4A !important;
}
</style>
