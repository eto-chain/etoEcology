export default {
	data() {
		return {
			codeText: '',
			disabled: false,
			count: 60,
		}
	},
	onLoad(e) {
		this.codeText = this.i18n.getCode
	},
	methods: {
		getCode(type) {
			if (this.disabled) return
			this.$refs.form.validateField('mobile', res => {
				if (res) {
					this.disabled = true
					try {
						clearInterval(this.time)
						this.time = setInterval(() => {
							this.count -= 1
							this.codeText = this.count + this.i18n.getCodeTime
							if (this.count === 0) {
								this.count = 60
								this.disabled = false
								this.codeText = this.i18n.getCode
								clearInterval(this.time)
							}
						}, 1000)
						let params = { mobile: this.form.mobile, num: type }
						this.$http.post('login.getCode', params, { isAuth: false, tipConfig: { isLoading: false } })
					} catch (e) {
						this.disabled = false
					}
				}
			})
		},
	}
}
