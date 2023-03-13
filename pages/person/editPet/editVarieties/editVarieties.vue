<template>
	<view class="container">
		<view class="search-container">
			<u-search placeholder="宠物品种或拼音" v-model="keyword" :showAction="false" @search="onSearch"></u-search>
		</view>
		<view class="hot-container">
			<view class="title">
				热门品种
			</view>
			<view class="hot-tag-list">
				<view class="hot-tag u-line-1" v-for="(item, index) in 8" :key="index">
					阿拉斯加对方单位
				</view>
			</view>
		</view>
		<view class="index-list-container">
			<u-index-list :index-list="indexList">
				<template v-for="(item, index) in itemArr">
					<u-index-item>
						<u-index-anchor :text="indexList[index]" bgColor="#F5F5F5"></u-index-anchor>
						<view class="list-cell" v-for="(cell, index) in item">
							{{cell}}
						</view>
					</u-index-item>
				</template>
			</u-index-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				indexList: ["A", "B", "C", "D", "E"],
				itemArr: [
					['列表A1','列表A2','列表A3'],
					['列表B1','列表B2','列表B3'],
					['列表C1','列表C2','列表C3'],
					['列表D1','列表D2','列表D3'],
					['列表E1','列表E2','列表E3'],
				]
			};
		},
		meethods: {
			onSearch () {
				
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.search-container {
	padding: 20rpx $padding;
	background-color: #fff;
	box-shadow: 0px -14rpx 44rpx 0px rgba(0, 0, 0, 0.15);
	border-radius: 0px 0px 10rpx 10rpx;
}
.hot-container {
	padding: $padding;
	.title {
		color: $text-sub-color;
	}
	.hot-tag-list {
		margin-top: 8rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.hot-tag {
			width: 134rpx;
			height: 66rpx;
			background-color: #F0F0F0;
			border-radius: 200rpx;
			font-size: 24rpx;
			margin-top: 24rpx;
			margin-right: 50rpx;
			text-align: center;
			line-height: 66rpx;
			&:nth-of-type(4n) {
				margin-right: 0;
			}
		}
	}
}
.index-list-container {
	padding: $padding;
	.list-cell {
		display: flex;
		align-items: center;
		width: 100%;
		height: 96rpx;
		font-size: 28rpx;
		border-bottom: solid 1px $border-color;
	}
	::v-deep {
		.u-index-anchor {
			border-bottom: none !important;
		}
	}
}
</style>
