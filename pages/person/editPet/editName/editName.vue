<template>
	<view class="container">
		<view class="input-container">
			<u--input
			    placeholder="请输入昵称"
			    border="none"
			    v-model="nickname"
			></u--input>
		</view>
		<view class="submit-btn">
			<u-button type="primary" size="large" @click="onSubmit">保存</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: ''
			};
		},
		onLoad (options) {
			this.nickname = this.$store.getters.pet.name
		},
		methods: {
			onSubmit () {
				this.$store.dispatch('savePet', {
					name: this.nickname,
				})
				uni.navigateBack()
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.input-container {
	background-color: #fff;
	padding: $padding;
}
.submit-btn {
	margin-top: 60rpx;
	padding: 0 $padding;
}
</style>
