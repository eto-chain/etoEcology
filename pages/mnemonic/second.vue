<template>
	<view class="second clearfix">
		<cu-custom bgColor="bg-navBg" isBack>
			<block slot="content">{{ i18n.title }}</block>
		</cu-custom>
		
		<view class="mx40 mt40">
			<view class="f13 lh16">{{ i18n.text }}</view>
			<view class="h65 radius-5 mt15 bg-background flex align-center px10 color-theme" v-if="words.length < 6">
				<view class="mr15" v-for="(item,index) in words" :key="index">{{ item }}</view>
			</view>
			<view class="h65 radius-5 mt15 bg-background flex align-center justify-between px10 color-theme" v-else>
				<view class="" v-for="(item,index) in words" :key="index">{{ item }}</view>
			</view>
			
			<view class="flex flex-align-center flex-wrap">
				<view class="eachBox h25 flex-text mt15 radius-5" :class="item.status?'choosed':'bg-theme color-black'" :style="{'margin-right':((index - 3) % 4 == 0?'0px':'30rpx')}" v-for="(item,index) in options" :key="index" @click="choose(item)">{{ item.word }}</view>
			</view>
			
			<view class="h45 f15 flex-text bg-theme color-black radius-5 mt30" @click="finished">{{ i18n.btnTxt }}</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default{
	data(){
		return{
			words: [],
			options: [
				{ word: 'time', status: false },
				{ word: 'will', status: false },
				{ word: 'tell', status: false },
				{ word: 'come', status: false },
				{ word: 'creat', status: false },
				{ word: 'appear', status: false }
			]
		}
	},
	methods: {
		choose(item){
			item.status = !item.status
			if (this.words.includes(item.word)) {
				let idx = this.words.indexOf(item.word);
				this.words.splice(idx, 1);
			} else {
				if (this.words.length < 6) {
					this.words.push(item.word);
				}
			}
		},
		async finished(){
			
		}
	}
}
</script>

<style lang="less">
.eachBox{
	width: calc((100% - 90rpx) / 4);
}

.choosed{
	background-color: rgba(255,255,255,.3);
}
</style>
