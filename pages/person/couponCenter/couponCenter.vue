<template>
	<view class="container">
		<view class="banner-container">
			<image class="banner-img" :src="bannerImg" mode="widthFix"></image>
		</view>
		<u-sticky bgColor="#fff">
			<u-tabs :list="tabList" :current="tabCurrent" :scrollable="false" @change="changeTab"></u-tabs>
		</u-sticky>
		<view class="coupang-list">
			<CouponItem :isVip="tabCurrent === 1" v-for="(item, index) in couponList" :key="index" :couponData="item" @submit="flash()"/>
		</view>
	</view>
</template>

<script>
	import CouponItem from '@/components/CouponItem/CouponItem.vue';
	
	import { couponFetchCenter, couponList } from '@/server/api.js'
	export default {
		components: {
			CouponItem
		},
		data() {
			return {
				bannerImg: require('@/static/image/activeImage.png'),
				tabCurrent: 0,
				tabList: [
					{
						name: '可领(80)'
					},
					{
						name: '会员(40)'
					},
					{
						name: '我的(10)'
					},
				],
				couponList: [
					{
						title: '优惠券名称',
						beginDate: '2022/05/31',
						endDate: '2022/09/12',
						discount: 9
					},
					{
						title: '优惠券名称',
						beginDate: '2022/05/31',
						endDate: '2022/09/12',
						discount: 9
					}
				]
			};
		},
		async onLoad() {
			//0是所有用户
			const res = await couponFetchCenter({
				fetchObj: 0
			});
			this.tabList[0].name = `可领(${res.length})`
			this.couponList = []
			for (const item of res) {
				this.couponList.push({
					id: item.id,
					title: item.name,
					beginDate: this.formatTime(item.startTime),
					endDate: this.formatTime(item.endTime),
					discount: 9
				})
			}
			//1是所有vip
			const res1 = await couponFetchCenter({
				fetchObj: 1
			});
			this.tabList[1].name = `会员(${res1.length})`
			const res2 = await couponList({
			});
			this.tabList[2].name = `我的(${res2.length})`
			
		},
		methods: {
			async changeTab ({index}) {
				console.log(index)
				this.tabCurrent = index;
				let res = []
				if(index==0) {
					res=await couponFetchCenter({
						fetchObj: 0
					});
				} else if (index ==1) {
					res=await couponFetchCenter({
						fetchObj: 1
					});
				} else if (index ==2) {
					res=await couponList({
					});
				}
				this.couponList = []
				for (const item of res) {
					this.couponList.push({
						id: item.id,
						title: item.name,
						beginDate: this.formatTime(item.startTime),
						endDate: this.formatTime(item.endTime),
						discount: 9
					})
				}
			},
			formatTime(val) {
				return `${val[0]}${val[1]}${val[2]}${val[3]}/${val[4]}${val[5]}/${val[6]}${val[7]}`
			},
			async flash() {
				const index = this.tabCurrent
				let res = []
				if(index==0) {
					res=await couponFetchCenter({
						fetchObj: 0
					});
				} else if (index ==1) {
					res=await couponFetchCenter({
						fetchObj: 1
					});
				} else if (index ==2) {
					res=await couponList({
					});
				}
				this.couponList = []
				for (const item of res) {
					this.couponList.push({
						id: item.id,
						title: item.name,
						beginDate: this.formatTime(item.startTime),
						endDate: this.formatTime(item.endTime),
						discount: 9
					})
				}
				const res2 = await couponList({
				});
				this.tabList[2].name = `我的(${res2.length})`
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.banner-container {
		padding: 20rpx $padding;
		.banner-img {
			width: 100%;
			height: auto;
		}
	}
	.coupang-list {
		background-color: #fff;
		margin-top: 20rpx;
		padding: $padding;
	}
}
</style>
