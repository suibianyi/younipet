<template>
	<view class="container">
		<view class="top-bg"></view>
		<view class="person-info-box">
			<view class="avatar-container">
				<view class="avatar">
					<u-avatar size="86" :src="userData.avatar" ></u-avatar>
				</view>
				<u-button @click="toEditPerson" type="primary" size="small" text="编辑" :customStyle="editButtonStyle"></u-button>
			</view>
			<view class="name-container">
				<view class="name u-line-1">
					{{userData.nickName}}
				</view>
				<template v-if="userData.isVip">
					<view class="vip-box">
						<image class="vip-icon" src="@/static/image/index/vip-icon.png"></image>
						<text>{{userData.vipType}}</text>
					</view>
					<view class="express-time">
						截止{{userData.vipExpress | date('yyyy-mm-dd')}}到期
					</view>
				</template>
				
			</view>
			<view class="bottom-container">
				<navigator class="bottom-item" hover-class="u-hover-class" url="/pages/person/historyActive/historyActive">
					<view class="count" >
						{{statisticsData.appointmentCount}}
					</view>
					<view class="">
						预约记录
					</view>
				</navigator>
				<navigator class="bottom-item" hover-class="u-hover-class" url="/pages/person/couponCenter/couponCenter">
					<view class="count">
						{{statisticsData.couponCount}}
					</view>
					<view class="">
						领券记录
					</view>
				</navigator>
			</view>
		</view>
		<view class="ad-image-container">
			<image class="image" :src="banner" mode="aspectFill"></image>
		</view>
		<view class="block-container">
			<view class="container-title-box">
				<view class="container-title">
					全部订单
				</view>
				<navigator class="more-title" hover-class="u-hover-class" url="/pages/orderList/orderList?status=0">
					查看<u-icon name="arrow-right" color="#B9B9B9" size="8"></u-icon>
				</navigator>
			</view>
			<view class="block-list">
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/orderList/orderList?status=1">
					<image class="icon" src="@/static/image/person/order-icon-1.png"></image>
					<view class="">
						待付款
					</view>
				</navigator>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/orderList/orderList?status=2">
					<image class="icon" src="@/static/image/person/order-icon-2.png"></image>
					<view class="">
						待发货
					</view>
				</navigator>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/orderList/orderList?status=3">
					<image class="icon" src="@/static/image/person/order-icon-3.png"></image>
					<view class="">
						待收货
					</view>
				</navigator>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/orderList/orderList?status=4">
					<image class="icon" src="@/static/image/person/order-icon-4.png"></image>
					<view class="">
						待自提
					</view>
				</navigator>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/afterSalesList/afterSalesList">
					<image class="icon" src="@/static/image/person/order-icon-5.png"></image>
					<view class="">
						退款/售后
					</view>
				</navigator>
			</view>
		</view>
		<view class="block-container">
			<view class="container-title-box">
				<view class="container-title">
					其他管理
				</view>
				<!-- <view class="more-title" hover-class="u-hover-class">
					查看<u-icon name="arrow-right" color="#B9B9B9" size="8"></u-icon>
				</view> -->
			</view>
			<view class="block-list">
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/person/myActive/myActive">
					<image class="icon" src="@/static/image/person/manage-icon-1.png"></image>
					<view class="">
						我的活动
					</view>
				</navigator>
				<view class="block-item" hover-class="u-hover-class">
					<image class="icon" src="@/static/image/person/manage-icon-2.png"></image>
					<view class="">
						消息中心
					</view>
				</view>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/person/address/address">
					<image class="icon" src="@/static/image/person/manage-icon-3.png"></image>
					<view class="">
						收货地址
					</view>
				</navigator>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/person/editPerson/editPerson">
					<image class="icon" src="@/static/image/person/manage-icon-4.png"></image>
					<view class="">
						基础设置
					</view>
				</navigator>
				<navigator class="block-item" hover-class="u-hover-class" url="/pages/person/becomeShareholder/becomeShareholder">
					<image class="icon" src="@/static/image/person/manage-icon-5.png"></image>
					<view class="">
						成为股东
					</view>
				</navigator>
				<view class="block-item" hover-class="u-hover-class">
					<image class="icon" src="@/static/image/person/manage-icon-6.png"></image>
					<view class="">
						帮助中心
					</view>
				</view>
				<view class="block-item" hover-class="u-hover-class">
					<image class="icon" src="@/static/image/person/manage-icon-7.png"></image>
					<view class="">
						客服中心
					</view>
				</view>
				<view class="block-item" hover-class="u-hover-class">
					<image class="icon" src="@/static/image/person/manage-icon-8.png"></image>
					<view class="">
						关于我们
					</view>
				</view>
			</view>
		</view>
		<view class="login-button" hover-class="u-hover-class" @click="logout()">退出登录</view>
	</view>
