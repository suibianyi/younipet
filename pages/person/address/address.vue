<template>
	<view class="container">
		<view class="address-list">
			<view class="address-item" v-for="(item, index) in addressList" :key="item.id">
				<view class="address-info" @click = "chooseAdress(item)">
					<view class="u-flex">
						<view class="">
							{{item.name}}
						</view>
						<view class="u-m-l-20">
							{{item.phone}}
						</view>
					</view>
					<view class="u-m-t-10">
						{{item.provinceName}}{{item.cityName}}{{item.areaName}} {{item.address}}
					</view>
				</view>
				<view class="operator-bar">
					<view class="checked-box" @click="onChecked(item.id)">
						<image v-if="item.isDefault" class="check-img" src="@/static/image/checked.png"></image>
						<image v-else class="check-img" src="@/static/image/check.png"></image>
						<view class="u-font-24">
							设为默认
						</view>
					</view>
					<view class="icon-box">
						<u-icon name="edit-pen-fill" size="26" hover-class="u-hover-class" @click="onEdit(item)"></u-icon>
						<u-icon name="trash-fill" size="26" hover-class="u-hover-class" @click="onDelete(item)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="button-box">
			<u-button type="primary" size="large" @click="onAdd">添加收货地址</u-button>
		</view>
	</view>
</template>
<script>
import { getAddressList, delAddressList, setDefaultAddress } from '@/server/api.js'
	export default {
		data() {
			return {
				addressList: [
					{
						id: 1,
						name: '姓名',
						mobile: '1192293933',
						address: '地址',
						detail: '详细地址',
						isDefault: true
					},
					{
						id: 2,
						name: '姓名',
						mobile: '1192293933',
						address: '地址',
						detail: '详细地址',
						isDefault: false
					}
				],
				flag:false
			};
		},
		async onLoad(options) {
			if(options) {
				this.flag=true
			}
			this.addressList = await getAddressList({ custom: { auth: true }, params:{
					limit:1000,
					page:1
				}})
		},
		methods: {
			async onChecked (id) {
				console.log('开始设置默认地址')
				await setDefaultAddress({ custom: { auth: true }, params:{id}})
				this.addressList = await getAddressList({ custom: { auth: true }, params:{
					limit:1000,
					page:1
				}})
				// this.addressList.forEach(item => {
				// 	item.isDefault = false;
				// 	if (id === item.id) {
				// 		item.isDefault = true;
				// 	}
				// })
			},
			onAdd() {
				uni.navigateTo({
					url: '/pages/person/editAddress/editAddress'
				})
			},
			chooseAdress(data) {
				this.$store.dispatch('setChooseAddress', data)
				if(this.flag){
					uni.navigateBack()
				}
			},
			onEdit (obj) {
				let detailInfo = JSON.stringify(obj)
				console.log('detailInfo', detailInfo)
				uni.navigateTo({
					url: '/pages/person/editAddress/editAddress?detailInfo='+
					encodeURIComponent(detailInfo)
				})
			},
			onDelete (obj) {
				uni.showModal({
					title: '提示',
					content: '确认删除该地址？',
					success: async () => {
						await delAddressList({ custom: { auth: true }, params:{id: obj.id}})
						this.addressList = await getAddressList({ custom: { auth: true }, params:{
					limit:1000,
					page:1
				}})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.address-item {
	width: 100%;
	padding: $padding;
	background-color: #fff;
	margin-top: 20rpx;
	.address-info {
		line-height: 36rpx;
		padding-bottom: 24rpx;
		border-bottom: solid 1px $border-color;
	}
	.operator-bar {
		padding-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.checked-box {
			display: flex;
			align-items: center;
			.check-img {
				width: 36rpx;
				height: 36rpx;
				margin-right: 20rpx;
			}
		}
		.icon-box {
			display: flex;
			align-items: center;
			::v-deep {
				.u-icon + .u-icon {
					margin-left: 30rpx;
				}
			}
		}
	}
}

.button-box {
	padding: 0 $padding;
	margin: 100rpx 0;
}
</style>
