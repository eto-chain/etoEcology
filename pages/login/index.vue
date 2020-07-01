<template>
	<view class="login clearfix lh1 hv100 flex-text flex-v">
		<image class="wp100 hv100 fixed fixed-top" src="/static/login-bg.png" mode=""></image>
		<cu-custom bgColor="justify-end bg-transparent">
			<view slot="right" class="change-language mr15 cu-tag border-none bg-transparent">
				<view class="flex-text" @click="toggleDropdown">
					<view>{{ language[active].name }}</view>
					<text class="color-white ml5 cuIcon-unfold"></text>
				</view>
				<view class="dropdown bg-background radius-5" :class="{ show: dropdown }">
					<view @click="selectLanguge(s, i)" class="dropdown-item h40 flex-text solid-bottom" v-for="(s, i) in language" :key="i">{{ s.name }}</view>
				</view>
			</view>
		</cu-custom>
		<view class="relative z-index-101 flex-text flex-v wp80 mt-30">
			<image class="block85" src="/static/user/share-logo.png" mode=""></image>
			
			<form class="block clearfix wp100 mt40">
				<evan-form hide-required-asterisk ref="form" :model="form">
					<evan-form-item prop="mobile">
						<view class="h45 radius-5 mx15 px10 flex-text solid-bottom border-white-3 mt10" slot="formItem">
							<input class="flex-1 f13" type="number" maxlength="11" :placeholder="i18n.placeholder[0]" placeholder-class="color-placeholder" v-model.trim="form.mobile" />
						</view>
					</evan-form-item>
					<evan-form-item prop="uname">
						<view class="h45 radius-5 mx15 px10 flex-text solid-bottom border-white-3 mt10" slot="formItem" @click="showModal">
							<input class="flex-1 f13" type="text" disabled :placeholder="i18n.placeholder[1]" placeholder-class="color-placeholder" v-model.trim="form.uname" />
							<text class="f20 cuIcon-triangledownfill" :class="form.account?'':'color-white-5'"></text>
						</view>
					</evan-form-item>
					<evan-form-item prop="password">
						<view class="h45 radius-5 mx15 px10 flex-text solid-bottom border-white-3 mt10" slot="formItem">
							<input class="flex-1 f13" type="text" password maxlength="16" :placeholder="i18n.placeholder[2]" placeholder-class="color-placeholder" v-model.trim="form.password" />
						</view>
					</evan-form-item>
				</evan-form>
				
				<button @click="formValidate" class="h45 f15 flex-text bg-theme color-black mx20 mt30">{{ i18n.login }}</button>
			</form>
			
			<view class="f13 mt15" @click="pushPage('/pages/login/forget')">{{ i18n.forget }}?</view>
			<view class="f13 mt80">{{ i18n.text }}<text class="color-theme ml5" @click="pushPage('/pages/login/register')">{{ i18n.register }}</text></view>
		</view>
		
		<view class="cu-modal bottom-modal" @click="HideModal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog bg-transparent" @tap.stop>
				<view class="mx10">
					<view class="bg-background radius-5 px10">
						<view class="h45 flex-text f13" v-if="showLoading && accountList.length == 0"><button class="f13 h30 bg-transparent border-none mr-none pl0 pr5" loading></button>{{ i18n.loading }}</view>
						<view class="h45 flex-text f13" v-if="!showLoading && accountList.length == 0" @click="pushPage('/pages/login/register')">{{ i18n.tips }}</view>
						<view class="h45 flex-text border-white-3 f13" :class="index != 0?'solid-top':''" v-for="(item,index) in accountList" :key="index" @click="chooseAccount(item)">{{ item.name }}</view>
					</view>
					<view class="h45 radius-5 bg-background flex-text mt5 mb10" @click="HideModal">{{ i18n.cancel }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
import evanForm from '../../components/evan-form/evan-form.vue';
import evanFormItem from '../../components/evan-form-item/evan-form-item.vue';
export default{
	data(){
		return{
			dropdown: false,
			active: 1,
			
			form: {
				mobile: '',
				uname: '',
				password: ''
			},
			
			accountList: [],
			showLoading: false
		}
	},
	components: {
		'cu-custom':cuCusstom,
		'evan-form': evanForm,
		'evan-form-item': evanFormItem
	},
	computed: {
		...mapState(['users']),
		language() {
			let l = [];
			if (this.$i18n) {
				let messages = this.$i18n.messages;
				//messages  ----{{en:{....}},{zh:{...}}}
				Object.keys(messages).forEach(v => {
					// v----en    zh
					l.push({ name: messages[v].name, locale: v });
				});
			}
			//l---------[{name: 'English',locale: 'en'},{name: '繁体',locale: 'zh'}]
			return l;
		},
		rules(){
			return {
				mobile: [{ required: true, message: this.i18n.tip[0] }, { pattern: this.$pattern.isMobile, message: this.i18n.tip[3] }],
				uname: [{ required: true, message: this.i18n.tip[1] }],
				password: [{ required: true, message: this.i18n.tip[2] }],
			}
		}
	},
	mounted(){
		// const res = uni.getStorageInfoSync();
		// console.log(res.keys)
		// res.keys.map(item=>{
		// 	console.log(item)
		// 	if(item=='token'){
		// 		this.$Router.pushTab('/pages/home/index')
		// 	}
		// })
	},
	methods: {
		...mapActions(['setToken', 'setUsers']),
		toggleDropdown() {
			this.dropdown = !this.dropdown;
		},
		selectLanguge(s, i) {
			this.active = i;
			this.$i18n.locale = s.locale;//根据简繁切换设置i18n对象中的标识en/zh
			this.$t('tabbar').forEach((text, index) => {
				uni.setTabBarItem({ index: index, text: text });
			});
			this.toggleDropdown();
		},
		async showModal(){
			if(!this.form.mobile){
				uni.showToast({
					title: this.i18n.tip[0],
					icon: 'none'
				})
				return
			}
			let str = /^1[3|4|5|6|7|8|9][0-9]{9}$/
			if(!str.test(this.form.mobile)){
				uni.showToast({
					title: this.i18n.tip[3],
					icon: 'none'
				})
				return
			}
			this.ShowModal('bottomModal')
			this.showLoading = true
			let { data } = await this.$http.post('login.getUser', { mobile: this.form.mobile }, { isAuth: false })
			this.showLoading = false
			this.accountList = data;
		},
		async formSubmit(){
			let { token } = await this.$http.post('login.login', this.form, { isAuth: false })
			this.setToken(token)
			this.setUsers(this.accountList)
			this.getUser()
			this.$Router.pushTab('/pages/home/index')
		},
		chooseAccount(item){
			this.form.uname = item.name
			this.HideModal()
		},
		formValidate(){
			this.formSubmit()
		}
	}
}
</script>

<style lang="less">
.z-index-101{
	z-index: 101;
}
</style>
