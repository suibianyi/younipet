<template>
	<view class="container">
		<view class="block-container">
			<OrderGoodsItem v-for="(item, idx) in goodsList" :key="idx" :goodsData="item"></OrderGoodsItem>
		</view>
		<view class="return-info-container">
			<view class="container-title">
				退款信息
			</view>
			<view class="info-item" @click="onShowCargoStatusPopup" v-if="refundType === '0'">
				<view class="info-title-container">
					<view class="info-title">
						货物状态
					</view>
				</view>
				<view class="info-right">
					<view class="info-value">{{cargoStatusLabel}}</view>
					<u-icon name="arrow-right" size="12" color="#B9B9B9"></u-icon>
				</view>
			</view>
			<view class="info-item" @click="onShowReasonPopup">
				<view class="info-title-container">
					<view class="info-title">
						退款原因
					</view>
				</view>
				<view class="info-right">
					<view class="info-value">{{reasonMap[formData.reason] || '请选择'}}</view>
					<u-icon name="arrow-right" size="12" color="#B9B9B9"></u-icon>
				</view>
			</view>
			<view class="info-item">
				<view class="info-title-container">
					<view class="info-title">
						退款金额
					</view>
					<view class="info-desc">
						不可修改，最多￥{{orderData.realPrice}}，含运费￥{{orderData.freight}}
					</view>
				</view>
				<view class="info-right">
					<view class="price-color">
						￥{{orderData.realPrice}}
					</view>
				</view>
			</view>
		</view>
		<view class="block-container">
			<textarea v-model="formData.desc" adjust-position="false" placeholder="请描述您的退款理由（选填）" placeholder-class="placeholder-class"/>
		</view>
		<view class="upload-image-container block-container">
			<view class="container-title">
				上传凭证(最多六张)
			</view>
			<view class="upload-container">
				<view class="image-item" v-for="(item, idx) in formData.images" :key="idx">
					<view class="del-btn" @click="delPhoto(idx)">
						<u-icon name="close" color="#B9B9B9" size="14"></u-icon>
					</view>
					<image :src="item" mode="aspectFill"></image>
				</view>
				<view class="upload-bar" @click="chooseMedia()" v-if="formData.images.length < maxImageLength">
					<u-icon name="plus" size="30" color="#B9B9B9"></u-icon>
				</view>
			</view>
		</view>
		<view class="button-box">
			<u-button type="primary" size="large" @click="onEdit">提交</u-button>
		</view>
		<SelectPopup
			ref="selectCargoStatusPopup"
			popupTitle="货物状态"
			:options="cargoStatusList"
			@submit="getCargoStatus"
		/>
		<SelectPopup
			ref="selectReasonPopup"
			popupTitle="退款原因"
			:options="reasonList"
			@submit="getReason"
		/>
	</view>
</template>

