<template>
	<view class="wallet   hv100  clearfix ">
		<cu-custom bgColor="bg-navBg color-white" isBack>
			<block slot="content">{{i18n.title}}</block>
		</cu-custom>
		<view class="px15 bg-transparent mt10 py15 flex align-center justify-between bb1" >
			<image src="/static/user/address.png" mode="" class="block20"></image>
			<view class="flex wsaddress flex-direction align-start" @click="pushaddress" v-if="selAddress.id==''||selAddress.id==null">
				<text class="ellipsis2 f14 py5 color-white">{{i18n.list[0]}}</text>
			</view>
			<view class="flex wsaddress flex-direction align-start" v-else @click="pushaddress">
				<view class="flex  py5 align-center wp100 justify-between color-white">
					<text class="f14">{{selAddress.name}}</text>
					<text class="f14">{{selAddress.phone}}</text>
				</view>
				<text class="ellipsis2 f14 py5">{{selAddress.address}}</text>
			</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="mt5  bg-transparent flex flex-direction ">
			<view  class="flex flex-direction py10" >
				<view class="flex align-center justify-start px15 bb1 pb20">
					<view class="block70 border-info radius-5 discenter">
						<image :src="goodsInfo.pic" class="block70"></image>
					</view>
					<view class="flex flex-direction align-start justify-between ml15 h70 mworde">
						<text class="ellipsis2 wp100">{{goodsInfo.title}}</text>
						<view class="flex align-center  justify-between wp100">
							<text class="color-danger">${{goodsInfo.price}}</text>
							<text class="color-info">X{{goodsInfo.num}}</text>
						</view>
					</view>
				</view>
				<view class="flex align-center justify-between mt20 bb1 pb20 px15">
					<text>{{i18n.list[1]}}</text>
					<view class="flex align-end">
						<text class="color-info">${{goodsInfo.price}}</text>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between mt20 bb1 pb20 px15">
				<text>{{i18n.list[2]}}</text>
				<view class="flex align-center">
					<text class="color-danger" >${{goodsInfo.countMoney}}</text>
				</view>
			</view>
			<view class="flex flex-direction mt15 px15">
				<text>{{i18n.list[3]}}</text>
				<textarea v-model="liuyan" maxlength="400" class=" f14 bg-servies mt15 px5 radius-5 lh16 py10 color-white h200 wp100" placeholder-class="color-info" :placeholder="i18n.list[5]"></textarea>
			</view>
		</view>
		<view :class="['contents', show ? '' : 'contenthide']"  v-if="show">
				<view class="title" @click="close()">
					<view class="close"></view>
					<view class="center pt40 f16">{{i18n.nav[0]}}</view>
					<view class="close" ><image src="/static/yzc-paykeyboard/close.png" /></view>
				</view>
				
				<view :class="['code', show ? '' : 'visible']" class="mt20">
					<view class="code-box">
						<block v-for="(item, index) in 6" :key="index">
							<view class="code-box-item">{{ (password[index] && '●') || '' }}</view>
						</block>
					</view>
					<input class="input-pays" type="number" v-model="password" />
				</view>		
				<view class="mx15 bg-EBEBEB color-black radius-30 h40 flex align-center justify-center wp100" v-if="password.length!=6">{{i18n.nav[1]}}</view>
				<view class="mx15 bg-theme color-white radius-30 h40 flex align-center justify-center wp100" v-else @click="topays()">{{i18n.nav[1]}}</view>
			</view>
			<!-- 键盘 -->
			<view :class="['keyboard', show ? '' : 'active', isIphoneX ? 'isIphone' : '']"  v-if="show">
				<block v-for="(item, index) in 9" :key="index">
					<view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
				</block>
				<view class="keyboard-item hide"></view>
				<view class="keyboard-item" @tap="key(0)"><text>0</text></view>
				<view class="keyboard-item delte" @tap="del()"><image class="img" src="/static/yzc-paykeyboard/del.png" mode="aspectFill" :lazy-load="true"></image></view>
			</view>
		<view class="mengceng" v-if="show" @click="close"></view>
		<view class="flex align-center wp100 justify-between px15  h50 dibuorder bg-servies">
			<view class="flex align-end ">
				<text class="color-white">{{i18n.list[2]}}</text>
				<text class="color-danger ml5" >{{goodsInfo.countMoney}}</text>
			</view>
			<view @click="payOrder" class="discenter bg-theme color-white w100 h35 radius-30" v-if="!dibuorders">{{i18n.list[4]}}</view>
			<view class="discenter bg-info color-black w100 h35 radius-30" v-else>{{i18n.list[4]}}</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			address:{},
			goodsInfo:{title:'',price:0,num:'',pic:'',countMoney:'29.99',desc:''},
			id:'',
			liuyan:'',
			show:false,
			password:'',
			payPassword:'',
			isIphoneX:false,
			dibuorders:false,
			
		}
	},
	onLoad(e) {
		this.goodsid=e.id;
		this.num=e.num;
		console.log(this.selAddress)
		this.getData()
	},
	computed:{
		...mapState(['baseURL','selAddress']),
		
	},
	onHide() {
		this.show=false
	},
	onBackPress() {
		this.show=false
	},
	methods: {
		...mapActions([ 'setOrder','setAddress',]),
		async getData() {
			let { data:{address,goodName,goodDesc,price,num,img}} = await this.$http.post('shop.confirm',{id:this.goodsid,num:this.num})
			this.setAddress(address)
			this.goodsInfo.tile=goodName
			this.goodsInfo.desc=goodDesc
			this.goodsInfo.price=price
			this.goodsInfo.num=num
			this.goodsInfo.pic=img
			this.goodsInfo.countMoney=(num*price).toFixed(2)
		},
		pushaddress(){
			uni.navigateTo({
				url:'/pages/shop/address/index?type='+'select'
			})
		},
		
		key(key) {
			if (this.password.length < 6) {
				this.password += key;
				if (this.password.length == 6) {
					this.payPassword=this.password
				}
			}
		},
		clear() {
			this.password = '';
		},
		close() {
			this.password = '';
			this.trantision = false;
			this.show=false
			
		},
		del() {
			if (this.password.length > 0) {
				this.password = this.password.substring(0, this.password.length - 1);
			}
		},
		payOrder(){
			if(this.selAddress.id==''||this.selAddress.id==null){
				uni.showToast({
					title:this.i18n.nav[2],
					icon:'none'
				})
				return false
			}
			this.show=true
		},
		async topays() {
			this.disabled = true
			let parms ={
				addressId:this.selAddress.id,
				goodId:this.goodsid,
				num:this.num,
				content:this.liuyan,
				paypassword:this.payPassword,
			}
			let { data } = await this.$http.post('shop.goodspay', parms,{ tipConfig: { isSuccessDefaultTip: true } })
			// await this.$http.post('wallet.index', {}, { tipConfig: { isErrorDefaultTip: false } })
			setTimeout(() => {
				this.setOrder(1)
				uni.navigateTo({
					url:'/pages/shop/order'
				})
				// this.$Router.pushTab('/pages/wallet/index')
			}, 1500);
		},
	}
}
</script>

