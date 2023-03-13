<template>
	<navigator url="/pages/active/activeDetail/activeDetail" class="active-item" hover-class="u-hover-class" :class="{'finish-item': isFinish}">
		<view class="" @click=clickItem()>	
			<view class="image-container">
				<image class="active-image" :src="activeData.image"></image>
			</view>
			<view class="active-info">
				<view class="title-info u-flex">
					<view class="title u-line-1">
						{{activeData.title}}
					</view>
					<view class="tag">
						<text>{{activeData.statusName}}</text>
					</view>
					<view class="join-title">
						已有{{activeData.joinCount}}人参与
					</view>
				</view>
				<view class="button-info">
					<view class="time-box">
						活动日期：{{activeData.beginDate}} - {{activeData.endDate}}
					</view>
					<view class="u-flex">
						<u-button :color="btnColor" type="primary" size="mini">
							<text class="button-text">参与活动</text>
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"ActiveItem",
		props: {
			activeData: {
				type: Object,
			}
		},
		data() {
			return {
				myMap:['所有用户','会员','活动专属'],
				// 后续用status去computed出来
				isFinish: true,
			};
		},
		computed: {
			btnColor: function ({isFinish}) {
				return isFinish ? '#ECECEC' : '#FFDD22'
			}
		},
		mounted() {
			if (this.activeData.st===0) {
				this.isFinish = false
			}
		},
		methods: {
			clickItem() {
				this.$store.dispatch('saveActive', {
					isFinish: this.isFinish,
					activeDetail: {
						id: this.activeData.id,
						img: this.activeData.image,
						title: this.activeData.title,
						statusName: this.activeData.statusName,
						joinCount: this.activeData.joinCount,
						beginDate: this.activeData.beginDate,
						endDate: this.activeData.endDate,
						storeName: this.activeData.storeName? '平台':'门店',
						limit: this.myMap[this.activeData.limit],
						content: this.activeData.content,
						price: this.activeData.price,
						couponData: {
							title: this.activeData.title,
							beginDate: this.activeData.beginDate,
							endDate: this.activeData.endDate,
							discount: this.activeData.discount
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
.active-item {
	width: 100%;
	padding: 20rpx;
	border: solid 1px $border-color;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	.image-container {
		width: 100%;
		height: 292rpx;
		border-radius: 12rpx;
		overflow: hidden;
		.active-image {
			width: 100%;
			height: 100%;
		}
	}
	.active-info {
		margin-top: 20rpx;
		.title-info {
			.title {
				font-size: 28rpx;
				max-width: 360rpx;
			}
			.tag {
				width: 114rpx;
				height: 40rpx;
				font-size: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 6rpx;
				transform: skewX(-15deg);
				background-color: rgba(255, 87, 34, .2);
				margin-left: 16rpx;
				font-weight: bold;
				color: #FE3E3D;
				text {
					transform: skewX(15deg);
				}
			}
			.join-title {
				color: $text-sub-color;
				font-size: 20rpx;
				flex: 1;
				text-align: right;
			}
		}
		.button-info {
			margin-top: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time-box {
				font-size: 24rpx;
				color: $text-sub-color;
			}
			
		}
	}
	&.finish-item {
		.tag {
			background-color: rgba(185, 185, 185, .2) !important;
			color: $text-sub-color !important;
		}
		.button-text {
			color: $text-sub-color !important;
		}
	}
	& + .active-item {
		margin-top: 20rpx;
	}
}
</style>