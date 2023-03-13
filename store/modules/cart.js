/**
 * 有关用户操作的数据
 * */

import Vue from 'vue';

const cart = {
	state: {
		cartData: [],
	},
	mutations: {
		SET_CARTDATA: (state, cartData) => {
			console.log('保存的cartData是', cartData)
			state.cartData = cartData
		},
	},
	actions: {
		saveCartInfo: async({ commit, state }, data) => {
			commit('SET_CARTDATA', data)
		}
	}
}

export default cart