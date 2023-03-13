/**
 * 有关用户操作的数据
 * */

const address = {
	state: {
		addressData: [],
		chooseAddress:{}
	},
	mutations: {
		SET_ADDRESSDATA: (state, addressData) => {
			console.log('保存的addressData是', addressData)
			state.addressData = addressData
		},
		CHOOSE_ADDRESS: (state, addressData) => {
			console.log('保存的CHOOSE_ADDRESS是', addressData)
			state.chooseAddress = addressData
		},
	},
	actions: {
		getAddressData: async({ commit, state }, data) => {
			commit('SET_ADDRESSDATA', data)
		},
		setChooseAddress: async({ commit, state }, data) => {
			commit('CHOOSE_ADDRESS', data)
		}
	}
}

export default address