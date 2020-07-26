<template>
	<ws-load-more ref="loadMore" @provider="provider" :pageSize="12">
		<template v-slot:list="{items}">
			<view class="solid-top" v-for="(item,index) in dataList" :key="index">
				<!-- 此处为每个元素的样式 -->
				<view class="item"> {{item.title}} </view>

			</view>
		</template>
	</ws-load-more>
<!-- 	<uni-list>
		<uni-list-item v-for="(item,index) in dataList" :key="index" @click="readClick(item.id)" title="">{{item.title}}</uni-list-item>
	</uni-list> -->
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import wsLoadMore from '@/components/wsure-load-more/load-more.vue';
  export default {
	components: {uniList,uniListItem,wsLoadMore},
    data () {
      return {
        dataList: [],
		BookData:[],
		pre:'item',
		failFlag:false,
		count:0
      }
    },
	onLoad(e) {
		try {
		    const BookReadData = uni.getStorageSync('BookReadcontent');
			this.BookData = BookReadData;
			this.dataList = BookReadData.chapter;
			// console.log(this.dataList)
			// this.provider();
		} catch (e) {
			console.log(e)
			uni.showToast({
			    title: '数据异常',
			    icon: 'none'
			});
		}
	},
	//#ifndef H5
	onLoad() {
		//如果你是`非H5`平台（app-plus或者小程序），按自己习用onLoad就好了
		console.log("onLoad")
		this.$refs.loadMore.reLoadData()
	},
	//#endif
	
	//#ifdef H5
	onReady(){
		//如果是H5，请一定使用onReady方法初次加载数据，否则不会触发
		console.log("onReady")
		this.$refs.loadMore.reLoadData()
	},
	//#endif
	methods:{
		onPullDownRefresh() {
			console.log("onPullDownRefresh")
			this.$refs.loadMore.pullDownRefresh()
		},
		onReachBottom() {
			console.log("onReachBottom")
			this.$refs.loadMore.reachBottom()
		},
		readClick(chapterid) {
			try {
				if(chapterid){
					this.BookData.firstchapter = chapterid;
					this.BookData.ischoosechatper = true;
				}
				// console.log(this.BookData);
			    uni.setStorageSync('BookReadcontent', this.BookData);
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
		/**核心 只需实现@provider事件
			入参：e包含两个参数：pageNo和pageSize
			请求完成后填充数据：this.$refs.loadMore.pushData(res)
				成功:在获取数据成功后调用this.$refs.loadMore.pushData(res) res为数组，
				失败:在获取数据失败后调用this.$refs.loadMore.pushData(res) res为null，
		*/
		provider(e){
			console.log(e);
			var that = this;
			//模拟网络请求的延迟
			setTimeout(function () {

				var res = [
					{
						name:'a1'
					},{
						name:'a2'
					},{
						name:'a3'
					},{
						name:'a4'
					},

					//......
				];
				//向插件传入当前页数据
				that.$refs.loadMore.pushData(res);
			}, 1000);
		}
	}
  }
</script>