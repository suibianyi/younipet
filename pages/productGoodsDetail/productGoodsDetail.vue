<template>
	<view class="container safe-area-inset-bottom">
		<GoodsDetailBanner :list="goodsData.bannerList"/>
		<view class="product-container">
			<view class="price-box-container">
				<view class="price-box">
					<image class="vip-icon" src="@/static/image/goods-vip.png" mode="widthFix"></image>
					<view class="price">
						<view class="price-unit">￥</view>
						{{goodsData.vipPrice}}
					</view>
					<view class="origin-price">
						￥{{goodsData.price}}
					</view>
				</view>
				<view class="sub-text">
					{{goodsData.payCount}}+人付款
				</view>
			</view>
			<view class="title-container">
				{{goodsData.goodsTitle}}
			</view>
			<view class="tag-container">
				<view class="tag-item" v-for="(tag, index) in tagList" :key="index">
					<image src="@/static/image/shield-icon.png"></image>
					<view class="">
						{{tag}}
					</view>
				</view>
			</view>
		</view>
		<GoodsDetailStore :storeData="storeData"/>
		<view class="desc-container">
			<view class="desc-title">
				产品展示
			</view>
			<u-parse :content="goodsData.content"></u-parse>
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
				<navigator class="icon-item" hover-class="u-hover-class" :url="'/pages/storeIndex/storeIndex?id=' + storeData.storeId">
					<view class="icon-container">
						<image class="icon" src="@/static/image/store-icon.png" mode="widthFix"></image>
					</view>
					<view class="text">
						门店
					</view>
				</navigator>
			</view>
			<view class="u-flex button-group">
				<view class="button-item">
					<u-button
						size="small"
						:customStyle="{
							width: '200rpx'
						}"
						@click="onJoinCar"
					>加入购物车</u-button>
				</view>
				<view class="button-item">
					<u-button
						type="primary"
						size="small" 
						:customStyle="{
							width: '200rpx'
						}"
						@click="onBuy"
					>立即购买</u-button>
				</view>
			</view>
		</view>
		<SelectSpecPopup v-model="isShowSpecPopup" :option="goodsData" @submit="onSpecSubmit"/>
		<SelectPopup
			ref="selectDelieveryPopup"
			:options="deliveryList"
			@submit="getDeliveryValue"
		/>
	</view>
</template>

<script>
	import GoodsDetailBanner from '@/components/GoodsDetailBanner/GoodsDetailBanner.vue';
	import GoodsDetailStore from '@/components/GoodsDetailStore/GoodsDetailStore.vue';
	import SelectSpecPopup from './components/SelectSpecPopup/index.vue';
	import SelectPopup from '@/components/SelectPopup/SelectPopup.vue';
	import { productDetail, cartAdd} from '@/server/api.js'
	
	export default {
		components: {
			GoodsDetailBanner,
			GoodsDetailStore,
			SelectSpecPopup,
			SelectPopup
		},
		data() {
			return {
				
				isShowSpecPopup: false,
				isShowDeliveryPopup: false,
				goodsData: {
					bannerList: [
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg',
						'https://cdn.uviewui.com/uview/album/1.jpg'
					],
					vipPrice: '89.00',
					price: '98.00',
					payCount: 300,
					goodsTitle: '商品名称',
					tagList: ['正品保障', '正品保障', '正品保障', '正品保障',],
					content: '产品展示富文本',
					productStockList:[]
				},
				storeData: {
					storeId: '1',
					storeImage: 'https://cdn.uviewui.com/uview/album/1.jpg',
					storeName: '门店名称',
					distance: '3.2km'
				},
				deliveryList: [
					{
						label: '送货上门',
						value: '1'
					},
					{
						label: '到店自提',
						value: '2'
					}
				],
				chooseData:{},
				productId: '',
				joinCarFlag:false
			};
		},
		async onLoad(option) {
			if(option) {
				const res = await productDetail({ custom: { auth: true }, params:{pdId: option.goodsId}})
				console.log('获得的商品详情', res)
				this.productId = res.id
				this.goodsData.bannerList = []
				for(const item of JSON.parse(res.img)) {
					this.goodsData.bannerList.push(item)
				}
				this.goodsData.productStockList = []
				for(const item of res.productStockList) {
					this.goodsData.productStockList.push(item)
				}
				this.goodsData.goodsTitle= res.name
				this.goodsData.payCount= res.saleNum
				this.goodsData.productType = res.type
				this.storeData.storeName = res.store.storeName
				this.storeData.storeId = res.store.id
				this.storeData.storeImage = res.store.img
				this.storeData.storeLocation = res.store.storeLocation
				if(res.productStockList.length) {
					this.goodsData.vipPrice = res.productStockList[0].vipPrice
					this.goodsData.price = res.productStockList[0].price
					
				}
				console.log('整合后的商品详情', this.goodsData)
			}
		},
		methods: {
			onJoinCar () {
				this.isShowSpecPopup = true
				this.joinCarFlag =true
			},
			onBuy () {
				this.isShowSpecPopup = true
				this.joinCarFlag =false
			},
			async onSpecSubmit (data) {
				console.log('数据是', data)
				this.chooseData = data
				if (this.joinCarFlag) {
					await cartAdd({
						stockId: this.chooseData.id,
						checked: false,
						stockNum: 1,
						productId:this.productId,
						productType:  this.chooseData.productType,
						storeId: this.storeData.storeId
					})
					uni.$u.toast('已加入购物车')
				}
				else {
					setTimeout(() => {
						this.$refs.selectDelieveryPopup.openPopup();
					}, 300)
				}
			},
			getDeliveryValue (value) {
				if (!value) return;
				this.chooseData.delivery = value
				this.chooseData.storeData = this.storeData
				this.chooseData.name = this.goodsData.goodsTitle
				let detailInfo = JSON.stringify(this.chooseData)
				console.log('detailInfo', detailInfo)
				uni.navigateTo({
					url: '/pages/orderList/confirmOrder/confirmOrder?detailInfo='+
					encodeURIComponent(detailInfo)
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
			.vip-icon {
				width: 120rpx;
				height: auto;
			}
			.price {
				color: $price-color;
				font-size: 40rpx;
				font-weight: bold;
				margin-left: 20rpx;
				display: flex;
				align-items: flex-end;
				.price-unit {
					font-size: 24rpx;
				}
			}
			.origin-price {
				font-size: 20rpx;
				color: $text-sub-color;
				text-decoration: line-through;
				margin-left: 14rpx;
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
	.tag-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.tag-item {
			display: flex;
			align-items: center;
			color: $text-sub-color;
			font-size: 20rpx;
			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 12rpx;
			}
		}
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
.bottom-btn-container {
	display: flex;
	justify-content: space-between;
	padding: 0 $padding;
	border-top: solid 1px $border-color;
	position: fixed;
	left: 0;
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
	.button-item + .button-item {
		margin-left: 14rpx;
	}
}
</style>
