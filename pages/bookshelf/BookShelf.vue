<template>
	<view class="container b-c-w">
		<view class="flex w-100 top b-theme b-b">
			<image class="image h-100 b-r-4" src="../../static/New/build1.jpg" mode=""></image>
			<view class="flex column p-5 b-b m-l-10">
				<text class="c-white m-b-15">{{datalist.data[0].title}}</text>
				<text class="c-white m-b-10 f-14">{{datalist.data[0].name}}</text>
				<text class="c-white m-b-10 f-14">{{datalist.data[0].name}}</text>
				<view class="c-white view f-14 b-b t-c b-r-4">继续阅读</view>
			</view>
		</view>
		<article-intro-two class="w-100 p-15 b-b" :bookshelf="bookshelf" :datas="datalist.data"></article-intro-two>
	</view>
</template>

<script>
	import datalist from '@/static/json/user-page.json' 
	
	import ArticleIntroTwo from '@/components/repeat_coms/article_intro/IntroTwo.vue'
	
	export default {
		data() {
			return {
				datalist: datalist,
				bookshelf: "bookshelf"
			}
		},
		components: {
			ArticleIntroTwo
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.container {
		.top {
			height: 560upx;
			padding: 200upx 120upx 80upx 120upx;
			.image {
				width: 200upx;
				height: 280upx;
			}
			.view {
				border: 2upx solid #FFFFFF;
				padding: 3upx;
			}
		}
	}
</style>
