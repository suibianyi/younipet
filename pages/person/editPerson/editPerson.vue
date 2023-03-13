<template>
	<view class="container">
		<view class="list">
			<view class="list-item">
				<view class="title">
					头像
				</view>
				<view class="right">
					<view class="u-page__upload-item">
						<u-upload
							@afterRead="afterRead"
							name="6"
							:maxCount="1"
						>
							<image class="avatar" :src="userData.avatar"></image>
						</u-upload>
					</view>
					<view class="icon-box">
						<u-icon
							slot="right"
							size="12"
							:color="arrowColor"
							name="arrow-right"
						></u-icon>
					</view>
				</view>
			</view>
			<navigator class="list-item" :url="`/pages/person/editPerson/editName/editName?nickname=${userData.nickName}`" hover-class="u-hover-class">
				<view class="title">
					昵称
				</view>
				<view class="right">
					<view class="value">
						{{userData.nickName}}
					</view>
					<view class="icon-box">
						<u-icon
							slot="right"
							size="12"
							:color="arrowColor"
							name="arrow-right"
						></u-icon>
					</view>
				</view>
			</navigator>
			<navigator class="list-item" url="/pages/person/editPerson/editPassword/editPassword" hover-class="u-hover-class">
				<view class="title">
					支付密码
				</view>
				<view class="right">
					<view class="value">
						修改支付密码
					</view>
					<view class="icon-box">
						<u-icon
							slot="right"
							size="12"
							:color="arrowColor"
							name="arrow-right"
						></u-icon>
					</view>
				</view>
			</navigator>
			<view class="list-item" hover-class="u-hover-class">
				<view class="title">
					银行卡管理
				</view>
				<view class="right">
					<view class="value">
						添加/修改银行卡
					</view>
					<view class="icon-box">
						<u-icon
							slot="right"
							size="12"
							:color="arrowColor"
							name="arrow-right"
						></u-icon>
					</view>
				</view>
			</view>
			<navigator class="list-item" hover-class="u-hover-class" url="/pages/person/editPet/editPet">
				<view class="title">
					宠物信息
				</view>
				<view class="right">
					<view class="value">
						添加/修改宠物
					</view>
					<view class="icon-box">
						<u-icon
							slot="right"
							size="12"
							:color="arrowColor"
							name="arrow-right"
						></u-icon>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrowColor: '#B9B9B9',
			};
		},
		computed: {
			userData() {
				return this.$store.getters.user
			}
		},
		methods: {
			afterRead (value) {
				console.log(value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	background-color: #fff;
	.list {
		padding: 0 $padding;
		.list-item {
			padding: $padding 0;
			border-bottom: solid 1px $border-color;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				font-size: 32rpx;
			}
			.right {
				display: flex;
				align-items: center;
				.icon-box {
					width: 40rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 20rpx;
				}
				.value {
					font-size: 28rpx;
					color: $text-sub-color;
				}
			}
			.avatar {
				width: 112rpx;
				height: 112rpx;
				border-radius: 50%;
				
			}
		}
	}
}
</style>
