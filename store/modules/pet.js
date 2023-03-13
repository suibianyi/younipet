/**
 * 有关宠物的数据
 * */

const pet = {
	state: {
		pet:{
			id:'',
			date: '',
			kind: 0,
			name: '',
			sterilization: '',
			gender: '',
			type: 0,
			vaccines: '',
			vaccinesDate: ''
		}
	},
	mutations: {
		SET_PET: (state, userData) => {
			console.log('保存的pet是', userData)
			state.userData = Object.assign(state.pet, userData)
		},
	},
	actions: {
		savePet: async({ commit, state }, data) => {
			commit('SET_PET', data)
		}
	}
}

export default pet