<template>
	<view class="container">
		<view class="goods-info-container">
			<OrderGoodsItem v-for="(item, idx) in goodsList" :key="idx" :goodsData="item"></OrderGoodsItem>
		</view>
		<view class="select-return-type-container">
			<view class="container-title">
				选择服务类型
			</view>
			<view class="type-list">
				<view class="type-item" hover-class="u-hover-class" @click="toApplyReturnAfter('0')">
					<view class="type-item-left">
						<view class="type-title">
							仅退款（无需退货）
						</view>
						<view class="type-desc">
							未收到货，或与卖家协商同意不用退货只退款
						</view>
					</view>
					<u-icon name="arrow-right" size="16" color="#B9B9B9"></u-icon>
				</view>
				<view class="type-item" hover-class="u-hover-class" @click="toApplyReturnAfter('1')">
					<view class="type-item-left">
						<view class="type-title">
							退货退款
						</view>
						<view class="type-desc">
							已收到货，需要退还收到的货物
						</view>
					</view>
					<u-icon name="arrow-right" size="16" color="#B9B9B9"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue'
	export default {
		components: {
			OrderGoodsItem
		},
		data() {
			return {
				orderNo: '',
				goodsList: [
					{
						goodsImage: require('@/static/image/goods-image.png'),
						goodsTitle: '商品名称',
						goodsSpec: '商品规格',
						price: '165',
						count: 1
					}
				],
			};
		},
		onLoad(options) {
			console.log('退款页面1收到的', options.detail)
			const temp = JSON.parse(options.detail)
			this.goodsList = temp.goodsList
			this.orderNo = temp.orderNo
		},
		methods: {
			toApplyReturnAfter (refundType) {
				const data = {
					orderNo:this.orderNo,
					goodsList: this.goodsList,
					refundType: refundType
				}
				uni.navigateTo({
					url: '/pages/selectAfterType/applyAfterReturn/applyAfterReturn?detail=' + JSON.stringify(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.goods-info-container {
	padding: $padding;
	background-color: #fff;
	margin-top: 20rpx;
}
.select-return-type-container {
	padding: $padding $padding 0;
	background-color: #fff;
	margin-top: 20rpx;
	.container-title {
		font-size: 28rpx;
		font-weight: bold;
	}
	.type-list {
		padding: $padding 0;
		.type-item {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1px $border-color;
			&:first-child {
				padding-bottom: 20rpx;
			}
			&:last-child {
				border-bottom: none;
				padding-top: 20rpx;
			}
			.type-item-left {
				flex: 1;
				line-height: 48rpx;
				.type-title {
					font-size: 28rpx;
					
				}
				.type-desc {
					font-size: 22rpx;
					color: $text-sub-color;
				}
			}
		}
	}
}
</style>
