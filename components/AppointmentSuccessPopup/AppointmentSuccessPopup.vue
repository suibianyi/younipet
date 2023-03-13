<template>
	<u-popup :show="showPopup" @close="close" @open="open" mode="center" round="16" :customStyle="popupStyle" :safeAreaInsetBottom="false">
		<view class="popup-title">
			预约成功
		</view>
		<view class="qrcode-image">
			<image src="@/static/image/goods-image.png"></image>
		</view>
		<u--form
			labelPosition="left"
			:labelWidth="65"
			ref="form"
		>
			<u-form-item
				label="预约时间"
				borderBottom
				@click="showDate = true;"
			>
				<view class="form-content">{{formData.date | date('yyyy-mm-dd')}} {{formData.startTime}}-{{formData.endTime}}</view>
			</u-form-item>
			<u-form-item
				label="预约门店"
				borderBottom
			>
				<view class="form-content">
					{{formData.storeName}}
				</view>
				<view slot="right" class="form-right">
					<u-icon name="map-fill" size="17" color="#3E8BFF" hover-class="u-hover-class"></u-icon>
					<view class="line"></view>
					<u-icon name="phone-fill" size="18" color="#3E8BFF" hover-class="u-hover-class"></u-icon>
				</view>
			</u-form-item>
		</u--form>
		<view class="tips">
			请至“我的-预约记录”查找预约信息
		</view>
		<view class="popup-button" hover-class="u-hover-class" @click="onSubmit">
			确认
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			formData: {
				type: Object,
			}
		},
		data () {
			return {
				showPopup: false,
				popupStyle: {
					width: '530rpx',
					padding: '48rpx 32rpx 0 32rpx'
				}
			}
		},
		methods: {
			close () {
				
			},
			open () {
				
			},
			onSubmit () {
				this.showPopup = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-title {
		font-size: 32rpx;
		font-weight: bold;
		text-align:center;
	}
	.qrcode-image {
		margin: 60rpx auto;
		border-radius: 12rpx;
		border: 1px solid $border-color;
		padding: 10rpx;
		width: 300rpx;
		height: 300rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.form-right {
		display: flex;
		align-items: center;
		.line {
			width: 1px;
			height: 36rpx;
			background-color: $border-color;
			margin: 0 10rpx;
		}
	}
	.tips {
		text-align: center;
		color: $text-sub-color;
		font-size: 20rpx;
		margin-top: 60rpx;
	}
	.popup-button {
		width: 100%;
		height: 92rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $text-tip-color;
		font-size: 28rpx;
		border-top: solid 1px $border-color;
		margin-top: 24rpx;
	}
</style>