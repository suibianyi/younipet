<template>
	<view class="container">
		<view class="top">
			<view class="top-bg"></view>
		</view>
		<view class="account-info-container">
			<view class="account-box">
				<view class="u-flex">
					<u-avatar size="60" :src="userData.avatar" ></u-avatar>
					<view class="account-info" :class="userData.isVip ? '' : 'u-row-center'">
						<view class="name-conainer">
							<view class="name">
								{{userData.nickName}}
							</view>
							<view class="vip-box" v-if="userData.isVip">
								<text>{{userData.vipType}}</text>
							</view>
						</view>
						<view class="u-font-22"  v-if="userData.isVip">
							截止{{userData.vipExpress | date('yyyy-mm-dd')}}到期
						</view>
					</view>
				</view>
				<view class="button-box u-button--mini" hover-class="u-hover-class"  v-if="userData.isVip">
					续费会员
				</view>
			</view>
			<view class="vip-desc-box">
				<view class="title">
					会员说明
				</view>
				<view class="desc" :class="isNeedExpand ? 'ellipsis' : ''">
					1、会员按照游客、注册会员、试用会员（周）、银级会员（半年）金级会员（年）、铂金级会员（终身）共计六个等级。级别越高，浏览权限越大。<br />
					2、试用会员、银级会员、金级会员、铂金级会员
					2、试用会员、银级会员、金级会员、铂金级会员
					2、试用会员、银级会员、金级会员、铂金级会员
				</view>
				<view class="show-hide" @click="showHide()">点击{{isNeedExpand ? '展开全文' : '收起'}} </view>
			</view>
			<view class="button-box">
				<view class="button-item">
					参与活动
				</view>
				<view class="button-item">
					购买折扣
				</view>
			</view>
		</view>
		<view v-for="(item, idx) in vipPriceList">
			<view class="vip-info-container" v-if="!userData.isVip">
				<view class="title">
					会员开通
				</view>
				<view class="desc-container">
					<view class="">
						<view class="bold">
							{{item.name}}
						</view>
						<view class="price-box">
							<view class="unit">
								¥
							</view>
							<view class="price">
								{{item.price}}
							</view>
						</view>
					</view>
					<view class="button-box u-button--mini" hover-class="u-hover-class" @click="pay(item)">
						立即开通
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { vipList, payWx, vipCreateOrder,getUserInfo } from '@/server/api.js'
	export default {
		data() {
			return {
				loading:false,
				descRowNumber: 0,
				maxRow: 5,
				isExpand: false,
				isVip: false,
				vipMemberPrice: '299.00',
				vipPriceList:[]
			};
		},
		computed: {
			userData() {
				return this.$store.getters.user
			},
			isNeedExpand: function () {
				const { descRowNumber, maxRow, isExpand } = this;
				return descRowNumber > maxRow && !isExpand;
			}
		},
		async onLoad () {
			this.vipPriceList = await vipList({ custom: { auth: true }})
			console.log('获取的vip价格是', this.vipPriceList)
			this.$nextTick(() => {
				this.getTextHeight()
			})
		},
		methods: {
			// 获取高度
			getTextHeight () {
				const query = uni.createSelectorQuery();
				query.selectAll('.desc').boundingClientRect((rect) => {
					rect.forEach((reacItem, index) => {
						this.descRowNumber = Math.ceil(reacItem.height / 20);
						console.log(this.descRowNumber)
					})
				}).exec()
			},
			showHide () {
				this.isExpand = !this.isExpand;
			},
			async pay(data) {
				console.log('传过来的data', data)
				const abcd = await vipCreateOrder({
					storeId: '1',
					vipConfigId:data.id
				})
				console.log('res:',abcd)
				const preDate = await payWx({ custom: { auth: true }, params:{type:'vip', orderId: abcd}})
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
						const userInfo = await getUserInfo({ custom: { auth: true }})
						console.log("获得的userInfo是", userInfo);
						this.$store.dispatch('saveUserInfo', {
							nickName: userInfo.nickname,
							avatar: userInfo.avatar,
							isVip: Boolean(userInfo.isVip),
							vipType: userInfo.vipType,
							vipExpress: userInfo.vipExpress,
							ynId: userInfo.yhId
						})
						const getUserInfo132 = uni.getStorageSync('userInfo')
						console.log("获得的getUserInfo", getUserInfo132);
						uni.setStorageSync('userInfo', {
							openid: getUserInfo132.openid,
							nickName: userInfo.nickname,
							avatar: userInfo.avatar,
							token: getUserInfo132.token,
							isVip: Boolean(userInfo.isVip),
							vipType: userInfo.vipType,
							vipExpress: userInfo.vipExpress,
							ynId: userInfo.yhId
						})
					},
					fail: (res) => {
						uni.showToast({
							icon: 'error',
							title: "支付失败"
						})
					},
				complete: () => {
					this.loading = false;
				}
			})
			}
		}
	}
