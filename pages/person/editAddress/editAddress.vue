<template>
	<view class="container">
		<view class="form-container">
			<u--form
				labelPosition="left"
				:model="formData"
				:labelWidth="80"
				ref="form"
			>
				<u-form-item
					label="收货姓名"
					borderBottom
				>
					<view class="form-content">
						<u--input
							v-model="formData.name"
							placeholder="请输入收货姓名"
							border="none"
						></u--input>
					</view>
				</u-form-item>
				<u-form-item
					label="联系电话"
					borderBottom
				>
					<view class="form-content">
						<u--input
							v-model="formData.mobile"
							placeholder="请输入联系电话"
							border="none"
						></u--input>
					</view>
				</u-form-item>
				<u-form-item
					label="收货地址"
					borderBottom
				>
					<view
						class="form-content"
						@click="openSelectAddress"
						:class="{'input-placeholder': !formData.address}"
					>{{formData.address || '请选择收货地址'}}</view>
					<u-icon
						slot="right"
						size="12"
						:color="arrowColor"
						name="arrow-right"
					></u-icon>
				</u-form-item>
				<u-form-item
					label="详细地址"
					borderBottom
				>
					<view class="form-content">
						<u--input
							v-model="formData.detail"
							placeholder="请填写详细地址"
							border="none"
						></u--input>
					</view>
					
				</u-form-item>
			</u--form>
			<view class="operator-bar">
				<view class="checked-box" @click ="formData.isDefault=!formData.isDefault">
					<image v-if="formData.isDefault" class="check-img" src="@/static/image/checked.png"></image>
					<image v-else class="check-img" src="@/static/image/check.png"></image>
					<view class="u-font-24">
						设为默认
					</view>
				</view>
			</view>
		</view>
		<view class="submit-btn">
			<u-button type="primary" size="large" @click="onSubmit">保存</u-button>
		</view>
		<u-picker :show="show" ref="uPicker" :loading="loading" :columns="columns" @change="changeHandler" @confirm = "confirmAddress()" @cancel="show=false"></u-picker>
	</view>
</template>

