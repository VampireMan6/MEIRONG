<template>
	<view class="container">
		<!-- 顶部 -->
		<view class="nav-top flex b-theme column w-100 fixed z-500">
			<view class="w-100 flex b-theme nav"></view>
			<nav-bar class="navbar w-100 p-x-15 b-b">
				<view slot="left" class="w-100 left flex">
					<select-sex @select_icon="select_icon" :SexList="SexList" :arrayIndex="arrayIndex" :state="state" @click_event="click_event" @selectSex="selectSex"></select-sex>
				</view>
				<view slot="center" class="c-white flex f-16">精选</view>
			</nav-bar>
		</view>
		<!-- 主要内容 -->
		<view class="w-100 content flex column b-c-w">
			<!-- 轮播图 -->
			<swiper-coms class="w-100 relative m-b-10" :swiperImg="swiperImg" :swiperCurrent="swiperCurrent" :current="current" @changeSwiper="changeSwiper"></swiper-coms>
			<!-- 主编力荐 -->
			<theme class="w-100 p-x-15 b-b">
				<view class="flex f-w-600 c-666" slot="left"><text>主编力荐</text></view>
				<view slot="right" class="f-center flex">
					<text class="f-13 c-666">查看更多</text>
					<view class="iconfont f-1 icon-bangzhujinru"></view>
				</view>
			</theme>
			<!-- 文章简介 -->
			<view class="w-100 p-x-15 b-b">
				<article-intro-one class="w-100" :datas="datalist.data[0]"></article-intro-one>
				<view class="border_solide p-x-15 b-b m-b-10"></view>
				<article-intro-two class="w-100" :datas="datalist.data"></article-intro-two>
			</view>
		</view>
	</view>
</template>

<script>
	import datalist from '@/static/json/user-page.json' 
	
	import NavBar from '@/components/repeat_coms/navbar/NavBar.vue';
	import SelectSex from '@/components/jingxuan/SelectSex.vue';
	import SwiperComs from '@/components/jingxuan/Swiper.vue';
	import Theme from '@/components/repeat_coms/Theme.vue';
	import ArticleIntroOne from '@/components/repeat_coms/article_intro/IntroOne.vue'
	import ArticleIntroTwo from '@/components/repeat_coms/article_intro/IntroTwo.vue'
	
	export default {
		data() {
			return {
				SexList: ['男神', '女神'],
				arrayIndex: 0,
				DataList: [],
				state: true,
				swiperImg: [
					{
						"src":"../../static/New/head1.jpg"
					},
					{
						"src":"../../static/New/head3.jpg"
					},
					{
						"src":"../../static/New/head2.jpg"
					},
					{
						"src":"../../static/New/head3.jpg"
					}
				], //幻灯片
				swiperCurrent: 0,
				current: 0,
				datalist: datalist
			}
		},
		components: {
			NavBar,
			SelectSex,
			SwiperComs,
			Theme,
			ArticleIntroOne,
			ArticleIntroTwo
		},
		methods: {
			click_event() {
				this.state = false
			},
			select_icon() {
				this.state = true
			},
			selectSex(e) {
				this.arrayIndex = e;
				this.state = true;
			},
			changeSwiper(e) { //幻灯片
				this.swiperCurrent = e.detail.current;
			},
			// async GetMessages() {
			// 	let res = await this.$myRequest({
			// 		url: 'dingdian'
			// 	})
			// 	console.log(res)
			// }
		}
	}
</script>

<style lang="scss">
	.container {
		.nav-top {
			.nav {
				height: var(--status-bar-height);
			}
		}
		.content {
			margin-top: calc(var(--status-bar-height) + 88upx);
		}
	}
</style>
