<template>
  <div>
    <!-- 可被替换的结构 -->
    <router-view></router-view>
    <!-- 固定的地步 tabBar -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
