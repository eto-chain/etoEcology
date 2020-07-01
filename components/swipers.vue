<template>
	<swiper
		:autoplay="autoplay"
		:circular="circular"
		:current="current"
		:current-item-id="currentItemId"
		:display-multiple-items="displayMultipleItems"
		:duration="duration"
		:indicator-active-color="indicatorActiveColor"
		:indicator-color="indicatorColor"
		:indicator-dots="indicatorDots"
		:interval="interval"
		:next-margin="nextMargin"
		:previous-margin="previousMargin"
		:skip-hidden-item-layout="skipHiddenItemLayout"
		:vertical="vertical"
		@animationfinish="_animationfinish"
		@change="_change"
		:style="{ height: selfHeight }"
		class="slider-wrap"
	>
		<swiper-item :key="i" @click="_handleClick(slide)" class="slider-item" v-for="(slide, i) of slides" v-if="!useSlot">
			<view class="hp100 flex flex-align-center" v-if="text">
				<text class="ellipsis lh12 text color-black">{{ slide[srcName] || slide }}</text>
			</view>
			<image :mode="mode" :src="baseUrl + (slide[srcName] || slide)" class="slider-img" :style="imgStyle" v-else></image>
		</swiper-item>
		<slot></slot>
	</swiper>
</template>

<script>
export default {
	data() {
		return {
			squareHeight: 750
		}
	},
	computed: {
		selfHeight() {
			if (this.screen) {
				return '100%'
			}
			let h = this.square ? this.squareHeight : this.height
			return h + 'rpx'
		}
	},
	props: {
		baseUrl: {
			type: String,
			default: ''
		},
		useSlot: {
			type: Boolean,
			default: false
		},
		text: {
			type: Boolean,
			default: false
		},
		srcName: {
			type: String,
			default: 'img'
		},
		imgStyle: {
			type: String,
			default: 'img'
		},
		mode: {
			type: String,
			default: 'aspectFill'
		},
		square: {
			type: Boolean,
			default: false
		},
		screen: {
			type: Boolean,
			default: false
		},
		height: {
			type: Number,
			default: 356
		},
		slides: {
			type: Array,
			default() {
				return []
			}
		},
		indicatorDots: {
			type: Boolean,
			default: true
		},
		indicatorColor: {
			type: String,
			default: '#c1b8e8'
		},
		indicatorActiveColor: {
			type: String,
			default: '#FFFFFF'
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		current: {
			type: Number,
			default: 0
		},
		currentItemId: {
			type: String,
			default: ''
		},
		interval: {
			type: Number,
			default: 5000
		},
		duration: {
			type: Number,
			default: 500
		},
		circular: {
			type: Boolean,
			default: true
		},
		vertical: {
			type: Boolean,
			default: false
		},
		previousMargin: {
			type: String,
			default: ''
		},
		nextMargin: {
			type: String,
			default: ''
		},
		displayMultipleItems: {
			type: Number,
			default: 1
		},
		skipHiddenItemLayout: {
			type: Boolean,
			default: false
		}
	},
	created() {},
	methods: {
		_change(e) {
			this.$emit('change', e)
		},
		_animationfinish(e) {
			this.$emit('animationfinish', e)
		},
		_handleClick(slide) {
			this.$emit('click', slide)
		}
	}
}
</script>

<style lang="less" scoped>
.slider-wrap {
	width: 100%;
	box-sizing: border-box;
	.slider-img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 15rpx;
	}
	.text {
		color: inherit;
	}
}
</style>
