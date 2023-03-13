<template>
	<view class="container">
		<view class="empty-container" v-if="isEmpty">
			<image src="@/static/image/empty/carEmpty.png" mode="widthFix"></image>
			<view class="text">暂无任何商品</view>
		</view>
		<template v-else>
			<view class="manage-container" @click="onChangeMode">
				{{isEdit ? '完成' : '管理'}}
			</view>
			<view class="store-list">
				<u-swipe-action>
					<view class="store-item" v-for="(item, index) in storeList" :key="item.storeId">
						<view class="store-info-container">
							<view class="check-container" @click="onChangeStoreSelect(item, index)">
								<image :src="item.isAllSelected ? checkedImg : checkImg"></image>
							</view>
							<view class="store-name-container">
								<image class="store-icon" src="@/static/image/store-icon.png"></image>
								<view class="store-name">
									{{item.storeName}}
								</view>
								<u-icon name="arrow-right" color="#B9B9B9" size="14"></u-icon>
							</view>
						</view>
						<view class="goods-list">
							<u-swipe-action-item
								v-for="(goodsItem, idx) in item.goodsList"
								class="swipe-action-item"
								:key="goodsItem.goodsId"
								:options="swiperActionOptions"
								@click="onActionItemClick(index, idx)"
							>
								<view class="goods-item" >
									<view class="check-container" @click="onChangeGoodsSelect(goodsItem, index, idx)">
										<image :src="goodsItem.isSelected ? checkedImg : checkImg"></image>
									</view>
									<view class="goods-info-box">
										<u-image :src="goodsItem.goodsImage" width="164rpx" height="164rpx" radius="20rpx"></u-image>
										<view class="goods-info">
											<view class="goods-name u-line-2">
												{{goodsItem.goodsName}}
											</view>
											<view class="goods-bottom-wrap">
												<view class="">
													<view class="goods-spec">
														{{goodsItem.goodsSpec}}
													</view>
													<view class="goods-price">
														¥{{goodsItem.goodsPrice}}
													</view>
												</view>
												<view class="goods-number-box">
													<u-number-box v-model="goodsItem.goodsCount"></u-number-box>
												</view>
											</view>
										</view>
									</view>
								</view>
							</u-swipe-action-item>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</template>
		<view class="recommend-container">
			<view class="container-title-box">
				<view class="container-title">
					有你推荐
				</view>
			</view>
			<view class="goods-list-container">
				<GoodsItem v-for="(item, index) in recommendList" :key="index" :item="item"/>
			</view>
		</view>
		
		<view class="bottom-wrap" >
			<view class="u-flex">
				<view class="check-container" @click="onSelectAllGoods()">
					<image :src="allSelected ? checkedImg : checkImg"></image>
				</view>
				<text>全选</text>
			</view>
			<view class="button-item" v-if="isEdit">
				<u-button
					type="primary"
					size="small" 
					:customStyle="{
						width: '184rpx'
					}"
					:disabled="isButtonDisabled"
					@click="showBatchDeleteModal = true"
				>删除</u-button>
			</view>
			<view class="bottom-wrap-right" v-else>
				已选{{hasSelectedGoodsCount}}件，
				总计：￥{{hasSelectedGoodsPrice}}
				<view class="button-item">
					<u-button
						type="primary"
						size="small"
						:customStyle="{
							width: '184rpx'
						}"
						:disabled="isButtonDisabled"
						@click="toConfirmOrder"
					>结算</u-button>
				</view>
			</view>
		</view>
		<u-modal
			:show="showDeleteModal"
			content='确定删除该商品吗?'
			@confirm="onDelete"
			@cancel="showDeleteModal = false"
		></u-modal>
		<u-modal
			:show="showBatchDeleteModal"
			content='确定删除选中的商品吗?'
			@confirm="onBatchDelete"
			@cancel="showBatchDeleteModal = false"
		></u-modal>
	</view>
</template>

