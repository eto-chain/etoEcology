<template>
	<view class="exchange clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>

		<!-- <view class="mx15 mt15 flex-text">
			<view class="bg-background flex-1 f16 h50 flex-text">{{ active == 0?'USDT':'ANC' }}</view>
			<image class="block30 block mx30" src="/static/home/home-menu-4.png" mode=""></image>
			<view class="bg-background flex-1 f16 h50 flex-text">{{ active == 0?'ANC':'USDT' }}</view>
		</view> -->

		<!-- <view class="mx15 h35 flex align-center f12">{{ i18n.lv }}：1USDT = {{ lv }}ANC</view> -->

		<form class="block clearfix wp100">
			<evan-form hide-required-asterisk ref="form" :model="form">

				<evan-form-item prop="num">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background" slot="formItem">
						<view class="wp20">{{ i18n.text[0] }}</view>
						<input class="flex-1 f13" type="digit" :placeholder="active == 0?i18n.placeholder[0] + 'ANC':i18n.placeholder[0] + 'USDT'"
						 placeholder-class="color-placeholder" v-model.trim="form.num" />
					</view>
				</evan-form-item>
				<evan-form-item>
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem"> <!-- @click="showModal" -->
						<view class="wp20">{{ i18n.text[1] }}</view>
						<view class="willgetBox ellipsis mr10">{{ willGet }}</view>
						<view class="flex-1">{{ i18n.thing }}</view>
					</view>
				</evan-form-item>
				<evan-form-item prop="password">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background mt10" slot="formItem">
						<view class="wp20">{{ i18n.text[2] }}</view>
						<input class="flex-1 f13" type="number" password maxlength="6" :placeholder="i18n.placeholder[1]"
						 placeholder-class="color-placeholder" v-model.trim="form.password" />
					</view>
				</evan-form-item>
				<evan-form-item prop="type">
					<view class="h45 radius-5 mx15 px10 flex-text bg-background solid-bottom border-white-3 mt10" slot="formItem" @click="toggleDropdown">
						<view class="wp20">{{ i18n.text[3] }}</view>
						<input class="flex-1 f13" type="text" disabled :placeholder="i18n.placeholder[2]" placeholder-class="color-white-5" v-model.trim="form.uname" />
						<text class="f20 cuIcon-triangledownfill" :class="form.account?'':'color-white'"></text>
					</view>
				</evan-form-item>
				<!-- <view class="absolute z-index-101 mask"></view>
				<view class="absolute z-index-101 r50 bg-background w80 radius-5" :class="dropdown?'show':'hide'">
					<view @click="selectType(s,i)" class="f12 color-white dropdown-item h28 flex align-center pl15" v-for="(s, i) in integralType" :key="i">
					<image class="img" :src="(i!=active)?'../../static/wallet/choose.png':'../../static/wallet/choose1.png'"></image>
					<view class="lh28">{{ s.msg }}</view>
					</view>
				</view> -->
				<view class="cu-modal" :class="modalName=='Modal2'?'show':''">
					<view class="cu-dialog bg-background wp70 pb15">
						<view class="cu-bar justify-end">
							<view class="content">{{ i18n.modalTitle }}</view>
							<view class="action" @tap="HideModal">
								<text class="cuIcon-close color-white-5 f18"></text>
							</view>
						</view>
						<view class="bg-background pb15">
							<view class="wp80 auto flex align-center justify-between h40" v-for="(s,i) in integralType" :key="i" @click="selectType(s,i)">
								<view :class="i == active?'color-theme':''">{{ s.msg }}</view>
								<text class="cuIcon-check f17 color-theme" v-if="i == active"></text>
							</view>
							<view class="wp60 flex-text h35 f15 radius-5 bg-theme color-black mt20 auto" @click="confirm">{{ i18n.confirm }}</view>
						</view>
					</view>
				</view>
			</evan-form>

			<button @click="formValidate" class="h45 f15 flex-text bg-theme color-black mx20 mt30">{{ i18n.btnTxt }}</button>
		</form>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import cuCusstom from '@/components/cu-custom/cu-custom.vue'
	import evanForm from '@/components/evan-form/evan-form.vue'
	import evanFormItem from '@/components/evan-form-item/evan-form-item.vue'
	export default {
		components: {
			'cu-custom': cuCusstom,
			'evan-form': evanForm,
			'evan-form-item': evanFormItem
		},
		data() {
			return {
				active: null,
				form: {
					num: '',
					password: ''
				},
				willGet: '0.0000',
				dropdown: false,
				integralType: [],
				ancPrice: '',
				usdtPrice: '',
				pz: '',
				id: 0,
				content: ''
			}
		},
		computed: {
			rules() {
				return {
					num: [{
						required: true,
						message: this.i18n.placeholder[0]
					}],
					password: [{
						required: true,
						message: this.i18n.placeholder[1]
					}],
				}
			}
		},
		watch: {
			'form.num': {
				handler(n, o) {
					this.count()
				}
			}
		},
		onLoad(){
			this.getMsg()
		},
		onShow() {
			this.getMsg()
		},
		methods: {
			...mapActions(['setToken']),
			async getMsg(i) {
				let {
					integralType,
					ancPrice,
					usdtPrice,
					pz
				} = await this.$http.post('wallet.exchange', {})
				this.integralType= integralType;
				this.ancPrice = ancPrice;
				this.usdtPrice = usdtPrice;
				this.pz = pz;
			},
			selectType(s,i) {
				this.active = i;
				this.content = s.msg;
				this.id = s.id;
				
			},
			toggleDropdown() {
				this.ShowModal('Modal2')
			},
			confirm(){
				this.HideModal()
				 this.form.uname = this.content;
				 this.count()
				 
			},
			async formSubmit() {
				let params = {
					num: this.form.num,
					type: this.id,
					paynum: this.form.password,
				}
				await this.$http.post('wallet.caozuo', params, {
						tipConfig: {
							isSuccessDefaultTip: true
						}
					})
					.then(res => {
						this.setToken(res.token)
					})
					.catch(err => console.log(err))
				this.form.num = this.form.password = ''
				this.willGet = '0.0000'
			},
			count() {
				let { 
					accMul,
					accDiv
				} = this.$utils.num;
				if (this.id == 1) {
					this.willGet = accDiv(this.form.num, this.pz).toFixed(4)
				} else if (this.id == 2) {
					let ancCount = accMul(this.form.num,this.ancPrice)
					this.willGet = accDiv(ancCount,this.usdtPrice).toFixed(4)
				} else {
					let n = Number(this.form.num.toString().replace(".", "")).toFixed(4)
					this.willGet = n;
				}
			}
		}
	}
</script>

<style lang="less">
	.willgetBox {
		min-width: 35%;
	}
	.r50 {
		right: 50px;
	}
	// .mt-40 {
	// 	margin-top: -40px;
	// }

	// .b-80 {
	// 	bottom: -80px;
	// }
	
	.z-index-101 {
		z-index: 101;
	}
	
	.lh28 {
		line-height: 28px;
	}
	
	.img {
		width: 25px;
		height: 25px;
		margin-right: 20px;
	}
	
	.w80 {
		width: 80% !important;
	}
	

	.show {
		display: block;
	}

	.hide {
		display: none;
	}
</style>
