<template>
	<view class="container">
		<u-sticky bgColor="#fff">
			<u-tabs :list="tabList" @click="clickTab()"></u-tabs>
		</u-sticky>
		<view class="service-block" v-for="(item, index) in serviceList" :key="index">
			<view class="service-title">
				{{item.title}}
			</view>
			<view class="service-list">
				<ServiceItem
					v-for="(oItem, idx) in item.list"
					:key="idx"
					:item="oItem"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import { categoryList, productList, productStockList,serviceList } from '@/server/api.js'
	import ServiceItem from '@/components/ServiceItem/ServiceItem.vue';
	export default {
		components: {
			ServiceItem
		},
		data() {
			return {
				myMap:[0,'次','月','年'],
				tempName:'',
				tabList: [{
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}, {
					name: '推荐'
				}],
				serviceList: [{
					title: '按次寄养',
					list: [{
						id: '1',
						image: require('@/static/image/goods-image.png'),
						title: '服务标题',
						appointmentCount: '11',
						typeName: '基础洗护',
						price: '38.6'
					}, {
						id: '1',
						image: require('@/static/image/goods-image.png'),
						title: '服务标题',
						appointmentCount: '11',
						typeName: '基础洗护',
						price: '38.6'
					}]
				}, {
					title: '按次寄养',
					list: [{
						id: '1',
						image: require('@/static/image/goods-image.png'),
						title: '服务标题',
						appointmentCount: '11',
						typeName: '基础洗护',
						price: '38.6'
					}, {
						id: '1',
						image: require('@/static/image/goods-image.png'),
						title: '服务标题',
						appointmentCount: '11',
						typeName: '基础洗护',
						price: '38.6'
					}]
				}, {
					title: '按次寄养',
					list: [{
						id: '1',
						image: require('@/static/image/goods-image.png'),
						title: '服务标题',
						appointmentCount: '11',
						typeName: '基础洗护',
						price: '38.6'
					}, {
						id: '1',
						image: require('@/static/image/goods-image.png'),
						title: '服务标题',
						appointmentCount: '11',
						typeName: '基础洗护',
						price: '38.6'
					}]
				}]
			};
		},
		async onLoad() {
			this.tabList = await categoryList()
			await this.getProduct(this.tabList[0])
		},
		methods: {
			async clickTab(item) {
				console.log(item)
				await this.getProduct(item)
			},
			async getProduct(tab) {
				if(tab.type ==2) {
					if (tab.id == 1) {
						this.tempName = '寄养'
					} else if (tab.id == 2) {
						this.tempName = '接送'
					} else if (tab.id == 3) {
						this.tempName = '洗护'
					} else if (tab.id == 4) {
						this.tempName = '培训'
					}
					this.serviceList =[]
					const res = await serviceList({
						category: tab.id,
						type:3
					})
					const isVip = this.$store.getters.user.isVip
					console.log('请求到的res',res)
					this.serviceList = []
					for (const a in res) {
						const temp = {}
						temp.title = `按${this.myMap[parseInt(a)]}${this.tempName}`
						temp.list=[]
						for(const item of res[a]) {
							const temp2={
								id: item.id,
								image: JSON.parse(item.img)[0],
								title: item.name,
								appointmentCount: item.saleNum,
								typeName: item.tag,
								price: `${isVip?item.productStockList[0].vipPrice:item.productStockList[0].price}/${this.myMap[parseInt(a)]}`
							}
							temp.list.push(temp2)
							this.serviceList.push(temp)
						}
					}
				} else if (tab.type ==1) {	
					const res = await productList({
						category: tab.id
					})
				}
				// const temp =[]
				// for(const item of res) {
				// 	temp.push({
				// 		id: item.id,
				// 		image: JSON.parse(item.img)[0],
				// 		title: item.name,
				// 		appointmentCount: item.saleNum,
				// 		typeName: item.tag,
				// 		price: `${item.productStockList[0].price}/${this.myMap[parseInt(a)]}`
				// 	})
				// }
				// this.serviceList.push({
				// 	title:tab.name,
				// 	list:temp
				// })
				// console.log(res)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.service {
	&-block {
		width: 100%;
		background-color: #fff;
		padding: 24rpx $padding;
		margin-top: 20rpx;
	}
	&-title {
		font-size: 32rpx;
		font-weight: bold;
	}
	&-list {
		margin-top: 20rpx;
	}
}
</style>
