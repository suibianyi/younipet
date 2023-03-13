<template>
	<view class="container">
		<StoreGoodsItem v-for="(item, index) in storeGoodsList" :key="index" :item="item" />
	</view>
</template>

<script>
	import { productList } from '@/server/api.js'
	export default {
		data() {
			return {
				storeId:'',
				storeGoodsList: [
					{
						goodsId: '2',
						goodsThumb: require('@/static/image/goods-image.png'),
						goodsName: '商品名称',
						distance: '3.2km',
						vipPrice: '80',
						price: '96',
						merchantName: '商家名称',
						stock: '108'
					},
				]
			};
		},
		async onLoad (options) {
			this.storeId = options.id;
			const resProduct = await productList({
				type: 1,
				storeId: this.storeId
			})
			this.storeGoodsList =[]
			for(const item of resProduct) {
				this.storeGoodsList.push({
					goodsId:item.id,
					goodsName:item.name,
					goodsThumb: JSON.parse(item.img)[0],
					vipPrice:item.productStockList[0].vipPrice,
					price:item.productStockList[0].price,
					stock: item.productStockList[0].stockNum,
					merchantName:'暗室逢灯的',
					distance: '昂士大夫',
					saleCount: item.saleNum
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 24rpx 50rpx;
	background-color: #fff;
}
</style>
