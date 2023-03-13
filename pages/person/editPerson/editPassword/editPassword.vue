<template>
	<view class="container">
		<view class="title">
			{{passwordMap[step].tip}}
		</view>
		<view class="password-input">
			<u-code-input
				v-model="passwordMap[step].password"
				mode="line"
				:space="15"
				focus
				color="#000"
				fontSize="32"
				bold
				borderColor="#F5F5F5"
				hairline
			></u-code-input>
		</view>
		<view class="submit-btn">
			<u-button
				:disabled="passwordMap[step].password.length !== 6"
				type="primary"
				size="large"
				@click="onSubmit"
			>{{passwordMap[step].saveBtnText}}</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				passwordMap: {
					1: {
						tip: '输入原6位数交易密码',
						password: '',
						saveBtnText: '确定',
					},
					2: {
						tip: '设置6位数交易密码',
						password: '',
						saveBtnText: '确定',
					},
					3: {
						tip: '再次填写以确认',
						password: '',
						saveBtnText: '完成',
					},
				},
				step: 1,
			};
		},
		methods: {
			onSubmit () {
				if (this.step === 3) {
					return uni.navigateBack()
				}
				this.step += 1;
			}
		}
	}
</script>
<style lang="scss" scoped>
page {
	background-color: #fff;
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.title {
		margin-top: 40rpx;
	}
	.password-input {
		margin-top: 90rpx;
	}
	.submit-btn {
		margin-top: 90rpx;
		width: 100%;
		padding: 0 $padding;
	}
}
</style>
