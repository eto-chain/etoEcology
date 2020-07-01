<template>
	<view class="forget clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.forget }}</block>
		</cu-custom>
		
		<form class="block clearfix">
			<evan-form hide-required-asterisk ref="form" :model="form">
				<evan-form-item prop="mobile">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[0] }}</view>
						<input class="flex-1 f13" type="number" maxlength="11" :placeholder="i18n.placeholder[0]" placeholder-class="color-placeholder" v-model.trim="form.mobile" />
					</view>
				</evan-form-item>
				<evan-form-item prop="account">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem" @click="showModal">
						<view class="f13 wp20">{{ i18n.text[1] }}</view>
						<input class="flex-1 f13" type="text" disabled :placeholder="i18n.placeholder[1]" placeholder-class="color-placeholder" v-model.trim="form.account" />
						<text class="f20 cuIcon-triangledownfill"></text>
					</view>
				</evan-form-item>
				<evan-form-item prop="code">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[2] }}</view>
						<input class="flex-1 f13" type="number" :placeholder="i18n.placeholder[2]" placeholder-class="color-placeholder" v-model.trim="form.code" />
						<view class="f12" @click="getCode(1)">{{ codeText }}</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="newpwd">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[3] }}</view>
						<input class="flex-1 f13" type="text" password maxlength="16" :placeholder="i18n.tip[1]" placeholder-class="color-placeholder" v-model.trim="form.newpwd" />
					</view>
				</evan-form-item>
				<evan-form-item prop="newpwds">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[4] }}</view>
						<input class="flex-1 f13" type="text" password maxlength="16" :placeholder="i18n.placeholder[4]" placeholder-class="color-placeholder" v-model.trim="form.newpwds" />
					</view>
				</evan-form-item>
			</evan-form>
			
			<button @click="formValidate" class="h45 f15 flex-text bg-theme color-black mx20 mt30">{{ i18n.btnTxt }}</button>
		</form>
		
		<view class="cu-modal bottom-modal" @click="HideModal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog bg-transparent" @tap.stop>
				<view class="mx10">
					<view class="bg-background radius-5 px10">
						<view class="h45 flex-text f13" v-if="showLoading && accountList.length == 0"><button class="f13 h30 bg-transparent border-none mr-none pl0 pr5" loading></button>{{ i18n.loading }}</view>
						<view class="h45 flex-text border-white-3" :class="index != 0?'solid-top':''" v-for="(item,index) in accountList" :key="index" @click="chooseAccount(item)">{{ item.name }}({{ item.id }})</view>
					</view>
					<view class="h45 radius-5 bg-background flex-text mt5 mb10" @click="HideModal">{{ i18n.cancel }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import verifyCode from '@/mixins/verifyCode'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
import evanForm from '../../components/evan-form/evan-form.vue';
import evanFormItem from '../../components/evan-form-item/evan-form-item.vue';
export default{
	mixins: [ verifyCode ],
	data(){
		return{
			form: {
				mobile: '',
				account: '',
				code: '',
				newpwd: '',
				newpwds: ''
			},
			
			codeText: '',
			disabled: false,
			count: 60,
			
			accountList: [],
			showLoading: false,
			
			id: ''
		}
	},
	components: {
		'cu-custom':cuCusstom,
		'evan-form': evanForm,
		'evan-form-item': evanFormItem
	},
	computed: {
		rules(){
			return {
				mobile: [{ required: true, message: this.i18n.placeholder[0] }, { pattern: this.$pattern.isMobile, message: this.i18n.tip[0] }],
				account: [{ required: true, message: this.i18n.placeholder[1] }],
				code: [{ required: true, message: this.i18n.placeholder[2] }],
				newpwd: [{ required: true, message: this.i18n.placeholder[3] }, { pattern: this.$pattern.isPassword, message: this.i18n.tip[1] }],
				newpwds: [{ required: true, message: this.i18n.placeholder[4] }, { pattern: this.$pattern.isPassword, message: this.i18n.tip[1] }]
			}
		}
	},
	onLoad() {
		
	},
	methods: {
		async showModal(){
			if(!this.form.mobile){
				uni.showToast({
					title: this.i18n.placeholder[0],
					icon: 'none'
				})
				return
			}
			let str = /^1[3|4|5|6|7|8|9][0-9]{9}$/
			if(!str.test(this.form.mobile)){
				uni.showToast({
					title: this.i18n.tip[0],
					icon: 'none'
				})
				return
			}
			this.ShowModal('bottomModal')
			this.showLoading = true
			let { list } = await this.$http.post('login.getAccount', { mobile: this.form.mobile }, { isAuth: false })
			this.showLoading = false
			this.accountList = list
		},
		async formSubmit(){
			let params = {
				mobile: this.form.mobile,
				id: this.id,
				code: this.form.code,
				newpwd: this.form.newpwd,
				newpwds: this.form.newpwds
			}
			await this.$http.post('login.resetPassword', params, { isAuth: false, tipConfig: { isSuccessDefaultTip: true } })
			setTimeout(()=>{
				uni.navigateBack({
					delta: 1
				})
			}, 800)
		},
		chooseAccount(item){
			this.form.account = item.name
			this.id = item.id
			this.HideModal()
		}
	}
}
</script>

<style lang="less">
</style>
