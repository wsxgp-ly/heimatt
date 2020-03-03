<template>
  <div class="home">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="首页" />
    <!-- 频道区域 -->
    <van-tabs>
      <van-tab v-for="(item , index) in channelList" :title="item.name" :key="index">
        <!-- van-pull-refresh 用来下拉刷新数据 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- van-list 用来加载数据 -->
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="(subitem,subindex) in item.articleList" :key="subindex" :title="subitem" />
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
// 导入操作频道的方法
import { apiGetchannel } from '../../api/channel'
// 导入操作 localstorage 的方法
import { getLocal } from '../../utils/mylocal'

export default {
  data () {
    return {
      channelList: []
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
        // console.log('onLoad触底')
        // console.log('数据长度为:' + this.list.length)
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
    },
    // 添加额外属性的方法
    addOtherProp: function () {
      // 遍历数组给每个元素添加属性
      this.channelList.forEach(item => {
        item.articleList = [] // 添加文章的数据源
        item.loading = false // list 组件的加载状态
        item.finished = false // list 组件的数据是否加载完成的状态
        item.isLoading = false // refresh 组件的刷新状态
      })
    }

  },
  // 打开页面时会执行
  async mounted () {
    // 得到用户信息:
    const token = this.$store.state.user.token
    // 判断用户是否登录
    if (token) {
      // 直接从服务器中得到频道数据
      const res = await apiGetchannel()
      // 将得到的数据保存起来
      this.channelList = res.data.data.channels
    } else {
      // 说明用户没有登录
      // 取出 localstorage 中的数据
      const localChannel = getLocal('channel')
      // 判断 localstorage 中是否存在渲染数据
      if (localChannel) {
        // 数据存在 那就将数据之间赋值给频道列表
        this.channelList = localChannel
      } else {
        // 如果 localstorage 中没有数据,直接从服务器中得到默认的7条数据
        const res = await apiGetchannel()
        this.channelList = res.data.data.channels
      }
    }
    this.addOtherProp()
    console.log(this.channelList)
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
