<template>
  <div class="home">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="首页" />
    <!-- 频道区域 -->
    <van-tabs>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
        <!-- van-pull-refresh 用来下拉刷新数据 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- van-list 用来加载数据 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(item,index) in list" :key="index" :title="item" />
        </van-list>
        </van-pull-refresh>
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
      loading: false,
      // 数据列表
      list: [],
      // 下拉刷新组件的状态
      isLoading: false

    }
  },
  methods: {
    // 当 list 组件被加载时会执行
    // 当 list 组件上拉触底时也会执行
    onLoad: function () {
      console.log('onLoad')
      // 将加载时的代码逻辑放到一个定时器中
      setTimeout(() => {
        // 1-定义一个长度为20的数组
        var newArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        // 2-将数组默认给 list 让它 有自己的数据
        // 每次加载数据时,新的数据不是覆盖老的数据,而是在原来的基础上进行拼接
        // this.list = newArr
        this.list = [...this.list, ...newArr]
        // 3-由于 onload 已经自动将加载状态的 v-model对应的值改为true,需要手动将数据设置为false
        this.loading = false
        // 4-判断数据源是否加载完毕
        if (this.list.length >= 100) {
          // 将list 的数据加载状态设置为完全加载完毕
          this.finished = true
        }
        console.log('onLoad触底')
        console.log('数据长度为:' + this.list.length)
      }, 1000)
    },
    // 下拉刷新
    onRefresh: function () {
      setTimeout(() => {
        // 下拉时  应该将原本的数据清空
        this.finished = false
        this.loading = false
        this.list = []
        this.isLoading = false
        // 清除完数据  重新加载数据
        this.onLoad()
      }, 1000)
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
