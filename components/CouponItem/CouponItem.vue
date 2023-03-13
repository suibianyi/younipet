<template>
	<view class="coupon-item" :class="[{'is-vip-coupon': isVip}, {'is-disabled': disabled}]">
		<image class="coupon-bg" :src="couponBgImg" mode="widthFix"></image>
		<view class="coupon-container">
			<view class="coupon-left">
				<view class="discount-box">
					<view class="value">{{couponData.discount}}</view>
					<view class="">折</view>
				</view>
			</view>
			<view class="coupon-middle">
				<view class="coupon-title u-line-1">
					{{couponData.title}}
				</view>
				<view class="coupon-time">
					有效期:{{couponData.beginDate}}-{{couponData.endDate}}
				</view>
			</view>
			<view class="coupon-right" @click="getCoupon1()">
				<view v-if="isShowReceive">
					立即领取
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCoupon } from '@/server/api.js'
	export default {
		name: "CouponItem",
		props: {
			isVip: {
				type: Boolean,
				default: false
			},
			isShowReceive: {
				type: Boolean,
				default: true
			},
			disabled:{
				type: Boolean,
				default: false
			},
			couponData: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
			};
		},
		computed: {
			couponBgImg: function ({isVip}) {
				return isVip ? require('@/static/image/vip-coupon-bg.png') : require('@/static/image/normal-coupon-bg.png')
			}
		},
		methods: {
			async getCoupon1() {
				await getCoupon({ custom: { auth: true }, params:{
						id: this.couponData.id
					}})
					uni.showToast({
						title: "领券成功"
					})
					this.$emit('submit');
			}
		}
	}
</script>

<style lang="scss" scoped>
.coupon-item {
	width: 100%;
	height: 144rpx;
	position: relative;
	margin-bottom: 20rpx;
	.coupon-bg {
		width: 100%;
		height: auto;
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
	}
	.coupon-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 2;
		.coupon-left {
			flex-shrink: 0;
			width: 152rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			font-size: 20rpx;
			.discount-box {
				display: flex;
				align-items: flex-end;
				color: $price-color;
				.value {
					font-size: 48rpx;
					font-weight: bold;
				}
			}
			&::after {
				content: '';
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 4rpx;
				height: 76rpx;
				background-color: #F0E3E3;
			}
		}
		.coupon-middle {
			margin-left: 16rpx;
			margin-right: 30rpx;
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.coupon-title {
				font-size: 24rpx;
				font-weight: bold;
			}
			.coupon-time {
				font-size: 22rpx;
				color: $text-sub-color;
				margin-top: 20rpx;
			}
		}
		.coupon-right {
			flex-shrink: 0;
			width: 134rpx;
			font-size: 28rpx;
			color: #fff;
			font-weight: bold;
		}
	}
}
.is-vip-coupon {
	.discount-box {
		color: #D99E44 !important;
	}
	.coupon-right {
		color: $text-color!important;
	}
}
.is-disabled {
	.coupon-bg {
		filter: grayscale(100%);
	}
	.discount-box {
		color: $text-sub-color !important;
	}
}
</style>