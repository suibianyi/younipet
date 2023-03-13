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
	import {  updateInfo, getUserInfo } from '@/server/api.js'
	export default {
		data() {
			return {
				nickname: ''
			};
		},
		onLoad (options) {
			this.nickname = options.nickname
		},
		methods: {
			async onSubmit () {
				await updateInfo({ nickname: this.nickname })
				const userInfo = await getUserInfo({ custom: { auth: true }})
				console.log("获得的userInfo是", userInfo);
				this.$store.dispatch('saveUserInfo', {
					nickName: userInfo.nickname,
				})
				uni.setStorageSync('userInfo', {
					nickName: userInfo.nickname,
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