</template>

<script>
	import { userPersonalCenter } from '@/server/api.js'
	export default {
		data() {
			return {
				editButtonStyle: {
					width: '134rpx',
					margin: 0
				},
				banner: require('@/static/image/activeImage.png'),
				statisticsData: {
					appointmentCount: '11',
					couponCount: '22'
				}
			};
		},
		async onLoad() {
			const res = await userPersonalCenter({ custom: { auth: true }})

			if(res) {
				this.statisticsData.appointmentCount = res.bookNum
				this.statisticsData.couponCount = res.getCouponNum
			}
		},
		computed: {
			userData() {
				return this.$store.getters.user
			}
		},
		methods: {
			toEditPerson () {
				uni.navigateTo({
					url: '/pages/person/editPerson/editPerson'
				})
			},
			logout() {
				console.log('我要退出登录')
				uni.setStorageSync('userInfo', {})
				uni.navigateTo({
					url: '/pages/index/authorize/authorize'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.top-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 370rpx;
	background-color: #FAE34D;
}
.person-info-box {
	width: 100%;
	background-color: #ffffff;
	border-radius: 60rpx 60rpx 0 0;
	margin-top: 200rpx;
	padding: 38rpx $padding 20rpx;
	position: relative;
	.avatar-container {
		position: relative;
		display: flex;
		justify-content: space-between;
		.avatar {
			margin-top: -110rpx;
		}
	}
	.name-container {
		display: flex;
		align-items: center;
		margin-top: 36rpx;
		.name {
			font-size: 36rpx;
			font-weight: bold;
		}
		.vip-box {
			display: flex;
			align-items: center;
			width: 140rpx;
			height: 44rpx;
			background: rgba(255, 221, 34, .2);
			border-radius: 10rpx;
			font-size: 24rpx;
			margin-left: 20rpx;
			.vip-icon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 5rpx;
			}
		}
		.express-time {
			color: $text-sub-color;
			font-size: 20rpx;
			margin-left: 20rpx;
		}
	}
	.bottom-container {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		.bottom-item {
			width: 332rpx;
			height: 144rpx;
			border: solid 1px $border-color;
			border-radius: 12rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.count {
				font-size: 36rpx;
				color: $text-tip-color;
				margin-bottom: 16rpx;
			}
		}
	}
}
.ad-image-container {
	padding: 20rpx $padding;
	.image {
		width: 100%;
		height: 164rpx;
		border-radius: 12rpx;
		overflow: hidden;
	}
}
.block-container {
	width: 100%;
	padding: $padding;
	background-color: #ffffff;
	& + .block-container {
		margin-top: 20rpx;
	}
	.container-title-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 32rpx;
		.container-title {
			font-size: 32rpx;
			font-weight: bold;
		}
		.more-title {
			display: flex;
			align-items: center;
			color: $text-sub-color;
			font-size: 24rpx;
		}
	}
	.block-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.block-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 20%;
			margin-bottom: 20rpx;
			.icon {
				width: 54rpx;
				height: 54rpx;
				margin-bottom: 25rpx;
			}
		}
	}
}
.login-button {
	width: 626rpx;
	height: 92rpx;
	border: solid 1px $text-sub-color;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 200rpx;
	margin: 100rpx auto 130rpx;
	font-weight: bold;
	font-size: 32rpx;
}
</style>
