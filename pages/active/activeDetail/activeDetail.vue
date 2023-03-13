<template>
	<view class="active-detail" :class="{'finish': isFinish}">
		<view class="active-info-container safe-area-inset-bottom">
			<view class="image-container">
				<image class="active-image" :src="activeDetail.img"></image>
			</view>
			<view class="active-info">
				<view class="title-info u-flex">
					<view class="title u-line-1">
						{{activeDetail.title}}
					</view>
					<view class="tag">
						<text>{{activeDetail.statusName}}</text>
					</view>
					<view class="join-title">
						已有{{activeDetail.joinCount}}人参与
					</view>
				</view>
				<view class="main-text time-box">
					活动日期：{{activeDetail.beginDate}}-{{activeDetail.endDate}}
				</view>
				<view class="main-text">
					活动发起：{{activeDetail.storeName}}
				</view>
				<view class="main-text">
					活动限制：{{activeDetail.limit}}
				</view>
				<view class="main-text">
					活动说明：
				</view>
				<view class="main-text desc">
					{{activeDetail.content}}
				</view>
				<view class="main-text">
					活动奖励：
				</view>
				<view class="coupon-container">
					<CouponItem
						:isShowReceive="false"
						disabled
						:couponData="activeDetail.couponData"
					/>
				</view>
			</view>
		</view>
		<view class="bottom-wrap">
			<view class="share-box">
				<u-icon name="share-square" size="20"></u-icon>
				<view class="share-text">
					分享
				</view>
			</view>
			<view class="bottom-right">
				<view class="price">
					<text class="unit">￥</text>
					<text>{{activeDetail.price}}</text>
				</view>
				<u-button :color="btnColor" type="primary" size="small" @click="takeIn()">
					<text class="button-text">参与活动</text>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import CouponItem from '@/components/CouponItem/CouponItem.vue';
	import {activityJoin} from '@/server/api.js'
	export default {
		components: {
			CouponItem
		},
		data() {
			return {
				activeImage: require('@/static/image/activeImage.png'),
				isFinish: true,
				// activeDetail: {
				// 	title: '活动名称',
				// 	statusName: '进行中',
				// 	joinCount: '10',
				// 	beginDate: '2022/05/10',
				// 	endDate: '2022/09/12',
				// 	storeName: '门店名称',
				// 	content: '活动说明',
				// 	price: '90',
				// 	couponData: {
				// 		title: '优惠券名称',
				// 		beginDate: '2022/05/31',
				// 		endDate: '2022/09/12',
				// 		discount: 9
				// 	}
				// }
			};
		},
		onLoad() {
			this.isFinish = this.$store.getters.active.isFinish
		},
		computed: {
			activeDetail() {
				console.log('活动详情', this.$store.getters.active.activeDetail)
				return this.$store.getters.active.activeDetail
			},
			btnColor: function ({isFinish}) {
				return isFinish ? '#ECECEC' : '#FFDD22'
			}
		},
		methods: {
			async takeIn() {
				await activityJoin({
					actId:this.$store.getters.active.activeDetail.id
				})
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
.active-detail {
	width: 100%;
	background-color: #fff;
	.active-info-container {
		padding: 10rpx $padding 260rpx;
	}
	.image-container {
		width: 100%;
		height: 292rpx;
		border-radius: 12rpx;
		overflow: hidden;
		.active-image {
			width: 100%;
			height: 100%;
		}
	}
	.active-info {
		margin-top: 20rpx;
		.title-info {
			.title {
				font-size: 28rpx;
				max-width: 360rpx;
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
				background-color: rgba(255, 87, 34, .2);
				margin-left: 16rpx;
				font-weight: bold;
				color: #FE3E3D;
				text {
					transform: skewX(15deg);
				}
			}
			.join-title {
				color: $text-sub-color;
				font-size: 20rpx;
				flex: 1;
				text-align: right;
			}
		}
		.main-text {
			font-size: 24rpx;
			margin-top: 26rpx;
		}
		.time-box {
			color: $text-sub-color;
		}
		.desc {
			color: $text-sub-color;
			line-height: 33rpx;
		}
		.coupon-container {
			margin-top: 20rpx;
		}
	}
	.bottom-wrap {
		position: fixed;
		left: 0;
		width: 100%;
		height: 92rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 $padding;
		@include iphoneFixedBottom;
		.share-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.share-text {
				font-size: 20rpx;
				color: $text-sub-color;
				margin-top: 6rpx;
			}
		}
		.bottom-right {
			display: flex;
			align-items: center;
			.price {
				color: $price-color;
				display: flex;
				align-items: flex-end;
				font-size: 36rpx;
				line-height: 1;
				margin-right: 22rpx;
				.unit {
					font-size: 24rpx;
				}
			}
			& ::v-deep .u-button--small {
				width: 240rpx;
			}
		}
	}
	&.finish {
		.tag {
			background-color: rgba(185, 185, 185, .2) !important;
			color: $text-sub-color !important;
		}
		.button-text {
			color: $text-sub-color !important;
		}
	}
}
</style>
