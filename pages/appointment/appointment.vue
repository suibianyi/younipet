<template>
	<view class="container">
		<view class="form-container">
			<u--form
				labelPosition="left"
				:model="formData"
				:labelWidth="70"
				ref="form"
			>
				<u-form-item
					label="选择日期"
					borderBottom
					@click="showDate = true;"
				>
					<view class="form-content">{{formData.date | date('yyyy-mm-dd')}}</view>
					<u-icon
						slot="right"
						size="12"
						:color="arrowColor"
						name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="预约时段"
					borderBottom
					@click="showStartTime = true"
				>
					<view class="form-content" v-if="formData.startTime && formData.endTime">
						<text>{{formData.startTime}}</text>
						<text>-</text>
						<text>{{formData.endTime}}</text>
					</view>
					<view class="form-content" v-else>
						请选择时间段
					</view>
					<u-icon
						slot="right"
						size="12"
						:color="arrowColor"
						name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="预约服务"
					borderBottom
				>
					<view class="form-content">
						{{serviceGoodsData.name}}
					</view>
				</u-form-item>
				<u-form-item
					label="服务价格"
					borderBottom
				>
					<view class="form-content">
						￥{{serviceGoodsData.price}}
					</view>
				</u-form-item>
				<u-form-item
					label="对应门店"
					borderBottom
				>
					<view class="form-content">
						{{formData.storeName}}
					</view>
				</u-form-item>
				<view class="title">
					预约人信息
				</view>
				<u-form-item
					label="预约昵称"
					borderBottom
				>
					<view class="form-content">
						{{formData.name}}
					</view>
				</u-form-item>
				<u-form-item
					label="预约电话"
					borderBottom
					@click="showMobileModal = true"
				>
					<view class="form-content">
						{{formData.mobile}}
					</view>
					<view slot="right" class="edit-text" >
						修改
					</view>
				</u-form-item>
				<u-form-item
					label="宠物名称"
					borderBottom
					@click="showPetNameModal = true"
				>
					<view class="form-content">
						{{formData.petName}}
					</view>
					<view slot="right" class="edit-text">
						修改
					</view>
				</u-form-item>
				<u-form-item
					label="宠物性别"
					borderBottom
					@click="onSelectGender"
				>
					<view class="form-content">
						{{genderMap[formData.petGender] || '选择爱宠性别'}}
					</view>
					<u-icon
						slot="right"
						size="12"
						:color="arrowColor"
						name="arrow-right"
					></u-icon>
				</u-form-item>
			</u--form>
		</view>
		<view class="submit-btn">
			<u-button type="primary" size="large" @click="onSubmit">发起预约</u-button>
		</view>
		<u-datetime-picker
			:show="showDate"
			mode="date"
			:formatter="formatter"
			@confirm="dateConfirm"
			@cancel="showDate = false"
		></u-datetime-picker>
		<u-datetime-picker
			:show="showStartTime"
			mode="time"
			closeOnClickOverlay
			title="开始时间"
			@confirm="startTimeConfirm"
			@cancel="showStartTime = false"
		></u-datetime-picker>
		<u-datetime-picker
			:show="showEndTime"
			mode="time"
			title="结束时间"
			closeOnClickOverlay
			@confirm="endTimeConfirm"
			@cancel="showEndTime = false"
		></u-datetime-picker>
		<SelectPopup
			ref="selectGenderPopup"
			popupTitle="选择爱宠性别"
			:options="genderList"
			@submit="getGenderValue"
		/>
		<u-modal :show="showMobileModal" title="修改手机号" @confirm="mobileConfirm" @cancel="mobileCancel" >
			<u-input v-model="editMobile" placeholder="请输入手机号"></u-input>
		</u-modal>
		<u-modal :show="showPetNameModal" title="修改宠物名称" @confirm="petNameConfirm" @cancel="petNameCancel" >
			<u-input v-model="editpetName" placeholder="请输入宠物名称"></u-input>
		</u-modal>
		<AppointmentSuccessPopup ref="appointmentSuccessPopup" :formData="formData"/>
	</view>
</template>

