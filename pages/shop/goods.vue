<template>
	<view class="goods  clearfix">
		<image src="/static/app/backs.png" class="block25 newback" @click="backs"></image>
		<template >
			<image :src="goodPic" class="goodspic" mode="widthFix"></image>
			<view class="goods-info  px15 py15">
				<view class="goods-price flex flex-align-center" >
					<text class="color-danger f18">${{ price }}</text>
				</view>
				<view class="goods-name mt10 maxh-goods">
					<text class="f18 ">{{ goodsname }}</text>
				</view>
				<!--<view class="flex align-center justify-between color-info mt15 f12">
					<text>快递 : {{kuaidi}}</text>-->
					<!--<text>库存 : {{goods.store_count}}件</text>
					<text>销量 : {{ sellnum }} 件</text>
				</view>-->
			</view>
			<view class="cu-list menu no-border change-spec  mt2">
				<view class="cu-form-group cu-item arrow bg-transparent" @tap="showModal('skuModal')">
					<view class="title f14 fwb ">{{i18n.list[0]}}</view>
					<input class="f12 color-info" disabled :placeholder="i18n.list[1]" name="goods_attr" v-model="specName" />
				</view>
			</view>
			<view class="goods-detail  mt2">
				<view class="px10 py20 text--center">
					<view class="goods-detail-title"><text class=" goods-detail-title__text">{{i18n.list[2]}}</text></view>
				</view>
				<view class=" py10 wp100 px10 ovh">
					<uParse :content="xiangqing" noData=" " class="wp100 ovh" :imageProp="{ mode: 'widthFix', lazyLoad: true, domain: baseURL.URL }" />
				</view>
			</view>
		</template>
		<!-- tabbar -->
		<view class="cu-bar  tabbar  flex-pack-start shop fixed fixed-bottom px5" >
			<view class="action color-info flex flex-direction align-center" @click="pushHome">
				<view class=" discenter">
					<view class="cuIcon-home"></view>
				</view>
				<text>{{i18n.list[3]}}</text>
			</view>
			<template >
				<view class="btn-group color-white" >
					<view class="py10 submit buy mbuy" @tap="showModal('skuModal')">{{i18n.list[4]}}</view>
				</view>
			</template>
		</view>
		<!-- sku -->
		<view
			@touchmove.stop.prevent
			class="cu-modal border-width-1 bottom-modal sku-modal text--left"
			:class="modalName == 'skuModal' ? 'show' : ''"
			@tap="hideModal"
		>
			<view class="cu-dialog" @tap.stop>
				<view class="close cuIcon-close f20 color-info" @tap="hideModal"></view>
				<view class="product px15 py15 product--horizontal flex align-end justify-start">
					<view class=" ">
						<image lazy-load class="block100"  :src="goodPic"></image>
					</view>
					<view class="flex flex-direction align-end justify-between h100 ml10 box-sz">
						<view class="flex align-center justify-between mb10 wp100">
							<text class="color-danger f18 " >${{shiMoney}}</text>
							<text class="f12 color-black">{{i18n.list[5]}}：{{stock}}</text>
						</view>
						<view class="flex align-center justify-end cp">
							<text @click="movenum()" class="block-num-1 mr1 discenter cuIcon-move" :class="{nonums:num==1}"></text>
							<text class="block-num-2 discenter mr1">{{num}}</text>
							<text @click="addnum()" class="block-num-3 discenter cuIcon-add" :class="{nonums:num==99}"></text>
						</view>
						<!--<text class="color-info f12 mb5">库存{{specstock}}件</text>
						<text class="color-black f12">{{specname}}</text>-->
					</view>
					
				</view>
				<view class="px15" v-if="spec.length > 0">
					<view class="spec solid-bottom">
						<view class="py15"><text class="color-content">{{i18n.list[1]}}</text></view>
						<view class="mr-15 pb5 diswar">
							<button
								v-for="(item, index) in spec"
								:key="index"
								class="cu-btn px20 mh50  mr15 mb10"
								:class="[specActive == index ? 'bg-pinks color-danger' : 'bg-gainsboro color-content']"
								@tap="changeSpec(item, index)"
							>
								<text class="f12">{{ item.name }}</text>
							</button>
						</view>
					</view>
				</view>
				<!--
				<view class="flex align-center justify-between px15 mt20 mb20">
					<text>数量</text>
					<uni-number-box @change="changeNum"  v-model="num" theme="noBorder" :min="1" :max="9999"></uni-number-box>
				</view>-->
				<view class="cu-bar  tabbar solid-top shop px5">
					<view class="action color-info  flex flex-direction align-center" @click="pushHome">
						<view class=" discenter">
							<view class="cuIcon-home"></view>
						</view>
						<text>{{i18n.list[3]}}</text>
					</view>
					<!--非秒杀商品-->
					<view class="btn-group color-white">
						<view class="py10 submit buy mbuy" @click="buyNow">{{i18n.list[4]}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import swipers from '@/components/swipers.vue'
import uParse from '@/components/parse/parse.vue'
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
export default {
	components: {
		swipers,
		uParse,
		uniNumberBox,
	},
	data() {
		return {
			block: false,
			id: '',
			stock:0,
			goodPic:'',
			price:0,
			goodsname:'',
			xiangqing:'',
			sellnum:'',
			num:1,
			desc:'',
			
			spec:[],
			stock:'',
			specActive:0,
			specName:'',
		}
	},
	computed: {
		...mapState(['baseURL']),
		shiMoney(){
			return (this.price*this.num).toFixed(2)
		}
	},
	onLoad(e) {
		this.id=e.id
	},
	onShow() {
		this.getData()
	},
	onHide() {
		this.hideModal()
	},
	onBackPress() {
		this.hideModal()
	},
	methods: {
		...mapActions(['setStateEdit' ]),
		async getData() {
			let {
				data: { goodName,goodDesc,price,num,pic,goodPic,desc}
			} = await this.$http.post('shop.goods', {id:this.id}, { tipConfig: { storeBlock: true } })
			this.goodsname=goodName
			this.desc=goodDesc
			this.price=price
			this.stock=num
			this.goodPic=goodPic
			this.xiangqing=desc
		},
		showModal(e) {
			this.modalName = e
		},
		hideModal(e) {
			this.modalName = null
		},
		hideSelloutModal() {
			clearTimeout(this.selloutTimes)
			this.hideModal()
			uni.navigateBack({
				delta: 1
			})
		},

		/*changeSpec(item, index) {
			this.specActive = index
			this.specprice=this.spec[this.specActive].price*this.num
			this.specname=this.spec[this.specActive].name
			this.specstock=this.spec[this.specActive].stock
		},*/
		movenum(){
			if(this.num==1){
				return false
			}else{
				this.num=this.num-1
			}
		},
		addnum(){
			if(this.num==99){
				return false
			}else{
				this.num=this.num+1
			}
		},
		backs(){
			uni.navigateBack({
				delta:1
			})
		},
		pushHome() {
			uni.navigateTo({
				url:'/pages/shop/index'
			})
		},
		buyNow() {
			//if (!this.validator()) {
			//	return
			//}
			this.hideModal()
			/*if(this.num>this.specstock){
				uni.showToast({
					title:'库存不足',
					icon:'none'
				})
				return false
			}*/
			uni.navigateTo({
				url: '/pages/shop/confirm?id='+this.id+'&num='+this.num+'&price='+this.price//+'&guigeid='+this.spec[this.specActive].id
			})
		},
		
	}
}
</script>

<style lang="less">
	.newback{
		position: fixed;
		top: 60rpx;
		left: 32rpx;
		z-index: 150;
	}
	
	.w40{
		width:80rpx;
	}
	.h310{
		height: 620rpx;
	}
	.block-num-1{
		width: 60rpx;
		height: 60rpx;
		background-color:#cfccc9;
		color: #000000;
	}

	.block-num-2{
		width: 110rpx;
		height: 60rpx;
		background-color: #cfccc9;
		color: #000000;
	}
	.block-num-3{
		width:60rpx;
		height: 60rpx;
		background-color:#cfccc9;
		color: #000000;
	}
	.nonums{
		color: #999999;
		background-color: #dad4cb !important;
		color: #FFFFFF;
	}
	.mr1{
		margin-right: 2rpx !important;
	}
	.discenter{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.box-sz{
		width: calc(100% - 280rpx);
	}
	.maxh-goods{
		max-height: 84rpx;
		overflow: hidden;
	}
.goods {

	&-detail {
		&-title {
			display: inline-block;
			position: relative;
			&__text::after,
			&__text::before,
			&::after,
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				display: block;
				width: 12upx;
				height: 12upx;
				border-radius: 50%;
			}
			&::after,
			&::before {
				background: #ff9933;
			}
			&__text::after,
			&__text::before {
				background: #3399ff;
			}
			&__text::before {
				left: -30upx;
			}
			&::before {
				left: -55upx;
			}
			&__text::after {
				right: -30upx;
			}
			&::after {
				right: -55upx;
			}
		}
	}

	.tabbar {
		.action {
			width: 80upx;
		}
		.cart {
			background-color: #ff9933;
			border-radius: 38upx 0 0 38upx;
		}
		.buy {
			background-color: #ff4546;
			border-radius: 38upx 38upx 38upx 38upx;
		}
		.coupon {
			background-color: #ff4546;
			border-radius: 38upx;
		}
	}
	.sku-modal {
		.close {
			position: absolute;
			right: 20upx;
			top: 20upx;
			z-index: 2000;
		}
	}
	.sellout-modal {
		.img {
			width: 750upx;
		}
	}
	.mh50{
		min-height: 80rpx !important;
	}
}
.deszz{
	 display: flex !important;
	  align-items: center !important;
	  justify-content: center !important;
}
.block100{
	width: 200rpx;
	height: 200rpx;
}
.mcart{
	min-width:235rpx !important;
}
.block10{
	width: 24rpx;
	height: 24rpx;
}
.goodspic{
	width: 100%;
}
.mbuy{
	min-width:235rpx !important;	
}
</style>
