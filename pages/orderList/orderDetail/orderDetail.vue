<template>
	<view class="container safe-area-inset-bottom">
		<view class="order-top-container block-container">
			<image class="icon" :src="statusSettingMap[status].icon" mode="widthFix"/>
			<view class="desc-box">
				<view class="desc">
					{{statusSettingMap[status].desc}}
				</view>
				<view class="time">
					{{orderDetail.logisticsTime}}
				</view>
			</view>
		</view>
		<view class="address-container block-container" v-if="isSlefLefting">
			<view class="address-info u-m-l-0 u-flex-1">
				<view>
					自提点：{{storeData.storeName}}
				</view>
				<view class="address sub-color">
					{{storeData.storeAddress}}
				</view>
			</view>
			<view class="icon-group">
				<view class="icon-item">
					<u-icon name="map-fill" size="24" color="#3E8BFF"></u-icon>
				</view>
				<view class="icon-item" @click="toCall">
					<u-icon name="phone-fill" size="24" color="#3E8BFF"></u-icon>
				</view>
			</view>
		</view>
		<view class="address-container block-container" v-else>
			<u-icon name="map" size="24"></u-icon>
			<view class="address-info">
				<view>
					{{addressData.name}}   {{addressData.mobile}}
				</view>
				<view class="address">
					{{addressData.address}} {{addressData.detail}}
				</view>
			</view>
		</view>
		<view class="goods-container block-container">
			<OrderGoodsItem v-for="(item, idx) in orderDetail.goodsList" :key="idx" :goodsData="item"></OrderGoodsItem>
			<view class="order-price-box">
				<view class="">
					实付款：
				</view>
				<view class="price-color">
					¥{{orderDetail.realPrice}}
				</view>
			</view>
			<view class="order-button-group"  >
				<view class="button-item" v-if="isSlefLefting" >
					<u-button
						type="default"
						plain
						size="small" 
						color="#B9B9B9"
						:customStyle="{
							width: '200rpx'
						}"
					>联系商家</u-button>
				</view>
				<view class="button-item">
					<u-button
						type="default"
						plain
						size="small" 
						color="#B9B9B9"
						:customStyle="{
							width: '200rpx'
						}"
					>联系客服</u-button>
				</view>
				<view class="button-item" @click="toReturn" v-if="checkRenderBtn('refund')">
					<u-button
						type="default"
						plain
						size="small" 
						color="#B9B9B9"
						:customStyle="{
							width: '200rpx'
						}"
					>我要退款</u-button>
				</view>
			</view>
		</view>
		<view class="order-info-container block-container">
			<view class="title">
				订单信息
			</view>
			<view class="order-line">
				订单编号：{{orderDetail.orderNo}}
			</view>
			<view class="order-line">
				交易号：{{orderDetail.exchangeNo}}
			</view>
			<view class="order-line">
				支付方式：{{orderDetail.payMethodName}}
			</view>
			<view class="order-line">
				创建时间：{{orderDetail.createTime | date('yyyy-mm-dd hh:MM:ss')}}
			</view>
			<view class="order-line">
				付款时间：{{orderDetail.payTime | date('yyyy-mm-dd hh:MM:ss')}}
			</view>
			<view class="order-line">
				发货时间：{{orderDetail.deliverTime | date('yyyy-mm-dd hh:MM:ss')}}
			</view>
		</view>
		<view class="message-container block-container">
			<view class="message-item">
				<view class="title">
					订单备注
				</view>
				<view class="value">
					{{orderDetail.notes || '无备注'}}
				</view>
			</view>
			<view class="message-item">
				<view class="title">
					运费
				</view>
				<view class="value">
					￥{{orderDetail.freight}}
				</view>
			</view>
		</view>
		<view class="bottom-container">
			<view class="button-item" v-if="checkRenderBtn('remind')">
				<u-button
					type="default"
					plain
					size="small" 
					color="#B9B9B9"
					:customStyle="{
						width: '200rpx'
					}"
				>提醒发货</u-button>
			</view>
			<view class="button-item" v-if="checkRenderBtn('logistics')">
				<u-button
					type="default"
					plain
					size="small" 
					color="#B9B9B9"
					:customStyle="{
						width: '200rpx'
					}"
					@click="toLogisticsHitory(orderDetail)"
				>查看物流</u-button>
			</view>
			<view class="button-item" v-if="checkRenderBtn('code')">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '200rpx'
					}"
				>核销码</u-button>
			</view>
			<view class="button-item" v-if="checkRenderBtn('pay')">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '200rpx'
					}"
				>立即支付</u-button>
			</view>
			<view class="button-item" v-if="checkRenderBtn('address')">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '200rpx'
					}"
				>修改地址</u-button>
			</view>
			<view class="button-item" v-if="checkRenderBtn('receipt')">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '200rpx'
					}"
				>确认收货</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue'
	import { orderDetail } from '@/server/api.js'
	export default {
		components: {
			OrderGoodsItem
		},
		async onLoad (options) {
			// 目前做效果，后面转成传入id获取详情,status可以删掉
			const { orderId } = options;
			const res = await orderDetail({ custom: { auth: true }, params:{id: orderId}})
			if (res&&res.address) {
				this.addressData ={
					name: res.address.name,
					mobile: res.address.phone,
					address: `${res.address.provinceName}${res.address.cityName}${res.address.areaName}`,
					detail: res.address.address
				}
			}
			if (res&&res.store) {
				this.status =3
				this.storeData ={
					storeName: res.store.storeName,
					storeAddress: res.store.storeLocation
				}
			} else {
				this.status =4
			}
			this.orderDetail.orderNo=res.id
			this.orderDetail.exchangeNo=res.pid
			this.orderDetail.createTime=res.createTime
			this.orderDetail.payTime=res.payTime
			this.orderDetail.deliverTime=res.shipTime
			if (res&& res.detailList) {
				this.orderDetail.goodsList =[]
				console.log('123456798',res.detailList)
				for(const item of res.detailList){
					this.orderDetail.goodsList.push({
						goodsImage: item.img,
						goodsTitle: item.productName,
						goodsSpec: (item.secondName1?item.secondName1:'')+(item.secondName2?item.secondName2:'')+(item.secondName3?item.secondName3:''),
						price: '165',
						count: item.num
					})
				}
			}
			// this.status = status;
			this.orderId = orderId;
		},
		data() {
			return {
				orderId: '',
				status: '',
				// 订单状态对应配置
				// 如果自提订单和普通订单的status有重叠，则新开一个字段用computed去判断显示哪个map
				// 1.待发货，2.待发货 3.待收货 4.待自提
				statusSettingMap: {
					1: {
						icon: require('@/static/image/person/order-icon-3.png'),
						desc: '商家已发货，请注意查收',
						operateBtns: ['pay'],
					},
					2: {
						icon: require('@/static/image/person/order-icon-3.png'),
						desc: '商家已发货，请注意查收',
						operateBtns: ['refund', 'address', 'remind'],
					},
					3: {
						icon: require('@/static/image/person/order-icon-3.png'),
						desc: '商家已发货，请注意查收',
						operateBtns: ['refund', 'receipt', 'logistics'],
					},
					4: {
						icon: require('@/static/image/person/order-icon-4.png'),
						desc: '商家已备好货，可自提',
						operateBtns: ['code'],
					}
				},
				storeData: {
					storeName: '门店名称',
					storeAddress: '门店地址'
				},
				addressData: {
					name: '姓名',
					mobile: '1803938473',
					address: '地址',
					detail: '详细地址'
				},
				orderDetail: {
					logisticsTime: '2021-12-15 15:06:55',
					orderNo: '19991212121',
					realPrice: '165',
					exchangeNo: '交易单号',
					payMethodName: '微信支付',
					createTime: '2021-1-12 15:20:15',
					payTime: '2021-1-12 15:20:15',
					deliverTime: '2021-1-12 15:20:15',
					notes: '备注',
					freight: '11',
					goodsList: [
						{
							goodsImage: require('@/static/image/goods-image.png'),
							goodsTitle: '商品名称',
							goodsSpec: '商品规格',
							price: '165',
							count: 1
						}
					],
				}
			};
		},
		computed: {
			isSlefLefting: function () {
				return Number(this.status) === 4
			}
		},
		methods: {
			checkRenderBtn (key) {
				const { statusSettingMap, status } = this;
				const { operateBtns = [] } = statusSettingMap[status] || {}
				return operateBtns.includes(key)
			},
			toCall () {
				uni.makePhoneCall({
					phoneNumber: '18050384734'
				})
			},
			toReturn () {
				uni.navigateTo({
					url: '/pages/selectAfterType/selectAfterType'
				})
			},
			toLogisticsHitory (data) {
				console.log('查看物流信息', data)
				uni.navigateTo({
					url: '/pages/logisticsHitory/logisticsHitory'
				})
			}
 		}
	}
