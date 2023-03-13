<template>
	<view class="content">
		<view class="top-tips" v-if="showTip && !userData.isVip">
			<u-icon name="close" size="14" @click="showTip = false"></u-icon>
			<view class="name">昵****称刚刚成为了会员</view>
			<view class="u-flex">
				<u-button type="primary" size="mini" @click="toBecomeVipPage">成为会员</u-button>
			</view>
		</view>
		<view class="header-container">
			<view class="header-container-top">
				<SelectCity />
				<view class="store-name">
					{{storeName}}门店
				</view>
			</view>
			<view class="account-box">
				<u-avatar size="54" :src="userData.avatar" ></u-avatar>
				<view class="account-info">
					<view class="name u-line-1">
						{{userData.nickName}}
					</view>
					<view class="">
						YNID: {{userData.ynId}}
					</view>
				</view>
				<view class="other-info u-flex" v-if="userData.isVip">
					<view class="vip-box">
						<image class="vip-icon" src="@/static/image/index/vip-icon.png"></image>
						<text>会员类型</text>
					</view>
					<view class="express-time">
						截止{{userData.vipExpress}}到期
					</view>
				</view>
			</view>
			<view class="header-bottom-container u-flex u-flex-around">
				<view class="bottom-item ">
					<view class="count">
						{{statisticsData.appointmentCount}}
					</view>
					<view class="title">
						今日预约
					</view>
				</view>
				<view class="bottom-item ">
					<view class="count">
						{{statisticsData.voucherCount}}
					</view>
					<view class="title">
						卡券 (张)
					</view>
				</view>
				<view class="bottom-item ">
					<view class="count">
						{{statisticsData.orderCount}}
					</view>
					<view class="title">
						订单数量
					</view>
				</view>
			</view>
		</view>
		<view class="middle-container" v-if="!userData.isVip">
			<view class="vip-container">
				<view class="u-flex">
					<image class="vip-icon" src="@/static/image/index/vip-icon.png"></image>
					<text>立即开通成为会员</text>
				</view>
				<view class="u-flex">
					<u-button type="primary" size="mini" @click="toBecomeVipPage">成为会员</u-button>
				</view>
			</view>
		</view>
		<view class="active-container" v-if="hotBanner">
			<view class="container-title-box">
				<view class="container-title">
					热门活动
				</view>
			</view>
			<image class="active-image" mode="aspectFill" :src="hotBanner"></image>
		</view>
		<view class="active-container">
			<view class="container-title-box">
				<view class="container-title">
					热门推荐
				</view>
				<navigator class="more-title" hover-class="u-hover-class" :url="'/pages/storeIndex/moreGoods/moreGoods?id='+storeId">
					更多<u-icon name="arrow-right" color="#B9B9B9" size="8"></u-icon>
				</navigator>
			</view>
			<view class="container-content-box">
				<StoreGoodsItem v-for="(item, index) in storeGoodsList" :key="index" :item="item" />
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import StoreGoodsItem from '@/components/StoreGoodsItem/StoreGoodsItem.vue';
	import SelectCity from '@/components/SelectCity/SelectCity';
	import { categoryList, productList, productStockList, userHomePage, getUserInfo, storeList,activityList } from '@/server/api.js'
	export default {
		components: {
			StoreGoodsItem,
			SelectCity,
		},
		data() {
			return {
				storeId: '',
				storeName:'',
				showTip: true,
				statisticsData: {
					appointmentCount: '111',
					voucherCount: '222',
					orderCount: '333'
				},
				hotBanner: 'https://cdn.uviewui.com/uview/album/1.jpg',
				storeGoodsList: [
					{
						goodsId: '2',
						goodsThumb: require('@/static/image/goods-image.png'),
						goodsName: '商品名称',
						distance: '3.2km',
						vipPrice: '80',
						price: '96',
						merchantName: '商家名称',
						stock: '108'
					},
				]
			};
		},
		computed: {
			userData() {
				return this.$store.getters.user
			}
		},
		async onLoad (options) {
			this.storeId = options.id;
			const res = await userHomePage({ custom: { auth: true }})
			if(res) {
				this.statisticsData.appointmentCount = res.todayBookNum
				this.statisticsData.voucherCount = res.couponNum
				this.statisticsData.orderCount = res.orderNum
			}
			const actList = await activityList({
				isHot: true,
				storeId: this.storeId
			})
			if (actList.length==0) {
				this.hotBanner = ''
			} else {
				const abc = JSON.parse(actList[0].content)
				this.hotBanner = abc[0].img
			}
			const resStore = await storeList({ custom: { auth: true }})
			for (const item of resStore) {
				if (item.id==this.storeId) {
					this.storeName = item.storeName
				}
			}
			const resProduct = await productList({
				recommend: true,
				type: 1,
				storeId: this.storeId
			})
			this.storeGoodsList =[]
			for(const item of resProduct) {
				this.storeGoodsList.push({
					goodsId:item.id,
					goodsName:item.name,
					goodsThumb: JSON.parse(item.img)[0],
					vipPrice:item.productStockList[0].vipPrice,
					price:item.productStockList[0].price,
					stock: item.productStockList[0].stockNum,
					merchantName:'暗室逢灯的',
					distance: '昂士大夫',
					saleCount: item.saleNum
				})
			}
		},
		methods: {
			toBecomeVipPage () {
				uni.navigateTo({
					url: '/pages/index/becomeVip/becomeVip'
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.container-title-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
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
.top-tips {
	width: 100%;
	height: 72rpx;
	background-color: rgba(255, 221, 34, 0.3);
	display: flex;
	align-items: center;
	padding: 0 $padding;
	z-index: 2;
	.name {
		flex: 1;
		font-size: 26rpx;
		margin-left: 12rpx;
	}
}
.header-container {
	width: 100%;
	padding: 38rpx $padding 32rpx;
	background: linear-gradient(180deg, $main-color 0%, $main-color 0%, #FFFFFF 78%, #FFFFFF 101%, #FFFFFF 101%);
	&-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.store-name {
			font-size: 26rpx;
		}
	}
	.account-box {
		margin-top: 40rpx;
		width: 100%;
		height: 54px;
		display: flex;
		.account-info {
			padding: 14rpx 0;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			max-width: 200rpx;
			.name {
				font-size: 36rpx;
				font-weight: bold;
				width: 100%;
			}
		}
		.other-info {
			height: 44rpx;
			margin-top: 14rpx;
			margin-left: 22rpx;
			.vip-box {
				display: flex;
				align-items: center;
				width: 140rpx;
				height: 44rpx;
				background: rgba(255, 221, 34, .2);
				border-radius: 10rpx;
				font-size: 24rpx;
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
	}
	.header-bottom-container {
		margin-top: 50rpx;
		.bottom-item {
			width: 33%;
			text-align: center;
			.count {
				font-size: 36rpx;
				font-weight: bold;
			}
			.title {
				font-size: 28rpx;
				color: $text-sub-color;
				margin-top: 10rpx;
			}
		}
	}
}
.middle-container {
	padding: 20rpx $padding;
	.vip-container {
		width: 100%;
		height: 80rpx;
		border-radius: 20rpx;
		background-color: rgba(45, 45, 45, .9);
		padding: 8rpx 21rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #FFFFFF;
		.vip-icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 12rpx;
		}
	}
	.block-container {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.block-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}
	.big-block {
		width: 336rpx;
		height: 280rpx;
		&-icon {
			width: 86rpx;
			height: auto;
			margin-bottom: 20rpx;
		}
		&-title {
			font-size: 32rpx;
		}
	}
	.small-block {
		width: 164rpx;
		height: 188rpx;
		&-icon {
			width: 60rpx;
			height: auto;
			margin-bottom: 20rpx;
		}
		&-title {
			font-size: 26rpx;
		}
	}
}
.active-container {
	background-color: #FFFFFF;
	padding: 40rpx $padding;
	.active-image {
		width: 100%;
		height: 140rpx;
		border-radius: 12rpx;
		margin-top: 20rpx;
	}
	& + .active-container {
		margin-top: 20rpx;
	}
	.container-content-box {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 18rpx;
	}
}

.recommend-container {
	margin-top: 20rpx;
	padding: 0 25rpx;
	background-color: #FFFFFF;
	.goods-list-container {
		padding: 20rpx 25rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
}
</style>