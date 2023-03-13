<template>
	<view class="container">
		<view class="list">
			<navigator class="list-item" url="/pages/person/editPet/editName/editName?nickname=薯条" hover-class="u-hover-class">
				<view class="title">
					昵称
				</view>
				<view class="right">
					<view class="value">
						{{petData.name || "薯条"}}
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
			<navigator class="list-item" hover-class="u-hover-class" url="/pages/person/editPet/editVarieties/editVarieties">
				<view class="title">
					品种
				</view>
				<view class="right">
					<view class="value">
						选择爱宠品种
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
			<view class="list-item" hover-class="u-hover-class" @click="onSelectGender">
				<view class="title">
					性别
				</view>
				<view class="right">
					<view class="value">
						{{genderMap[gender] || '选择爱宠性别'}}
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
			<view class="list-item" hover-class="u-hover-class" @click="showDatePicker = true">
				<view class="title">
					生日
				</view>
				<view class="right">
					<view class="value">
						{{date || '选择爱宠生日'}}
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
			<view class="list-item" hover-class="u-hover-class" @click="onSelectSterilization">
				<view class="title">
					绝育
				</view>
				<view class="right">
					<view class="value">
						{{sterilizationMap[sterilization] || '选择是否绝育'}}
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
			<view class="list-item" hover-class="u-hover-class" @click="onSelectVaccines">
				<view class="title">
					疫苗
				</view>
				<view class="right">
					<view class="value">
						{{vaccinesMap[vaccines] || '选择是否疫苗'}}
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
			<view v-if="vaccines == 1" class="list-item" hover-class="u-hover-class" @click="showVaccinesDatePicker = true">
				<view class="title">
					疫苗时间
				</view>
				<view class="right">
					<view class="value">
						{{vaccinesDate || '选择疫苗时间'}}
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
		</view>
		<view class="submit-btn">
			<u-button type="primary" size="large" @click="onSubmit">保存</u-button>
		</view>
		<SelectPopup
			ref="selectGenderPopup"
			popupTitle="选择爱宠性别"
			:options="genderList"
			@submit="getGenderValue"
		/>
		<SelectPopup
			ref="selectSterilizationPopup"
			popupTitle="选择是否绝育"
			:options="sterilizationList"
			@submit="getSterilizationValue"
		/>
		<SelectPopup
			ref="selectVaccinesPopup"
			popupTitle="选择是否接种疫苗"
			:options="vaccinesList"
			@submit="getVaccinesValue"
		/>
		<u-datetime-picker
			:show="showDatePicker"
			mode="date"
			@confirm="onDateConfirm"
			@cancel="showDatePicker = false"
		></u-datetime-picker>
		<u-datetime-picker
			:show="showVaccinesDatePicker"
			mode="date"
			@confirm="onVaccinesDateConfirm"
			@cancel="showVaccinesDatePicker = false"
		></u-datetime-picker>
	</view>
</template>

<script>
	
	import { addPet, getPet, petUpdate } from '@/server/api.js'
	import SelectPopup from '@/components/SelectPopup/SelectPopup.vue';
	const genderMap = {
		0: 'MM',
		1: 'GG'
	}
	const sterilizationMap = {
		1: '已绝育',
		0: '未绝育'
	}
	const vaccinesMap = {
		1: '已接种',
		0: '未接种'
	}
	export default {
		components: {
			SelectPopup,
		},
		data() {
			return {
				arrowColor: '#B9B9B9',
				genderMap,
				sterilizationMap,
				vaccinesMap,
				gender: '',
				sterilization: '',
				vaccines: '',
				date: '',
				vaccinesDate: '',
				showDatePicker: false,
				showVaccinesDatePicker: false,
				first: true
			};
		},
		async onLoad () {
			const res = await getPet()
			if (res && res[0]) {
				this.$store.dispatch('savePet', {
					id: res[0].id,
					date: res[0].birth,
					kind: res[0].kind,
					name: res[0].name,
					sterilization: res[0].operation,
					gender: res[0].sex,
					type: res[0].type,
					vaccines: res[0].vero,
					vaccinesDate: res[0].veroDate
				})
				this.gender = res[0].sex
				this.date = res[0].birth
				this.vaccines= res[0].vero
				this.vaccinesDate= res[0].veroDate
				this.sterilization= res[0].operation
				console.log(res)
				this.first = false
			}
		},
		computed: {
			petData() {
				return this.$store.getters.pet
			},
			genderList: function () {
				return Object.keys(genderMap).map(value => {
					return {
						label: genderMap[value],
						value,
					}
				})
			},
			sterilizationList: function () {
				return Object.keys(sterilizationMap).map(value => {
					return {
						label: sterilizationMap[value],
						value,
					}
				})
			},
			vaccinesList: function () {
				return Object.keys(vaccinesMap).map(value => {
					return {
						label: vaccinesMap[value],
						value,
					}
				})
			}
		},
		methods: {
			onSelectGender () {
				this.$refs.selectGenderPopup.openPopup();
			},
			onSelectSterilization () {
				this.$refs.selectSterilizationPopup.openPopup();
			},
			onSelectVaccines () {
				this.$refs.selectVaccinesPopup.openPopup();
			},
			getGenderValue (value) {
				this.gender = value;
			},
			getSterilizationValue (value) {
				this.sterilization = value;
			},
			getVaccinesValue (value) {
				this.vaccines = value;
			},
			onDateConfirm (e) {
				this.date = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
				this.showDatePicker = false;
			},
			onVaccinesDateConfirm (e) {
				this.vaccinesDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
				this.showVaccinesDatePicker = false;
			},
			async onSubmit () {
				if (this.first)  {
					await addPet({
						birth: this.date,
						kind: 0,
						name: this.$store.getters.pet.name,
						operation: this.sterilization,
						sex: this.gender,
						type: 0,
						vero: this.vaccines,
						veroDate: "2012-02-03"
					});
				}else {
					await petUpdate({
						id: this.$store.getters.pet.id,
						birth: this.date,
						kind: 0,
						name: this.$store.getters.pet.name,
						operation: this.sterilization,
						sex: this.gender,
						type: 0,
						vero: this.vaccines,
						veroDate: "2012-02-03"
					});
				}
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	.list {
		background-color: #fff;
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
		}
	}
}
.submit-btn {
	margin-top: 60rpx;
	padding: 0 $padding;
}
</style>
</style>
