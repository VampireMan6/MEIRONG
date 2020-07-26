<template>
	<view>
		<view class="flex p-xs padding">
			<view class="flex-twice margin-xs">
				<view class="text-xl">{{BookInfo.name}}</view>
				<view class="margin-top">{{BookInfo.author}}</view>
				<view class="text-grey margin-top-sm">
					<text>{{BookInfo.sort}}</text>
					<text class="margin-left-sm">{{BookInfo.state}}</text>
				</view>
				<view class="margin-top">{{BookInfo.update_time}}</view>
			</view>
			<view class="flex-sub margin-xs">
				<image :src="BookInfo.img" mode="widthFix" class="radius img-box" lazy-load></image>
			</view>
		</view>
		
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation>
			<view class="cu-item" v-for="(item,index) in TabData" :key="index" 
				  :class="index==TabCur?'text-orange cur':''" 
				  @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="bg-white padding solid-top margin-bottom" v-if="TabCur==0">
			简介：{{BookInfo.intro}}
		</view>
		<view class="bg-white solid-top margin-bottom" v-else>
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="text-sm">更新至{{BookInfo.news}}</text>
				</view>
				<view class="action">
					<text @click="orderClick">{{order}}</text>
				</view>
			</view>
			<view class="cu-list menu">
				<view class="cu-item arrow" v-for="(item,index) in listData" :key="index" @click="readClick(item.id)">
					<view class="content">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar bg-white tabbar border zai-tabbar-bar">
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur" @click="AddClick" v-if="addBtn==false">加入书架</button>
				<text v-else>已加入书架</text>
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red round shadow-blur" @click="readClicks">立即阅读</button>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/util/tools.js';
	import ApiUrl from '@/util/util.js';
	export default {
		data() {
			return {
				TabCur: 0, 
				TabData: ['简介','目录'], 
				bookData: {}, 
				listData: [], 
				order: '正序', 
				BookID: null, 
				addBtn: true, 
				newsID: null, 
				newsName: '',
				BookInfo:{},
			}
		},
		onLoad(option) {
			const BookReadData = uni.getStorageSync('BookReadData');
			
			// this.BookID = option.id;
			this.GetBookDetails(BookReadData);
			//是否已经加入书架
			// _tool.GetBookListID(option.id).then((res) => {
			// 	this.addBtn = res;
			// });
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			GetBookDetails(BookReadData) {
				uni.showLoading({title:"加载中..."});
				uni.request({
					url:ApiUrl.ApiUrl + "/api/novel/contentapi/",
					data:{
						id:BookReadData.id
					},
					method: 'POST',
					success: res => {
						uni.hideLoading();
						// console.log(JSON.stringify(res.data));
						this.bookData = res.data;
						this.listData = res.data.chapter;
						
						var time = this.bookData.update_time;
						var newDate = new Date();
						newDate.setTime(time * 1000);
						this.BookInfo = {
							img:this.bookData.pic,
							name:this.bookData.title,
							author:this.bookData.author,
							sort:this.bookData.ctitle,//类型
							intro:this.delHtmlTag(this.bookData.content),
							state:this.bookData.serialize_text,//状态
							time:newDate.toLocaleDateString(),
							news:newDate.toLocaleDateString(),//更新
						};
					},
					fail(e) {
						uni.hideLoading();
						uni.showToast({ title: '网络异常', icon: 'none' });
						reject(e);
					}
				})
			},
			delHtmlTag(str){
				return str.replace(/<[^>]+>/g,"");  //正则去掉所有的html标记
			},
			orderClick() {
				let order = this.order;
				if(order=='倒序') {
					this.order = '正序';
				} else {
					this.order = '倒序';
				}
				//排序
				var arr = []
				for (let i in this.listData) {
				    arr.push(this.listData[i]); //属性
				    //arr.push(obj[i]); //值
				}
				// console.log(arr);
				this.listData = arr.reverse();
			},
			AddClick() {
				let bookData = {
					id: this.BookID,
					news: this.newsID,
					page: 0,
					index: 1,
					name: this.newsName,
					title: this.bookData.name,
					img: this.bookData.img
				};
				_tool.AddBookListData(bookData).then((res) => {
					this.addBtn = true;
				});
			},
			readClick(chapterid) {
				try {
					if(chapterid){
						this.bookData.firstchapter = chapterid;
						this.bookData.ischoosechatper = true;
					}
					// console.log(this.bookData);
				    uni.setStorageSync('BookReadcontent', this.bookData);
					uni.navigateTo({
						url: '/pages/bookshelf/read'
					})
				} catch (e) {
					console.log(e)
				    uni.showToast({
				        title: '数据异常',
				        icon: 'none'
				    });
				}
			},
			readClicks() {
				try {
					let chapterinfo = this.bookData.chapter[Object.keys(this.bookData.chapter)[0]];
					this.bookData.ischoosechatper = false;
					this.bookData.firstchapter = chapterinfo.id
					// console.log(this.bookData);
				    uni.setStorageSync('BookReadcontent', this.bookData);
					uni.navigateTo({
						url: '/pages/bookshelf/read'
					})
				} catch (e) {
					console.log(e)
				    uni.showToast({
				        title: '数据异常',
				        icon: 'none'
				    });
				}
			},
			details(item,index) {
				let order = this.order;
				let readId = index + 1;
				if(order=='正序') {
					let listId = this.listData.length;
					readId = listId - index - 1;
				}
				let bookData = {
					id: this.BookID,
					news: item.id,
					page: 0,
					index: readId,
					name: item.name,
					title: this.bookData.name,
					img: this.bookData.img
				};
				try {
				    uni.setStorageSync('BookReadData', bookData);
					uni.navigateTo({
						url: '/pages/bookshelf/read'
					})
				} catch (e) {
				    uni.showToast({
				        title: '数据异常',
				        icon: 'none'
				    });
				}
			}
		}
	}
</script>

<style lang="less">
	.img-box {
		width: 220rpx;
	}
</style>
