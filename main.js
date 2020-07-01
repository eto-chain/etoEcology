import Vue from 'vue'
import App from './App'

// Router
import router from '@/router'

// plugins
import plugins from '@/plugins'
Vue.use(plugins)
// filters
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// mixins && components
import '@/mixins/index'
import '@/utils/clipboard'

// language && store
import i18n from '@/language'
import store from '@/store'
App.store = store

Vue.config.productionTip = false

Vue.prototype.goto = function(path, url, title) {
	if (url) {
		uni.navigateTo({
			url: path + "?url=" + encodeURIComponent(url) + (title ? "&title=" + title : "")
		});
	} else {
		uni.navigateTo({
			url: path
		});
	}
}

App.mpType = 'app'

const app = new Vue({ router, i18n, ...App })
app.$mount()
