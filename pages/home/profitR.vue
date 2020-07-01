<template>
	<view class="profitR clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title[type] }}</block>
		</cu-custom>
		
		<view class="mx15 mt10 radius-5 bg-background px10">
			<view class="h70 flex align-center justify-between border-white-3" :class="index != 0?'solid-top':''" v-for="(item,index) in list" :key="index">
				<view class="">
					<view class="">{{ i18n.type[item.type] }}</view>
					<view class="color-white-5 f12 mt10">{{ item.time }}</view>
				</view>
				<view class="f16">+{{ item.num }}</view>
			</view>
		</view>
		
		<view class="cu-load f12 color-info" :class="loadingMore ? 'loading' : 'over'">{{ loadingMore ? i18n.loading : i18n.over }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '@/components/cu-custom/cu-custom.vue'
export default{
	data(){
		return{
			type: '',
			
			list: []
		}
	},
	components: { 'cu-custom':cuCusstom },
	onLoad(e) {
		this.type = e.type
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
			let { accAdd } = this.$utils.num
			let type = accAdd(this.type,1)
			let { data } = await this.$http.post('home.shouyiRe', { page: this.page, type: type })
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
