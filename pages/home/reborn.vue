<template>
	<view class="reborn clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block> 
		</cu-custom>
		
		<view class="mx15 mt10 bg-background radius-5 px10 py30">
			<view class="f16 color-theme mb8">{{ i18n.text }}：</view>
			<view class="f13 lh16">{{ i18n.ruleTxt }}</view>
			
			<view class="f13 mt30 lh16">
				<view v-if="i18n.zh=='繁体'">
					<view class="flex-1">
						<text>1.</text>
						<text>{{ i18n.rule1[0] }}</text>
						<text class="color-theme">{{usdt}}</text>
						<text>{{ i18n.rule1[1] }}</text>
						<text class="color-theme">{{anc}}</text>
						<text>{{ i18n.rule1[2] }}</text>
						
					</view>
					<view>
						<text>{{i18n.rule1[3]}}</text>
						<text class="color-theme">{{ancsc}}</text>
						<text>{{i18n.rule1[4]}}</text>
					</view>
				</view>
				<view v-if="i18n.en=='English'" class="">
					<view class="flex-1">
						<text>1.</text>
						<text class="color-theme">{{this.usdt}}</text>
						<text>{{ i18n.rule1[0] }}</text>
						<text class="color-theme">{{this.anc}}</text>
						<text>{{ i18n.rule1[1] }}</text>
					</view>
					<view>
						<text>{{ i18n.rule1[2] }}</text>
						<text class="color-theme">{{this.ancsc}}</text>
						<text>{{ i18n.rule1[3] }}</text>
					</view>
				</view>
				<view class="mt10">2.
					{{ i18n.rule2[0] }}
				</view>
			</view>
			<!-- <uParse :content="content" :noData="i18n.loading" :imageProp="{ mode: 'widthFix', lazyLoad: true, domain: baseURL.URL }" /> -->
		</view>
		
		<view class="h45 px10 radius-5 bg-background mx15 mt10 flex align-center justify-between" @click="pushPage('/pages/home/rebornData')">
			<view class="">{{ i18n.menuTxt }}</view>
			<text class="cuIcon-right color-white-5"></text>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import uParse from '@/components/u-parse/u-parse.vue'
import cuCusstom from '@/components/cu-custom/cu-custom.vue'
export default{
	components: { uParse,'cu-custom':cuCusstom },
	data(){
		return{
			content: '',
			usdt: '0%',
			anc: '0%',
			ancsc: '0%'
		}
	},
	onShow() {
		this.getData()
	},
	methods: {
		async getData(){
			let { accSub } = this.$utils.num
			let { info: { usdt,anc,ancsc} } = await this.$http.post('home.reborn')
			this.usdt = usdt;
			this.anc = anc;
			this.ancsc = ancsc;
		}
	}
}
</script>

<style lang="less">
</style>