</script>

<style lang="scss" scoped>
.block-container {
	padding: $padding;
	background-color: #fff;
	margin-top: 20rpx;
}
.order-top-container {
	display: flex;
	align-items: center;
	.icon {
		width: 57rpx;
		height: auto;
	}
	.desc-box {
		margin-left: 32rpx;
		flex: 1;
		.time {
			margin-top: 20px;
		}
	}
}
.address-container {
	display: flex;
	align-items: center;
	.address-info {
		margin-left: 24rpx;
		.address {
			margin-top: 20rpx;
			line-height: 40rpx;
		}
		.sub-color {
			color: $text-sub-color;
		}
	}
	.icon-group {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.icon-item {
			&:first-child {
				padding-right: 20rpx;
				border-right: solid 1px $border-color;
			}
			& + .icon-item {
				padding-left: 20rpx;
			}
		}
	}
}
.goods-container {
	.order-price-box {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-weight: bold;
		margin-top: 30rpx;
		.price-color {
			color: $price-color;
		}
	}
	.order-button-group {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 30rpx;
		.button-item + .button-item {
			margin-left: 32rpx;
		}
	}
}
.order-info-container {
	.title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.order-line {
		font-size: 24rpx;
		line-height: 48rpx;
		margin-bottom: 10rpx;
	}
}
.message-container {
	margin-bottom: 108rpx;
	.message-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&:first-child {
			border-bottom: solid 1px $border-color;
			padding-bottom: $padding;
		}
		&:last-child {
			padding-top: $padding;
		}
		.title {
			font-size: 24rpx;
		}
		.value {
			font-size: 22rpx;
			color: $text-sub-color;
		}
	}
}
.bottom-container {
	width: 100%;
	height: 88rpx;
	position: fixed;
	left: 0;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 $padding;
	background-color: #fff;
	@include iphoneFixedBottom;
	.button-item + .button-item {
		margin-left: 32rpx;
	}
}
</style>
