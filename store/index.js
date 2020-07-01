// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import root from '@/store/root'
Vue.use(Vuex)

const store = new Vuex.Store({ ...root })


try {

	const storeContext = require.context('@/store/modules', true, /\.js$/)
	storeContext.keys().forEach((modules) => {
		store.registerModule(modules.replace(/(^\.\/)|(\.js$)/g, ''), storeContext(modules).default)
	})

} catch (e) {}


Vue.prototype.$store = store
export default store
