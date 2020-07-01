<template>
	<view class="withdrawal clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<form class="block clearfix">
			<evan-form hide-required-asterisk ref="form" :model="form">
				<evan-form-item prop="address">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[0] }}</view>
						<input class="flex-1 f13" type="text" :placeholder="i18n.placeholder[0]" placeholder-class="color-placeholder" v-model.trim="form.address" />
					</view>
				</evan-form-item>
				<evan-form-item prop="num">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[1] }}</view>
						<input class="flex-1 f13" type="number" :placeholder="i18n.placeholder[1]" placeholder-class="color-placeholder" v-model.trim="form.num" />
					</view>
				</evan-form-item>
				<evan-form-item prop="password">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[2] }}</view>
						<input class="flex-1 f13" type="number" password maxlength="6" :placeholder="i18n.placeholder[2]" placeholder-class="color-placeholder" v-model.trim="form.password" />
					</view>
				</evan-form-item>
				<evan-form-item prop="code">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[3] }}</view>
						<input class="flex-1 f13" type="number" :placeholder="i18n.placeholder[3]" placeholder-class="color-placeholder" v-model.trim="form.code" />
						<view class="f12" @click="getCode">{{ codeText }}</view>
					</view>
				</evan-form-item>
			</evan-form>
			
			<button @click="formValidate" :disabled="flag" class="h45 f15 flex-text bg-theme color-black mx20 mt30">{{ i18n.btnTxt }}</button>
		</form>
	</view>
</template>

<script> 
import { mapState, mapActions } from 'vuex'
import verifyCode from '@/mixins/verifyCode'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
import evanForm from '../../components/evan-form/evan-form.vue';
import evanFormItem from '../../components/evan-form-item/evan-form-item.vue'
export default{
	mixins: [ verifyCode ],
	components: {
		'cu-custom':cuCusstom,
		'evan-form': evanForm,
		'evan-form-item': evanFormItem
	},
	data(){
		return{
			type: '',
			form: {
				address: '',
				num: '',
				password: '',
				code: ''
			},
			
			codeText: '',
			disabled: false,
			count: 60,
			flag: false
		}
	},
	computed: {
		rules(){
			return {
				address: [{ required: true, message: this.i18n.placeholder[0] }],
				num: [{ required: true, message: this.i18n.placeholder[1] }],
				password: [{ required: true, message: this.i18n.placeholder[2] }],
				code: [{ required: true, message: this.i18n.placeholder[3] }]
			}
		}
	},
	onLoad(e) {
		this.type = e.type
		this.codeText = this.i18n.getCode
	},
	methods: {
		...mapActions(['setToken']),
		async getCode() {
			if (this.disabled) return
			this.disabled = true
			clearInterval(this.time)
			this.time = setInterval(() => {
				this.count -= 1
				this.codeText = this.count + this.i18n.getCodeTime
				if (this.count === 0) {
					this.count = 60
					this.disabled = false
					this.codeText = this.i18n.getCode
					clearInterval(this.time)
				}
			}, 1000)
			try {
				await this.$http.post('login.getCode', { mobile: this.userInfo.mobile, num: 1 }, { isAuth: false, tipConfig: { isLoading: false } })
			} catch (e) {
				this.disabled = false
			}
		},
		async formSubmit(){
			this.flag = true;      //禁用
			let params = {
				type: this.type,
				address: this.form.address,
				paynum: this.form.password,
				code: this.form.code,
				num: this.form.num,
				mobile: this.userInfo.mobile
			}
			await this.$http.post('wallet.withdrawal', params, { tipConfig: { isSuccessDefaultTip: true } })
			.then(res=>{
				this.flag = false;  //启用
				this.setToken(res.token)
			})
			.catch(err=> this.flag = false)
			// setTimeout(()=>{
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// }, 800)
		}
	}
}
</script>

<style lang="less">
</style>
