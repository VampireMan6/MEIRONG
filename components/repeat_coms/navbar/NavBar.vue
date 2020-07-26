<template>
  <view class="nav-bar flex">
    <view class="left flex"><slot name="left"></slot></view>
    <view class="center flex j-center"><slot name="center"></slot></view>
    <view class="right flex"><slot name="right"></slot></view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      
    };
  },
  methods: {}
}
</script>

<style>
  .nav-bar{
    display: flex;
    height: 88upx;
    line-height: 88upx;
  }
  .left, .right {
    width: 200upx;
  }
  .center {
    flex: 1;
  }
</style>