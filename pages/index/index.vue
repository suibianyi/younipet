<template>
	<view class="content">
		<view class="top-tips" v-if="!userData.isVip && showTip">
			<u-icon name="close" size="14" @click="showTip = false"></u-icon>
			<view class="name">昵****称刚刚成为了会员</view>
			<view class="u-flex">
				<u-button type="primary" size="mini" @click="toBecomeVipPage">成为会员</u-button>
			</view>
		</view>
		<view class="header-container">
			<SelectCity />
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
						<text>{{userData.vipType}}</text>
					</view>
					<view class="express-time">
						截止{{userData.vipExpress | date('yyyy-mm-dd')}}到期
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
		<view class="middle-container">
			<view class="vip-container" v-if="!userData.isVip">
				<view class="u-flex">
					<image class="vip-icon" src="@/static/image/index/vip-icon.png"></image>
					<text>立即开通成为会员</text>
				</view>
				<view class="u-flex">
					<u-button type="primary" size="mini" @click="toBecomeVipPage">成为会员</u-button>
				</view>
			</view>
			<view class="block-container">
				<navigator url="/pages/product/product" open-type="switchTab" class="block-item big-block" hover-class="u-hover-class">
					<image class="big-block-icon" src="@/static/image/index/index-icon-1.png" mode="widthFix"></image>
					<view class="big-block-title">
						线上商城
					</view>
				</navigator>
				<navigator class="block-item big-block" hover-class="u-hover-class" url="/pages/index/pickUpAtStore/pickUpAtStore">
					<image class="big-block-icon" src="@/static/image/index/index-icon-2.png" mode="widthFix"></image>
					<view class="big-block-title">
						到店自取
					</view>
				</navigator>
			</view>
			<view class="block-container">
				<div class="block-item small-block" hover-class="u-hover-class" @click="intoService(1)">
					<image class="small-block-icon" src="@/static/image/index/index-icon-3.png" mode="widthFix"></image>
					<view class="small-block-title">
						寄养
					</view>
				</div>
				<div class="block-item small-block" hover-class="u-hover-class" @click="intoService(2)">
					<image class="small-block-icon" src="@/static/image/index/index-icon-4.png" mode="widthFix"></image>
					<view class="small-block-title">
						接送
					</view>
				</div>
				<div class="block-item small-block" hover-class="u-hover-class" @click="intoService(3)">
					<image class="small-block-icon" src="@/static/image/index/index-icon-5.png" mode="widthFix"></image>
					<view class="small-block-title">
						洗护
					</view>
				</div>
				<div class="block-item small-block" hover-class="u-hover-class" @click="intoService(4)">
					<image class="small-block-icon" src="@/static/image/index/index-icon-6.png" mode="widthFix"></image>
					<view class="small-block-title">
						培训
					</view>
				</div>
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
				<navigator class="more-title" hover-class="u-hover-class" url="/pages/storeIndex/moreGoods/moreGoods">
					更多<u-icon name="arrow-right" color="#B9B9B9" size="8"></u-icon>
				</navigator>
			</view>
			<view class="store-list">
				<swiper class="swiper" circular autoplay>
					<swiper-item v-for="(item, index) in storeSwiperList" :key="index">
						<view class="store-item" v-for="(oItem, idx) in item.goodsList" :key="idx">
							<u-image :src="oItem.goodsThumb" width="168rpx" height="168rpx" radius="16rpx"></u-image>
							<view class="store-info-box">
								<view class="info-box">
									<view class="goods-name u-line-2">
										{{oItem.goodsName}}
									</view>
									<view class="store-distance">
										距离您 {{oItem.distance}}
									</view>
								</view>
								<view class="info-box bottom-info-box">
									<view class="">
										<view class="price-box">
											<image class="vip-icon" src="@/static/image/goods-vip.png" mode="widthFix"></image>
											<view class="price">
												{{oItem.vipPrice}}元
											</view>
											<view class="origin-price">
												{{oItem.price}}元
											</view>
										</view>
										<view class="bottom-box">
											<text class="store-name u-line-1">
												{{oItem.merchantName}}
											</text>
											<text >
												库存{{oItem.stock}}
											</text>
										</view>
									</view>
									<view class="u-flex">
										<u-button size="mini" type="primary" @click="toStoreIndex(oItem.goodsId)">进入</u-button>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="recommend-container">
			<u-sticky bgColor="#fff">
				<u-tabs :list="tabList" @change="changeTabs"></u-tabs>
			</u-sticky>
			<view class="goods-list-container">
				<GoodsItem v-for="(item, index) in goodsList" :key="index" :item="item" />
			</view>
		</view>
		<u-back-top
			:scroll-top="scrollTop"
			zIndex="99999"
			:iconStyle="{
				color: '#444444',
			}"
			:customStyle="{
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				border: 'solid 1px #F4F1F1'
			}"
		></u-back-top>
	</view>
</template>

