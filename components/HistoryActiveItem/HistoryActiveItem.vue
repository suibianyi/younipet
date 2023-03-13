<template>
	<view class="history-active-item">
		<view class="store-info">
			<view class="u-flex">
				<view class="store-name">
					{{appointmentData.storeName}}
				</view>
				<view class="tag">
					<text>{{appointmentData.appointmentName}}</text>
				</view>
			</view>
		</view>
		<view class="store-desc-info">
			<view class="desc-info-item">
				<u-icon name="clock" color="#B9B9B9" size="13"></u-icon>
				<view class="desc">{{appointmentData.date}} {{appointmentData.startTime}} - {{appointmentData.endTime}}</view>
			</view>
			<view class="desc-info-item">
				<u-icon name="map" color="#B9B9B9" size="14"></u-icon>
				<view class="desc">
					{{appointmentData.storeAddress}}
				</view>
			</view>
		</view>
		<view class="history-acitve-bottom">
			<view class="button-block" hover-class="u-hover-class" @click="toAddress">
				<image class="icon" src="@/static/image/person/address-icon.png"></image>
				导航
			</view>
			<view class="button-block" hover-class="u-hover-class" @click="toCall">
				<image class="icon" src="@/static/image/person/phone-icon.png"></image>
				电话
			</view>
			<view class="button-block" hover-class="u-hover-class">
				<image class="icon" src="@/static/image/person/qrcode-icon.png"></image>
				核销码
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"HistoryActiveItem",
		props: {
			appointmentData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			toCall () {
				const { appointmentData: {mobile: phoneNumber} } = this;
				uni.makePhoneCall({
					phoneNumber
				})
			},
			toAddress () {
				uni.openLocation({
					latitude: '',
					longitude: '',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.history-active-item {
	width: 100%;
	padding: 20rpx;
	border: solid 1px $border-color;
	border-radius: 16rpx;
	.store-info {
		margin-bottom: 20rpx;
		.store-name {
			font-size: 28rpx;
		}
		.tag {
			width: 114rpx;
			height: 40rpx;
			font-size: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 6rpx;
			transform: skewX(-15deg);
			background-color: rgba(255, 221, 34, .2);
			margin-left: 16rpx;
			font-weight: bold;
			color: $text-color;
			text {
				transform: skewX(15deg);
			}
		}
	}
	.store-desc-info {
		font-size: 24rpx;
		color: $text-sub-color;
		.desc-info-item {
			display: flex;
			align-items: center;
			margin-bottom: 14rpx;
			&:last-child {
				margin-bottom: 20rpx;
			}
			.desc {
				margin-left: 10rpx;
			}
		}
	}
	.history-acitve-bottom {
		border-top: solid 1px $border-color;
		padding: 12rpx 28rpx 0;
		display: flex;
		justify-content: space-between;
		.button-block {
			display: flex;
			align-items: center;
			font-size: 22rpx;
			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 8rpx;
			}
		}
	}
}
</style>