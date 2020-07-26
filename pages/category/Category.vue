<template>
	<view class="container">
		<view class="flex w-100 p-x-15 b-b column">
			<view class="flex column w-100" v-for="(item,i) in DataCategoryList" :key="i">
				<theme class="w-100">
					<view class="flex f-w-600 c-666" slot="left"><text>{{item.title}}频道</text></view>
				</theme>
				<view class="w-100 flex f-w content">
					<view @click="CategoryClick(item2)" class="w-50 flex view_item p-y-5 b-b b-r-2" v-for="(item2,index2) in item.subor" :key="index2">
						<image class="b-r-4 image" :src="ApiUrl.ApiUrl + item2.icon" mode="aspectFit"></image>
						<view class="flex column">
							<text>{{item2.title}}</text>
							<text>{{item2.title}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Theme from '@/components/repeat_coms/Theme.vue';
	import ApiUrl from '@/util/util.js';
	export default {
		onShow() {
			this.GetBookCategory();
		},
		data() {
			return {
				DataCategoryList: [],
				ApiUrl: ApiUrl,
			}
		},
		components: {
			Theme
		},
		methods: {
			async	GetBookCategory() {
				this.DataCategoryList = [];
				// uni.showLoading({
				// 	title:"加载中"
				// })
				let res = await this.$myRequest({
					url: '/api/novel/category',
					method: 'POST'
				})
				// setTimeout(()=> {
					// uni.hideLoading()
					this.DataCategoryList = res.data;
				// }, 1500);
			},
			CategoryClick(Categoryinfo) {
				try {
					//保存分类信息到缓存
					uni.setStorageSync('Categoryinfo',Categoryinfo);
					uni.navigateTo({
						url: '/pages/category/info'
					})
				} catch (e) {
					console.log(e)
					uni.showToast({
						title: '数据异常',
						icon: 'none'
					});
				}
			}
		}
	};
</script>

<style>
	.view_item {
		height: 140upx;
	}
	.view_item:nth-child(4n-3) {
		background-color: #f7f7f7;
	}
	.view_item:nth-child(4n-2) {
		background-color: #f7f7f7;
	}
	.image {
		width: 100upx;
		height: 120upx;
	}
</style>
