<template>
	<view class="container b-c-w fixed">
		<view class="top_message b-b w-100 b-theme">
			<view class="w-100 flex f-center">
				<image class="headimg b-r-50" src="../../static/New/build1.jpg" mode=""></image>
				<view class="flex column m-l-15">
					<text class="m-b-5 f-17 c-white">2155</text>
					<text class="f-17 c-white">2155</text>
				</view>
			</view>
		</view>
		<view class="w-100 p-x-15 p-t-15 p-b-15 b-b flex f-between f-center">
			<text class="f-17">账户余额 0 点</text>
			<text class="buy f-17 b-b c-white b-theme b-r-4">充值</text>
		</view>
		<view class="border_view w-100"></view>
		<view class="flex w-100 column p-x-15 p-t-15 b-b" v-for="(item,i) in ListTheme" :key="i">
			<view class="w-100 flex f-center f-between m-b-10">
				<view class="flex f-center">
					<image class="icon_img" :src="imgList[i]" mode=""></image>
					<text class="m-l-5 ">{{item}}</text>
				</view>
				<view class="flex f-center c-999">
					<view v-if="i == 0">Lv6</view>
					<view v-if="i == 1">小白</view>
					<view class="iconfont icon-bangzhujinru c-999 f-16"></view>
				</view>
			</view>
			<view class="border_solide"></view>
		</view>
		<button @tap="login">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ListTheme: ["我的等级", "我的阅历", "阅读偏好", "粉丝称号", "签到", "成为作家"],
				imgList: [
					"../../static/icon_font/icon_img/list0.png",
					"../../static/icon_font/icon_img/list1.png",
					"../../static/icon_font/icon_img/list2.png",
					"../../static/icon_font/icon_img/list3.png",
					"../../static/icon_font/icon_img/list4.png",
					"../../static/icon_font/icon_img/list5.png",
				],
				// ListTheme: ["我的阅历"],
				// imgList:[
				// 	"../../static/icon_font/icon_img/list1.png"
				// ]
			}
		},
		methods: {
			login() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res.code);
						let code = res.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes);
								console.log(infoRes.encryptedData)
								console.log(infoRes.iv);
								uni.request({
									url: 'http://a.chddapp.com/chddv8/asale/account/weappLogin',
									method: 'POST',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									data: {
										codeLogin: res.code,
										encryptedData: infoRes.encryptedData,
										iv: infoRes.iv
									},
									success:(res)=> {
										console.log(res)
									},
									fail: (res) => {
										console.log(res)
									}
								})
							}
						});
					},
					fail: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100vh;

		.top_message {
			height: 240upx;
			padding: 80upx 30upx 0upx 30upx;

			.headimg {
				width: 120upx;
				height: 120upx;
			}
		}

		.buy {
			padding: 10upx 20upx;
		}

		.border_view {
			height: 16upx;
			background-color: #F0F0F0;
		}

		.icon_img {
			width: 32upx;
			height: 32upx;
		}
	}
</style>