<script>
	// import { mapGetters } from 'vuex'
	import StoreGoodsItem from '@/components/StoreGoodsItem/StoreGoodsItem.vue';
	import GoodsItem from '@/components/GoodsItem/GoodsItem.vue';
	import SelectCity from '@/components/SelectCity/SelectCity';
	import { categoryList, productList, productStockList, userHomePage, getUserInfo, activityList } from '@/server/api.js'
	// import { postMenu } from '@/server/api.js'
	export default {
		components: {
			StoreGoodsItem,
			GoodsItem,
			SelectCity,
		},
		data() {
			return {
				statisticsData: {
					appointmentCount: '111',
					voucherCount: '222',
					orderCount: '333'
				},
				hotBanner: 'https://cdn.uviewui.com/uview/album/1.jpg',
				scrollTop: 0,
				showTip: true,
				tabList: [
					{
					name: '推荐',
					id: 1,
					}, {
					name: '推荐',
					id: 2,
					}, {
					name: '推荐',
					id: 3,
					}, {
					name: '推荐',
					id: 4,
					}, {
					name: '推荐',
					id: 5,
					},
				],
				storeSwiperList: [
					{
						goodsList: [
							{
								goodsId: '1',
								goodsThumb: require('@/static/image/goods-image.png'),
								goodsName: '商品名称',
								distance: '3.2km',
								vipPrice: '80',
								price: '96',
								merchantName: '商家名称',
								stock: '108'
							},
						]
					},
					{
						goodsList: [
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
					},
				],
				goodsList: [
					{
						goodsId: '1',
						goodsThumb: require('@/static/image/goods-image.png'),
						goodsName: '商品名称',
						price: '96',
						saleCount: '3000'
					}
				]
			};
		},
		async onShow() {
			const getUserInfo132 = uni.getStorageSync('userInfo')
			console.log('获取的身份信息', getUserInfo132)
			if(!getUserInfo132 || !getUserInfo132.openid) {
				uni.navigateTo({
					url: './authorize/authorize'
				});
			} else {
				this.$store.dispatch('saveUserInfo', Object.assign({}, getUserInfo132))
			}
			const res = await userHomePage({ custom: { auth: true }})
			if(res) {
				this.statisticsData.appointmentCount = res.todayBookNum
				this.statisticsData.voucherCount = res.couponNum
				this.statisticsData.orderCount = res.orderNum
			}
			console.log('获取的首页数据', res)
			this.tabList = await categoryList({
				type:1
			})
			await this.getProduct(this.tabList[0])
			// 获取热门推荐
			await this.getRecommendList()
			const actList = await activityList({
				isHot: true
			})
			if (actList.length==0) {
				this.hotBanner = ''
			} else {
				const abc = JSON.parse(actList[0].content)
				this.hotBanner = abc[0].img
			}
		},
		async onLoad() {

		},
		computed: {
			userData() {
				return this.$store.getters.user
			}
		},

		onPageScroll (e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			intoService(data) {
				console.log('开始页面跳转')
				uni.navigateTo({
					url: '/pages/index/service/service?detailInfo='+ data
				})

			},
			async changeTabs(item) {
				console.log(item)
				await this.getProduct(item)
			},
			async getRecommendList() {
				console.log('1111',this.storeSwiperList)
				const res = await productList({
					recommend: true,
					type: 1
				})
				const isVip = this.$store.getters.user.isVip
				this.storeSwiperList =[]
				for(const item of res) {
					const goodList ={}
					goodList.goodsList =[]
					goodList.goodsList.push({
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
					this.storeSwiperList.push(goodList)
				}
				console.log('22222',this.storeSwiperList)
			},
			async getProduct(tab) {
				this.goodsList =[]
				const res = await productList({
					category: tab.id,
					type: 1
				})
				const isVip = this.$store.getters.user.isVip
				for(const item of res) {
					this.goodsList.push({
						goodsId:item.id,
						goodsName:item.name,
						goodsThumb: JSON.parse(item.img)[0],
						vipPrice:item.productStockList[0].vipPrice,
						price:`${isVip?item.productStockList[0].vipPrice:item.productStockList[0].price}`,
						// price:item.productStockList[0].price,
						stock: item.productStockList[0].stockNum,
						saleCount: item.saleNum
					})
				}
				// {
				// 	goodsId: '2',
				// 	goodsThumb: require('@/static/image/goods-image.png'),
				// 	goodsName: '商品名称',
				// 	distance: '3.2km',
				// 	vipPrice: '80',
				// 	price: '96',
				// 	merchantName: '商家名称',
				// 	stock: '108'
				// },
			},
			toBecomeVipPage () {
				uni.navigateTo({
					url: '/pages/index/becomeVip/becomeVip'
				})
			},
			// changeTabs (index, item) {
			// 	console.log(index)
			// },
			toStoreIndex () {
				uni.navigateTo({
					url: '/pages/storeIndex/storeIndex'
				})
			}
		}
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
	.store-list {
		margin-top: 20rpx;
		width: 100%;
		background-color: #fff;
		.swiper {
			height: 240 * 3 - 40rpx;
		}
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
					&.bottom-info-box {
						align-items: flex-end;
					}
					.goods-name {
						font-size: 28rpx;
						max-width: 290rpx;
						line-height: 40rpx;
					}
					.store-distance {
						color: $text-sub-color;
						font-size: 20rpx;
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
						.store-name {
							color: $text-color;
							font-size: 22rpx;
							max-width: 120rpx;
						}
					}
				}
			}
		}
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