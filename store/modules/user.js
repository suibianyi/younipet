/**
 * 有关用户操作的数据
 * */

import Vue from 'vue';

const user = {
	state: {
		userData: {
			avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
			nickName: '薯条妈妈',
			ynId: '547333',
			vipExpress: '2022-05-01',
			isVip: false,
			vipType: '',
			token: ''
		},
	},
	// getters: {
	// 	userData: state => state.userData,
	// },
	mutations: {
		SET_USERDATA: (state, userData) => {
			console.log('保存的userData是', userData)
			state.userData = Object.assign(state.userData, userData)
		},
	},
	actions: {
		saveUserInfo: async({ commit, state }, data) => {
			commit('SET_USERDATA', data)
		}
	}
}

export default user