<template>
	<view class="w-100 swiper column">
		<swiper class="w-100 h-100" autoplay="true" interval="3000"
		duration="500" circular="true" :current="swiperCurrent"
		 @change="changeSwiper">
			<swiper-item v-for="(item,i) in swiperImg" :key="i">
				<image @tap="enter_swiperImg(i)" mode="aspectFill" class="w-100 h-100" 
				:src="item.src"></image>
			</swiper-item>
		</swiper>
		<!-- 幻灯片指示点样式修改 -->
		<view class="dots flex j-center m-b-15 absolute">
			<view v-for="(item,index) in swiperImg.length" :key="item">
				<view class="dot flex m-r-10 b-r-50" :class="index==swiperCurrent ? ' active' : ''"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperImg: {},
			swiperCurrent: 0,
			current: 0
		},
		methods: {
			changeSwiper(e) {
				this.$emit('changeSwiper',e)
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		height:  300upx;
		/* 轮播指示点样式 */
		.dots {
			top: 260upx;
			left: 0;
			right: 0;
			.dot {
				//未选中样式
				width: 10upx;
				height: 10upx;
				background-color: #999999;
				transition: all .5s;
			}
			.active {
				//被选中样式
				width: 30upx;
				height: 10upx;
				background-color: #999999;
				border-radius: 8upx;
			}
		}
	}
</style>
