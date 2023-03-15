<template>
	<view class="bg">
		<view class="pluex-icon">
			<image class="img-style" :src="iconUrl" mode="aspectFit"></image>
			<view class="text">
				有你宠物
			</view>
		</view>
		<view class="little-text">
			申请获取你的公开信息(昵称、头像等)
		</view>
		<view class="login-button">
			<u-button :ripple="true" :custom-style="loginStyle" @click="loginClick">
					微 信 登 录
			</u-button>
		</view>
		<view class="no-login" @click="noLogin">
			暂不登录
		</view>
	</view>
</template>

<script>
	import { login, updateInfo, getUserInfo } from '@/server/api.js'
	export default {
		data() {
			return {
				iconUrl: require('@/static/image/index/logo.png'),
				loginStyle: {
					width: '100%',
					color: '#fff',
					'border-radius': '80rpx',
					background: '#FFDD22'
				},
				detailInfo: {}
			}
		},
		onLoad(options) {
			if (options.detailInfo) {
				this.detailInfo = JSON.parse(decodeURIComponent(options.detailInfo));
				console.log('传进来的参数是', this.detailInfo)
			}
		},
		methods: {
			noLogin() {
				uni.navigateBack({
				    delta: 1
				});
			},
			loginClick() {
				uni.getUserProfile({
					desc:'Wexin',     // 这个参数是必须的
					success:res=>{
						const parseData = JSON.parse(res.rawData)
						console.log("用户信息", parseData)
						// this.userInfo.headImageUrl = parseData.avatarUrl
						// this.userInfo.nickName = parseData.nickName
						// console.log("用户信息",this.userInfo)
						uni.login({
						    success: async (loginResult) => { // {errMsg: "login:ok", code: "0434TeKg2bXv6H0s6YMg2017Kg24TeK-"}
						        console.log("uni.login-----------------------------------------", loginResult);
								// const loginData = {}
								const loginData = await login({
									type: 'wechat',
									code: loginResult.code
								});
								console.log("mplogin-----------------------------------------", loginData);
								this.$store.dispatch('saveUserInfo', loginData)
								uni.setStorageSync('userInfo', {
									openid: loginData.openid,
									token: loginData.token,
								})
								await updateInfo({
									openid: loginData.openid,
									avatar: parseData.avatarUrl,
									city: parseData.city,
									country: parseData.country,
									gender: parseData.gender,
									language: parseData.language,
									nickname: parseData.nickName,
									province: parseData.province
								});
								const userInfo = await getUserInfo({ custom: { auth: true }})
								console.log("获得的userInfo是", userInfo);
								this.$store.dispatch('saveUserInfo', {
									nickName: userInfo.nickname,
									avatar: userInfo.avatar,
									token: loginData.token,
									isVip: Boolean(userInfo.isVip),
									vipType: userInfo.vipType,
									vipExpress: userInfo.vipExpress,
									ynId: userInfo.yhId
								})
								// console.log("获得的userInfo", userInfo.result);
								uni.setStorageSync('userInfo', {
									openid: loginData.openid,
									nickName: userInfo.nickname,
									avatar: userInfo.avatar,
									token: loginData.token,
									isVip: Boolean(userInfo.isVip),
									vipType: userInfo.vipType,
									vipExpress: userInfo.vipExpress,
									ynId: userInfo.yhId
								})
								if (this.detailInfo.url) {
									uni.navigateTo({
										url: detailInfo.url
									});
								}
								uni.navigateBack({
								    delta: 1
								});
							}
						})
					},
					fail(e) {
						console.log("获取用户信息失败", e)
						uni.navigateBack({
						    delta: 1
						});
					}
				})
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.bg {
		position: relative;
		text-align: center;
		width: 100%;
		min-height: 100%;
		min-height: 100vh;
		background: url('https://qiniu.jarvistrip.com/login_bg.png') no-repeat;
		background-size:cover;
		.pluex-icon {
			position: absolute;
			left: 50%;
			margin-left: -35%;
			width: 70%;
			top: 350rpx;
			text-align: center;
			display: flex;
			.img-style {
				width: 180rpx;
				height:180rpx;
				border-radius: 90rpx;
			}
			.text {
				height: 180rpx;
				line-height: 180rpx;
				display: inline-block;
				font-size: 70rpx;
				font-weight: 700;
			}
		}
		.little-text {
			position: absolute;
			left: 50%;
			margin-left: -40%;
			bottom: 400rpx;
			font-size: 24rpx;
			font-weight: 300;
			width: 80%;
		}
		.login-button {
			position: absolute;
			left: 50%;
			margin-left: -30%;
			bottom: 300rpx;
			font-size: 58rpx;
			font-weight: 500;
			width: 60%;
		}
		.no-login {
			position: absolute;
			left: 50%;
			margin-left: -30%;
			bottom: 250rpx;
			font-size: 30rpx;
			font-weight: 500;
			width: 60%;
			color:grey;
		}
	}
</style>
