export default {
	methods: {
		async share(e) {
			this.HideModal();
			let { provider, scene } = e.currentTarget.dataset;
			switch (provider) {
				case 'copy':
					this.copy(scene);
					this.isShare = true;
					break;
				case 'save':
					this.$uni.showLoading({ title: this.i18n.generateImage });
					setTimeout(() => {
						this.saveImageToPhotosAlbum();
					}, 500);
					break;
				case 'qq':
					this.$uni.showLoading({ title: this.i18n.generateImage });
					setTimeout(() => {
						this.uniShare(provider, scene);
					}, 500);
					break;
				case 'weixin':
					this.$uni.showLoading({ title: this.i18n.generateImage });
					setTimeout(() => {
						this.uniShare(provider, scene);
					}, 500);
					break;
				default:
					break;
			}
		},
		async uniShare(provider, scene) {
			let resp = await this.saveCapture();
			let [err, res] = await uni.share({
				provider: provider,
				scene: scene,
				type: 2,
				imageUrl: resp.target
			});
			this.$uni.hideLoading();
			if (res) {
				this.ShareSuccess()
				this.$uni.showToast({ title: this.i18n.share + this.i18n.success, icon: 'success' });
			}
			if (err) {
				this.$uni.showToast({ title: this.i18n.share + this.i18n.error });
				this.isShare = true;
			}
		},
		async saveImageToPhotosAlbum() {
			let resp = await this.saveCapture();
			let [err, res] = await uni.saveImageToPhotosAlbum({
				filePath: resp.target
			});
			if (res) {
				// console.log(res);
				this.$uni.showToast({ title: this.i18n.save + this.i18n.image + this.i18n.success, icon: 'success' });
			}
			if (err) {
				// console.log(err);
				this.$uni.showToast({ title: this.i18n.save + this.i18n.image + this.i18n.error });
				this.isShare = true;
			}
		},
		saveCapture() {
			return new Promise(async (resolve, reject) => {
				try {
					await this.createBitmap();
					let res = await this.saveBitmap();
					this.bitmap.clear();
					this.isShare = true;
					resolve(res);
				} catch (e) {
					this.$uni.showToast({ title: this.i18n.save + this.i18n.image + this.i18n.error });
					this.isShare = true;
					reject(e);
				}
			});
		},
		createBitmap() {
			return new Promise((resolve, reject) => {
				this.bitmap = new plus.nativeObj.Bitmap('invite');
				let currentWebview = this.$mp.page.$getAppWebview();
				// let res = uni.getSystemInfoSync();
				// let top = res.statusBarHeight + 45;
				let top = this.StatusBar
				let height = this.safeArea.height
				// let height = this.creenHeight - top
				// 将webview内容绘制到Bitmap对象中
				currentWebview.draw(
					this.bitmap,
					() => {
						resolve();
					},
					err => {
						reject(err);
						console.log('截屏绘制图片失败');
					}, {
						// clip: { top: `${top}px`, left: '0px', width: '100%', height: '100%' }
						clip: { top: `${top}px`, left: '0px', width: '100%', height: `${height}px` }
					}
				);
			});
		},
		saveBitmap(path = '_doc/share.jpg') {
			return new Promise((resolve, reject) => {
				this.bitmap.save(
					path, {
						overwrite: true,
						quality: 100
					},
					res => {
						resolve(res);
					},
					err => {
						this.isShare = true;
						reject(err);
						console.log('保存图片失败');
					}
				);
			});
		},
	}
}
