<template>
	<view class="appointR clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 radius-5 bg-background px15 py15 mt10 flex-text f12" v-for="(item,index) in list" :key="index">
			<view class="wp20 color-white-5">
				<view class="">{{ i18n.text[0] }}</view>
				<view class="mt8">{{ i18n.text[1] }}</view>
				<view class="mt8">{{ i18n.text[3] }}</view>
				<view class="mt8">{{ i18n.text[2] }}</view>
			</view>
			<view class="flex-1">
				<view class="">{{ item.num }}</view>
				<view class="mt8" :class="item.type == 0?'color-theme':item.type == 2?'color-white':'color-warning'">
					{{ i18n.listTxt[item.type] }}
				</view>
				<view class="mt8">{{ item.ls }}</view>
				<view class="mt8">{{ item.time }}</view>
			</view>
		</view>
		
		<view class="cu-load f12 color-info" :class="loadingMore ? 'loading' : 'over'">{{ loadingMore ? i18n.loading : i18n.over }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '@/components/cu-custom/cu-custom.vue'
export default{
	components: { 'cu-custom':cuCusstom },
	data(){
		return{
			//0排单中，1预约中，2已完成，3预约失败
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
			let { data } = await this.$http.post('home.licaiRe', { page: this.page })
			this.finish = data.length < 10
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
