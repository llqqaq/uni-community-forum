import Vue from 'vue'
import message from './message.vue'

let messageConstrutor = Vue.extend(message)
let instance

const Message = function (options={}) {
	console.log(message)
	instance = new messageConstrutor().$mount() // 渲染组件
	console.log(instance)
	console.log(instance.$el)
	document.body.appendChild(instance.$el)  // 挂在到body下面
}

// const Toast = function () {
// 	instance = new 
// }

export default Message