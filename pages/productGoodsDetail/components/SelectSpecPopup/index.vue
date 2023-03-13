<template>
	<u-popup :show="value" round="16" closeOnClickOverlay @close="onClose">
		<view class="select-spec-container">
			<view class="goods-info-box">
				<image class="goods-image" :src="image"></image>
				<view class="goods-info">
					<view class="price-box">
						<view class="unit">￥</view>
						<view class="price">
							{{price}}
						</view>
					</view>
					<view class="sub-text">
						库存：{{stockNum}}
					</view>
					<view class="sub-text">
						请选择颜色尺码
					</view>
				</view>
			</view>
			<view class="spec-info-box">
				<view class="spec-info-item">
					<view class="spec-title">
						{{firstName1}}
					</view>
					<view class="spec-value-list">
						<view class="spec-value" :class="{active:index==firstChoose1}" v-for="(item, index) in firstLoop1">
							<view @click = "click1(item, index)">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<view class="spec-info-item">
					<view class="spec-title">
						{{firstName2}}
					</view>
					<view class="spec-value-list">
						<view class="spec-value" :class="{active:index==firstChoose2}" v-for="(item, index) in firstLoop2">
							<view @click = "click2(item, index)">
								{{item}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-button type="primary" size="large" @click="onSubmit">确认</u-button>
		</view>
	</u-popup>
</template>

<script>
import { computed } from "vue";
	export default {
		name:"SelectSpecPopup",
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			option: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				image:'',
				firstName1:'',
				firstName2:'',
				firstName3:'',
				firstLoop1:[],
				firstLoop2:[],
				firstLoop3:[],
				firstChoose1:0,
				firstChoose2:0,
				firstChoose3:0,
				price:'',
				stockNum:'',
				vipPrice:'',
				chooseItem:{}
			};
		},
		watch: {
			option: {
					immediate: true,
					handler(newVal) {
						console.log(newVal.productStockList)
						if(newVal.productStockList.length) {
							const res = newVal.productStockList
							this.firstName1 = res[0].firstName1
							this.firstName2 = res[0].firstName2
							this.firstName3 = res[0].firstName3
							for(const item of res) {
								this.firstLoop1.push(item.secondName1)
								this.firstLoop2.push(item.secondName2)
								this.firstLoop3.push(item.secondName3)
							}
							this.firstLoop1 = Array.from(new Set(this.firstLoop1))
							this.firstLoop2 = Array.from(new Set(this.firstLoop2))
							this.firstLoop3 = Array.from(new Set(this.firstLoop3))
							this.matchPrice()
						}
					}
			}
		},
		methods: {
			matchPrice() {
				const res = this.option.productStockList
				let mapMap =''
				if(this.firstName1 && this.firstLoop1&&this.firstLoop1.length) {
					mapMap = mapMap+'1'
				}
				if(this.firstName2 && this.firstLoop2&&this.firstLoop2.length) {
					mapMap = mapMap+'2'
				}
				if(this.firstName3 && this.firstLoop3&&this.firstLoop3.length) {
					mapMap = mapMap+'3'
				}
				console.log(mapMap)
				for(const item of res) {
						if(mapMap='1' && item.secondName1==this.firstLoop1[this.firstChoose1]) {
							this.chooseItem=item
						}
						if(mapMap='12' && item.secondName1==this.firstLoop1[this.firstChoose1] && item.secondName2==this.firstLoop2[this.firstChoose2]) {
							this.chooseItem=item
						}
						if(mapMap='123' && item.secondName1==this.firstLoop1[this.firstChoose1] && item.secondName2==this.firstLoop2[this.firstChoose2] && item.secondName3==this.firstLoop3[this.firstChoose3]) {
							this.chooseItem=item
						}
				}
				// console.log(this.chooseItem)
				this.chooseItem.productType = this.option.productType
				this.firstLoop2 = []
				this.firstLoop3 = []
				for(const item of res) {
					if(item.secondName1==this.chooseItem.secondName1)
					this.firstLoop2.push(item.secondName2)
					if(item.secondName2==this.chooseItem.secondName2)
					this.firstLoop3.push(item.secondName3)
				}
				this.firstLoop2 = Array.from(new Set(this.firstLoop2))
				this.firstLoop3 = Array.from(new Set(this.firstLoop3))
				const isVip = this.$store.getters.user.isVip
				if (isVip) {
					this.price = this.chooseItem.vipPrice
				} else {
					this.price = this.chooseItem.price
				}
				this.vipPrice = this.chooseItem.vipPrice
				this.stockNum = this.chooseItem.stockNum
				this.image = this.chooseItem.img
			},
			click1(item, index) {
				this.firstChoose1 = index
				this.matchPrice()
			},
			click2(item, index) {
				this.firstChoose2 = index
				this.matchPrice()
			},
			onSubmit () {
				this.$emit('submit', this.chooseItem)
				this.onClose();
			},
			onClose () {
				this.$emit('input', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
.select-spec-container {
	padding: $padding;
	.goods-info-box {
		display: flex;
		align-items: flex-end;
		padding-bottom: $padding;
		border-bottom: solid 1px $border-color;
		.goods-image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 12rpx;
		}
		.goods-info {
			margin-left: $padding;
			.price-box {
				display: flex;
				align-items: flex-end;
				color: $price-color;
				font-weight: bold;
				.unit {
					font-size: 24rpx;
				}
				.price {
					font-size: 32rpx;
				}
			}
			.sub-text {
				color: $text-sub-color;
				margin-top: 20rpx;
				font-size: 20rpx;
			}
		}
	}
	.spec-info-box {
		padding: $padding 0;
		max-height: 500rpx;
		overflow: scroll;
		.spec-title {
			font-size: 24rpx;
			font-weight: bold;
		}
		.spec-value-list {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			.spec-value {
				font-size: 24rpx;
				color: #999;
				background-color:  #f9f9f9;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 66rpx;
				margin-right: 30rpx;
				padding: 12rpx 16rpx;
				min-width: 80rpx;
				margin-bottom: 32rpx;
				&.active {
					color: $text-color;
					background-color: $main-color;
				}
			}
		}
	}
}
</style>