<script>
	import AppointmentSuccessPopup from '@/components/AppointmentSuccessPopup/AppointmentSuccessPopup.vue';
	import SelectPopup from '@/components/SelectPopup/SelectPopup.vue';
	import {productDetail, orderCreat,payWx, getPet} from '@/server/api.js'
	const genderMap = {
		1: 'MM',
		0: 'GG'
	}
	export default {
		components: {
			AppointmentSuccessPopup,
			SelectPopup,
		},
		data() {
			return {
				id: '',
				showDate: false,
				showStartTime: false,
				showEndTime: false,
				showMobileModal: false,
				showPetNameModal: false,
				arrowColor: '#B9B9B9',
				formData: {
					date: '',
					startTime: '',
					endTime: '',
					storeName: '门店昵称',
					name: 'xxx昵称',
					mobile: '15205009113',
					petName: '',
					petGender: '',
					orderId:''
				},
				serviceGoodsData:{
					price:'',
					name:''
				},
				genderMap,
				editMobile: '',
				editpetName: '',
				storeId:''
			};
		},
		computed: {
			genderList: function () {
				return Object.keys(genderMap).map(value => {
					return {
						label: genderMap[value],
						value,
					}
				})
			},
		},
		async onLoad(option) {
			if(option) {
				const isVip = this.$store.getters.user.isVip
				console.log('123456798', option)
				const res = await productDetail({ custom: { auth: true }, params:{pdId: option.id}})
				console.log('获得的商品详情', res)
				this.serviceGoodsData.price=`${isVip?res.productStockList[0].vipPrice:res.productStockList[0].price}/${res.stockUnit}`
				this.serviceGoodsData.name=res.name
				this.storeId = res.store.id
				this.formData.storeName = res.store.storeName
				this.id = option.id
				const res1 = await getPet()
				if (res1 && res1[0]) {
					this.formData.petName = res1[0].name
					this.formData.petGender = genderMap[ parseInt(res1[0].sex)]
				}
				const getUserInfo = uni.getStorageSync('userInfo')
				this.formData.name = getUserInfo.nickName
				console.log('getUserInfo',getUserInfo)
			}
		},
		methods: {
			onSelectGender () {
				this.$refs.selectGenderPopup.openPopup();
			},
			dateConfirm ({value}) {
				this.formData.date = value;
				this.showDate = false;
			},
			startTimeConfirm ({value}) {
				this.formData.startTime = value;
				this.showStartTime = false;
				setTimeout(() => {
					this.showEndTime = true;
				}, 300)
			},
			endTimeConfirm ({value}) {
				this.formData.endTime = value;
				this.showEndTime = false;
			},
			getGenderValue (value) {
				this.formData.petGender = value;
			},
			mobileConfirm () {
				const { editMobile } = this;
				if (!uni.$u.test.mobile(editMobile)) {
					return uni.$u.toast('请输入正确的手机号');
				}
				this.formData.mobile = editMobile;
				this.showMobileModal = false;
			},
			mobileCancel () {
				this.editMobile = '';
				this.showMobileModal = false;
			},
			petNameConfirm () {
				const { editpetName } = this;
				if (!editpetName) {
					return uni.$u.toast('请输入宠物名称');
				}
				this.formData.petName = editpetName;
				this.showPetNameModal = false;
			},
			petNameCancel () {
				this.editpetName = '';
				this.showPetNameModal = false;
			},
			async onSubmit () {
				if(this.formData.date=='') {
					return uni.$u.toast('请选择日期');
				} else if (this.formData.startTime=='') {
					return uni.$u.toast('请选择时段');
				} else if (this.formData.endTime=='') {
					return uni.$u.toast('请选择时段');
				} else if (this.formData.petName=='') {
					return uni.$u.toast('请输入宠物名称');
				} else if (this.formData.petGender=='') {
					return uni.$u.toast('请选择宠物性别');
				}
				
				const res1= await orderCreat({
						productId: this.id,
						serviceBook:{
							bookDate: uni.$u.timeFormat(this.formData.date, 'yyyy-mm-dd'),
							startTime:this.formData.startTime,
							endTime: this.formData.endTime,
							nickname: this.formData.name,
							petName: this.formData.petName,
							petSex: 0,
							stockId: this.id,
							storeId: this.storeId,
							tel: this.formData.mobile,
						},
						stockId: this.id,
						stockNum: 1,
						type: 2,
						buyType:3,
					})
					console.log('dingdan', res1)
					const preDate = await payWx({ custom: { auth: true }, params:{orderId: res1, type:'service'}})
					console.log("preDate-----------------------------------------", preDate);
					uni.requestPayment({
						timeStamp: `${preDate.timeStamp}`,
						nonceStr: preDate.nonceStr,
						package: preDate.package,
						signType: 'MD5',
						paySign: preDate.paySign,
						success: async (res) => {
							uni.showToast({
								title: "支付成功"
							})
							this.formData.orderId = res1;
							this.$refs.appointmentSuccessPopup.showPopup = true;
							// uni.navigateTo({
							// 	url: 'pages/orderList/orderList'
							// })
						},
						fail: (res) => {
							uni.showToast({
								icon: 'error',
								title: "支付失败"
							})
							// this.$refs.appointmentSuccessPopup.showPopup = true;
							uni.navigateTo({
								url: '/pages/orderList/orderList'
							})
						},
						complete: () => {
							this.loading = false;
							// uni.navigateTo({
							// 	url: 'pages/orderList/orderList'
							// })
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.form-container {
		background-color: #fff;
		padding: 0 $padding;
	}
	.form-content {
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx;
	}
	.title {
		font-weight: bold;
		line-height: 80rpx;
	}
	.edit-text {
		font-size: 24rpx;
		color: $text-tip-color;
	}
	.submit-btn {
		margin-top: 60rpx;
		padding: 0 $padding;
	}
}
</style>
