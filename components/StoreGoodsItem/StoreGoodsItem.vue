<template>
	<view class="column-goods-item" hover-class="u-hover-class">
		<view class="image-container">
			<u-image :src="item.goodsThumb" width="100%" height="332rpx"></u-image>
			<view class="shop-tag">
				{{item.merchantName}}
			</view>
		</view>
		<view class="goods-info-container">
			<view class="goods-name u-line-2">
				{{item.goodsName}}
			</view>
			<view class="price-box">
				<image class="vip-icon" src="@/static/image/goods-vip.png" mode="widthFix"></image>
				<view class="price">
					{{item.vipPrice}}元
				</view>
				<view class="origin-price">
					{{item.price}}元
				</view>
			</view>
			<view class="bottom-box">
				<text >
					距离您 {{item.distance}}
				</text>
				<text >
					库存{{item.stock}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"StoreGoodsItem",
		props: {
			item: {
				type: Object
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
		.shop-tag {
			width: 144rpx;
			height: 52rpx;
			line-height: 52rpx;
			font-weight: bold;
			position: absolute;
			left: 0;
			bottom: 0;
			border-radius: 0px 12rpx 12rpx 0px;
			text-align: center;
			@include rgbMainColor(0.5);
			
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
			.vip-icon {
				width: 98rpx;
				height: auto;
			}
			.price {
				color: $price-color;
				font-size: 28rpx;
				font-weight: bold;
				margin-left: 12rpx;
			}
			.origin-price {
				font-size: 20rpx;
				color: $text-sub-color;
				text-decoration: line-through;
				margin-left: 18rpx;
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