<template>
  <div class="searchResult">
    <!-- 头部标题 -->
    <!-- $router.back() :  跳转到上一个路由界面中 -->
    <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" title="搜索结果" />
    <!-- 新闻区域 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell @click="toDetail(item)" v-for="(item,index) in searchList" :key="index">
        <template slot="title">
          <h3>{{item.title}}</h3>
          <van-grid v-if="item.cover.type > 0" :border="false" :column-num="3">
            <van-grid-item v-for="(imgitem,imgindex) in item.cover.images" :key="imgindex">
              <van-image :src="imgitem" />
            </van-grid-item>
          </van-grid>
          <div class="other">
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }} 条评论</span>
            <span>{{ item.pubdate | myrelativeTime}}</span>
          </div>
          <van-grid :column-num="3">
            <van-grid-item @click="comment">
              <template slot="text">
                <van-icon name="comment-o" />{{ item.comm_count }}
              </template>
              </van-grid-item>
            <van-grid-item @click="zan">
              <template slot="text">
                <van-icon name="like-o" />点赞
              </template>
              </van-grid-item>
            <van-grid-item>
              <template slot="text">
                <van-icon name="award-o" />分享
              </template>
              </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 导入获取搜索结果的方法
import { apiGetSearch } from '../../api/article'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 定义一个搜索关键字
      key: '',
      // 当前页
      page: 0,
      // 页容量
      perpage: 10,
      // 搜索的结果
      searchList: []
    }
  },
  mounted () {
    // 等到搜索的关键字
    this.key = this.$route.params.key
  },
  methods: {
    // 渲染文章信息
    async onLoad () {
      // 每次进入 页面加一
      this.page += 1
      // 根据关键字发送请求到服务器,得到对应文章信息
      const res = await apiGetSearch({
        page: this.page,
        perpage: this.perpage,
        key: this.key
      })
      // 保存得到的数据
      this.searchList = [...this.searchList, ...res.data.data.results]
      // 将加载状态设置为false
      this.loading = false
      // 判断数据是否加载完毕
      if (res.data.data.results.length === 0) {
        // 将数据源的状态设置为 false
        this.finished = true
      }
    },
    // 点击评论按钮触发事件
    comment () {
      // 判断是否登录
      if (!this.$login()) {
        // 停止后续代码执行
        return
      }
      console.log('评论功能')
    },
    // 点击点赞按钮触发的事件
    zan () {
      // 判断是否登录
      if (!this.$login()) {
        // 停止后续代码执行
        return
      }
      console.log('点赞')
    },
    toDetail (obj) {
      // console.log(obj)
      this.$router.push(`/detail/${obj.art_id}`)
    }

  }
}
</script>

<style lang='less' scoped>
.van-nav-bar.van-hairline--bottom {
  background: #3e9df8;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
}
.searchResult {
  margin-top: 46px;
}
.other {
  span {
    margin-right: 10px;
    color: #ccc;
    font-size: 12px;
  }
}
/deep/.van-grid-item__content.van-grid-item__content--center.van-hairline {
    flex-direction: row;
}
i.van-icon {
  margin-right: 5px;
  font-size: 20px;
}

</style>
