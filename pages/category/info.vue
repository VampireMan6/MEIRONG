<template>
	<view>
		<view class="grid col-3 canui-list-box">
			<view class="padding-sm" v-for="(item, index) in DataCategoryinfoList" :key="index" @click="readClick(item)">
				<view>
					<image :src="imgurl + item.pic" mode="widthFix" class="radius"></image>
					<view class="action tabbar"><text>{{ item.title }}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import ApiUrl from '@/util/util.js';
export default {
	data() {
		return {
			DataCategoryinfoList: [],
			pages:1,
			imgurl:"https://www.novel888.com/"
		};
	},
	onLoad() {
		//this.GetBookList();
	},
	onShow() {
		this.GetBookCategoryinfo();
	},
	methods: {
		//分类数据
		GetBookCategoryinfo() {
			try {
				uni.showLoading();
				let Categoryinfo = uni.getStorageSync("Categoryinfo");
				// console.log(Categoryinfo)
				if(Categoryinfo){
					uni.request({
						url: ApiUrl.ApiUrl + '/api/novel/listsapi/',
						data:{
							"category":Categoryinfo.id,
							"page":this.pages
						},
						method: 'POST',
						success: res => {
							uni.hideLoading();
							// console.log(JSON.stringify(res));
							this.DataCategoryinfoList = res.data;
						},
						fail(e) {
							uni.hideLoading();
							uni.showToast({ title: '网络异常', icon: 'none' });
							reject(e);
						}
					});
				}else{
					uni.showToast({ title: '网络异常', icon: 'none' })
				}
				
				
			} catch (e) {
				console.log(e);
				return '';
			}
		},
		editClick() {
			uni.navigateTo({
				url: '/pages/bookshelf/edit'
			});
		},
		readClick(BookReadData) {
			try {
				uni.setStorageSync('BookReadData',BookReadData);
				uni.navigateTo({
					url: '/pages/profile/details'
				});
			} catch (e) {
				uni.showToast({
					title: '数据异常',
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="less">
.canui-list-box {
	image {
		height: 330rpx;
	}
}
</style>
