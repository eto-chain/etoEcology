<template>
	<view class="profit clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 relative radius-5 ovh">
			<image class="wp100 h140" src="/static/home/profit-bg.png" mode=""></image>
			<view class="poa-cover flex-text">
				<view class="flex-1 flex-text h80 ovh" @click="pushPage('/pages/home/profitR', { type: 0 })">
					<view class="ovh mx15">
						<view class="f12">{{ i18n.menu[0] }}</view>
						<view class="mt10 ellipsis">≈<text class="f16">${{ jing }}</text>USDT</view>
					</view>
				</view>
				<view class="flex-1 flex-text h80 ovh" @click="pushPage('/pages/home/profitR', { type: 1 })">
					<view class="ovh mx15">
						<view class="f12">{{ i18n.menu[1] }}</view>
						<view class="mt10 ellipsis">≈<text class="f16">${{ dong }}</text>USDT</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="mx15 h40 flex align-center">{{ i18n.text }}</view>
		
		<view class="mx15 radius-5 bg-background px10">
			<view class="h100 flex-text border-white-3 border-width-1" :class="index != 0?'solid-top':''" v-for="(item,index) in list" :key="index">
				<view class="flex-1">
					<view class="f15">{{ item.lever }}：{{ item.num }}USDT</view>
					<view class="flex align-center mt8">
						<view class="color-white-5">{{ i18n.count }}：</view>
						<uni-countdown color="#01F0FF" splitor-color="#ffffff" :second="item.djs" />
					</view>
				</view>
				<view class="bg-theme color-black flex-text wp20 h35 radius-5" style="margin-right: 8px;" @click="futou(item,i18n.btnTxt)" v-if="item.InvestmentStatus == 1">{{ i18n.btnTxt }}</view>
				<view class="bg-theme color-black flex-text wp20 h35 radius-5" @click="payoff(item,i18n.btnTxt1)" v-if="item.ykType == 1">{{ i18n.btnTxt1 }}</view> 
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog bg-background wp80">
				<view class="">
					<view class="f16 h80 flex-text">确认{{ content }}</view>
					<view class="h45 solid-top border-width-2 border-white-3 flex-text f15">
						<view class="flex-1" @tap="HideModal">{{ i18n.cancel }}</view>
						<view class="w2 h25 bg-white-3"></view>
						<view class="flex-1 color-theme" @click="confirm">{{ i18n.confirm }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
// import uniSection from '@/components/uni-section/uni-section.vue'
import cuCusstom from '@/components/cu-custom/cu-custom.vue'
export default{
	components: { uniCountdown,'cu-custom':cuCusstom },
	data(){
		return{
			jing: '0.00',
			dong: '0.00',
			list: [],
			id: '',
			content: ''
		}
	},
	onShow() {
		this.getData()
	},
	methods: {
		...mapActions(['setToken']),
		async getData(){
			let { data: { jtSy, dtSy, data } } = await this.$http.post('home.shouyi') 
			this.jing = jtSy
			this.dong = dtSy
			this.list = data
		},
		futou(item,content){
			this.id = item.id
			this.content = content;
			this.ShowModal('DialogModal')
		},
		async confirm(){
			if(this.content=='復投'){
				await this.$http.post('home.futou', { id: this.id }, { tipConfig: { isSuccessDefaultTip: true } })
				.then(res=>{
					this.setToken(res.token)
				})
				.catch(err=> {
					console.log(err)
				})
			}
			if(this.content=='付餘款'){
				this.$http.post('home.payoff', { id: this.id }, { tipConfig: { isSuccessDefaultTip: true } })
				.then(res=>{
					console.log(res)
				})
				.catch(err=> console.log(err))
			}
			
			this.getData()
			this.HideModal()
		},
		payoff(item,content){
			this.id = item.id;
			this.content = content
			this.ShowModal('DialogModal')
		}
	}
}
</script>

<style lang="less">
.bg-white-3{
	background-color: rgba(255,255,255,.3);
}
</style>
