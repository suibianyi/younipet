<template>
	<view class="upload-wrap" >
		<view class="image-item" v-for="(item, idx) in commentImage" :key="idx">
			<view class="del-btn" @click="delPhoto(idx)">
				<u-icon name="trash" color="#B9B9B9" size="14"></u-icon>
			</view>
			<image :src="item" mode="aspectFill"></image>
		</view>
		<view class="upload-bar" @click="chooseMedia()">
			<u-icon name="plus" size="30" color="#B9B9B9"></u-icon>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UploadBar',
	props: {
		mediaText: {
			type: String,
			default: '上传图片/视频'
		},
		// 上传图片的数组
		uploadImage: {
			type: String || Array
		},
		num: {
			type: Number,
			default: 9
		},
		// 指定上传类型
		uploadType: {
			type: Array || String,
			default () {
				return ['image', 'video']
			}
		}
	},
	data () {
		return {
			imgUrl: '',
			imageFile: this.uploadImage,
			// 上传图片的数组
			commentImage:[],
			maxPhoto: true,
			mediaType: null,
		};
	},
	created () {
		if (this.imageFile && this.num === 1) {
			this.commentImage.push(this.uploadImage)
		} else if (this.imageFile && this.num >= 1) {
			this.commentImage = this.imageFile
		}
		if (this.commentImage.length == this.num) {
			this.maxPhoto = false
		}
	},
	methods: {
		// 选择视频上传
		chooseMedia () {
			this.$emit('chooseMedia',true)
			const params = {
				count: this.num - this.commentImage.length,
				mediaType: this.uploadType
			}
			uni.chooseMedia({
				count: params.count || 9,
				mediaType: params.mediaType || ['image', 'video'],
				success(res) {
					
				},
				fail() {
					uni.openSetting()
				}
			})
		},
		delPhoto (index) {
			// 删除图片或者视频
			this.commentImage.splice(index, 1)
			if (this.commentImage.length < this.num) {
				this.maxPhoto = true
			}
			this.$emit('delMedia', this.commentImage)
		},
	}
};
</script>

<style lang="scss" scoped>
.upload-bar {
	border: solid 1px $text-sub-color;
	width: 150rpx;
	height: 150rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.upload-wrap {
	display: flex;
	flex-wrap: wrap;
	
	.item {
		width: 150rpx;
		height: 150rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		position: relative;
		&:nth-child(4n) {
			margin-right: 0;
		}
		image {
			width: 100%;
			height: 100%;
			z-index: 0;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
		.del-btn {
			position: absolute;
			font-size: 30upx;
			top: -15upx;
			right: -10upx;
			z-index: 2;
			width: 40upx;
			height: 40upx;
			line-height: 40upx;
			text-align: center;
			background: rgba(0, 0, 0, 0.6);
			color: #fff;
			border-radius: 50%;
		}
	}
}
</style>