<script>
	import SelectPopup from '@/components/SelectPopup/SelectPopup.vue';
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue';
	import { orderRefund } from '@/server/api.js'
	const cargoStatusMap = {
		1: '已收到货',
		2: '未收到货'
	}
	export default {
		components: {
			OrderGoodsItem,
			SelectPopup
		},
		data() {
			return {
				orderNo:'',
				refundType: '',
				goodsList: [
					{
						goodsImage: require('@/static/image/goods-image.png'),
						goodsTitle: '商品名称',
						goodsSpec: '商品规格',
						price: '165',
						count: 1
					}
				],
				formData: {
					cargoStatus: '',
					desc: '',
					reason: '',
					images: ['https://cdn.uviewui.com/uview/album/1.jpg','https://cdn.uviewui.com/uview/album/1.jpg','https://cdn.uviewui.com/uview/album/1.jpg','https://cdn.uviewui.com/uview/album/1.jpg','https://cdn.uviewui.com/uview/album/1.jpg','https://cdn.uviewui.com/uview/album/1.jpg'],
				},
				orderData: {
					freight: '11.00',
					realPrice: '119.00'
				},
				isShowCargoStatusPopup: false,
				maxImageLength: 6,
				reasonList: [{
					value: 1,
					label: '退款原因1'
				}, {
					value: 2,
					label: '退款原因2'
				}]
			};
		},
		computed: {
			cargoStatusList: function () {
				return Object.keys(cargoStatusMap).reduce((list, value) => {
					list.push({
						label: cargoStatusMap[value],
						value,
					})
					return list;
				}, [])
			},
			cargoStatusLabel: function () {
				const { formData: {cargoStatus} } = this;
				return cargoStatusMap[cargoStatus] || '请选择'
			},
			reasonMap: function () {
				const { reasonList } = this;
				return reasonList.reduce((map, item) => {
					const { value, label } = item;
					map[value] = label;
					return map;
				}, {})
			}
		},
		onLoad (options) {
			console.log('退款页面2收到的', options.detail)
			const temp = JSON.parse(options.detail)
			this.refundType = temp.refundType;
			this.goodsList = temp.goodsList
			console.log(this.refundType)
			this.orderData.freight = 0
			this.orderData.realPrice = 0
			for(const item of this.goodsList) {
				this.orderData.realPrice+=parseInt(item.price)
			}
			this.orderNo = temp.orderNo
		},
		methods: {
			// 选择视频上传
			chooseMedia () {
				uni.chooseMedia({
					count: 6,
					mediaType: 'image',
					success(res) {
						// TODO 上传图片
					},
					fail() {
						uni.openSetting()
					}
				})
			},
			delPhoto (index) {
				this.formData.images.splice(index, 1);
			},
			onShowCargoStatusPopup () {
				this.$refs.selectCargoStatusPopup.openPopup(this.formData.cargoStatus);
			},
			onShowReasonPopup () {
				this.$refs.selectReasonPopup.openPopup(this.formData.reason);
			},
			getCargoStatus (value) {
				this.formData.cargoStatus = value;
			},
			getReason (value) {
				this.formData.reason = value;
			},
			async onEdit() {
				await orderRefund({
					orderId: this.orderNo,
					refundDesc: this.formData.desc,
					refundType: this.formData.reason,
					refundImg: this.formData.images
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
	.container-title {
		font-size: 28rpx;
		font-weight: bold;
	}
}
.return-info-container {
	padding: $padding $padding 0;
	background-color: #fff;
	margin-top: 20rpx;
	.container-title {
		margin-bottom: 12rpx;
	}
	.info-item {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 48rpx;
		border-bottom: solid 1px $border-color;
		&:last-child {
			border-bottom: none;
		}
		.info-title {
			font-size: 28rpx;
			&::after {
				content: '*';
				color: #FF5C01;
			}
		}
		.info-desc {
			color: $text-sub-color;
			font-size: 22rpx;
		}
		.info-right {
			font-size: 22rpx;
			color: $text-sub-color;
			display: flex;
			align-items: center;
			.info-value {
				margin-right: 10rpx;
			}
			.price-color {
				color: $price-color;
				font-size: 26rpx;
			}
		}
	}
}
.return-reason-container {
	.container-title {
		margin-bottom: 20rpx;
	}
}
.upload-image-container {
	.container-title {
		margin-bottom: 30rpx;
	}
	.upload-container {
		display: flex;
		flex-wrap: wrap;
		.image-item {
			width: 150rpx;
			height: 150rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			position: relative;
			&:nth-child(4n) {
				margin-right: 0;
			}
			image {
				width: 100%;
				height: 100%;
				z-index: 0;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
			.del-btn {
				position: absolute;
				font-size: 30upx;
				top: -15upx;
				right: -10upx;
				z-index: 2;
				width: 40upx;
				height: 40upx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(0, 0, 0, 0.6);
				color: #fff;
				border-radius: 50%;
			}
		}
		.upload-bar {
			border: dashed 2px $border-color;
			width: 150rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.button-box {
	padding: 0 $padding;
	margin: 40rpx 0 100rpx;
}
</style>
