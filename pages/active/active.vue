<template>
	<view class="container">
		<u-sticky bgColor="#fff">
			<u-tabs
				:list="tabList"
				:scrollable="false"
				:current="tabCurrent"
				@change="tabChange"
			>
			</u-tabs>
		</u-sticky>
		<view class="page-container" v-if="tabCurrent !== 2">
			<ActiveItem v-for="(item, index) in activeList" :key="index" :activeData="item"/>
		</view>
		<view class="page-container" v-else>
			<u-steps direction="column" dot inactiveColor="#B9B9B9" activeColor="#B9B9B9">
				<u-steps-item v-for="item in history" :title="item.time" :key="item.time">
					<template #desc>
						<view>
							<ActiveItem class="active-item" v-for="(oItem, index) in item.list" :key="index" :activeData="oItem"/>
						</view>
					</template>
				</u-steps-item>
			</u-steps>
		</view>
	</view>
</template>

<script>
	import { actTakeList,actPastList,actMyList } from '@/server/api.js'
	
	import ActiveItem from '@/components/ActiveItem/ActiveItem.vue'
	export default {
		components: {
			ActiveItem
		},
		data() {
			return {
				tabCurrent: 0,
				tabList: [{
					name: '可参与活动',
				}, {
					name: '我参与的',
				}, {
					name: '历史活动',
				}],
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
				history: [{
					time: '2022/5/10-2022/6/10',
					list: [{
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
					}]
				}, {
					time: '2022/5/10-2022/6/10',
					list: [{
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
					}]
				}, {
					time: '2022/5/10-2022/6/10',
					list: [{
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
					}]
				}]
			};
		},
		onLoad() {
			this.getList(this.tabCurrent)
		},
		methods: {
			tabChange ({index}) {
				this.tabCurrent = index;
				this.getList(this.tabCurrent)
			},
			formData(val) {
				console.log(`${val.slice(0,4)}/${val.slice(4,6)}/${val.slice(6,8)}`)
				return `${val.slice(0,4)}/${val.slice(4,6)}/${val.slice(6,8)}`
			},
			async getList(val) {
				this.activeList = []
				// this.history.list = []
				if (val===0) {
					const res =  await actTakeList({ custom: { auth: true }})
					console.log(res)
					for(const item of res) {
						const abc = JSON.parse(item.content)
						this.activeList.push({
							id:item.id,
							image: abc[0].img,
							title: item.title,
							statusName: this.statusFilter[item.st],
							joinCount: item.joinCount,
							beginDate: this.formData(item.startDate),
							endDate: this.formData(item.endDate),
							activeId: item.id,
							st:item.st,
							storeName:item.storeName,
							limit: item.couponData.fetchObj,
							couponData:item.couponData
						})
					}
				} else if (val===1) {
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
				} else if (val===2) {
					const res =  await actPastList({ custom: { auth: true }})
					console.log(res)
					this.history = []
					for(const item of res) {
						const temp ={}
						temp.time = item.time
						temp.list =[]
						for (const item2 of item.list) {	
							const abc = JSON.parse(item2.content)
							temp.list.push({
								image: abc[0].img,
								title: item2.title,
								statusName: '进行中',
								joinCount: item2.joinCount,
								beginDate: item2.startDate,
								endDate: item2.endDate,
								activeId: item2.id
							})
						}
						this.history.push(temp)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.page-container {
		margin-top: 20rpx;
		background-color: #ffffff;
		padding: $padding;
		.active-item {
			margin-top: 20rpx;
		}
	}
}

</style>
