<template>
	<u-popup
		:show="isShowPopup"
		round="16"
		closeOnClickOverlay
		closeable
		@close="onClose"
	>
		<view class="popup-container">
			<view class="popup-title" v-if="popupTitle">
				{{popupTitle}}
			</view>
			<view class="popup-list">
				<view class="popup-item" v-for="item in options" :key="item[valueKey]" @click="changeType(item[valueKey])">
					<view class="name">
						{{item[labelKey]}}
					</view>
					<image v-if="item[valueKey] === value" class="checked" src="@/static/image/checked.png"></image>
				</view>
			</view>
			<u-button type="primary" size="large" @click="onSubmit">确认</u-button>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name:"SelectPopup",
		props: {
			options: {
				type: Array
			},
			popupTitle: {
				type: String,
				default: '选择方式'
			},
			valueKey: {
				type: String,
				default: 'value'
			},
			labelKey: {
				type: String,
				default: 'label'
			}
		},
		data() {
			return {
				value: '',
				isShowPopup: false,
			};
		},
		methods: {
			openPopup (value) {
				this.value = value;
				this.isShowPopup = true;
			},
			onClose () {
				this.isShowPopup = false;
			},
			onSubmit () {
				this.$emit('submit', this.value);
				this.onClose();
			},
			changeType (value) {
				if (this.value !== value) {
					this.value = value;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.popup-container {
	padding: $padding;
	.popup-title {
		text-align: center;
		color: $text-sub-color;
		font-size: 30rpx;
		border-bottom: solid 1px $border-color;
		padding-bottom: 24rpx;
	}
	.popup-list {
		margin-bottom: 72rpx;
		.popup-item {
			width: 100%;
			height: 112rpx;
			border-bottom: solid 1px $border-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.name {
				font-size: 30rpx;
			}
			.checked {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
}

</style>