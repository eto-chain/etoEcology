<template>
	<scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
		<template v-if="!textFlex">
			<view
				class="wuc-tab-item"
				:class="[index === tabCur ? selectClass + ' cur' : '', tabItemClass]"
				v-for="(item, index) in tabList"
				:key="index"
				:id="index"
				@tap="tabSelect(index, $event)"
			>
				<text :class="item.icon"></text>
				<text>{{ item.name }}</text>
			</view>
		</template>

		<view class="flex text-center" v-else>
			<view
				class="wuc-tab-item flex-sub"
				:class="[index === tabCur ? selectClass + ' cur' : '', tabItemClass]"
				v-for="(item, index) in tabList" 
				:key="index"
				:id="index"
				@tap="tabSelect(index, $event)"
			>
				<text :class="item.icon"></text>
				<text>{{ item.name }}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'tabs',
	data() {
		return {}
	},
	computed: {
		scrollLeft() {
			return (this.tabCur - 1) * 60
		}
	},
	props: {
		tabList: {
			type: Array,
			default() {
				return []
			}
		},
		tabCur: {
			type: Number,
			default() {
				return 0
			}
		},
		tabClass: {
			type: String,
			default() {
				return ''
			}
		},
		tabStyle: {
			type: String,
			default() {
				return ''
			}
		},
		tabItemClass: {
			type: String,
			default() {
				return ''
			}
		},
		textFlex: {
			type: Boolean,
			default() {
				return false
			}
		},
		selectClass: {
			type: String,
			default() {
				return 'text-blue'
			}
		}
	},
	methods: {
		tabSelect(index, e) {
			if (this.tabCur === index) return false
			this.$emit('update:tabCur', index)
			this.$emit('change', index)
		}
	}
}
</script>

<style lang="less">
view,
scroll-view {
	box-sizing: border-box;
}
.wuc-tab {
	white-space: nowrap;
}
.wuc-tab-item {
	height: 90upx;
	display: inline-block;
	line-height: 90upx;
	margin: 0 10upx;
	padding: 0 20upx;
}

.wuc-tab-item.cur {
	border-bottom: 4upx solid;
}

.wuc-tab.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
	display: flex;
}
.text-center {
	text-align: center;
}
.flex-sub {
	flex: 1;
}
.text-blue {
	color: #0081ff;
}
.text-white {
	color: #ffffff;
}
.bg-white {
	background-color: #ffffff;
}
.bg-blue {
	background-color: #0081ff;
}
.text-orange {
	color: #f37b1d;
}

.text-xl {
	font-size: 36upx;
}
</style>
