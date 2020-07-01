<template>
	<view class="article clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx15 py15">
			<view class="mb15" v-if="isBlock">
				<view class="f16">{{ title }}</view>
				<view class="f12 color-white-5 mt8">{{ time }}</view>
			</view>
			<view class="f13">
				<uParse :content="content" :noData="i18n.loading" :imageProp="{ mode: 'widthFix', lazyLoad: true, domain: baseURL.URL }" />
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cuCusstom from '../../components/cu-custom/cu-custom.vue';
import uParse from '@/components/u-parse/u-parse.vue'
export default{
	components: { uParse,'cu-custom': cuCusstom },
	data(){
		return{
			title: '',
			time: '',
			content: ''
		}
	},
	onLoad(e) {
		this.getData(e.id)
	},
	methods: {
		async getData(e){
			let { info: { title, content, time } } = await this.$http.post('user.noticeA', { id: e }, { tipConfig: { storeBlock: true } })
			this.title = title
			this.content = content
			this.time = time
		}
	}
}
</script>

<style lang="less">
</style>
