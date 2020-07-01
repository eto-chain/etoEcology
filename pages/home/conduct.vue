<template>
	<view class="conduct clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
			<view class="mr15" slot="right" @click="pushPage('/pages/home/appointR')">{{ i18n.rightTxt }}</view>
		</cu-custom>
		
		<view class="mx15 radius-5 ovh relative">
			<image class="licaiBg wp100" src="/static/home/licai-bg.png" mode=""></image>
			<view class="poa-cover flex-text">
				<view class="flex-1 mt-20">
					<view class="text-center">{{ i18n.text }}</view>
					<view class="flex-text f18 mt30 ovh">
						<view class="flex-1 text-center ovh">
							<view class="ellipsis mx5">{{ usableUSDT }}</view>
							<view class="color-white-5 f12 mt10">{{ i18n.usable }}USDT</view>
						</view>
						<view class="flex-1 text-center ovh">
							<view class="ellipsis mx5">{{ usableCEE }}</view>
							<view class="color-white-5 f12 mt10">{{ i18n.usable }}ANC</view>
						</view>
						<!-- <view class="flex-1 text-center ovh">
							<view class="ellipsis mx5">{{ usableCE }}</view>
							<view class="color-white-5 f12 mt10">{{ i18n.usable }}CE</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		
		<view class="ml15 mr13 flex align-center mt15 flex-wrap">
			<view class="radius-5 h80 mr2 chooseBox mt2 flex-text flex-v" :class="index == Tabcur?'bg-theme':'bg-background'" v-for="(item,index) in list" :key="index" @click="choose(item,index)">
				<view :class="index == Tabcur?'color-black':'color-white-5'">{{ item.num?item.num + 'USDT':i18n.noOpen }}</view>
				<view class="mt10 lh14 f16" :class="index == Tabcur?'color-black':'color-white-5'">C{{ item.grade }}</view>
			</view>
		</view>
		
		<view class="mx15 bg-background mt10 radius-5 pb10">
			<view class="h70 flex-text">
				<view class="flex-text flex-v flex-1">
					<view class="">{{ i18n.text2[0] }}(USDT)</view>
					<view class="color-theme f16 mt15">{{ touUsdt }}</view>
				</view>
				<view class="flex-text flex-v flex-1">
					<view class="">{{ i18n.text2[0] }}(ANC)</view>
					<view class="color-theme f16 mt15">{{ touCee }}</view>
				</view>
				<!-- <view class="flex-text flex-v flex-1">
					<view class="">{{ i18n.text2[1] }}(CE)</view>
					<view class="color-theme f16 mt15">{{ haoCe }}</view>
				</view> -->
			</view>
			<view class="mx15 h45 radius-5 flex-text bg-white-1 f15">{{ i18n.text3 }}(USDT)：<text class="color-warning">{{ yuShow }}</text></view>
		</view>
		
		<view class="mx25 mt25 radius-5 flex-text color-black bg-theme h45 f15" @click="ShowModal('Modal')">{{ i18n.btnTxt }}</view>
	
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog bg-background">
				<view class="cu-bar justify-end">
					<view class="content">{{ i18n.modalTitle }}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close color-white-5"></text>
					</view>
				</view>
				<view class="px15 text-left py15">
					<view class="f16">C{{ grade }}：{{ num }}(USDT)</view>
					<view class="bg-white-1 mt10 radius-5 h40 flex-text px10">
						<input class="flex-1 f14" type="number" password maxlength="6" :placeholder="i18n.placeholder" placeholder-class="color-placeholder" v-model.trim="password" />
					</view>
					<view class="f14 mt20 flex-text justify-between">
						<view class="flex-text">
							<radio class="radio" value="1" :checked="bianhao==='1'" @click="radio('1')" />
							<label for="full">全额支付</label>
						</view>
						<view class="flex-text">
							<radio class="radio" value="2" :checked="bianhao==='2'" @click="radio('2')" />
							<label for="two">{{onelBi}}</label>
						</view>
					</view>
					<view class="mx30 h40 radius-5 bg-theme color-black flex-text f15 mt25 mb10" @click="confirm(bianhao)">{{ i18n.confirm }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '@/components/cu-custom/cu-custom.vue'
export default{
	components: {'cu-custom':cuCusstom },
	data(){
		return{
			usableUSDT: '0.0000',
			usableCEE: '0.0000',
			usableCE: '0.0000',
			
			list: [],
			Tabcur: 0,
			
			password: '',
			
			touUsdt: '0',
			touCee: '0',
			haoCe: '0',
			yuShow: '0',
			
			num: '',
			grade: '',
			bianhao: '1',
			onelBi: ''
		}
	},
	onShow() {
		this.getData()
	},
	methods: {
		...mapActions(['setToken']),
		async getData(){
			let { data: { usdtNum, ceNum, ceeNum, investmentType,onelBi } } = await this.$http.post('home.licai')
			this.usableUSDT = usdtNum
			this.usableCEE = ceeNum
			this.usableCE = ceNum
			this.list = investmentType
			this.onelBi = onelBi
			this.num = investmentType[this.Tabcur].num
			this.grade = investmentType[this.Tabcur].grade
			this.getTou()
		},
		async getTou(){
			let { data: { usdtNum, ceeNum, ceNum, profit } } = await this.$http.post('home.licaiTou', { transactions_num: this.num })
			this.touUsdt = usdtNum
			this.touCee = ceeNum
			this.haoCe = ceNum
			this.yuShow = profit
		},
		choose(item,index){
			if(!item.num){
				uni.showToast({
					title: this.i18n.noOpen,
					icon: 'none'
				})
				return
			}
			this.Tabcur = index
			this.num = item.num
			this.grade = item.grade
			this.getTou()
		},
		hideModal(){
			this.HideModal()
			setTimeout(()=>{
				this.password = ''
			},500)
		},
		async confirm(e){
			if(!this.password){
				uni.showToast({
					title: this.i18n.placeholder,
					icon: 'none'
				})
				return
			}
			await this.$http.post('home.licaiYue',{ transactions_num: this.num,grade: this.grade, paynum: this.password, type: e}, { tipConfig: { isSuccessDefaultTip: true } })
			.then(res=> {
				console.log(res)
				this.setToken(res.token)
			})
			.catch(err=> console.log(err))
			this.hideModal()
			this.getData()
		},
		radio(e){
			this.bianhao = e;
		}
	}
}
</script>

<style lang="less">
.licaiBg{
	height: 270rpx;
}
.mr2{
	margin-right: 4rpx;
}
.mr13{
	margin-right: 26rpx;
}
.chooseBox{
	width: calc(100% / 3 - 4rpx);
}
.bg-white-1{
	background-color: rgba(255,255,255,.1);
}
</style>
