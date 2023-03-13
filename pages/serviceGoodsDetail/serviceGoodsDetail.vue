<template>
	<view class="container safe-area-inset-bottom">
		<GoodsDetailBanner :list="serviceGoodsData.bannerList"/>
		<view class="product-container">
			<view class="price-box-container">
				<view class="price-box">
					<view class="price">
						<view class="price-unit">￥</view>
						{{serviceGoodsData.price}}
<!-- 						<view class="price-unit">/月（{{serviceGoodsData.count}}次）</view> -->
					</view>
				</view>
				<view class="sub-text">
					已有{{serviceGoodsData.appointmentCount}}人预约
				</view>
			</view>
			<view class="title-container">
				{{serviceGoodsData.serviceName}}
			</view>
		</view>
		<GoodsDetailStore :storeData="storeData" />
		<view class="package-container">
			<view class="package-title">
				套餐说明
			</view>
			<view class="package-list">
				<view class="package-item" v-for="(item, index) in packageList" :key="index">
					<view class="package-info">
						<view class="package-name-box">
							<view class="package-name">
								{{item.name}}
							</view>
							<view class="package-tag">
								<text>{{item.typeName}}</text>
							</view>
						</view>
						<view class="price-box">
							<view class="price-unit">￥</view>
							<view class="price">
								{{item.price}}
							</view>
							<view class="unit">
								/次
							</view>
						</view>
					</view>
					<view class="u-flex">
						<u-button size="mini" type="primary" @click.stop="toAppointment(item.id)">预约</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="desc-container">
			<view class="desc-title">
				服务案例
			</view>
			<u-parse :content="serviceGoodsData.content"></u-parse>
		</view>
		<view class="bottom-btn-container">
			<view class="icon-group">
				<view class="icon-item">
					<button type="default"  open-type="share">
						<view class="icon-container">
							<image class="icon" src="@/static/image/share-icon.png" mode="widthFix"></image>
						</view>
						<view class="text">
							分享
						</view>
				</button>
					</view>
				<view class="icon-item">
					<button plain open-type='contact' session-from=''>
						<view class="icon-container">
							<image class="icon" src="@/static/image/service-icon.png" mode="widthFix"></image>
						</view>
						<view class="text">
							客服
						</view>
					</button>
				</view>
				<navigator class="icon-item" hover-class="u-hover-class" url="/pages/storeIndex/storeIndex">
					<view class="icon-container">
						<image class="icon" src="@/static/image/store-icon.png" mode="widthFix"></image>
					</view>
					<view class="text">
						门店
					</view>
				</navigator>
			</view>
			<view class="u-flex button-group">
				<u-button
					type="primary" 
					size="small"
					:customStyle="{
						width: '240rpx'
					}"
					@click="toAppointment(serviceGoodsData.id)"
				>立即预约</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import GoodsDetailBanner from '@/components/GoodsDetailBanner/GoodsDetailBanner.vue';
	import GoodsDetailStore from '@/components/GoodsDetailStore/GoodsDetailStore.vue';
	import {productDetail, productComboProduct } from '@/server/api.js'
	export default {
		components: {
			GoodsDetailBanner,
			GoodsDetailStore
		},
		data() {
			return {
				myMap:[0,'次','月','年'],
				serviceGoodsData: {
					id: '1',
					bannerList: [
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg'
					],
					price: '98.00',
					count: '12',
					appointmentCount: '111',
					serviceName: '服务名称',
					content: '产品展示富文本',
				},
				storeData: {
					storeId: '1',
					storeImage: 'https://cdn.uviewui.com/uview/album/1.jpg',
					storeName: '门店名称',
					distance: '3.2km'
				},
				packageList: [
					{
						name: '洗护名称',
						price: '45',
						typeName: '基础洗护',
						id: '1'
						
					}
				]
				
			};
		},
		async onLoad(option) {
			if(option) {
				console.log('123456798', option)
				const res = await productDetail({ custom: { auth: true }, params:{pdId: option.id}})
				console.log('获得的商品详情', res)
				this.serviceGoodsData.id = option.id
				this.serviceGoodsData.bannerList = []
				for(const item of JSON.parse(res.img)) {
					this.serviceGoodsData.bannerList.push(item)
				}
				const isVip = this.$store.getters.user.isVip
				this.serviceGoodsData.price=`${isVip?res.productStockList[0].vipPrice:res.productStockList[0].price}/${res.stockUnit}`
				// this.serviceGoodsData.price=isVip?res.productStockList[0].vipPrice:res.productStockList[0].price
				this.serviceGoodsData.count=res.productStockList[0].price
				this.serviceGoodsData.appointmentCount=res.saleNum
				this.serviceGoodsData.serviceName=res.name
				this.storeData.id = res.store.id
				this.storeData.storeImage = res.store.img
				this.storeData.storeName = res.store.storeName
				
				const res2 = await productComboProduct({ custom: { auth: true }, params:{pdId: option.id}})
				this.packageList = []
				for(const item of res2) {
					this.packageList.push({
						name: item.master.name,
						price: isVip?item.master.productStockList[0].vipPrice:item.master.productStockList[0].price,
						typeName: item.master.tag,
						id: item.master.id
					})
				}
			}
		},
		methods: {
			toAppointment (id) {
				uni.navigateTo({
					url: '/pages/appointment/appointment?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	padding-bottom: 112rpx;
}
.product-container {
	width: 100%;
	padding: $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.price-box-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.price-box {
			display: flex;
			align-items: flex-end;
			.price {
				color: $price-color;
				font-size: 40rpx;
				font-weight: bold;
				display: flex;
				align-items: flex-end;
				.price-unit {
					font-size: 24rpx;
				}
			}
		}
		.sub-text {
			color: $text-sub-color;
			font-size: 24rpx;
		}
	}
	.title-container {
		font-size: 28rpx;
		line-height: 36rpx;
		margin: 26rpx 0;
	}
}

.desc-container {
	width: 100%;
	padding: 24rpx $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.desc-title {
		font-size: 24rpx;
		font-weight: 500;
		margin-bottom: 20rpx;
		font-weight: bold;
	}
}
.package-container {
	width: 100%;
	padding: 24rpx $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.package-title {
		font-size: 32rpx;
		margin-bottom: 20rpx;
		font-weight: bold;
	}
	.package-list {
		.package-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
			border: solid 1px $border-color;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			&:last-child {
				margin-bottom: 0;
			}
			.package-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.package-name-box {
					display: flex;
					align-items: center;
					.package-name {
						font-size: 28rpx;
						max-width: 260rpx;
					}
					.package-tag {
						margin-left: 20rpx;
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
				.price-box {
					color: $price-color;
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					align-items: flex-end;
					margin-top: 22rpx;
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
		}
	}
}
.bottom-btn-container {
	display: flex;
	justify-content: space-between;
	padding: 0 $padding;
	border-top: solid 1px $border-color;
	@include iphoneFixedBottom;
	.icon-group {
		display: flex;
		align-items: center;
		.icon-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-right: 46rpx;
			.icon-container {
				width: 40rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 5rpx;
				.icon {
					width: 30rpx;
					
				}
			}
			.text {
				font-size: 20rpx;
				color: $text-sub-color;
			}
		}
	}
}
.button-group {
	button + button {
		margin-left: 14rpx;
	}
}
</style>
