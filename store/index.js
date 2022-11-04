import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: uni.getStorageSync("hasLogin"),
		userInfo: uni.getStorageSync("userInfo")
	},
	mutations: {
		login(state, userInfo) {			
			state.hasLogin = uni.getStorageSync("hasLogin");
			state.userInfo = uni.getStorageSync("userInfo");
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = null;
		}
	}
})

export default store
