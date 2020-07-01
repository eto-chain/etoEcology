<template name="web">
	<view class="web">
		<cu-custom v-if="title != ''" bgColor="zyl-bg-status" :isBack="true">
			<block slot="backText">{{ title }}</block>
		</cu-custom>
		
		<view>
			<web-view :webview-styles="webviewStyles" :src="url" @message="handleMessage"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: false
				},
				title: "",
				url: "",
			}
		},
		onLoad(options) {
			if (options.title != undefined && options.title.trim() != "") {
				this.title = options.title;
			}
			this.url = decodeURIComponent(options.url);
		},
		// 不好用：1. 必须关闭web页面才会触发事件 2. 网页端不适用，只有APP可以
		methods: {
			handleMessage(event) {  
			    this.toast('接收到的消息：' + JSON.stringify(event.detail)); 
			},
		}
	}
</script>
