<template>
	<view class="container">
		<view class="desc-container">
			<view class="title">
				股东说明
			</view>
			<view class="desc">
				{{content}}
			</view>
		</view>
		<view class="form-container">
			<u--form
				labelPosition="left"
				:model="formData"
				:labelWidth="60"
				ref="form"
			>
				<u-form-item
					label="姓名"
					borderBottom
				>
					<view class="form-content">
						<u--input
							v-model="formData.name"
							placeholder="请输入姓名"
							border="none"
						></u--input>
					</view>
				</u-form-item>
				<u-form-item
					label="电话"
					borderBottom
				>
					<view class="form-content">
						<u--input
							v-model="formData.mobile"
							placeholder="请输入联系电话"
							border="none"
						></u--input>
					</view>
				</u-form-item>
				<u-form-item
					label="微信"
					borderBottom
				>
					<view class="form-content">
						<u--input
							v-model="formData.wxCode"
							placeholder="请输入微信号"
							border="none"
						></u--input>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<view class="submit-btn">
			<u-button type="primary" size="large" @click="onSubmit">确认提交</u-button>
		</view>
	</view>
</template>

<script>
	
	import { bossAdd } from '@/server/api.js'
	export default {
		data() {
			return {
				content: '股东说明',
				formData: {
					name: '',
					mobile: '',
					wxCode: '',
				}
			};
		},
		methods: {
			async onSubmit () {
				await bossAdd({
					realName: this.formData.name,
					tel: this.formData.mobile,
					wechatAccount: this.formData.wxCode,
					storeId: '1'
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
.desc-container {
	margin: 20rpx 0;
	background-color: #fff;
	padding: $padding;
	.title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.desc {
		color: $text-sub-color;
		font-size: 24rpx;
		line-height: 36rpx;
	}
}
.form-container {
	padding: 0 $padding;
	background-color: #fff;
	.form-content {
		font-size: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
		display: flex;
	}
}
.submit-btn {
	margin-top: 60rpx;
	padding: 0 $padding;
}
</style>
