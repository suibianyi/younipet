<template>
	<view class="u-flex" hover-class="u-hover-class">
		<u-icon name="map" size="17"></u-icon>
		<text class="u-m-l-10 u-m-r-10">{{city}}</text>
		<u-icon name="arrow-down" size="10" color="#B9B9B9"></u-icon>
	</view>
</template>

<script>
	export default {
		name:"SelectCity",
		data() {
			return {
				// 可以存在vuex里面
				city: '福建省福州市'
			};
		}
	}
</script>

<style lang="scss" scoped>

</style>