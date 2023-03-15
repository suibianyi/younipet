<template>
	<view class="container safe-area-inset-bottom">
		<view class="return-step-container">
			<view class="return-step-content">
				<view class="step-content-title">
					请退货并填写物流信息
				</view>
				<view class="step-content-tips">
					还剩2天23小时59分
				</view>
				<u-steps :current="returnDetail.step" dot activeColor="#FFDD22" inactiveColor="#ECECEC">
					<u-steps-item title="提交申请"></u-steps-item>
					<u-steps-item title="商家处理"></u-steps-item>
					<u-steps-item title="寄回商品"></u-steps-item>
					<u-steps-item title="商家退款"></u-steps-item>
					<u-steps-item title="退款成功"></u-steps-item>
				</u-steps>
			</view>
		</view>
		<navigator
			class="logistics-container block-container"
			hover-class="u-hover-class"
			url="/pages/logisticsHitory/logisticsHitory"
		>
			<view class="company-text">
				{{returnDetail.logisticsCompany}}：{{returnDetail.logisticsNumber}}
			</view>
			<u-icon
				slot="right"
				size="14"
				color="#E9E9E9"
				name="arrow-right"
			></u-icon>
		</navigator>
		<view class="block-container">
			<view class="container-title">
				商家已同意退货申请，请尽早退货
			</view>
			<view class="container-tips">
				未与商家协商一致，请勿使用到付或平邮吗，以免商家拒签货物
				请填写真实物流信息，逾期未填写，退货申请将撤销
			</view>
			<view class="address-container">
				<u-icon name="map" size="24"></u-icon>
				<view class="address-info">
					<view>
						{{returnDetail.address.name}}   {{returnDetail.address.mobile}}
					</view>
					<view class="address">
						{{returnDetail.address.address}}
					</view>
				</view>
				<view class="copy-btn" hover-class="u-hover-calss" @click="onCopy">
					复制
				</view>
			</view>
			<view class="button-container">
				<view class="button-item">
					<u-button
						type="default"
						plain
						size="small" 
						color="#B9B9B9"
						:customStyle="{
							width: '200rpx'
						}"
						@click="toWriteLogistics"
					>我已寄出</u-button>
				</view>
			</view>
		</view>
		<view class="block-container info-container">
			<view class="container-title">
				退款信息
			</view>
			<view class="goods-container">
				<OrderGoodsItem v-for="(item, idx) in returnDetail.goodsList" :key="idx" :goodsData="item"></OrderGoodsItem>
			</view>
			<view class="order-info-container">
				<view class="order-line">
					退款原因：{{returnDetail.reason}}
				</view>
				<view class="order-line">
					退款金额：¥{{returnDetail.price}}
				</view>
				<view class="order-line">
					申请件数：{{returnDetail.count}}
				</view>
				<view class="order-line">
					申请时间：{{returnDetail.createTime}}
				</view>
				<view class="order-line">
					订单编号：{{returnDetail.orderNo}}
				</view>
			</view>
		</view>
		<view class="bottom-container">
			<view class="button-item" @click="onRevokeApply">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '200rpx'
					}"
				>撤销申请</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue'
	import { orderDetail, refundCancel } from '@/server/api.js'
	export default {
		components: {
			OrderGoodsItem
		},
		data() {
			return {
				orderId:'',
				returnDetail: {
					step: 1,
					logisticsCompany: '韵达快递',
					logisticsNumber: '111111',
					address: {
						address: '详细地址',
						name: '姓名',
						mobile: '1933848448444'
					},
					reason: '退款原因',
					price: 165,
					count: 1,
					createTime: '2021-1-12 15:20:15',
					orderNo: '1132432',
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
		async onLoad (options) {
			// 目前做效果，后面转成传入id获取详情,status可以删掉
			const { orderNo } = options;
			console.log('获取的ID', options)
			const res = await orderDetail({ custom: { auth: true }, params:{id: orderNo}})
			if (res&&res.address) {
				this.addressData ={
					name: res.address.name,
					mobile: res.address.phone,
					address: `${res.address.provinceName}${res.address.cityName}${res.address.areaName}`,
					detail: res.address.address
				}
			}
			if(res.type ==1) {
				this.status =3
			} else {
				this.status =4
			}
			if (res&&res.store) {
				this.storeData ={
					storeName: res.store.storeName,
					storeAddress: res.store.storeLocation
				}
			}
			this.returnDetail.orderNo=res.id
			this.returnDetail.exchangeNo=res.pid
			this.returnDetail.createTime=res.createTime
			this.returnDetail.payTime=res.payTime
			this.returnDetail.deliverTime=res.shipTime
			this.returnDetail.expressCode=res.expressCode
			// this.returnDetail.logisticsCompany=res.express
			// this.returnDetail.logisticsNumber=res.postNo
			this.returnDetail.createTime=res.refundTime
			this.returnDetail.logisticsTime=res.shipTime
			this.returnDetail.notes=res.rmk
			if (res&& res.detailList) {
				this.returnDetail.goodsList =[]
				console.log('123456798',res.detailList)
				for(const item of res.detailList){
					this.returnDetail.goodsList.push({
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
		methods: {
			onCopy () {
				uni.setClipboardData({data: '11111'});
			},
			toWriteLogistics () {
				uni.navigateTo({
					url: '/pages/afterSalesList/writeLogistics/writeLogistics'
				})
			},
			async onRevokeApply () {
				uni.showModal({
					title: '提示',
					content: '确定撤销申请吗',
					success: async (res) => {
						if (res.confirm) {
							await refundCancel({
								orderId: this.orderId
							})
							
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.return-step-container {
	width: 100%;
	padding: 20rpx;
	background-color: #FFDD22;
	.return-step-content {
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-radius: 32rpx;
		padding: $padding;
		.step-content-title {
			font-size: 28rpx;
			line-height: 48rpx;
			font-weight: bold;
		}
		.step-content-tips {
			font-size: 24rpx;
			color: $text-sub-color;
			margin-top: 10rpx;
			margin-bottom: 16rpx;
		}
		::v-deep {
			.u-text__value {
				font-size: 24rpx !important;
			}
			.u-steps {
				.u-steps-item:last-child {
					.u-steps-item__line {
						display: none;
					}
				}
			}
		}
	}
}
.block-container {
	padding: $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.container-title {
		font-size: 28rpx;
		font-weight: bold;
	}
	.container-tips {
		font-size: 24rpx;
		color: $text-sub-color;
		line-height: 48rpx;
		margin-top: 20rpx;
	}
	.address-container {
		display: flex;
		align-items: center;
		margin-top: 50rpx;
		padding-bottom: $padding;
		border-bottom: solid 1px $border-color;
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
		.copy-btn {
			margin-left: 16rpx;
			flex-shrink: 0;
			text-align: right;
			font-size: 24rpx;
			color: $text-tip-color;
		}
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
		margin-top: 24rpx;
	}
	.goods-container {
		margin: 40rpx 0;
	}
	.order-info-container {
		.order-line {
			font-size: 24rpx;
			line-height: 48rpx;
			margin-bottom: 10rpx;
		}
	}
}
.info-container {
	margin-bottom: 108rpx;
}
.logistics-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.company-text {
		font-size: 24rpx;
		font-weight: bold;
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
