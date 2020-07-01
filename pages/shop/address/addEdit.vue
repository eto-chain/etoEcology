<template>
	<view class="add-edit clearfix">
		<cu-custom bgColor="bgjianbian color-white" isBack>
			<block slot="content">{{i18n.title}}</block>
		</cu-custom>
		<form class="block" @submit="formSubmit">
			<view class="mt5   color-white">
				<view class="cu-form-group bg-servies border-none solid-bottom ">
					<view class="title f15">{{i18n.list[0]}}</view>
					<input class="f14 color-white" :placeholder="i18n.nav[0]" name="username" v-model="username" />
				</view>
				<view class="cu-form-group bg-servies border-none solid-bottom mt1 ">
					<view class="title f15">{{i18n.list[1]}}</view>
					<input class="f14 color-white" type="number" :placeholder="i18n.nav[1]" name="mobile" v-model="mobile" />
				</view>
				<view class="cu-form-group bg-servies border-none mt1">{{i18n.list[4]}}</view>
				<view class="cu-form-group bg-servies border-none solid-bottom pb20"><textarea maxlength="220" :placeholder="i18n.nav[3]" class="lh16 color-white my0  h120" name="address" v-model="address" /></view>
				<view class="mt40 px15 flex flex-v">
					<button formType="submit" class="cu-btn  lg radius-5 bg-theme color-white">{{i18n.list[3]}}</button>
				</view>
			</view>
		</form>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			username: '',
			mobile: '',
			address: '',
		}
	},
	onLoad(e) {
		this.id = e.id
		this.getData()
	},
	methods: {
		
		async getData() {
			let { data:{phone,address,name} } = await this.$http.post('shop.editaddress',{addressId:this.id})
			this.address=address
			this.mobile=phone
			this.username=name
		},
		
		async formSubmit(e) {
			if(this.username==''){
				uni.showToast({
					title:this.i18n.nav[0],
					icon:'none'
				})
				return false
			}
			if(this.mobile==''){
				uni.showToast({
					title:this.i18n.nav[1],
					icon:'none'
				})
				return false
			}
			if(this.address==''){
				uni.showToast({
					title:this.i18n.nav[3],
					icon:'none'
				})
				return false
			}
			let parmas={
				address:this.address,
				name:this.username,
				mobile:this.mobile,
				addressId:this.id
			}
			let { data } = await this.$http.post('shop.editaddresssure', parmas, {
				tipConfig: { storeLoading: true, isSuccessDefaultTip: true, isSuccessBack: true, navigateBack: 1  }
			})
		}
	}
}
</script>

<style lang="less">
	.bg-servies{
		background-color: #1B1A4A !important;
	}
</style>
