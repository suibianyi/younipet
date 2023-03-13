<template>
	<view class="container">
		<ActiveItem v-for="(item, index) in activeList" :key="index" :activeData="item" />
	</view>
</template>

<script>
	import ActiveItem from '@/components/ActiveItem/ActiveItem.vue'
	import { actTakeList,actPastList,actMyList } from '@/server/api.js'
	export default {
		components: {
			ActiveItem
		},
		data() {
			return {
				statusFilter:{
					'-1': '已结束',
					'0':'未开始',
					'1':'进行中'
				},
				activeList: [
					{
						image: require('@/static/image/activeImage.png'),
						title: '活动名称',
						statusName: '进行中',
						joinCount: '10',
						beginDate: '2022/05/10',
						endDate: '2022/09/12',
						activeId: '11'
					},{
						image: require('@/static/image/activeImage.png'),
						title: '活动名称',
						statusName: '进行中',
						joinCount: '10',
						beginDate: '2022/05/10',
						endDate: '2022/09/12',
						activeId: '11'
					},{
						image: require('@/static/image/activeImage.png'),
						title: '活动名称',
						statusName: '进行中',
						joinCount: '10',
						beginDate: '2022/05/10',
						endDate: '2022/09/12',
						activeId: '11'
					}
				],
			};
		},
		async onLoad() {
			this.activeList = []
			const res =  await actMyList({ custom: { auth: true }})
			console.log(res)
			for(const item of res) {
				const abc = JSON.parse(item.content)
				this.activeList.push({
					id:item.id,
					image: abc[0].img,
					title: item.title,
					statusName: this.statusFilter[item.st],
					joinCount: item.joinCount,
					beginDate: item.startDate,
					endDate: item.endDate,
					activeId: item.id,
					st:item.st,
					storeName:item.storeName,
					limit: item.couponData.fetchObj,
					couponData:item.couponData
				})
			}
			console.log('我的活动', this.activeList)
		}
	}
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.container {
	padding: $padding;
}
</style>
