<template>
	<view class="container">
		<u-sticky bgColor="#fff">
			<u-tabs :list="tabList" :current="status" :scrollable="false"  @change="changeTabs"></u-tabs>
		</u-sticky>
		<view class="order-list">
			<view
				class="order-item"
				v-for="(item, index) in listData"
				:key="index"
				hover-class="u-hover-class"
				@click="toDetail(item)"
			>
				<view class="order-item-header">
					<view class="shop-box">
						<image class="shop-icon" src="@/static/image/store-icon.png" mode="widthFix"></image>
						<view class="shop-name">
							{{item.storeName}}
						</view>
					</view>
					<view class="order-status-text">
						{{item.statusName}}
					</view>
				</view>
				<view class="order-item-body">
					<OrderGoodsItem v-for="(oItem, idx) in item.goodsList" :key="idx" :goodsData="oItem"></OrderGoodsItem>
					<view class="order-price-box">
						<view class="time-box"  v-if = "item.status==1 && item.restTime>0">
							请在<u-count-down :time="item.restTime" format="HH:mm:ss"></u-count-down>内支付
						</view>
						<view class="">
							实付款：
						</view>
						<view class="price-color">
							¥{{item.realPrice}}
						</view>
					</view>
					<view class="order-button-group">
						<view class="button-item" v-if="checkRenderBtn(item.status, 'remind')" @click.stop="notion(item)">
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
						<view class="button-item" v-if="checkRenderBtn(item.status, 'logistics')">
							<u-button
								type="default"
								plain
								size="small" 
								color="#B9B9B9"
								:customStyle="{
									width: '200rpx'
								}"
								@click.stop="toLogisticsHitory(item)"
							>查看物流</u-button>
						</view>
						<view class="button-item" v-if="checkRenderBtn(item.status, 'code')">
							<u-button
								plain
								size="small" 
								color="#B9B9B9"
								:customStyle="{
									width: '200rpx'
								}"
							>核销码</u-button>
						</view>
						<view class="button-item" v-if="checkRenderBtn(item.status, 'pay')&&item.restTime>0" @click.stop="pay(item)">
							<u-button
								type="primary"
								size="small" 
								:customStyle="{
									width: '200rpx'
								}"
							>立即支付</u-button>
						</view>
						<view class="button-item" v-if="checkRenderBtn(item.status, 'address')">
							<u-button
								type="primary"
								size="small" 
								:customStyle="{
									width: '200rpx'
								}"
							>修改地址</u-button>
						</view>
						<view class="button-item" v-if="checkRenderBtn(item.status, 'receipt')">
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
			</view>
		</view>
	</view>
</template>

