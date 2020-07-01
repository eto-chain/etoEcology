<template>
	<view class="changePw clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<form class="block clearfix">
			<evan-form hide-required-asterisk ref="form" :model="form">
				<evan-form-item>
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[0] }}</view>
						<input class="flex-1 f13" type="number" maxlength="11" disabled :placeholder="i18n.placeholder[0]" placeholder-class="color-placeholder" v-model.trim="userInfo.mobile" />
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
						<view class="f12" @click="getCode">{{ codeText }}</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="newPassword">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[3] }}</view>
						<input class="flex-1 f13" type="text" password :maxlength="type == 0?'16':'6'" :placeholder="i18n.tip[type]" placeholder-class="color-placeholder" v-model.trim="form.newPassword" />
					</view>
				</evan-form-item>
				<evan-form-item prop="qPassword">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[4] }}</view>
						<input class="flex-1 f13" type="text" password :maxlength="type == 0?'16':'6'" :placeholder="i18n.placeholder[4]" placeholder-class="color-placeholder" v-model.trim="form.qPassword" />
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
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
import evanForm from '../../components/evan-form/evan-form.vue';
import evanFormItem from '../../components/evan-form-item/evan-form-item.vue';
export default{
	components: {
		'cu-custom':cuCusstom,
		'evan-form': evanForm,
		'evan-form-item': evanFormItem
	},
	data(){
		return{
			type: '',
			
			form: {
				account: '',
				code: '',
				newPassword: '',
				qPassword: ''
			},
			
			codeText: '',
			disabled: false,
			count: 60,
			
			accountList: [],
			showLoading: false,
			
			id: ''
		}
	},
	computed: {
		rules(){
			return {
				// telphone: [{ required: true, message: this.i18n.placeholder[0] }],
				account: [{ required: true, message: this.i18n.placeholder[1] }],
				code: [{ required: true, message: this.i18n.placeholder[2] }],
				newPassword: [{ required: true, message: this.i18n.placeholder[3] }, { pattern: this.type == 0?this.$pattern.isPassword:this.$pattern.isPayPassword, message: this.i18n.tip[this.type] }],
				qPassword: [{ required: true, message: this.i18n.placeholder[4] }, { pattern: this.type == 0?this.$pattern.isPassword:this.$pattern.isPayPassword, message: this.i18n.tip[this.type] }]
			}
		}
	},
	onLoad(e) {
		this.type = e.type
		this.codeText = this.i18n.getCode
	},
	methods: {
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
		async showModal(){
			this.ShowModal('bottomModal')
			this.showLoading = true
			let { list } = await this.$http.post('user.getAccount', { mobile: this.userInfo.mobile })
			this.showLoading = false
			this.accountList = list
		},
		async formSubmit(){
			let { accAdd } = this.$utils.num
			let params = {
				type: accAdd(this.type, 1),
				mobile: this.userInfo.mobile,
				id: this.id,
				code: this.form.code,
				newpwd: this.form.newPassword,
				newpwds: this.form.qPassword
			}
			await this.$http.post('user.changePw', params, { tipConfig: { isSuccessDefaultTip: true } })
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
