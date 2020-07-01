<template>
	<view class="team clearfix lh1">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 mt10 radius-5 ovh">
			<view class="relative">
				<image class="wp100 h85" src="/static/user/team-bg.png" mode=""></image>
				<view class="poa-cover flex-text ovh">
					<view class="flex-1 flex-text flex-v">
						<image class="block20" v-if="userInfo.activationStatus == 1" :src="'/static/user/vip-' + grade + '.png'" mode=""></image>
						<view class="h20 f12 color-theme ovh flex-text mx5" v-if="userInfo.activationStatus == 0">{{ i18n.noGrade }}</view>
						<view class="mt5 f11">{{ i18n.text[0] }}</view>
					</view>
					<view class="flex-1 text-center ovh">
						<view class="h20 f16 ovh flex-text mx5">
							<view class="ellipsis">{{ yeji }}</view>
						</view>
						<view class="mt5 f11">{{ i18n.text[1] }}</view>
					</view>
					<view class="flex-1 text-center ovh">
						<view class="h20 f16 ovh flex-text mx5">
							<view class="ellipsis">{{ people }}</view>
						</view>
						<view class="mt5 f11">{{ i18n.text[2] }}</view>
					</view>
				</view>
			</view>
			
			<view class="bg-background px10 py5">
				<view class="flex-text h45 text-center f12">
					<view class="wp30">{{ i18n.listTxt[0] }}</view>
					<view class="flex-1">{{ i18n.listTxt[1] }}</view>
					<view class="wp30">{{ i18n.listTxt[2] }}</view>
				</view>
				<view class="flex-text h40 f12 text-center" v-for="(item,index) in list" :key="index">
					<view class="wp30 ellipsis">{{ item.id }}</view>
					<view class="flex-1 flex-text">
						<!-- v-if="item.jhStatus == 1" -->
						<image class="block20" :src="'/static/user/vip-' + item.grade + '.png'" mode="" ></image>
						<!-- <view class="f12" v-if="item.jhStatus == 0">{{ i18n.noGrade }}</view> -->
					</view>
					<view class="wp30 ellipsis">{{ item.tzNum }}</view>
				</view>
			</view>
		</view>
		
		<view class="cu-load f12 color-info" :class="loadingMore ? 'loading' : 'over'">{{ loadingMore ? i18n.loading : i18n.over }}</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
export default{
	data(){
		return{
			grade: '0',
			yeji: '0',
			people: '0',
			
			list: []
		}
	},
	onShow() {
		this.getUser()
		this.clearData()
		this.getData()
		this.grade = this.userInfo.grade
	},
	onReachBottom() {
		this.getData()
	},
	components: {
		'cu-custom':cuCusstom
	},
	methods: {
		async getData(){
			if (this.finish) return
			let { data: { userinfo, sList } } = await this.$http.post('user.team', { page: this.page })
			this.grade = userinfo.grade
			this.yeji = userinfo.yjTotal
			this.people = userinfo.pNum
			this.finish = sList.length < 30
			!this.finish && (this.page += 1)
			this.list = [...this.list, ...sList]
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
