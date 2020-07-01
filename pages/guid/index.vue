<template>
	<view class="guid clearfix lh1 ovh hv100">
		<image class="start-img block wp100 hv100" src="/static/WAIT.gif" mode="aspectFill"></image>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default{
	data(){
		return{
			
		}
	},
	onLoad() {
		setTimeout(() => {
			this.pushHome()
		},4000)
	},
	methods: {
		pushHome() {
			if (this.token) {
				uni.switchTab({ url: '/pages/home/index' })
			} else {
				uni.reLaunch({ url: '/pages/login/index' })
			}
		}
	}
}
</script>

<style lang="less">
.start {
	&-img {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
}
</style>
