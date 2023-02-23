import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: uni.getStorageSync('token') || '',
		userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : null
	},
	getters: {
		
	},
	mutations: {
		SET_TOKEN (state, token) {
			state.token = token
		},
		SET_USERINFO (state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		setToken ({ commit }, { token }) {
			uni.setStorageSync('token', token)
			commit('SET_TOKEN', token)
		},
		setUserInfo ({ commit }, { userInfo }) {
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
			commit('SET_USERINFO', userInfo)
		}
	}
})

export default store