<template>
	<view class="exchange clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 mt15 flex-text">
			<view class="bg-background flex-1 f16 h50 flex-text">{{ active == 0?'USDT':'ANC' }}</view>
			<image class="block30 block mx30" src="/static/home/home-menu-4.png" mode=""></image>
			<view class="bg-background flex-1 f16 h50 flex-text">{{ active == 0?'ANC':'USDT' }}</view>
		</view>
		
		<view class="mx15 h35 flex align-center f12">{{ i18n.lv }}：1USDT = {{ lv }}ANC</view>
		
		<form class="block clearfix wp100">
			<evan-form hide-required-asterisk ref="form" :model="form">
				<evan-form-item prop="num">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background" slot="formItem">
						<view class="wp20">{{ i18n.text[0] }}</view>
						<input class="flex-1 f13" type="digit" :placeholder="active == 0?i18n.placeholder[0] + 'USDT':i18n.placeholder[0] + 'CEE'" placeholder-class="color-placeholder" v-model.trim="form.num" />
					</view>
				</evan-form-item>
				<evan-form-item>
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="wp20">{{ i18n.text[1] }}</view>
						<view class="willgetBox ellipsis mr10">{{ willGet }}</view>
						<view class="flex-1">{{ active == 0?'ANC':'USDT' }}</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="password">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="wp20">{{ i18n.text[2] }}</view>
						<input class="flex-1 f13" type="number" password maxlength="6" :placeholder="i18n.placeholder[1]" placeholder-class="color-placeholder" v-model.trim="form.password" />
					</view>
				</evan-form-item>
			</evan-form>
			
			<button @click="formValidate" class="h45 f15 flex-text bg-theme color-black mx20 mt30">{{ i18n.btnTxt }}</button>
		</form>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '@/components/cu-custom/cu-custom.vue'
import evanForm from '@/components/evan-form/evan-form.vue'
import evanFormItem from '@/components/evan-form-item/evan-form-item.vue'
export default{
	components: { 
		'cu-custom':cuCusstom,
		'evan-form':evanForm,
		'evan-form-item': evanFormItem
	},
	data(){
		return{
			active: 0,
			form: {
				num: '',
				password: ''
			},
			willGet: '0.0000',
			lv: '0'
		}
	},
	computed: {
		rules(){
			return {
				num: [{ required: true, message: this.i18n.placeholder[0] }],
				password: [{ required: true, message: this.i18n.placeholder[1] }],
			}
		}
	},
	watch: {
		'form.num': {
			handler(n,o){
				this.count()
			}
		}
	},
	onShow() {
		this.getData()
	},
	methods: {
		...mapActions(['setToken']),
		async getData(){
			let { num } = await this.$http.post('home.exchangeD')
			this.lv = num
		},
		// changeType(){
		// 	if(this.active == 0){
		// 		this.active = 1
		// 	}else{
		// 		this.active = 0
		// 	}
		// },
		async formSubmit(){
			let params = {
				num: this.form.num,
				type: this.active == 0 ? 1 : 2,
				paynum: this.form.password
			}
			await this.$http.post('home.exchange', params, { tipConfig: { isSuccessDefaultTip: true } })
			.then(res=> {
				this.setToken(res.token)
			})
			.catch(err=>console.log(err))
			this.form.num = this.form.password = ''
			this.willGet = '0.0000'
		},
		count(){
			let { accMul, accDiv } = this.$utils.num
			if(this.active == 0){
				this.willGet = accMul(this.form.num, this.lv).toFixed(4)
			}else{
				this.willGet = accDiv(this.form.num, this.lv).toFixed(4)
			}
		}
	}
}
</script>

<style lang="less">
.willgetBox{
	min-width: 35%;
}
</style>
