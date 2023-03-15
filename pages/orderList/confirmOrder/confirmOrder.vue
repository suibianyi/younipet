<template>
	<view class="container safe-area-inset-bottom">
		<view class="address-container block-container" v-if="isSlefLefting">
			<view class="address-info u-m-l-0 u-flex-1">
				<view>
					自提点：{{storeData.storeName}}
				</view>
				<view class="address sub-color">
					{{storeData.storeAddress}}
				</view>
			</view>
		</view>
		<view @click="toAddress" class="address-container block-container" v-else hover-class="u-hover-class">
			<u-icon name="map" size="24"></u-icon>
			<view class="address-info">
				<view>
					{{addressData.name}}   {{addressData.mobile}}
				</view>
				<view class="address">
					{{addressData.address}} {{addressData.detail}}
				</view>
			</view>
			<view class="arrow-right">
				<u-icon name="arrow-right" size="14" color="#B9B9B9"></u-icon>
			</view>
		</view>
		<view class="goods-list-container">
			<view class="shop-container">
				<view class="shop-box">
					<image class="shop-icon" src="@/static/image/store-icon.png" mode="widthFix"></image>
					<view class="shop-name">
						{{storeData.storeName}}
					</view>
				</view>
			</view>
			<view class="goods-list">
				<view class="goods-item" v-for="(item, index) in orderData.goodsList" :key="index">
					<OrderGoodsItem :goodsData="item"></OrderGoodsItem>
				</view>
			</view>
		</view>
		<view class="message-block">
			<view class="message-item" @click="openRemarkModal()">
				<view class="title">
					订单备注
				</view>
				<view class="value">
					<text v-if="orderData.remark">{{orderData.remark}}</text>
					<text v-else class="no-value">无备注</text>
					<u-icon name="arrow-right" size="14" color="#B9B9B9"></u-icon>
				</view>
			</view>
			<view class="message-item">
				<view class="title">
					运费
				</view>
				<view class="value">
					<text class="no-value">
						￥{{orderData.freight}}
					</text>
				</view>
			</view>
			<view class="message-item" @click="onSelectCoupon">
				<view class="title">
					优惠券
				</view>
				<view class="value">
					<text class="no-value">{{couponTitle}}</text>
					<u-icon name="arrow-right" size="14" color="#B9B9B9"></u-icon>
				</view>
			</view>
		</view>
		<view class="pay-methods-container">
			<view class="pay-methods" v-for="item in paymentList" :key="item.payId" @click="changePayMethods(item.payId)">
				<view class="pay-info">
					<image class="pay-icon" :src="item.payIcon" mode="widthFix"></image>
					<view class="pay-name">
						{{item.payName}}
					</view>
				</view>
				<view class="check-container">
					<image v-if="item.payId === orderData.activePay" class="check-icon" src="@/static/image/checked.png"></image>
					<image v-else class="check-icon" src="@/static/image/check.png"></image>
				</view>
			</view>
		</view>
		<view class="bottom-container">
			<view class="tips">
				请在<u-count-down :time="orderData.expireTime" format="mm分ss秒"></u-count-down>内完成支付，过时订单将会取消
			</view>
			<view class="order-price-box">
				<view class="">
					总计：¥
				</view>
				<view class="price-color">
					{{orderData.totalPrice}}
				</view>
			</view>
			<view class="button-item">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '200rpx'
					}"
					@click="onPay"
				>确认支付</u-button>
			</view>
		</view>
		<AppointmentSuccessPopup ref="appointmentSuccessPopup" />
		<SelectPopup
			ref="selectDelieveryPopup"
			popupTitle="优惠券选择"
			:options="couponList"
			@submit="getSelectedCoupon"
		/>
		<u-modal
			:show="showRemarkModal"
			title="请输入备注"
			@confirm="onRemarkConfirm"
			@cancel="onRemarkCancel"
		>
			<view class="slot-content">
				<textarea v-model="editRemark" placeholder="请输入内容" placeholder-class="placeholder-class"></textarea>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import SelectPopup from '@/components/SelectPopup/SelectPopup.vue';
	import AppointmentSuccessPopup from '@/components/AppointmentSuccessPopup/AppointmentSuccessPopup.vue'
	import{couponList,orderCreat,payWx,getAddressList,preCreate} from '@/server/api.js'
	export default {
		components: {
			SelectPopup,
			AppointmentSuccessPopup
		},
		data() {
			return {
				buyType: '',
				showRemarkModal: false,
				editRemark: '',
				couponList: [{
					value: 1,
					label: '优惠券名称1'
				}, {
					value: 2,
					label: '优惠券名称2'
				}],
				paymentList: [
					// {
					// 	payName: '支付宝支付',
					// 	payIcon: require('@/static/image/alipay_icon.png'),
					// 	payId: 1,
					// },
					{
						payName: '微信支付',
						payIcon: require('@/static/image/wechat_icon.png'),
						payId: 2,
					},
					// {
					// 	payName: '银行卡支付',
					// 	payIcon: require('@/static/image/bank_icon.png'),
					// 	payId: 3,
					// }
				],
				storeData: {
					storeName: '门店名称',
					storeAddress: '门店地址',
					id:''
				},
				addressData: {
					name: '',
					mobile: '',
					address: '',
					detail: ''
				},
				orderData: {
					remark: '备注',
					activePay: 2,
					couponId: '',
					goodsList: [
						{
							id:'',
							goodsImage: require('@/static/image/goods-image.png'),
							goodsTitle: '商品名称',
							goodsSpec: '商品规格',
							price: '165',
							count: 1
						}
					],
					totalPrice: '1111',
					freight: '0',
					expireTime: 30 * 60 * 1000
				},
				chooseCoupon:'-1'
			};
		},
		computed: {
			isSlefLefting: function ({buyType}) {
				return buyType === '2'
			},
			couponMap: function ({couponList}) {
				return couponList.reduce((map, item) => {
					const { value, label } = item;
					map[value] = label;
					return map;
				}, {})
			},
			couponTitle: function () {
				const { orderData: {couponId = ''} } = this;
				return couponId ? couponMap[couponId] : '不使用优惠券'
			}
		},
		onShow() {
			const temp = this.$store.getters.chooseAdress
			if (temp.name){
				this.addressData.name = temp.name
				this.addressData.mobile = temp.phone
				this.addressData.address = temp.provinceName+temp.cityName+temp.areaName
				this.addressData.detail = temp.address
				console.log('我是订单页，我看到',this.addressData)
			}
		},
		async onLoad(options) {
			if (options) {
				let detailInfo = JSON.parse(decodeURIComponent(options.detailInfo));
				console.log('我是订单页，我看到订单了', detailInfo)
				this.storeData.storeName = detailInfo.storeData.storeName
				this.storeData.storeAddress = detailInfo.storeData.storeLocation
				this.storeData.id = detailInfo.storeData.storeId
				this.orderData.goodsList[0].id = detailInfo.id
				this.orderData.goodsList[0].goodsImage = detailInfo.img
				this.orderData.goodsList[0].goodsTitle = detailInfo.name
				this.orderData.goodsList[0].goodsSpec = (detailInfo.secondName1?detailInfo.secondName1:'')+(detailInfo.secondName2?detailInfo.secondName2:'')+(detailInfo.secondName3?detailInfo.secondName3:'')
				this.orderData.goodsList[0].price = detailInfo.price
				this.buyType = detailInfo.delivery
			}
			const cList = await couponList({
				productId:this.orderData.goodsList[0].id,
				st:1
			})
			console.log('优惠券有', cList)
			this.couponList = []
			for(const item of cList) {
				this.couponList.push({
					value: item.id,
					label: item.name
				})
			}
			let addressList = await getAddressList({ custom: { auth: true }, params:{
					limit:1000,
					page:1
				}})
			addressList = addressList.filter((item)=>{
				return item.isDefault
			})
			console.log('默认收货地址是', addressList)
			if(addressList.length) {
				this.addressData.name = addressList[0].name
				this.addressData.mobile = addressList[0].phone
				this.addressData.address = addressList[0].provinceName+addressList[0].cityName+addressList[0].areaName
				this.addressData.detail = addressList[0].address
				this.$store.dispatch('setChooseAddress', addressList[0])
			}
			await this.getPreCreate()
						
		},
		methods: {
			async getPreCreate() {
				const res1= await preCreate({
					addressId: this.$store.getters.chooseAdress.id,
					stockId: this.orderData.goodsList[0].id,
					stockNum: 1,
					type: 2,
					buyType:this.buyType,
					storeId:this.storeData.id,
					userCouponId: this.orderData.couponId
				})
				console.log('预订单的钱是',res1)
				this.orderData.totalPrice = res1[0].amount
			},
			toAddress () {
				uni.navigateTo({
					url: '/pages/person/address/address'
				})
			},
			onSelectCoupon () {
				this.$refs.selectDelieveryPopup.openPopup();
			},
			async getSelectedCoupon (value) {
				console.log('选择的优惠券是',value)
				this.orderData.couponId = value
				await this.getPreCreate()
			},
			changePayMethods (payId) {
				if (this.orderData.activePay === payId) return;
				this.orderData.activePay = payId;
			},
			openRemarkModal () {
				this.editRemark = this.orderData.remark;
				this.showRemarkModal = true;
			},
			onRemarkConfirm () {
				this.orderData.remark = this.editRemark;
				this.showRemarkModal = false;
			},
			onRemarkCancel () {
				this.editRemark = '';
				this.showRemarkModal = false;
			},
			async onPay () {
				if (this.addressData.name =='') {
					uni.showToast({
						icon: 'error',
						title: "请选择收货地址"
					})
					return
				}
				const res1= await orderCreat({
					addressId: this.$store.getters.chooseAdress.id,
					stockId: this.orderData.goodsList[0].id,
					stockNum: 1,
					type: 2,
					buyType:this.buyType,
					storeId:this.storeData.id,
					userCouponId: this.orderData.couponId
				})
				console.log('dingdan', res1)
				const preDate = await payWx({ custom: { auth: true }, params:{orderId: res1, type:'pd'}})
				console.log("preDate-----------------------------------------", preDate);
				uni.requestPayment({
					timeStamp: `${preDate.timeStamp}`,
					nonceStr: preDate.nonceStr,
					package: preDate.package,
					signType: 'MD5',
					paySign: preDate.paySign,
					success: async (res) => {
						uni.showToast({
							title: "支付成功"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/orderList/orderList?status=2'
							})
						}, 1000)
					},
					fail: (res) => {
						uni.showToast({
							icon: 'error',
							title: "支付失败"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/orderList/orderList?status=1'
							})
						}, 1000)
					},
				complete: () => {
					this.loading = false;
					// uni.navigateTo({
					// 	url: '/pages/orderList/orderList'
					// })
				}
			})
				// this.$refs.appointmentSuccessPopup.showPopup = true;
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
.address-container {
	display: flex;
	align-items: center;
	.address-info {
		margin-left: 24rpx;
		flex: 1;
		.address {
			margin-top: 20rpx;
			line-height: 40rpx;
		}
		.sub-color {
			color: $text-sub-color;
		}
	}
	.arrow-right {
		flex-shrink: 0;
	}
}
.goods-list-container {
	margin-top: 20rpx;
	padding: $padding;
	background-color: #fff;
	.shop-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 24rpx;
		margin-bottom: 20rpx;
		border-bottom: solid 1px $border-color;
		.shop-box {
			display: flex;
			align-items: center;
			.shop-icon {
				width: 40rpx;
				height: auto;
			}
			.shop-name {
				font-size: 28rpx;
				font-weight: bold;
				margin-left: 20rpx;
			}
		}
	}
	.goods-list {
		.goods-item {
			margin-bottom: 20rpx;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
.message-block {
	padding: 0 $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.message-item {
		width: 100%;
		height: 88rpx;
		border-bottom: solid 1px $border-color;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&:last-child {
			border-bottom: none;
		}
		.title {
			font-size: 24rpx;
		}
		.value {
			font-size: 22rpx;
			display: flex;
			align-items: center;
			.no-value {
				color: $text-sub-color;
			}
			.price-color {
				color: $price-color;
			}
		}
	}
}
.pay-methods-container {
	padding: 0 $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.pay-methods {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px $border-color;
		&:last-child {
			border-bottom: none;
		}
		.pay-info {
			display: flex;
			align-items: center;
			.pay-icon {
				width: 60rpx;
				height: auto;
			}
			.pay-name {
				margin-left: 22rpx;
				font-size: 24rpx;
			}
		}
		.check-container {
			.check-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
}
.bottom-container {
	width: 100%;
	height: 88rpx;
	position: fixed;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 $padding;
	background-color: #fff;
	@include iphoneFixedBottom;
	.tips {
		position: absolute;
		left: 0;
		right: 0;
		top: -45rpx;
		text-align: center;
		color: $text-sub-color;
		font-size: 22rpx;
		line-height: 48rpx;
		::v-deep {
			.u-count-down {
				display: inline-block;
				.u-count-down__text {
					color: $text-sub-color;
					font-size: 22rpx;
					line-height: 48rpx;
				}
			}
		}
	}
	.order-price-box {
		display: flex;
		align-items: flex-end;
		color: $price-color;
		font-size: 24rpx;
		.price-color {
			font-size: 36rpx;
			font-weight: bold;
		}
	}
}
.slot-content {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	border: solid 1px $border-color;
}
</style>
