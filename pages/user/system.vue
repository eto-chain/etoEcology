<template>
	<view class="system clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 radius-5 mt10 bg-background px10 h65 flex align-center justify-between" v-for="(item,index) in list" :key="index" @click="pushPage('/pages/user/article', { id: item.id })">
			<view class="wp80">
				<view class="ellipsis">{{ item.title }}</view>
				<view class="f12 color-white-5 mt10">{{ item.time }}</view>
			</view>
			<text class="cuIcon-right color-white-5"></text>
		</view>
		
		<view class="cu-load f12 color-info" :class="loadingMore ? 'loading' : 'over'">{{ loadingMore ? i18n.loading : i18n.over }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	components: {
		'cu-custom':cuCusstom
	},
	data(){
		return{
			list: []
		}
	},
	onShow() {
		this.clearData()
		this.getData()
	},
	onReachBottom() {
		this.getData()
	},
	methods: {
		async getData(){
			if (this.finish) return
			let { data } = await this.$http.post('user.notice', { page: this.page })
			this.finish = data.length < 20
			!this.finish && (this.page += 1)
			this.list = [...this.list, ...data]
		},
		clearData(){
			this.page = 1
			this.finish = false
			this.list = []
		}
	}
}
</script>

<style lang="less">
</style>
