<template>
	<view class="container">
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
	import ServiceItem from '@/components/ServiceItem/ServiceItem.vue';
	import { categoryList, serviceList, productStockList } from '@/server/api.js'
	export default {
		components: {
			ServiceItem
		},
		data() {
			return {
				myMap:[0,'次','月','年'],
				tempName:'',
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
				}]
			};
		},
		async onLoad(option) {
			if(option){
				// console.log('进来服务', option)
				if (option.detailInfo == 1) {
					this.tempName = '寄养'
				} else if (option.detailInfo == 2) {
					this.tempName = '接送'
				} else if (option.detailInfo == 3) {
					this.tempName = '洗护'
				} else if (option.detailInfo == 4) {
					this.tempName = '培训'
				}
				const isVip = this.$store.getters.user.isVip
				const res = await serviceList({
					category: option.detailInfo,
					type:3
				})
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
				console.log('格式化后的serviceList',this.serviceList)
			}

		},
	}
</script>

<style lang="scss" scoped>
.service {
	&-block {
		width: 100%;
		background-color: #fff;
		padding: 24rpx $padding;
		margin-bottom: 20rpx;
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