<script>
	import { addAddress, locationList, updateAddress } from '@/server/api.js'
	export default {
		data() {
			return {
				id:'',
				formData: {
					name: '',
					mobile: '',
					address: '',
					provinceName:'',
					provinceCode: '',
					cityName:'',
					cityCode:'',
					areaName	:'',
					areaCode:'',
					detail: '',
					isDefault: true
				},
				columns:[],
				province:[],
				province2:[],
				province3:[],
				show: false,
				loading:false,
				arrowColor: '#B9B9B9',
			};
		},
		async onLoad (options) {
			if (options&&options!==undefined&&options.detailInfo&&options.detailInfo!==undefined) {
				console.log('传进来的参数是', options.detailInfo)
				let detailInfo = JSON.parse(decodeURIComponent(options.detailInfo));
				this.formData.provinceName= detailInfo.provinceName
				this.formData.provinceCode= detailInfo.provinceCode
				this.formData.cityName= detailInfo.cityName
				this.formData.cityCode= detailInfo.cityCode
				this.formData.areaName= detailInfo.areaName
				this.formData.areaCode= detailInfo.areaCode
				this.formData.address= detailInfo.provinceName+detailInfo.cityName+detailInfo.areaName
				this.id = detailInfo.id
				this.formData.name= detailInfo.name
				this.formData.mobile= detailInfo.phone
				this.formData.detail= detailInfo.address
				this.formData.isDefault= detailInfo.isDefault? true:false
			}
			const res = await locationList({levelId:1})
			this.columns = []
			const temp = []
			for(const item of res) {
				this.province.push({
					label:item.name,
					value:item.id,
					code: item.code
				})
				temp.push(item.name)
			}
			this.columns.push(temp)
			const res2 = await locationList({levelId:2, parentId:	this.province[0].value})
			const temp2 = []
			this.province2 = []
			for(const item of res2) {
				this.province2.push({
					label:item.name,
					value:item.id,
					code: item.code
				})
				temp2.push(item.name)
			}
			this.columns.push(temp2)
			const res3 = await locationList({levelId:3, parentId:	this.province2[0].value})
			const temp3 = []
			this.province3 = []
			for(const item of res3) {
				this.province3.push({
					label:item.name,
					value:item.id,
					code: item.code
				})
				temp3.push(item.name)
			}
			this.columns.push(temp3)
			console.log('获取到的this.columns', this.columns)
		},
		methods: {
			openSelectAddress (){
				this.show = true
			},
			getDetailFromName(name, list) {
				for(const item of list) {
					if(item.label == name) {
						return item
					}
				}
				return -1
			},
			async changeHandler (e) {
				const {
					columnIndex,
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				console.log('看看有什么', columnIndex, index)
				if (columnIndex === 0) {
						this.loading = true
						const choose = this.getDetailFromName(this.columns[columnIndex][index], this.province)
						const res = await locationList({levelId:2, parentId:choose.value})
						const temp2 = []
						this.province2 =[]
						for(const item of res) {
							this.province2.push({
								label:item.name,
								value:item.id,
							  code: item.code
							})
							temp2.push(item.name)
						}
						picker.setColumnValues(1, temp2)
						if (this.province2[0].value) {		
							const res3 = await locationList({levelId:3, parentId:	this.province2[0].value})
							const temp3 = []
							this.province3 = []
							for(const item of res3) {
								this.province3.push({
									label:item.name,
									value:item.id,
									code: item.code
								})
								temp3.push(item.name)
							}
							picker.setColumnValues(2, temp3)
							console.log('获取到的this.columns', this.columns)
						} else {
							picker.setColumnValues(2, [])
						}
						this.loading = false
				}
				if (columnIndex === 1) {
						this.loading = true
						const choose = this.getDetailFromName(this.columns[columnIndex][index], this.province2)
						const res = await locationList({levelId:3, parentId:choose.value})
						const temp3 = []
						this.province3 =[]
						for(const item of res) {
							this.province3.push({
								label:item.name,
								value:item.id,
							  code: item.code
							})
							temp3.push(item.name)
						}
						picker.setColumnValues(2, temp3)
						this.loading = false
				}
				
			},
			confirmAddress(data) {
				this.show = false
				// ["山西省", "太原市", "小店区"]
				// console.log(data.value)
				const choose1 = this.getDetailFromName(data.value[0], this.province)
				let choose2 = this.getDetailFromName(data.value[1], this.province2)
				if (choose2==-1) {
					choose2 =this.province2[0]
				}
				let choose3 = this.getDetailFromName(data.value[2], this.province3)
				if (choose3==-1) {
					choose3 =this.province3[0]
				}
				console.log('choose', choose2,choose3)
				this.formData.provinceName= choose1.label
				this.formData.provinceCode= choose1.code
				this.formData.cityName= choose2.label
				this.formData.cityCode= choose2.code
				this.formData.areaName= choose3.label
				this.formData.areaCode= choose3.code
				this.formData.address= data.value.join('')
			},
			async onSubmit () {
				if (this.id!='') {
					await updateAddress({
							name: this.formData.name,
							phone: this.formData.mobile,
							address: this.formData.detail,
							provinceName:this.formData.provinceName,
							provinceCode: this.formData.provinceCode,
							cityName:this.formData.cityName,
							cityCode:this.formData.cityCode,
							areaName:this.formData.areaName,
							areaCode:this.formData.areaCode,
							isDefault: this.formData.isDefault?1:0,
							id: this.id
						})
					uni.navigateBack()
				} else {
					await addAddress({
						name: this.formData.name,
						phone: this.formData.mobile,
						address: this.formData.detail,
						provinceName:this.formData.provinceName,
						provinceCode: this.formData.provinceCode,
						cityName:this.formData.cityName,
						cityCode:this.formData.cityCode,
						areaName:this.formData.areaName,
						areaCode:this.formData.areaCode,
						isDefault: this.formData.isDefault?1:0
					})
				}
				uni.navigateBack()
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.form-container {
		background-color: #fff;
		padding: 0 $padding;
		margin-top: 20rpx;
	}
	.form-content {
		font-size: 24rpx;
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
	}
	.operator-bar {
		padding: 24rpx 0;
		.checked-box {
			display: flex;
			align-items: center;
			.check-img {
				width: 36rpx;
				height: 36rpx;
				margin-right: 20rpx;
			}
		}
	}
	.submit-btn {
		margin-top: 60rpx;
		padding: 0 $padding;
	}
}
</style>
