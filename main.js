import App from './App'
import store from './store'
import Message from '@/components/message/message.js'


// #ifndef VUE3
import Vue from 'vue'

import Login from '@/components/login/login.vue'
Vue.component('login', Login)
import Add from '@/components/add.vue'
Vue.component('add', Add)

Vue.prototype.$messageShow = Message
Vue.config.productionTip = false
App.mpType = 'app'

// 全局挂载该方法
Vue.prototype.$showLogin = function (that, options) {
	const currentCase = seekLogin(that)
	// 将当前页面级别的实例传进来
	return currentCase.$refs.login.showLogin(options)
}


const app = new Vue({
	store,
    ...App
})
// 引入请求封装，将app参数传递到配置中
require('@/config/request.js')(app)
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
// 引入uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 设置文件访问基地址信息
Vue.prototype.BaseFileURL = 'http://ts.lagou.uieee.com/api/v2/files/'

Vue.filter('filterDate', date => date.slice(0, 10))

// 往上遍历找出页面级别实例
function seekLogin (currentCase) {
	if (!currentCase.$refs.login) {
		return seekLogin(currentCase.$parent)
	}
	return currentCase
}