<template>
	<view class="w-100 flex theme f-between">
	  <view class="left flex f-center">
			<view class="box flex b-r-2 b-theme m-r-5"></view>
			<slot name="left"></slot>
		</view>
	  <view class="right flex"><slot name="right"></slot></view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.theme {
	  height: 88upx;
	  line-height: 88upx;
		.box {
			width: 10upx;
			height: 40upx;
		}
	}
</style>
