<template>
  <div class="home">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" title="首页" />
    <!-- 频道区域 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item , index) in channelList" :title="item.name" :key="index">
        <!-- van-pull-refresh 用来下拉刷新数据 -->
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <!-- van-list 用来加载数据 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(subitem,subindex) in item.articleList" :key="subindex">
              <template slot="title">
                <!-- 文章的标题 -->
                <div>{{subitem.title}}</div>
                <!-- 文章的图片 -->
                <van-grid lazy-load v-if="subitem.cover.type > 0" :border="false" :column-num="3">
                  <van-grid-item v-for="(imgitem,imgindex) in subitem.cover.images" :key="imgindex">
                    <van-image :src="imgitem" />
                  </van-grid-item>
                </van-grid>
                <!-- 文章的其他信息 -->
                <div class="box">
                  <div class="left">
                    <span>{{subitem.aut_name}}</span>
                    <span>{{subitem.comm_count}}条评论</span>
                    <span>{{subitem.pubdate | myrelativeTime}}</span>
                  </div>
                  <div class="right">
                    <van-icon @click="openmore(subitem)" name="cross" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 频道右侧的操作入口 -->
    <div class="menus">
      <van-icon @click="showPop" name="bars" />
    </div>
    <!-- 添加一个弹出层 -->
    <channel :active.sync="active" v-model="show" :channelList="channelList" />
    <!-- 更多操作面板 -->
    <more :artid="artid" @delar="del" v-model="moreshow" />
  </div>
</template>

<script>
// 导入操作频道的方法
import { apiGetchannel } from '../../api/channel'
// 导入操作 localstorage 的方法
import { getLocal } from '../../utils/mylocal'
// 导入操作文章的方法
import { apiGetArticle } from '../../api/article'
// 导入频道操作面板
import channel from './com/channel.vue'
// 导入更多操作面板
import more from './com/more'

export default {
  // 注册组件
  components: {
    channel,
    more
  },
  data () {
    return {
      // 频道列表数据
      channelList: [],
      // 当前切换的频道的下标
      active: 0,
      // 弹出层状态
      show: false,
      // more面板的显示与隐藏
      moreshow: false,
      // 当前被点击文章的ID
      artid: 0
    }
  },
  methods: {
    // 当 list 组件被加载时会执行
    // 当 list 组件上拉触底时也会执行
    async onLoad () {
      // 根据当前切换频道的 id 去得到频道下对应的文件信息
      // 得到当前频道
      var currentChannel = this.channelList[this.active]
      // 1-得到当切换前频道id
      var channelId = currentChannel.id
      // 2-根据频道id  发送请求到服务器得到频道下的数据
      const res = await apiGetArticle(channelId)
      // 3-拼接数据源
      currentChannel.articleList = [
        ...currentChannel.articleList,
        ...res.data.data.results
      ]
      // 4-将当前频道下的list 的加载状态手动设置为false
      currentChannel.loading = false
      // 5-判断数据源是否加载完成
      if (res.data.data.results.length <= 0) {
        // 将加载完结的状态设置为true
        currentChannel.finished = true
      }
    },
    // 下拉刷新
    onRefresh: function () {
      //  清楚当前频道下的所有数据
      var currentChannel = this.channelList[this.active]
      // 清除数据
      // 清除文章
      currentChannel.articleList = []
      // 清除list 加载状态
      currentChannel.loading = false
      // 清除list 完结状态
      currentChannel.finished = false
      // 将下拉刷新组件的状态设置为  false
      currentChannel.isLoading = false
      // 重新请求数据
      this.onLoad()
      this.onLoad()
    },
    // 添加额外属性的方法
    addOtherProp: function () {
      // 遍历数组给每个元素添加属性
      this.channelList.forEach(item => {
        // item.articleList = [] // 添加文章的数据源
        // item.loading = false // list 组件的加载状态
        // item.finished = false // list 组件的数据是否加载完成的状态
        // item.isLoading = false // refresh 组件的刷新状态
        this.$set(item, 'articleList', [])
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
      })
    },
    // 点击打开弹出层面板
    showPop () {
      this.show = true
    },
    // 打开更多 面板
    openmore (obj) {
      // 保存当前点击文章id
      this.artid = obj.art_id
      // 打开更多操作面板
      this.moreshow = true
    },
    // 将id 对应的数据进行删除
    del (artid) {
      // 得到当前选中的频道下的数据源
      var artList = this.channelList[this.active].articleList
      // 进行遍历将文章删除
      artList.forEach((item, index) => {
        if (item.art_id === artid) {
          // 说明这篇文章需要被删除
          artList.splice(index, 1)
        }
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
      const localChannel = getLocal('channels')
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
.box {
  display: flex;
  justify-content: space-between;
  .left {
    span {
      margin-right: 10px;
      font-size: 12px;
    }
  }
  .right {
    border: 1px solid #ccc;
    width: 20px;
    height: 18px;
    text-align: center;
    i {
      line-height: 18px;
    }
  }
}
</style>
