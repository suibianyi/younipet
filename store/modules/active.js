/**
 * 有关活动的数据
 * */

const active = {
	state: {
		active:{
			isFinish: true,
			activeDetail: {
				id:'',
				img:'',
				title: '活动名称',
				statusName: '进行中',
				joinCount: '10',
				beginDate: '2022/05/10',
				endDate: '2022/09/12',
				storeName: '门店名称',
				limit:'',
				content: '活动说明',
				price: '90',
				couponData: {
					title: '优惠券名称',
					beginDate: '2022/05/31',
					endDate: '2022/09/12',
					discount: 9
				}
			}
		}
	},
	mutations: {
		SET_ACTIVE: (state, userData) => {
			console.log('保存的active是', userData)
			state.userData = Object.assign(state.active, userData)
		},
	},
	actions: {
		saveActive: async({ commit, state }, data) => {
			commit('SET_ACTIVE', data)
		}
	}
}

export default active