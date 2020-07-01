import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const messages = {}

try {
	//require.context实现前端工程自动化
	//三个参数：文件的路径，是否遍历子目录，匹配文件的正则
	//require.context函数执行后返回的是一个函数，并且这个函数有三个属性：
	//1.resolve{Function} ---接受一个参数request，request---------为modules文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
	//2.keys{Function}-返回匹配成功模板名字组成的数组
	//3.id{String}- 执行环境的id，返回的是一个字符串，主要用在module.hot.accept热加载
	const i18nContext = require.context('@/language/modules', true, /\.js$/)
	//遍历modules下的文件
	i18nContext.keys().forEach(modules => {
		let attr = modules.replace(/(^\.\/)|(\.js$)/g, '')
		//attr  --------- en zh
		messages[attr] = i18nContext(modules).default   //读取文件中的default模块
		//messages[attr]---------en，zh里的内容
	})
} catch (e) {}

const i18n = new VueI18n({
	locale: 'zh',
	messages
})

Vue.prototype._i18n = i18n

export default i18n
