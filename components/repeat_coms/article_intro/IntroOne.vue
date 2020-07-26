<template>
	<view class="w-100 flex article m-b-10">
		<view class="left h-100 flex w-30">
			<image class="w-100 h-100 b-r-4" :src="datas.headimg" mode="aspectFill"></image>
		</view>
		<view class="right h-100 flex f-between column w-70 p-10 b-b">
			<text class="f-w-500">{{datas.title}}</text>
			<text v-if="datas.descripation.length < 46" class="f-13 c-d">{{datas.descripation}}</text>
			<text v-else class="f-13 c-d">{{datas.descripation.slice(0,45) + '...'}}</text>
			<view class="flex w-100 f-between f-center">
				<view class="flex f-center">
					<view class="iconfont f-15 icon-wutouxiang c-d"></view>
					<text class="m-l-5 f-13 c-d">{{datas.name}}</text>
				</view>
				<view class="flex">
					<text class="text">{{datas.thome}}</text>
					<text class="text">{{datas.classify}}</text>
					<text class="text">{{datas.number}}人气</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			datas: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
	.article {
		height: 280upx;
		.right {
			.text {
				border: 2upx solid #dbdbdb;
				margin-left: 10upx;
				padding: 2upx 4upx;
				box-sizing: border-box;
				border-radius: 4upx;
				font-size: 12px;
				color: #dbdbdb;
			}
		}
	}
</style>
