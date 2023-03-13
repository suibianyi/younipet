<template>
	<view class="detail-banner">
		<view class="main-image">
			<image :src="mainBanner" mode="aspectFill"></image>
		</view>
		<view class="sub-images">
			<view class="sub-image" v-for="(banner, index) in subBanner" :key="index">
				<image :src="banner" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"DetailBanner",
		props: {
			list: {
				type: Array
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			mainBanner: function () {
				const { list } = this;
				return list[0]
			},
			subBanner: function () {
				const { list } = this;
				return list.filter((item, index) => index != 0)
			}
		}
	}
</script>

<style lang="scss" scoped>
.detail-banner {
	padding: 20rpx $padding;
	.main-image {
		width: 100%;
		height: 686rpx;
	}
	.sub-images {
		margin-top: 20rpx;
		display: flex;
		.sub-image {
			width: 120rpx;
			height: 120rpx;
			margin-right: 24rpx;
			&:last-child {
				margin-right: 0;
			}
		}
	}
	image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
}
</style>