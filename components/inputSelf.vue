<template>
	<view>
		<view class="flex_1">
			<slot class="" name="input"></slot>
		</view>
		<view class="j-center">
			<!-- 删除按钮 -->
			<view class="image_tap">
				<image class="delect_image" src="../static/images/delect.png" mode=""></image>
			</view>
			<!-- 是否显示按钮 -->
			<!-- <slot name="right"></slot> -->
			<view v-if="state" class="image_tap m-l-10">
				<view class="border"></view>
				<image class="eyes_image m-l-10" src="../static/images/eyes_0.png" mode=""></image>
				<!-- <image class="eyes_image" src="../static/images/eyes_0.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			state: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	view {
		display:  flex;
	}
	.image_tap {
		width: 60upx;
		height: 60upx;
		align-items: center;
		justify-content: flex-end;
	}
	.delect_image {
		width: 30upx;
		height: 30upx;
	}
	.eyes_image {
		width: 32upx;
		height: 20upx;
	}
	.border {
		width: 2upx;
		height: 30upx;
		background-color: #CCCCCC;
	}
</style>
