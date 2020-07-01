<template>
	<view class="order hv100  clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-servies nav box-shadow-none   solid-top  ">
			<view class="flex text-center">
				<view
					class="cu-item flex-sub"
					:class="index == TabCur ? 'color-login-green cur' : ''"
					v-for="(item, index) in i18n.list"
					:key="index"
					@tap="tapTab(index)"
				>
					{{ item }}
				</view>
			</view>
		</scroll-view>
		<!-- order -->

		<view class="flex align-center flex-direction ">
			<view class="order-item mt5 bg-servies wp100" v-for="(item,index) in List" :key="index">
				<view class="flex mt5 align-center justify-between px15 py15 lh1">
					<view class="flex">
						<text class="color-white">{{i18n.dingdan[0]}}:</text>
						<text class="">{{ item.orderNo }}</text>
					</view>
					<text class="">{{ i18n.list[ item.status ]}}</text>
				</view>
				<view class="flex mt5 align-center justify-between px15 pb15 lh1">
					<text class="color-white">{{i18n.kuaidi}}:</text>
					<text class="">{{item.courierno}}</text>
				</view>
				<view class=" px15 py10   flex align-center ">
					<image :src="item.goodPic" class="sy-pics" mode=""></image>
					<view class="flex flex-direction ml20 h120 justify-between text-boxs">
						<view class="flex flex-direction">
							<view class="wp100 pr10 ellipsis2" >{{item.goodName}}</view>
							<view class="wp100 pr10 ellipsis3 color-info f12 mt5" >{{item.content}}</view>
						</view>
						
						<view class=" color-danger  flex align-center justify-between" >
							<text>${{item.oragin}}</text>
							<text class="color-white">x{{item.num}}</text>
						</view>
					</view>
				</view>
				<view class="order-price px15 py10 text--right">
					<text class="f14 mr15">{{i18n.dingdan[1]}}{{ item.num }}{{i18n.dingdan[2]}}</text>
					<text class="ml10 f14 mr5">{{i18n.dingdan[3]}}:</text>
					<text class="color-danger">${{ item.money }}</text>
				</view>
				
				<view class="order-handle px15 text--right clearfix" v-if="item.status =='2'">
					<button class="cu-btn csau-btn line-danger color-danger px30 mb10" @click="pushshouhuo(item)">{{i18n.dingdan[4]}}</button>
				</view>
				<view class="order-handle px15 text--right clearfix" v-if="item.status =='3'">
					<button class="cu-btn csau-btn line-danger color-danger px30 mb10" @click="pushdel(item)">{{i18n.dingdan[5]}}</button>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
	components: {},
	data() {
		return {
			TabCur: 0,
			finish: false,
			List: [],
		}
	},
	computed: {
		...mapState(['update', 'baseURL', 'isLoading', 'ordertabs'])
	},
	onHide() {
			this.buypay=false
	},
	onBackPress() {
			this.buypay=false
	},
	onLoad(e) {},
	onShow() {
		this.TabCur = this.ordertabs
		this.getData()
	},
	onReachBottom() {
		//this.getData()
	},
	methods: {
		...mapActions(['setUpdate', 'setOrder']),
		clearData() {
			this.List = []
			this.page = 1
			this.finish = false
		},
		async pushshouhuo(item) {
			//this.ordernum = item.id
			//this.ShowModal('onlineModals')
			let { data } = await this.$http.post('shop.shouhuo', {orderId:item.id}, {
				tipConfig: { storeLoading: true, isSuccessDefaultTip: true  }
			})
			this.clearData()
			this.getData()
		},
		async pushdel(item){
			let { data } = await this.$http.post('shop.deldingdan', {orderId:item.id}, {
				tipConfig: { storeLoading: true, isSuccessDefaultTip: true  }
			})
			this.clearData()
			this.getData()
		},
		async getData() {
			//if (this.finish) return
			let {
				data
			} = await this.$http.post('shop.order', { type: this.TabCur }, { tipConfig: { storeLoading: true } })
			this.List=data
			//this.finish = data.length < 20
			//!this.finish && (this.page += 1)
			//this.List = [...this.List, ...data]
		},
		tapTab(index) {
			if (this.TabCur === index) {
				return false
			}
			this.HideModal()
			this.clearData()
			this.TabCur = index
			this.setOrder(index)
			this.getData()
		},
		pushgoods(item) {
			uni.navigateTo({
				url: '../../app/goods?id=' + item.id
			})
		},
		
	}
}
</script>

<style lang="less">
.bt1 {
	border-top: 0.5px solid #e9e9e9 !important;
}
.bt1 {
	border-top: 0.5px solid #f2f2f2;
}
.sy-pics{
	width: 240rpx;
	height: 240rpx;
	}
.bg-servies{
	background-color: #1B1A4A !important;
}
.text-boxs{
	width: calc(100% - 280rpx);
}
</style>
