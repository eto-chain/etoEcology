<template>
	<view class="address hv100 clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		<view class="cu-list menu bg-servies mt5 "  v-for="(item, index) in addressList" :key="index">
			<view class="cu-item flex-v py20 bg-servies "  @click="selectAddress(item)">
				<view class="flex align-center justify-between wp100 ">
					<text class="f15  ellipsis">{{ item.name }}</text>
					<text class="f15">{{ item.phone }}</text>
				</view>
				<view class="wp100 mt20">
					<text class="color-info lh16">{{ item.address }}</text>
				</view>
			</view>
			<view class="px15 py10 f14 color-info  flex align-center justify-between">
				<view class="flex-text">
					<image src="/static/user/choice.png"   v-if="item.isTrue == 1" class="block20" mode=""></image>
					<image src="/static/user/nochoice.png" @click="tochoice(item,index)" v-else class="block20" mode=""></image>
					<text class="ml5 color-bluss" v-if="item.isTrue==1">{{i18n.list[0]}}</text>
					<text class="ml5" @click="tochoice(item,index)" v-else>{{i18n.list[0]}}</text>
				</view>
				<view class="handle flex">
					<view class="flex-text" @click="pushEditAddress(item)">
						<text class="cuIcon-edit f14"></text>
						<text class="ml5">{{i18n.list[1]}}</text>
					</view>
					<view class="flex-text ml15" @click="deleteAddress(item,index)">
						<text class="cuIcon-delete f14"></text>
						<text class="ml5">{{i18n.list[2]}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed fixed-bottom py20 px15 flex flex-v">
			<button class="cu-btn round lg bg-theme radius-5 color-white" @click="pushAddAddress">{{i18n.list[3]}}</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	components: {},
	data() {
		return {
			type: '',
			addressList: [],
			page: 1,
			finish: false,
			defaultAddress: '',
			id:'',
			delid:'',
			addrFlags:0,
		}
	},
	computed: {
		...mapState(['isLoading'])
	},
	onLoad(e) {
		this.type=e.type
	},
	onShow() {
		this.clearData()
		this.getData()
	},
	onReachBottom() {
		this.getData()
	},
	onHide() {
		this.HideModal()
	},
	onUnload() {
		this.HideModal()
	},
	methods: {
		...mapActions(['setAddress', 'setUpdate']),
		clearData() {
			this.addressList = []
		},
		
		async getData() {
			let { data } = await this.$http.post('shop.address')
			this.addressList = data
		},
		async tochoice(item,index){
			await this.$http.post('shop.moenaddress', { addressId: item.id }, { tipConfig: { isSuccessDefaultTip: true } })
			this.getData()
		},
		
		selectAddress(item) {
			if (this.type == 'select') {
				this.setUpdate(true)
				this.setAddress(item)
				uni.navigateBack({
					delta: 1
				})
			}
		},
		pushEditAddress(item) {
			uni.navigateTo({
				url:'addEdit?id='+item.id
			})
		},
		pushAddAddress() {
			uni.navigateTo({
				url:'addEditt'
			})

		},
		async deleteAddress(item) {
			if(item.isTrue==1){
				uni.showToast({
					title:this.i18n.list[4],
					icon:'none'
				})
				return false
			}
			await this.$http.post('shop.deladdress', { addressId: item.id }, { tipConfig: { isSuccessDefaultTip: true } })
			this.clearData()
			this.getData()
		}
	}
}
</script>

<style lang="less">
.color-radiogreen {
	color: #3cb64d !important;
}
.bt1{
	border-top: 0.5px solid #F2F2F2;
}
.br1{
	border-right: 0.5px solid #F2F2F2;
}
.w-50{
	width: 50%;
}
.block12{
	width: 24rpx;
	height: 24rpx;
}
.bg-servies{
	background-color: #1B1A4A !important;
}
.color-bluss{
	color:rgb(47,144,185) !important;
}
</style>