<script>
	const resourceData = [
		{
			storeName: '晋安区门店',
			storeId: '11',
			goodsList: [
				{
					goodsName: '宝路狗零食中小型犬成犬洁齿棒宝路狗零食中小型犬成犬洁齿棒',
					goodsImage: require('@/static/image/goods-image.png'),
					goodsSpec: '商品型号',
					goodsPrice: 168,
					goodsCount: 1,
					goodsId: 1,
					isSelected: false
				},
				{
					goodsName: '宝路狗零食中小型犬成犬洁齿棒宝路狗零食中小型犬成犬洁齿棒',
					goodsImage: require('@/static/image/goods-image.png'),
					goodsSpec: '商品型号',
					goodsPrice: 168,
					goodsCount: 1,
					goodsId: 2,
					isSelected: true
				}
			]
		},
		{
			storeName: '晋安区门店',
			storeId: '12',
			goodsList: [
				{
					goodsName: '宝路狗零食中小型犬成犬洁齿棒宝路狗零食中小型犬成犬洁齿棒',
					goodsImage: require('@/static/image/goods-image.png'),
					goodsSpec: '商品型号',
					goodsPrice: 168,
					goodsCount: 1,
					goodsId: 3,
					isSelected: false
				},
			]
		}
	]
	import GoodsItem from '@/components/GoodsItem/GoodsItem.vue';
	import { getCartList, updateCartList, productList, delCartList} from '@/server/api.js'
	export default {
		components: {
			GoodsItem
		},
		data() {
			return {
				mode: '',
				allSelected: false,
				checkedImg: require('@/static/image/checked.png'),
				checkImg: require('@/static/image/check.png'),
				storeList: [],
				showDeleteModal: false,
				showBatchDeleteModal: false,
				deleteIndex: '',
				deleteIdx: '',
				swiperActionOptions: [
					{
						text: '删除',
						icon: 'trash-fill',
						iconSize: '16',
						style: {
							backgroundColor:  '#FE3E3D',
							color: '#fff',
							fontSize: '20rpx',
							display: 'flex',
							flexDirection: 'column',
						}
					}
				],
				recommendList: [
					{
						goodsId: '1',
						goodsThumb: require('@/static/image/goods-image.png'),
						goodsName: '商品名称',
						price: '96',
						saleCount: '3000'
					}
				]
			};
		},
		computed: {
			isEmpty: function ({storeList}) {
				return !storeList.length
			},
			isEdit: function ({mode}) {
				return mode === 'edit';
			},
			hasSelectedGoodsCount: function ({storeList}) {
				return storeList.reduce((count, item) => {
					const { goodsList } = item;
					const goodsCount = goodsList.reduce((goodsCount, item) => {
						if (item.isSelected) {
							goodsCount += 1;
						}
						return goodsCount;
					}, 0)
					count += goodsCount;
					return count;
				}, 0)
			},
			hasSelectedGoodsPrice: function ({storeList}) {
				return storeList.reduce((totalPrice, item) => {
					const { goodsList } = item;
					const goodsPrice = goodsList.reduce((price, item) => {
						const { isSelected, goodsPrice } = item;
						if (isSelected) {
							price += goodsPrice;
						}
						return price;
					}, 0)
					totalPrice += goodsPrice;
					return totalPrice;
				}, 0)
			},
			isButtonDisabled: function ({hasSelectedGoodsCount}) {
				return hasSelectedGoodsCount === 0
			}
		},
		onLoad () {
			// this.getCarData()
		},
		onShow () {
			this.getCarData()
			this.getRecommendList()
		},
		methods: {
			async getRecommendList() {
				console.log('1111',this.recommendList)
				const res = await productList({
					recommend: true,
					type: 1
				})
				this.recommendList =[]
				for(const item of res) {
					this.recommendList.push({
						goodsId:item.id,
						goodsName:item.name,
						goodsThumb: JSON.parse(item.img)[0],
						vipPrice:item.productStockList[0].vipPrice,
						price:item.productStockList[0].price,
						stock: item.productStockList[0].stockNum,
						merchantName:'暗室逢灯的',
						distance: '昂士大夫',
						saleCount: item.saleNum
					})
				}
				console.log('22222',this.recommendList)
			},
			onChangeMode () {
				const { isEdit } = this;
				 this.mode = isEdit ? '' : 'edit'; 
			},
			getIsAllSelected (goodsList) {
				return goodsList.every(goodsItem => goodsItem.isSelected)
			},
			async getCarData () {
				const isVip = this.$store.getters.user.isVip
				const res = await getCartList({ custom: { auth: true }})
				const temp = []
				for (const item of res) {
					const temp2 = {}
					temp2.storeName = item.store.storeName
					temp2.storeId = item.store.id
					const temp3 = []
					for(const item2 of item.cartVoList) {
						const temp4 = {}
							temp4.goodsName = item2.productName
							temp4.goodsImage = item2.img
							// temp4.goodsSpec = (item2.secondName1?item2.secondName1:'')+(item2.secondName2?item2.secondName2:'')+(item2.secondName3?item2.secondName3:'')
							if (isVip) {
								temp4.goodsPrice = item2.vipPrice
							} else {
								temp4.goodsPrice = item2.price
							}
							temp4.goodsCount = item2.buyNum
							temp4.goodsId = item2.productId
							temp4.cartId = item2.cartId
							temp4.isSelected = item2.checked
						temp3.push(temp4)
						}
					temp2.goodsList=temp3
					temp.push(temp2)
				}
				console.log('购物车123', temp)
				this.storeList = temp.map(item => {
					const { goodsList } = item;
					const isAllSelected = this.getIsAllSelected(goodsList);
					return {
						...item,
						isAllSelected,
					};
				})
				console.log('购物车', resourceData)
			},
			async onChangeGoodsSelect (goodsItem, index) {
				const { goodsList } = this.storeList[index];
				goodsItem.isSelected = !goodsItem.isSelected;
				await updateCartList({
					cartId:goodsItem.cartId,
					productId:goodsItem.goodsId,
					checked: goodsItem.isSelected,
					stockNum:goodsItem.goodsCount
				})
				this.storeList[index].isAllSelected = this.getIsAllSelected(goodsList);
			},
			async onChangeStoreSelect (storeItem, index) {
				const { goodsList, isAllSelected } = this.storeList[index];
				storeItem.isAllSelected = !isAllSelected;
				this.storeList[index].goodsList.forEach(async item => {
					item.isSelected = storeItem.isAllSelected;
					await updateCartList({
						cartId:item.cartId,
						productId:item.goodsId,
						checked: item.isSelected,
						stockNum:item.goodsCount
					})
				})
			},
			onActionItemClick (index, idx) {
				this.showDeleteModal = true;
				// TODO 后续传商品ID给后端删除
				this.deleteIndex = index;
				this.deleteIdx = idx;
				// console.log('我要删除的是', this.deleteIndex)
			},
			async onDelete () {
				const { deleteIndex, deleteIdx } = this;
				const { goodsList = [] } = this.storeList[deleteIndex];
				console.log('我要删除的是123', goodsList[deleteIdx])
				await delCartList({ custom: { auth: true }, params:{ids: goodsList[deleteIdx].cartId}})
				goodsList.splice(deleteIdx, 1);
				if (goodsList.length === 0) {
					this.storeList.splice(deleteIndex, 1);
				}
				this.showDeleteModal = false;
			},
			async onSelectAllGoods () {
				this.allSelected = !this.allSelected;
				this.storeList.forEach(item => {
					item.isAllSelected = this.allSelected;
					item.goodsList.forEach(async goodsItem => {
						goodsItem.isSelected = this.allSelected;
						await updateCartList({
							cartId:goodsItem.cartId,
							productId:goodsItem.goodsId,
							checked: goodsItem.isSelected,
							stockNum:goodsItem.goodsCount
						})
					})
				})
			},
			async onBatchDelete () {
				const { storeList } = this;
				const selectGoodsIds = storeList.map(item => {
					return item.goodsList.filter(item => item.isSelected).map(item => item.cartId)
				}).flat();
				console.log('我要删除的是465', selectGoodsIds)
				for (const item of selectGoodsIds) {
					await delCartList({ custom: { auth: true }, params:{ids: item}})
				}
				// delCartList
				this.showBatchDeleteModal = false;
				this.getCarData()
			},
			toConfirmOrder () {
				uni.navigateTo({
					url: '/pages/orderList/confirmCar/confirmCar'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 100rpx;
}
.empty-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 620rpx;
	image {
		width: 596rpx;
		height: auto;
	}
	.text {
		font-size: 32rpx;
		color: $text-sub-color;
	}
}
.manage-container {
	width: 100%;
	height: 72rpx;
	background-color: #fff;
	padding: 0 $padding;
	text-align: right;
	line-height: 72rpx;
	font-size: 24rpx;
}
.check-container {
	image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}
}
.store-list {
	.store-item {
		margin-top: 20rpx;
		background-color: #fff;
		padding: $padding;
	}
	.store-info-container {
		display: flex;
		align-items: center;
		margin-bottom: $padding;
		.store-name-container {
			display: flex;
			align-items: center;
			.store-name {
				font-size: 28rpx;
				font-weight: bold;
				margin-right: 25rpx;
				line-height: 40rpx;
			}
			.store-icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
	.goods-list {
		width: 100%;
		
		::v-deep {
			.u-swipe-action-item {
				margin-bottom: 20rpx;
				&:last-child {
					margin-bottom: 0;
				}
			}
			.u-swipe-action-item__right__button__wrapper {
				border-radius: 12rpx !important;
			}
			.goods-item {
				width: 100%;
				display: flex;
				align-items: center;
				.goods-info-box {
					display: flex;
					position: relative;
					.goods-info {
						margin-left: 20rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.goods-name {
							line-height: 34rpx;
							font-size: 24rpx;
						}
						.goods-spec {
							color: $text-sub-color;
							font-size: 22rpx;
						}
						.goods-price {
							color: $price-color;
							margin-top: 20rpx;
						}
						.goods-bottom-wrap {
							display: flex;
							align-items: flex-end;
							justify-content: space-between;
							.goods-number-box {
								.u-number-box__plus, .u-number-box__minus {
									width: 56rpx;
									height: 44rpx !important;
									border: solid 1px $border-color;
									background-color: transparent !important;
									.u-icon__icon {
										font-size: 20rpx !important;
										color: $text-sub-color !important;
									}
								}
								.u-number-box__input {
									background-color: transparent !important;
									width: 68rpx !important;
									height: 44rpx !important;
									border: solid 1px $border-color;
									font-size: 20rpx;
									min-height: 0;
								}
							}
						}
					}
				}
			}
		}
		
	}
}
.recommend-container {
	margin-top: 20rpx;
	background-color: #FFFFFF;
	padding: 40rpx $padding;
	.container-title-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.container-title {
			font-size: 32rpx;
			font-weight: bold;
		}
	}
	.goods-list-container {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 18rpx;
	}
}
.bottom-wrap {
	width: 100%;
	height: 92rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #fff;
	padding: 0 $padding;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&-right {
		display: flex;
		align-items: center;
		color: $price-color;
		font-size: 24rpx;
		.button-item {
			margin-left: 20rpx;
		}
	}
}
</style>
