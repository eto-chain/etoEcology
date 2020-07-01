<template>
	<view class="home hv100  clearfix ">
		<cu-custom bgColor="bg-navBg">
			<block slot="right">
				<view class="ml10" @click="backs"><text class="cuIcon-back f17"></text></view>
			</block>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		<view class="radius-5 ovh mx15 mt10 por z-index-130"><swipers @click="pushgoods" :slides="banner" srcName="classpic" :height="320"></swipers></view>
		<view class="flex align-center flex-wrap mx15  bg-servies pb20 pt10 mt15 radius-5">
			<view v-for="(item,index) in dataList"  class="wp25 discenter mt10 flex flex-direction align-center" @click="pushPage('/pages/shop/shopclass?id='+item.id+'&&title='+item.name+'&&type='+0)" :key="index">
				<image :src="item.classpic"  class="block50 round" mode=""></image>
				<text class="mt3 color-white f12">{{item.name}}</text>
			</view>
		</view>
		
		<view class="flex align-end justify-between px15 mt10 color-black wp100" @click="pushPage('/pages/shop/shopclass?type='+1)">
			<view class="flex align-center">
				<view class="block5-16 mt2"></view>
				<view class="flex align-end ml10">
					<view class="f16 color-white">{{i18n.list[0]}}</view>
				</view>
			</view>
			<view class="flex align-center">
				<text class="mr5 f12 color-info">{{i18n.list[1]}}</text>
				<text class="cuIcon-right f12 color-info"></text>
			</view>
		</view>
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
			dataList:[],
			banner:[],
			goods:[],
		}
	},
	onShow() {
		this.getData()
		this.update && this.setUpdate(false)
	},
	onLoad() {
		
	},
	computed:{
		...mapState(['baseURL']),
	},
	methods: {
		...mapActions([]),
		async getData() {
			let {data:{lunbo,goodclass,goods}} = await this.$http.post('shop.index', {}, { tipConfig: { storeBlock: true } })
			this.banner=lunbo
			this.goods=goods
			this.dataList=goodclass
		},
		natogg(item){
			uni.navigateTo({
				url:'../user/article?id='+item.articleId
			})
		},
		pushgoods(item){
			uni.navigateTo({
				url:'../goods/index?id='+item.goodsId
			})
		},
		pushmore(item,index){
			uni.navigateTo({
				url:'more?id='+item.id+'&title='+item.name
			})
		},
		togoods(item,index){
			uni.navigateTo({
				url:'../goods/index?id='+item.id
			})
		},
		backs(){
			uni.switchTab({
				url:'/pages/ecology/index'
			})
		}
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
	.bg-servies{
		background-color: #1B1A4A !important;
	}
</style>
