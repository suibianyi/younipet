<template>
	<view class="container">
		<view class="selct-city-container">
			<SelectCity />
		</view>
		<view class="store-list">
			<view class="store-item" v-for="item in storeList" :key="item.storeId">
				<u-image :src="item.storeImage" width="168rpx" height="168rpx" radius="16rpx"></u-image>
				<view class="store-info-box">
					<view class="info-box">
						<view class="store-name u-line-2">
							{{item.storeName}}
						</view>
						<view class="store-distance">
							距离您  {{item.distance}}
						</view>
					</view>
					<view class="info-box">
						<view class="store-address u-line-2">
							{{item.address}}
						</view>
						<view class="u-flex">
							<u-button size="mini" type="primary" @click="toStoreIndex(item.storeId)">进入</u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SelectCity from '@/components/SelectCity/SelectCity';
	import { storeList } from '@/server/api.js'
	
	export default {
		components: {
			SelectCity
		},
		data() {
			return {
				storeList: [
					{
						storeId: '1',
						storeName: '门店名称',
						distance: '3.2km',
						address: '福建省福州市晋安区',
						storeImage: require('@/static/image/goods-image.png'),
					}
				]
			};
		},
		async onLoad() {
			const res = await storeList({ custom: { auth: true }})
			this.storeList = []
			for (const item of res) {
				this.storeList.push({
					storeId: item.id,
					storeName: item.storeName,
					distance: '3.2km',
					address: item.storeLocation,
					storeImage: item.img,
				})
			}
		},
		methods: {
			toStoreIndex (id) {
				uni.navigateTo({
					url: '/pages/storeIndex/storeIndex?id=' + id,
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.selct-city-container {
	width: 100%;
	height: 72rpx;
	padding: 0 $padding;
	background-color: #fff;
	display: flex;
	align-items: center;
}
.store-list {
	margin-top: 20rpx;
	width: 100%;
	background-color: #fff;
	padding: $padding;
	.store-item {
		width: 100%;
		padding: 20rpx;
		border: solid 1px $border-color;
		display: flex;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		&:last-child {
			margin-bottom: 0;
		}
		.store-info-box {
			width: calc(100% - 188rpx);
			height: 168rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			.info-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.store-name {
					font-size: 28rpx;
					max-width: 260rpx;
				}
				.store-distance {
					color: $text-sub-color;
					font-size: 20rpx;
				}
				.store-address {
					font-size: 24rpx;
					color: $text-sub-color;
					max-width: 260rpx;
				}
			}
		}
	}
}
</style>