<style>
.wsaddress{
	width: calc(100% - 128rpx);
	margin-left: 20rpx;
}
.mworde{
	width: calc(100% - 170rpx);
}
.dibuorder{
	position: fixed;
	z-index: 199;
	bottom: 0;
}
.w100{
	width: 200rpx;
}
.bg-servies{
	background-color: #1B1A4A !important;
}
.bb1{
	border-bottom: 0.5px solid #1B1A4A !important;
}
	.mengceng {
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			background-color: #000000;
			opacity: 0.5;
			z-index: 800;
	}
	.box-inputs{
		height: 90rpx;
		border: 2px solid #F4F4F4 !important;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 5px;
	}
	.bg-EBEBEB{
		background-color: #EBEBEB;
	}
	.h200{
		height: 400rpx;
	}
	.input-class{
		padding: 0 !important;
		border: none;
		width: calc(100% - 140rpx);
	}
	.discenter{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.input-pays {
		display: none;
	}
	.bg-servies{
		background-color: #1B1A4A !important;
	}
	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		transition: all 0.3s ease;
		background: rgba(102, 102, 102, 0.3);
		opacity: 1;
		z-index: 2;
		visibility: visible;
	}
	.contents {
		width: 588rpx;
		height:440rpx;
		border-radius: 15rpx;
		position: fixed;
		left: 50%;
		bottom: 480rpx;
		margin-left: -294rpx;
		margin-top: -285rpx;
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		z-index: 801;
		opacity: 1;
		visibility: visible;
		transition: all 0.3s ease;
	}
	.contenthide {
		margin-left: -350rpx;
		margin-top: -340rpx;
		width: 700rpx;
		height: 680rpx;
		opacity: 0;
		z-index: 0;
		visibility: hidden;
	}
	.visible {
		opacity: 0;
		z-index: 2;
		visibility: hidden;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		width: 560rpx;
		font-size: 32rpx;
	}
	.center {
		color: #333;
		font-size: 32rpx;
	}
	.close {
		width: 50rpx;
		height: 50rpx;	
	}
	image {
		width: 100%;
		height: 100%;
	}
	.pay-money {
		width: 525rpx;
		height: 240rpx;
		border-bottom: 1rpx solid #EBEBEB;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.bg-infos{
		background-color: #999 !important;
	}
	.pay-money view {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-way {
		width: 520rpx;
		height: 85rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #8A8A8A;
		font-size: 28rpx;
	}
	.money {
		font-size: 45rpx;
		font-weight: 600;
		margin-bottom: 50rpx;
	}
	.money text {
		font-size: 60rpx;
		margin-left: 10rpx;
	}
	.pay-img {
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pay-img image {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}
	.code {
		width: 100%;
		height: 120rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.code-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #d0d0d0;
	}
	.code-box-item {
		width: 86rpx;
		height: 86rpx;
		background: #fff;
		font-size: 40rpx;
		line-height: 75rpx;
		text-align: center;
		color: #000000;
	}
	.code-box-item:not(:last-child) {
		border-right: 1px solid #d0d0d0;
	}
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #EBEBEB;
		display: flex;
		justify-content: center;
		z-index:801;
		flex-wrap: wrap;
		transition:all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #EBEBEB;
		border-top:none;
		border-left:none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
</style>
