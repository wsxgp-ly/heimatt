<template>
  <div class="home">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="首页" />
    <!-- 频道区域 -->
    <van-tabs>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
        <!-- list 组件  渲染文章的内容 -->
        <!-- v-model : list 组件的加载状态  true:不会执行load事件 false: 会执行load事件-->
        <!-- finished : list 组件是否已经将所有的数据加载完毕 true:将来再也不会执行load事件 -->
        <!-- load事件: 当list 组件被加载时会执行一次,执行时会将list组件的加载状态设置为 true
             一旦 加载状态为true 就不会再次执行了  load事件 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in 30" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
    <!-- 频道右侧的操作入口 -->
    <div class="menus">
      <van-icon name="bars" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 用来设置 list 组件的数据是否完全加载完毕的
      finished: false,
      // list 组件的加载状态
      loading: false

    }
  },
  methods: {
    onLoad: function () {
      console.log('onLoad')
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background: #3e9df8;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
}
.menus {
  position: fixed;
  top: 46px;
  right: 0px;
  height: 44px;
  width: 10%;
  background-color: red;
  text-align: center;
  line-height: 44px;
}
// /deep/ 叫做深度选择器
// 作用:可以当前设置过 scoped 属性的样式作用到它下面的子组件中
/deep/ .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
  position: fixed;
  top: 46px;
  left: 0px;
  width: 90%;
  z-index: 999;
}
.home {
  margin-top: 90px;
  margin-bottom: 50px;
}
</style>
