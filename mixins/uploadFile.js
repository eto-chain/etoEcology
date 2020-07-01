export default {
	methods: {
		uploadFile(upFiles, name = 'file', formData, url = 'user.upload') {
			this.$uni.showLoading({ title: 'uploading' })
			let files = Array.isArray(upFiles) ? [...upFiles] : [upFiles]
			let uploads = []
			return new Promise((resolve, reject) => {
				const _uploadFile = async () => {
					const filePath = files.shift()
					if (!filePath) {
						this.$uni.hideLoading()
						resolve(uploads)
						return
					}
					try {
						let { data } = await this.$http.upload(url, { filePath, name, formData }, {
							tipConfig: { storeLoading: true, isLoading: false, isErrorDefaultTip: false },
						})
						uploads = [...uploads, data]
						_uploadFile()
					} catch (error) {
						this.$uni.showToast({ title: 'uploading error!' })
						reject(error)
					}
				}
				_uploadFile()
			})
		}
	}
}
