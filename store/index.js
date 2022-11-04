import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: uni.getStorageSync("hasLogin"),
		userInfo: uni.getStorageSync("userInfo"),
		userBase: uni.getStorageSync("userBase")
	},
	mutations: {
		login(state, userInfo,userBase) {			
			state.hasLogin = uni.getStorageSync("hasLogin");
			state.userInfo = uni.getStorageSync("userInfo");
			state.userBase = uni.getStorageSync("userBase");
			
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = null;
		}
	}
})

export default store
