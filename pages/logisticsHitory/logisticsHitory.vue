<template>
	<view class="container">
		<view class="block-container">
			<OrderGoodsItem v-for="(item, idx) in goodsList" :key="idx" :goodsData="item"></OrderGoodsItem>
		</view>
		<view class="block-container">
			<view class="container-title">
				{{logisticsCompany}}：{{logisticsNumber}}
			</view>
			<u-steps direction="column" dot inactiveColor="#B9B9B9" activeColor="#FFDD22">
				<u-steps-item
					v-for="item in list"
					:title="item.time"
					:key="item.time"
				>
					<template #desc>
						<view class="desc-container">
							{{item.desc}}
						</view>
					</template>
				</u-steps-item>
			</u-steps>
		</view>
	</view>
</template>

<script>
import { onLoad } from '../../uni_modules/uview-ui/libs/mixin/mixin';
import { expressTrace } from '@/server/api.js'
	export default {
		data() {
			return {
				list: [
					{
						time: '2022/01/25 08:20:50',
						desc: '您的订单已分配'
					},
					{
						time: '2022/01/25 08:20:50',
						desc: '您的订单已分配'
					},
					{
						time: '2022/01/25 08:20:50',
						desc: '您的订单已分配'
					},
					{
						time: '2022/01/25 08:20:50',
						desc: '您的订单已分配'
					}
				],
				logisticsCompany: '韵达快递',
				logisticsNumber: '111111',
				goodsList: [
					{
						goodsImage: require('@/static/image/goods-image.png'),
						goodsTitle: '商品名称',
						goodsSpec: '商品规格',
						price: '165',
						count: 1
					}
				],
			};
		},
		async onLoad(options) {
			console.log('物流页面收到的', options.detail)
			const temp = JSON.parse(options.detail)
			this.logisticsNumber = temp.postNo
			this.logisticsCompany = temp.express
			this.goodsList = temp.goodsList
			const res = await expressTrace({ custom: { auth: true }, params:{com: temp.expressCode, num: temp.postNo}})
			this.list = []
			for (const item of res.data) {
				this.list.push({
					time: item.time,
					desc: item.context
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
		font-size: 24rpx;
		font-weight: bold;
		margin-bottom: 50rpx;
	}
	.desc-container {
		margin-top: 10rpx;
		min-height: 100rpx;
	}
	::v-deep {
		.u-steps {
			.u-steps-item:last-child {
				.u-steps-item__line {
					display: none;
				}
			}
		}
	}
}
</style>