</script>

<style lang="scss" scoped>
@mixin vip-button {
	background: linear-gradient(90deg, #EDD29B 0%, #E0B977 100%);
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
}
@mixin top-bg($top: 0) {
  position: fixed;
  left: 0;
  top: $top;
  width: 100%;
  height: 410rpx;
  border-radius: 0px 0px 160rpx 160rpx;
}
@mixin top-bg-line {
	border: 2px solid #E9C990;
	border-top: none;
	width: 752rpx;
}
.container {
	padding: 0 $padding;
}
.top {
	width: 100%;
	position: fixed;
	&-bg {
		@include top-bg;
		background: linear-gradient(109deg, #EED5A0 3%, #EED5A0 3%, #E4BE80 93%, #E4BE80 93%);
		&::before {
			content: '';
			@include top-bg(26rpx);
			@include top-bg-line;
		}
		&::after {
			content: '';
			@include top-bg(58rpx);
			@include top-bg-line;
		}
	}
}
.account-info-container {
	position: relative;
	width: 100%;
	padding: 42rpx 36rpx;
	background-color: #2A2A2A;
	border-radius: 36rpx;
	margin-top: 60rpx;
	.account-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.account-info {
			padding: 14rpx 0;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			color: #fff;
			height: 120rpx;
			.name-conainer {
				width: 100%;
				display: flex;
				align-items: center;
				.name {
					font-size: 26rpx;
					font-weight: bold;
				}
				.vip-box {
					width: 112rpx;
					height: 28rpx;
					border-radius: 24rpx;
					background-color: #E7CA90;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 16rpx;
					font-size: 22rpx;
					font-weight: bold;
					color: $text-color;
				}
			}
		}
		.button-box {
			@include vip-button;
		}
	}
	.vip-desc-box {
		width: 100%;
		padding: 28rpx $padding;
		border-radius: 36rpx;
		background: linear-gradient(180deg, #FEFDF9 0%, #FFF6E9 100%);
		margin-top: 62rpx;
		.title {
			font-weight: bold;
			font-size: 24rpx;
			margin-bottom: 16rpx;
		}
		.desc {
			color: $text-sub-color;
			font-size: 24rpx;
			line-height: 36rpx;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-box-orient: vertical;
			&.ellipsis {
				-webkit-line-clamp: 5;
			}
		}
		.show-hide {
			text-align: left;
			width: 100%;
			font-size: 24rpx;
			color: $text-sub-color;
			margin-top: 10upx;
		}
	}
	.button-box {
		display: flex;
		justify-content: space-between;
		margin-top: 48rpx;
		.button-item {
			width: 302rpx;
			height: 72rpx;
			border-radius: 36rpx;
			background: rgba(255, 255, 255, .38);
			color: #fff;
			font-size: 26rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: bold;
		}
	}
}
.vip-info-container {
	width: 100%;
	padding: 28rpx $padding;
	background: linear-gradient(91deg, #F0D9A5 0%, #DEB06B 100%);
	border-radius: 36rpx;
	margin-top: 20rpx;
	.title {
		font-size: 26rpx;
		font-weight: bold;
		margin-bottom: 18rpx;
	}
	.desc-container {
		width: 100%;
		padding: $padding;
		background: linear-gradient(180deg, #FFFDF8 0%, #FFF7EA 100%);
		border-radius: 36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.price-box {
			margin-top: 18rpx;
			color: $price-color;
			font-size: 32rpx;
			font-weight: bold;
			display: flex;
			align-items: flex-end;
			.unit {
				font-size: 24rpx;
			}
		}
		.button-box {
			@include vip-button;
		}
	}
}
</style>
