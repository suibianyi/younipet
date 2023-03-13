<template>
	<view class="container">
		<view class="block-container">
			<view class="block-title">
				今日预约
			</view>
			<HistoryActiveItem :appointmentData="todayAppointmentData"/>
		</view>
		<view class="block-container">
			<view class="block-title">
				历史预约
			</view>
			<u-steps direction="column" dot inactiveColor="#B9B9B9" activeColor="#B9B9B9">
				<u-steps-item v-for="item in history" :title="item.time" :key="item.time">
					<template #desc>
						<view class="active-item">
							<HistoryActiveItem v-for="(oItem, index) in item.list" :key="index" :appointmentData="oItem"/>
						</view>
					</template>
				</u-steps-item>
			</u-steps>
		</view>
	</view>
</template>

<script>
	import HistoryActiveItem from '@/components/HistoryActiveItem/HistoryActiveItem.vue'
	import { todayBookList, historyBookList } from '@/server/api.js'
	export default {
		components: {
			HistoryActiveItem
		},
		data() {
			return {
				todayAppointmentData: {
					storeName: '门店名称',
					appointmentName: '预约服务',
					date: '2022/5/29',
					startTime: '19:00',
					endTime: '22:00',
					storeAddress: '门店地址'
				},
				history: [{
					time: '2022/5/10-2022/6/10',
					list: [{
						storeName: '门店名称',
						appointmentName: '预约服务',
						date: '2022/5/29',
						startTime: '19:00',
						endTime: '22:00',
						storeAddress: '门店地址',
						mobile: '11193338383'
					}]
				}, {
					time: '2022/5/10-2022/6/10',
					list: [{
						storeName: '门店名称',
						appointmentName: '预约服务',
						date: '2022/5/29',
						startTime: '19:00',
						endTime: '22:00',
						storeAddress: '门店地址',
						mobile: '11193338383'
					}]
				}, {
					time: '2022/5/10-2022/6/10',
					list: [{
						storeName: '门店名称',
						appointmentName: '预约服务',
						date: '2022/5/29',
						startTime: '19:00',
						endTime: '22:00',
						storeAddress: '门店地址',
						mobile: '11193338383'
					}]
				}]
			};
		},
		async onLoad() {
			const res = await todayBookList({ custom: { auth: true }})
			if (res && res[0]){
				const item2 = res[0]
				this.todayAppointmentData= {
						storeName: item2.store.storeName,
						appointmentName: '预约服务',
						date: this.formatTime(item2.bookDate),
						startTime: item2.startTime,
						endTime: item2.endTime,
						storeAddress: item2.store.storeLocation,
						mobile: item2.tel
					}
			}
			// for (const item2 of res) {
			// 	this.todayAppointmentData.push({
			// 		storeName: item2.store.storeName,
			// 		appointmentName: '预约服务',
			// 		date: this.formatTime(item2.bookDate),
			// 		startTime: item2.startTime,
			// 		endTime: item2.endTime,
			// 		storeAddress: item2.store.storeLocation,
			// 		mobile: item2.tel
			// 	})
			// }
			const res1 = await historyBookList({ custom: { auth: true }})
			this.history =[]
			for (const item of res1) {
				const temp = {}
				temp.time = item.time
				temp.list=[]
				for (const item2 of item.list) {
					temp.list.push({
						storeName: item2.store.storeName,
						appointmentName: '预约服务',
						date: this.formatTime(item2.bookDate),
						startTime: item2.startTime,
						endTime: item2.endTime,
						storeAddress: item2.store.storeLocation,
						mobile: item2.tel
					})
				}
				this.history.push(temp)
			}
		},
		methods: {
			formatTime(val) {
				return `${val[0]}${val[1]}${val[2]}${val[3]}/${val[4]}${val[5]}/${val[6]}${val[7]}`
			},
		}
	}
</script>

<style lang="scss">
.block-container {
	padding: $padding;
	background-color: #fff;
	margin-bottom: 20rpx;
	.block-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.active-item {
		margin-top: 20rpx;
	}
}

</style>
