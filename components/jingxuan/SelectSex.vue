<template>
	<view class="w-100 flex">
		<picker class="w-100 relative" :range="SexList" mode="selector"
		 @cancel="select_icon" @tap="click_event"
		 @change="selectSex">
			<view class="w-100 flex">
				<view class="f-14 flex c-white">{{SexList[arrayIndex]}}</view>
				<view class="iconfont f-16 flex f-14 c-white absolute z-999 up_down" 
				:class="state == true ? 'icon-shang' : 'icon-xia'"></view>
			</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			SexList: {
				type: Array,
				default() {
					return []
				}
			},
			arrayIndex: {
				type: Number,
				default: 0
			},
			state: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			select_icon() {
				this.$emit('select_icon')
			},
			click_event() {
				this.$emit('click_event')
			},
			selectSex(e) {
				this.$emit('selectSex',e.detail.value)
			}
		}
	}
</script>

<style lang="scss">
	.up_down {
		width: 20upx;
		height: 20upx;
		left: 60upx;
	}
</style>
