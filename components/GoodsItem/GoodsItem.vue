<template>
	<navigator class="column-goods-item" hover-class="u-hover-class" :url="'/pages/productGoodsDetail/productGoodsDetail?goodsId=' + item.goodsId">
		<view class="image-container">
			<u-image :src="item.goodsThumb" width="100%" height="332rpx"></u-image>
		</view>
		<view class="goods-info-container">
			<view class="goods-name u-line-2">
				{{item.goodsName}}
			</view>
			<view class="price-box">
				<view class="price">
					{{item.price}}元
				</view>
			</view>
			<view class="bottom-box">
				已售{{item.saleCount}}件
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"ColumnGoodsItem",
		props: {
			item: {
				type: Object,
			}
		},
		data() {
			return {
				goodsImage: require('@/static/image/goods-image.png')
			};
		}
	}
</script>

<style lang="scss" scoped>
.column-goods-item {
	width: 312rpx;
	height: 536rpx;
	border: solid 1px $border-color;
	border-radius: 16rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	.image-container {
		width: 100%;
		height: 332rpx;
		position: relative;
		.goods-image {
			width: 100%;
			height: 100%;
		}
	}
	.goods-info-container {
		padding: 20rpx 16rpx;
		.goods-name {
			font-size: 28rpx;
			line-height: 38rpx;
		}
		.price-box {
			display: flex;
			align-items: center;
			margin-top: 15rpx;
			.price {
				color: $price-color;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
		.bottom-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: $text-sub-color;
			font-size: 20rpx;
			margin-top: 18rpx;
		}
	}
}
</style>