<template>
	<view class="service-item" @click="toServiceDetail(item.id)" hover-class="u-hover-class">
		<u-image :src="item.image" width="168rpx" height="168rpx" radius="16rpx"></u-image>
		<view class="service-item-box">
			<view class="info-box">
				<view class="service-name u-line-2">
					{{item.title}}
				</view>
				<view class="sub-text">
					已有{{item.appointmentCount}}人预约
				</view>
			</view>
			<view class="u-flex">
				<view class="package-tag">
					<text>{{item.typeName}}</text>
				</view>
			</view>
			<view class="info-box">
				<view class="price-box">
					<view class="price-unit">￥</view>
					<view class="price">
						{{item.price}}
					</view>
<!-- 					<view class="unit">
						/次
					</view> -->
				</view>
				<view class="u-flex">
					<u-button size="mini" type="primary" @tap.stop="toAppointment(item.id)">预约</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ServiceItem",
		props: {
			item: Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			toAppointment (id) {
				uni.navigateTo({
					url: '/pages/appointment/appointment?id=' + id
				})
			},
			toServiceDetail (id) {
				uni.navigateTo({
					url: '/pages/serviceGoodsDetail/serviceGoodsDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.service {
	&-item {
		margin-bottom: 20rpx;
		width: 100%;
		padding: 20rpx;
		border: solid 1px $border-color;
		display: flex;
		&-box {
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
				.service-name {
					font-size: 28rpx;
					max-width: 260rpx;
				}
				.sub-text {
					color: $text-sub-color;
					font-size: 20rpx;
				}
				.price-box {
					color: $price-color;
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					align-items: flex-end;
					.price-unit {
						font-size: 24rpx;
					}
					.unit {
						font-weight: normal;
						font-size: 24rpx;
						color: $text-sub-color;
					}
				}
			}
			.package-tag {
				padding: 8rpx 16rpx;
				font-size: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 6rpx;
				transform: skewX(-15deg);
				background-color: rgba(255, 221, 34, .2);
				font-weight: bold;
				text {
					transform: skewX(15deg);
				}
			}
		}
	}
}
</style>