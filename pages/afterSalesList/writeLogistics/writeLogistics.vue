<template>
	<view class="container">
		<view class="block-container">
			<OrderGoodsItem v-for="(item, idx) in goodsList" :key="idx" :goodsData="item"></OrderGoodsItem>
		</view>
		<view class="form-container">
			<u--form
				labelPosition="left"
				:model="formData"
				:labelWidth="70"
				ref="form"
			>
				<u-form-item
					label="物流公司"
					borderBottom
					@click="openCompanyPopup"
				>
					<view class="form-content">
						{{formData.company}}
					</view>
					<u-icon
						slot="right"
						size="12"
						color="#B9B9B9"
						name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="物流单号"
					borderBottom
				>
					<u--input
					    placeholder="请填写物流单号"
					    border="none"
					    v-model="formData.numbers"
					></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view class="submit-btn">
			<u-button type="primary" size="large" @click="onSubmit">完成</u-button>
		</view>
		<SelectPopup
			ref="selectCompanyPopup"
			popupTitle="物流公司"
			:options="companyList"
			@submit="getSelectCompany"
		/>
	</view>
</template>

<script>
	import OrderGoodsItem from '@/components/OrderGoodsItem/OrderGoodsItem.vue';
	import SelectPopup from '@/components/SelectPopup/SelectPopup.vue';
	export default {
		components: {
			OrderGoodsItem,
			SelectPopup
		},
		data() {
			return {
				formData: {
					company: '顺丰物流',
					numbers: ''
				},
				companyList: [
					{
						label: '顺丰物流',
						value: 1
					},
					{
						label: '中通快递',
						value: 2
					}
				],
				goodsList: [
					{
						goodsImage: require('@/static/image/goods-image.png'),
						goodsTitle: '商品名称',
						goodsSpec: '商品规格',
						price: '165',
						count: 1
					}
				],
			};
		},
		methods: {
			openCompanyPopup () {
				this.$refs.selectCompanyPopup.openPopup(this.formData.company)
			},
			getSelectCompany (value) {
				this.formData.company = value;
			},
			onSubmit () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.block-container {
	padding: $padding;
	background-color: #fff;
	margin-top: 20rpx;
}
.form-container {
	background-color: #fff;
	padding: 0 $padding;
	margin-top: 20rpx;
}
.form-content {
	font-size: 24rpx;
	height: 40rpx;
	line-height: 40rpx;
}
.submit-btn {
	margin-top: 60rpx;
	padding: 0 $padding;
}
</style>
