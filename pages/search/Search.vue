<template>
	<view class="container b-c-w">
		<view class="p-x-15 w-100 input-search b-c-w b-b fixed">
			<view class="w-100 nav-1"></view>
			<view class="w-100 p-x-10 b-b flex input_view f-between f-center relative">
				<view class="iconfont icon-sousuo f-20 absolute search"></view>
				<input type="text" class="input w-100 b-b c-333 f-17" :value="keyword" confirm-type="search" 
				:placeholder-class="'c-666 f-17'" placeholder="请输入书名或作者名" 
				@input="input" @confirm="search"/>
				<view v-show="keyword" class="iconfont icon-shanchu1 f-20 absolute delect" @tap="delect_keyword"></view>
			</view>
		</view>
		<view class="content flex w-100 column">
			<view class="border_solide m-t-10"></view>
			<!-- 热门搜索 -->
			<theme class="w-100 p-x-15 b-b">
				<view class="flex f-w-600 c-666" slot="left"><text>热门搜索</text></view>
				<view slot="right" class="f-center flex">
					<text class="f-13 c-666">换一换</text>
				</view>
			</theme>
			<!-- 热门搜索列表 -->
			<view class="w-100 p-x-15 flex b-b f-w">
				<view class="m-r-10 m-b-10" v-for="(item,i) in hotList" :key="i">
					<view class="border_text b-b">{{item}}</view>
				</view>
			</view>
			<!-- 搜索历史 -->
			<theme class="w-100 p-x-15 b-b">
				<view class="flex f-w-600 c-666" slot="left"><text>搜索历史</text></view>
				<view slot="right" class="f-center flex" @tap="delect_historyList">
					<view class="iconfont icon-shanchu c-666 f-16"></view>
				</view>
			</theme>
			<view class="border_solide"></view>
			<!-- 历史搜索列表 -->
			<view class="w-100 column p-x-15 flex b-b">
				<view class="flex w-100 column p-y-10 b-b" v-for="(item,i) in historyList" :key="i">
					<view class="w-100 flex f-between m-b-5">
						<view class="flex f-center">
							<view class="iconfont icon-sousuo f-16"></view>
							<view class="m-l-5">{{item}}</view>
						</view>
						<view class="iconfont icon-shanchu1 f-16" @tap="delect_search_item(i)"></view>
					</view>
					<view class="border_solide"></view>
				</view>
				<view v-if="historyList.length == 0" class="t-c p-y-20">什么搜索历史都没有哦 !</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Theme from '@/components/repeat_coms/Theme.vue';

	export default {
		onShow() {
			this.getStorage();
		},
		data() {
			return {
				hotList: ["火影忍者", "斗破苍穹", "末世", "龙王传说", "玄幻", "都市", "科幻"],
				historyList: [],
				keyword: "",
			}
		},
		components: {
			Theme
		},
		methods: {
			getStorage() {
				let value = uni.getStorageSync('historyList_search');
				if (value) {
					this.historyList = value;
				} else {
					this.historyList = []
				}
			},
			input(e) {//监听输入内容
				this.keyword = e.detail.value.trim();
			},
			search() {
				if(this.historyList.indexOf(this.keyword) == -1) {
					this.historyList.push(this.keyword);
					uni.setStorage({ //本地保存
						key: 'historyList_search',
						data: this.historyList
					});
				}
				this.keyword = '';
			},
			delect_keyword() {
				this.keyword = ""
			},
			delect_historyList() {
				this.historyList = [];
				uni.removeStorageSync('historyList_search');
			},
			delect_search_item(i) {
				this.historyList.splice(i, 1);
				uni.setStorage({ //本地保存
					key: 'historyList_search',
					data: this.historyList
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.input-search {
			.nav-1{
				height: var(--status-bar-height);
			}
			.input_view {
				height: 88upx;
				background-color: #F0F0F0;
				border-radius: 32upx;
				.input {
					padding: 0 50upx;
					background-color: #F0F0F0;
				}
				.search {
					left: 20upx;
				}
				.delect {
					right: 20upx;
				}
			}
		}
		.content {
			margin-top: calc(var(--status-bar-height) + 88upx);
			.input_search {
				padding: 20upx 30upx;
			}
			.border_text {
				border: 2upx solid #F0F0F0;
				padding: 8upx 12upx;
				border-radius: 32upx;
			}
		}
	}
</style>