<script>
	import { orderList,payWx } from '@/server/api.js'
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue'
	export default {
		components: {
			OrderGoodsItem
		},
		data() {
			return {
				status: 0,
				tabList: [
					{
						name: '全部'
					},
					{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待自提'
					}
				],
				listData: [
					{
						storeName: '晋安区门店',
						realPrice: '165',
						statusName: '待付款',
						goodsList: [
							{
								goodsImage: require('@/static/image/goods-image.png'),
								goodsTitle: '商品名称',
								goodsSpec: '商品规格',
								price: '165',
								count: 1
							}
						],
						status: 1
					},
					{
						storeName: '晋安区门店',
						realPrice: '165',
						statusName: '待发货',
						goodsList: [
							{
								goodsImage: require('@/static/image/goods-image.png'),
								goodsTitle: '商品名称',
								goodsSpec: '商品规格',
								price: '165',
								count: 1
							}
						],
						status: 2
					},
					{
						storeName: '晋安区门店',
						realPrice: '165',
						statusName: '待收货',
						goodsList: [
							{
								goodsImage: require('@/static/image/goods-image.png'),
								goodsTitle: '商品名称',
								goodsSpec: '商品规格',
								price: '165',
								count: 1
							}
						],
						status: 3
					},
					{
						storeName: '晋安区门店',
						realPrice: '165',
						statusName: '待自提',
						goodsList: [
							{
								goodsImage: require('@/static/image/goods-image.png'),
								goodsTitle: '商品名称',
								goodsSpec: '商品规格',
								price: '165',
								count: 1
							}
						],
						status: 4
					}
				]
			};
		},
		async onLoad (options) {
			const { status } = options;
			this.status = Number(status);
			this.getOrderList(this.formatsth(this.status))
		},
		methods: {
			async changeTabs(item) {
				console.log(item.index)
				this.status = item.index
				this.getOrderList(this.formatsth(item.index))
			},
			formatsth(num) {
				switch(num) {
					case 0:
					return []
					break;
					case 1:
					return [0]
					break;
					case 2:
					return [1]
					break;
					case 3:
					return [2]
					break;
					case 4:
					return [10]
					break;
					default :
					return []
				}
			},
			async getOrderList(status) {
				const res = await orderList({
					page: 1,
					limit: 1000,
					status
				})
				console.log('查询订单结果', res)
				this.listData =[]
				for(const item of res) {
					// console.log('123465', item.store)
					const temp = {}
					if (item.store) {
						temp.storeName=item.store.storeName
					}
					temp.id= item.id
					temp.realPrice= item.amount
					temp.statusName=item.status
					temp.createdTime= item.createdTime
					temp.expressCode=item.expressCode
					temp.express=item.express
					temp.postNo=item.postNo
					temp.qrCode = item.qrCode
					temp.restTime= 30*60*1000-((new Date()).getTime()-(new Date(item.createdTime)).getTime())
					if(item.st==10) {
						temp.status=4
					} else {	
						temp.status=item.st +1
					}
					temp.goodsList = []
					if(item.detailList) {
						for(const item2 of item.detailList) {
							temp.goodsList.push({
								goodsImage: item2.img,
								goodsTitle: item2.productName,
								goodsSpec: (item2.secondName1?item2.secondName1:'')+(item2.secondName2?item2.secondName2:'')+(item2.secondName3?item2.secondName3:''),
								price: item2.price,
								count: item2.num
							})
						}
					}
					this.listData.push(temp)
				}
				console.log('合并后的结果是', this.listData)
			},
			checkRenderBtn (status, key) {
				const statusBtnMap = {
					1: ['pay'],
					2: ['remind', 'address'],
					3: ['logistics', 'receipt'],
					4: ['code']
				}
				
				console.log('123456789', status)
				if (status >4) {
					return false
				} else {
					return statusBtnMap[status].includes(key)
				}
			},
			notion() {
				uni.showToast({
					title: "提醒成功"
				})
			},
			async pay(item) {
				console.log('pay',item)
				const preDate = await payWx({ custom: { auth: true }, params:{orderId: item.id, type:'pd'}})
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
							uni.navigateTo({
								url: '/pages/orderList/orderList?status=2'
							})
						},
						fail: (res) => {
							uni.showToast({
								icon: 'error',
								title: "支付失败"
							})
							uni.navigateTo({
								url: '/pages/orderList/orderList?status=1'
							})
						},
					complete: () => {
						this.loading = false;
					}
				})
			},
			toDetail (item) {
				console.log(item)
				uni.navigateTo({
					url: `/pages/orderList/orderDetail/orderDetail?orderId=${item.id}`
				})
			},
			toLogisticsHitory (item) {
				uni.navigateTo({
					url: '/pages/logisticsHitory/logisticsHitory?detail='+JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-list {
	.order-item {
		margin-top: 20rpx;
		padding: $padding;
		background-color: #fff;
		&-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 24rpx;
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
			.order-status-text {
				font-size: 24rpx;
				font-weight: bold;
			}
		}
		&-body {
			padding-top: 24rpx;
			.order-price-box {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-weight: bold;
				margin-top: 30rpx;
				.time-box {
					display: flex;
					align-items: center;
					color: #FE3E3D;
					margin-right: 10rpx;
					::v-deep {
						.u-count-down__text {
							color: #FE3E3D;
							font-size: 26rpx;
						}
					}
				}
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
	}
}
</style>
