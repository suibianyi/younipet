<template>
	<view class="container">
		<view class="order-list">
			<navigator
				class="order-item"
				v-for="(item, index) in listData"
				:key="index"
				hover-class="u-hover-class"
				:url="`/pages/afterSalesList/returnAfterDetail/returnAfterDetail?orderNo=${item.orderNo}`"
			>
				<view class="order-item-header">
					<view class="order-num">
						订单号：{{item.orderNo}}
					</view>
					<view class="order-status-text">
						{{item.status === 1 ? '退款中' : '已退款'}}
					</view>
				</view>
				<view class="order-item-body">
					<OrderGoodsItem v-for="(oItem, idx) in item.goodsList" :key="idx" :goodsData="oItem"></OrderGoodsItem>
					<view class="order-price-box">
						<view class="">
							退款：<text class="price-color">¥{{item.price}}</text>
						</view>
						<view class="u-flex">
							<view v-if="item.status === 1">
								<text class="tip-color">退款中</text>
								<text class="price-color">商家将在72个小时内处理</text>
							</view>
							<view v-else>
								<text class="tip-color">退款成功</text>
								<text class="price-color">退回：¥{{item.returnPrice}}</text>
							</view>
						</view>
					</view>
					<view class="order-button-group">
						<view class="button-item" v-if="item.status === 1">
							<u-button
								type="primary"
								size="small" 
								:customStyle="{
									width: '200rpx'
								}"
							>取消退款</u-button>
						</view>
						<view class="button-item" v-else>
							<u-button
								plain
								size="small" 
								color="#B9B9B9"
								:customStyle="{
									width: '200rpx'
								}"
							>删除记录</u-button>
						</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue'
	import { orderList } from '@/server/api.js'
	export default {
		components: {
			OrderGoodsItem
		},
		data() {
			return {
				listData: [
					{
						status: 1,
						orderNo: '1111122',
						price: 154,
						returnPrice: 134,
						goodsList: [
							{
								goodsImage: require('@/static/image/goods-image.png'),
								goodsTitle: '商品名称',
								goodsSpec: '商品规格',
								price: '165',
								count: 1
							}
						],
					},
					{
						status: 2,
						orderNo: '1111122',
						price: 154,
						returnPrice: 134,
						goodsList: [
							{
								goodsImage: require('@/static/image/goods-image.png'),
								goodsTitle: '商品名称',
								goodsSpec: '商品规格',
								price: '165',
								count: 1
							}
						],
					},
				]
			};
		},
		async onLoad () {
			const res = await orderList({
				page: 1,
				limit: 1000,
				status: [7,8]
			})
			console.log('查询订单结果', res)
			this.listData =[]
			for(const item of res) {
				// console.log('123465', item.store)
				const temp = {}
				if (item.store) {
					temp.storeName=item.store.storeName
				}
				temp.id= item.id
				temp.realPrice= item.amount
				temp.statusName=item.status
				temp.createdTime= item.createdTime
				temp.expressCode=item.expressCode
				temp.express=item.express
				temp.postNo=item.postNo
				temp.qrCode = item.qrCode
				temp.orderNo = item.id
				temp.restTime= 30*60*1000-((new Date()).getTime()-(new Date(item.createdTime)).getTime())
				if(item.st==7) {
					temp.status=1
				} else {	
					temp.status=2
				}
				temp.goodsList = []
				temp.price = 0
				temp.returnPrice = item.refundAmt
				if(item.detailList) {
					for(const item2 of item.detailList) {
						temp.price = temp.price+=item2.price
						// temp.returnPrice = temp.returnPrice+=item2.returnPrice
						temp.goodsList.push({
							goodsImage: item2.img,
							goodsTitle: item2.productName,
							goodsSpec: (item2.secondName1?item2.secondName1:'')+(item2.secondName2?item2.secondName2:'')+(item2.secondName3?item2.secondName3:''),
							price: item2.price,
							count: item2.num
						})
					}
				}
				this.listData.push(temp)
			}
			console.log('合并后的结果是', this.listData)
		}
	}
</script>

<style lang="scss" scoped>
.order-list {
	.order-item {
		margin-top: 20rpx;
		padding: $padding;
		background-color: #fff;
		&-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 24rpx;
			border-bottom: solid 1px $border-color;
			font-size: 24rpx;
			.order-num {
				color: $text-sub-color;
			}
			.order-status-text {
				font-weight: bold;
			}
		}
		&-body {
			padding-top: 24rpx;
			.order-price-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30rpx;
				padding-left: 134rpx;
				font-size: 22rpx;
				.price-color {
					color: $price-color;
				}
				.tip-color {
					color: $text-sub-color;
					margin-right: 10rpx;
				}
			}
			.order-button-group {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-top: 30rpx;
				.button-item + .button-item {
					margin-left: 32rpx;
				}
			}
		}
	}
}
</style>
