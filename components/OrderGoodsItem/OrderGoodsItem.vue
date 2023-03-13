<template>
	<view class="goods-info-box">
		<u-image :src="goodsData.goodsImage" width="114rpx" height="114rpx" radius="20rpx"></u-image>
		<view class="goods-info">
			<view class="goods-name u-line-2">
				{{goodsData.goodsTitle}}
			</view>
			<view class="goods-spec">
				{{goodsData.goodsSpec}}
			</view>
		</view>
		<view class="goods-price-box">
			<view class="goods-price">
				¥{{goodsData.price}}
			</view>
			<view class="goods-count">
				*{{goodsData.count}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"GoodsLineItem",
		props: {
			goodsData: Object,
		},
		data() {
			return {
				goodsImage: require('@/static/image/goods-image.png'),
			};
		}
	}
</script>

<style lang="scss" scoped>
.goods-info-box {
	display: flex;
	.goods-info {
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		.goods-name {
			line-height: 34rpx;
			font-size: 24rpx;
		}
		.goods-spec {
			color: $text-sub-color;
			font-size: 22rpx;
		}
	}
	.goods-price-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		margin-left: 20rpx;
		flex-shrink: 0;
		.goods-price {
			color: $price-color;
			line-height: 34rpx;
			font-weight: bold;
		}
		.goods-count {
			color: $text-sub-color;
			font-size: 22rpx;
		}
	}
}
</style>