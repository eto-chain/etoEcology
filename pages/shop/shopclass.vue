<template>
	<view class="home hv100  clearfix ">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ title }}</block>
		</cu-custom>
		<view class="wp100 px15 flex align-center justify-between flex-wrap mt5 mb10" >
			<view v-for="(item,index) in goods" @click="pushPage('/pages/shop/goods?id='+item.id)" class="sy-box mt10  bg-servies box-shadow radius-5" :key="index">
				<image :src="item.goodPic" class="sy-pics" mode="widthFix"></image>
				<view class="wp100 pr10 ellipsis2 mt10 pl10 h40s" >{{item.goodName}} {{item.goodDesc}}</view>
				<view class="mt10 color-danger pl10 mb15 flex align-center">
					<text>${{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			goods:[],
			title:''
		}
	},
	onLoad(e) {
		if(e.type==0){
			this.title=e.title
			this.id=e.id
			this.getData()
		}else{
			this.title=this.i18n.tuijian
			this.tuijian()
		}
		
	},
	computed:{
		...mapState(['baseURL']),
	},
	methods: {
		...mapActions([]),
		async getData() {
			let {data} = await this.$http.post('shop.fenlei', {id:this.id}, { tipConfig: { storeBlock: true } })
			this.goods=data
		},
		async tuijian() {
			let {data} = await this.$http.post('shop.tuijian', {}, { tipConfig: { storeBlock: true } })
			this.goods=data
		},
	}
}
</script>
<style lang="less">
	.bg-sy{
		width: 100%;
		height: 370rpx;
		
		position: absolute;
	}
	.wp25{
		width: 25%;
	}
	.block70-16{
		width: 140rpx;
		height: 32rpx;
	}
	.bg-servies{
		background-color: #1B1A4A !important;
	}
	.h111{
		height: 222rpx;
		width: calc(100% - 60rpx);
		margin-left: 30rpx;
	}
	.block5-16{
		width: 11rpx;
		height: 34rpx;
		background-color: #a8456b ;
	}
	.mt2{
		margin-top: 4rpx;
	}
	.h40s{
		height: 80rpx;
	}
	.sy-box{
		width: calc(50% - 10rpx);
	}
	.sy-pics{
		width: 100%;
		height: 200rpx;
	}
</style>
