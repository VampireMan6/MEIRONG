<template>
	<view class="w-100 flex article2 b-c-w f-w f-between">
		<view class="flex view-width m-b-20 column" v-for="(item,i) in datas" :key="i">
			<image class="image w-100 b-r-4 m-b-5" :src="item.headimg" mode=""></image>
			<text class="f-14 c-666 m-b-5">{{item.title}}</text>
			<text v-if="bookshelf == 'jingxuan'" class="f-12 c-d">{{item.title}}</text>
		</view>
		<view v-if="bookshelf == 'jingxuan'" class="w-30"></view>
		<view v-else class="w-30 flex f-center j-center add_book b-r-4">
			<view class="iconfont icon-jia f-25"></view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			datas: {
				type: Array,
				default () {
					return []
				}
			},
			bookshelf: {
				type: String,
				default: "jingxuan"
			}
		}
	}
</script>

<style lang="scss">
	.article2 {
		.view-width {
			width: 200upx;
			.image {
				height: 280upx;
			}
		}
		.add_book {
			height: 280upx;
			background-color: #ececec;
		}
	}
</style>
