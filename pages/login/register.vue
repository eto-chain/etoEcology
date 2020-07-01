<template>
	<view class="register clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.register }}</block>
		</cu-custom>
		
		<form class="block clearfix">
			<evan-form hide-required-asterisk ref="form" :model="form">
				<evan-form-item prop="mobile">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[0] }}</view>
						<input class="flex-1 f13" type="number" maxlength="11" :placeholder="i18n.placeholder[0]" placeholder-class="color-placeholder" v-model.trim="form.mobile" />
						<view class="change-language cu-tag border-none px0 bg-transparent flex-text">
							<view class="flex-text" @click="toggleDropdown">
								<view class="f16">+{{ form.areaCode }}</view>
								<view class="cuIcon-triangledownfill color-white f16"></view>
							</view>
							<view class="dropdown bg-white radius-5 mt20" :class="{ show: dropdown }">
								<view @click="selectQu(item, index)" class="dropdown-item h35 flex-text f13 color-black solid-bottom" v-for="(item, index) in quhaoList" :key="index"><view class="flex-1 mx15">{{ item.encoding }}({{ item.jc }})</view></view>
							</view>
						</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="username">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem" @click="ShowModal('bottomModal')">
						<view class="f13 wp20">{{ i18n.text[1] }}</view>
						<input class="flex-1 f13" type="text" maxlength="6" :placeholder="i18n.tip[3]" placeholder-class="color-placeholder" v-model.trim="form.username" />
					</view>
				</evan-form-item>
				<evan-form-item prop="code">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[2] }}</view>
						<input class="flex-1 f13" type="number" :placeholder="i18n.placeholder[2]" placeholder-class="color-placeholder" v-model.trim="form.code" />
						<view class="f12" @click="getCode(2)">{{ codeText }}</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="password">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[3] }}</view>
						<input class="flex-1 f13" type="text" password maxlength="16" :placeholder="i18n.tip[1]" placeholder-class="color-placeholder" v-model.trim="form.password" />
					</view>
				</evan-form-item>
				<evan-form-item prop="passwords">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[4] }}</view>
						<input class="flex-1 f13" type="text" password maxlength="16" :placeholder="i18n.placeholder[4]" placeholder-class="color-placeholder" v-model.trim="form.passwords" />
					</view>
				</evan-form-item>
				<evan-form-item prop="pay">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[5] }}</view>
						<input class="flex-1 f13" type="number" password maxlength="6" :placeholder="i18n.tip[2]" placeholder-class="color-placeholder" v-model.trim="form.pay" />
					</view>
				</evan-form-item>
				<evan-form-item prop="pays">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[6] }}</view>
						<input class="flex-1 f13" type="number" password maxlength="6" :placeholder="i18n.placeholder[6]" placeholder-class="color-placeholder" v-model.trim="form.pays" />
					</view>
				</evan-form-item>
				<evan-form-item prop="fpeople">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="f13 wp20">{{ i18n.text[7] }}</view>
						<input class="flex-1 f13" type="text" :disabled="isInput" :placeholder="i18n.placeholder[7]" placeholder-class="color-placeholder" v-model.trim="form.fpeople" />
					</view>
				</evan-form-item>
			</evan-form>
			
			<button @click="formValidate" class="h45 f15 flex-text bg-theme color-black mx20 mt30">{{ i18n.complete }}</button>
		</form>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import verifyCode from '@/mixins/verifyCode';
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
import evanForm from '../../components/evan-form/evan-form.vue';
import evanFormItem from '../../components/evan-form-item/evan-form-item.vue';
export default{
	mixins: [ verifyCode ],
	data(){
		return{
			form: {
				mobile: '',
				username: '',
				code: '',
				password: '',
				passwords: '',
				pay: '',
				pays: '',
				fpeople: '',
				areaCode: ''
			},
			
			dropdown: false,
			quhaoList: [],
			quActive: 0,
			
			isInput: false
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
				username: [{ required: true, message: this.i18n.placeholder[1] }],
				code: [{ required: true, message: this.i18n.placeholder[2] }],
				password: [{ required: true, message: this.i18n.placeholder[3] }, { pattern: this.$pattern.isPassword, message: this.i18n.tip[1] }],
				passwords: [{ required: true, message: this.i18n.placeholder[4] }, { pattern: this.$pattern.isPassword, message: this.i18n.tip[1] }],
				pay: [{ required: true, message: this.i18n.placeholder[5] }, { pattern: this.$pattern.isPayPassword, message: this.i18n.tip[2] }],
				pays: [{ required: true, message: this.i18n.placeholder[6] }, { pattern: this.$pattern.isPayPassword, message: this.i18n.tip[2] }],
				fpeople: [{ required: true, message: this.i18n.placeholder[7] }]
			}
		}
	},
	onLoad(e) {
		if(e.code){
			this.isInput = true
			this.form.fpeople = e.code
		}
		this.getMa()
		// #ifdef H5
		window.addEventListener('focusout', function() {
			setTimeout(function() {
				window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop)
			})
		})
		// #endif
	},
	methods: {
		async getMa(){
			let { info } = await this.$http.post('login.areaCode', {}, { isAuth: false, tipConfig: { isLoading: false } })
			this.quhaoList = info
			this.form.areaCode = this.quhaoList[this.quActive].encoding
		},
		toggleDropdown() {
			this.dropdown = !this.dropdown
		},
		selectQu(item,index) {
			this.form.areaCode = item.encoding
			this.quActive = index
			this.toggleDropdown()
		},
		async formSubmit(){
			await this.$http.post('login.register', this.form, { isAuth: false, tipConfig: { isSuccessDefaultTip: true } })
			// #ifdef APP-PLUS
			setTimeout(()=>{
				uni.navigateBack({
					delta: 1
				})
			}, 800)
			// #endif
			// #ifdef H5
			setTimeout(()=>{
				this.$Router.replaceAll('/pages/login/download')
			}, 500)
			// #endif
		}
	}
}
</script>

<style lang="less">
.leftText{
	min-width: 150rpx;
}
.change-language .dropdown, .select .dropdown{
	max-height: 350rpx !important;
	overflow-y: auto;
}
</style>
