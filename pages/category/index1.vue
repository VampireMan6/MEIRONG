<template>
	<view>
	<!-- 	<view class="cu-bar">
			<view class="action"><text>共有0本</text></view>
			<view class="action"><text @click="editClick">编辑</text></view>
		</view> -->
		<view class="grid col-3 canui-list-box">
			<view class="padding-sm" v-for="(item, index) in DataCategoryList" :key="index">
				<view class="cu-bar">
					<view class="action tabbar"><text>{{ item.title }}</text></view>
				</view>
				<view v-for="(subitem, subindex) in item.subor" :key="subindex"   @click="CategoryClick(subitem)">
					<image :src="imgurl + subitem.icon" mode="widthFix" class="radius"></image>
					<text>{{ subitem.title }}</text>
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
			DataCategoryList: [],
			imgurl:"https://www.novel888.com/"
		};
	},
	onLoad() {
		//this.GetBookList();
	},
	onShow() {
		this.GetBookCategory();
	},
	methods: {
		//分类数据
		GetBookCategory() {
			try {
				// const CategoryData = uni.getStorageSync('CategoryData');
				// if (CategoryData) {
				// 	this.DataCategoryList = CategoryData;
				// } else {
					uni.showLoading();
					uni.request({
						url: ApiUrl.ApiUrl + '/api/novel/category/',
						method: 'POST',
						success: res => {
							uni.hideLoading();
							// console.log(JSON.stringify(res));
							this.DataCategoryList = res.data;
							uni.setStorage({
								key: 'CategoryData',
								data: res.data
							});
						},
						fail(e) {
							uni.hideLoading();
							uni.showToast({ title: '网络异常', icon: 'none' });
							reject(e);
						}
					});
				// }
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
		CategoryClick(Categoryinfo) {
			try {
				//保存分类信息到缓存
				uni.setStorageSync('Categoryinfo',Categoryinfo);
				uni.navigateTo({
					url: '/pages/category/info'
				});
				
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

<style lang="less">
.canui-list-box {
	image {
		height: 330rpx;
	}
}
</style>
