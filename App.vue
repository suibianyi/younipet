<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/style/index.scss";
	@import "@/style/custom-uviewui/index.scss";
	page {
		background-color: $bg-page-color;
		color: $text-color;
		line-height: 1;
	}
</style>
