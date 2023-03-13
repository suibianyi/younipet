<template>
	<view class="store-container">
		<view class="store-info-box">
			<image class="store-image" :src="storeData.storeImage"></image>
			<view class="store-info">
				<view class="store-title">
					{{storeData.storeName}}
				</view>
				<view class="store-distance">
					距离您 {{storeData.distance}}
				</view>
			</view>
		</view>
		<view class="u-flex">
			<u-button type="primary" size="mini" @click="toStoreIndex">进入</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"GoodsDetailStore",
		props: {
			storeData: {
				type: Object
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toStoreIndex () {
				const { storeId } = this.storeData;
				uni.navigateTo({
					url: '/pages/storeIndex/storeIndex?id=' + storeId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.store-container {
	width: 100%;
	padding: 20rpx $padding;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20rpx;
	.store-info-box {
		display: flex;
		.store-image {
			width: 92rpx;
			height: 92rpx;
			border-radius: 12rpx;
		}
		.store-info {
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.store-title {
				font-size: 28rpx;
			}
			.store-distance {
				font-size: 22rpx;
				color: $text-sub-color;
			}
		}
	}
}
</style>