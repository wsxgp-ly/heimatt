<template>
  <div class="detail">
      <!-- 头部标题 -->
      <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" title="文章详情" />
      <!-- 文章标题 -->
      <h2 class="title">{{detailObj.title}}</h2>
      <!-- 作者信息 -->
      <van-cell>
          <template slot="title">
              <div class="autBox">
                  <div class="img">
                      <img :src="detailObj.aut_photo" alt="">
                  </div>
                  <div class="msg">
                      <div>{{detailObj.aut_name}}</div>
                      <div>{{detailObj.pubdate | myrelativeTime}}</div>
                  </div>
                  <div class="btn">
                      <van-button @click="addFollow" v-if="detailObj.is_followed === false" type="info">+ 关注</van-button>
                      <van-button @click="disFollow" v-if="detailObj.is_followed === true" type="info">已关注</van-button>
                  </div>
              </div>
          </template>
      </van-cell>
      <!-- 文章内容 -->
      <van-cell>
          <template slot="title">
              <div v-html="detailObj.content"></div>
          </template>
      </van-cell>
      <!-- 点赞&不喜欢区域 -->
      <div class="btnBox">
          <div>
              <van-button @click="addZan" v-if="detailObj.attitude !== 1" round plain type="default"><van-icon name="like" />点赞</van-button>
              <van-button @click="disZan" v-if="detailObj.attitude === 1" round plain type="danger"><van-icon name="like" />点赞</van-button>
          </div>
          <div>
              <van-button @click="disLike" v-if="detailObj.attitude !== 0" round plain type="default"><van-icon name="delete" />不喜欢</van-button>
              <van-button @click="unDisLike" v-if="detailObj.attitude === 0" round plain type="danger"><van-icon name="delete" />不喜欢</van-button>
          </div>
      </div>
      <!-- 评论区域 -->
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <comment :isreply="false" @showreply="replyShow=$event" :commentMsg="item" v-for="(item,index) in commentList" :key="index" />
</van-list>

      <!-- 评论书写区域 -->
      <write :isReply="false"  @addComment="addComment" />
      <!-- 评论回复的区域 -->
      <reply v-model="replyShow" />
  </div>
</template>

<script>
// 导入评论组件
import comment from './com/comment.vue'
// 导入 评论书写组件
import write from './com/write.vue'
// 导入操作文章的方法
import { apiGetArticelById, apiAddZan, apiDisZan, apiDisLike, apiUnDisLike } from '../../api/article'
// 导入 操作用户的方法
import { apiFollowUser, apiDisFollowUser } from '../../api/user'
// 导入操作评论的方法
import { apiGetArticleComment } from '../../api/common'
// 导入回复组件
import reply from './com/reply'

export default {
  data () {
    return {
    // 当前文章的id
      artid: 0,
      //   当前文章的详情
      detailObj: {},
      loading: false,
      finished: false,
      //   设置一个偏移量
      offset: null,
      //   定义一个结束标识
      endid: 0,
      //   评论的数据源
      commentList: [],
      // 控制回复面板的显示
      replyShow: false

    }
  },
  methods: {
    //   获取评论数据
    async onLoad () {
      const res = await apiGetArticleComment({
        artid: this.artid,
        offset: this.offset
      })
      //   保存数据
      // 保存下一页的标识
      this.offset = res.data.data.last_id
      // 保存结束的标识
      this.endid = res.data.data.end_id
      // 得到评论的数据源 将评论数据进行拼接
      this.commentList = [...this.commentList, ...res.data.data.results]
      // 将加载状态设置为 false
      this.loading = false
      // 判断是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 根据文章id得到文章详情
    async getArticelById () {
      const res = await apiGetArticelById(this.artid)
      this.detailObj = res.data.data
    },
    // 添加关注
    async addFollow () {
      // 得到当前作者的id
      const autid = this.detailObj.aut_id
      // 将id 提交到服务器
      await apiFollowUser(autid)
      // 手动将用户的关注状态进行修改
      this.detailObj.is_followed = true
    },
    // 取消关注
    async disFollow () {
      // 得到当前作者的id
      const autid = this.detailObj.aut_id
      // 将id 提交到服务器 取消关注
      await apiDisFollowUser(autid)
      // 手动将用户的关注状态进行修改
      this.detailObj.is_followed = false
    },
    // 点赞
    async addZan () {
      await apiAddZan(this.artid)
      // 手动将文章的态度改为 1
      this.detailObj.attitude = 1
    },
    // 取消点赞
    async disZan () {
      await apiDisZan(this.artid)
      this.detailObj.attitude = -1
    },
    // 点击不喜欢文章
    async disLike () {
      await apiDisLike(this.artid)
      this.detailObj.attitude = 0
    },
    // 取消文章不喜欢
    async unDisLike () {
      await apiUnDisLike(this.artid)
      this.detailObj.attitude = -1
    },
    // 接收  write 组件中传入 新的评论数据
    addComment (addComment) {
      this.commentList.unshift(addComment)
    }
  },
  mounted () {
    // 进入页面得到当前文章的id
    this.artid = this.$route.params.artid
    // 根据文章 id 得到文章的详情
    this.getArticelById()
  },
  components: {
    // 注册评论组件
    comment,
    // 注册评论书写组件
    write,
    // 注册回复面板组件
    reply
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
.detail {
    margin-top: 46px;
    margin-bottom: 54px;
    .title {
        font-weight:400;
        text-align: center;
        padding: 10px 5px;
    }
    .autBox {
        display: flex;
        .img {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
        .msg {
            flex:1;
        }

    }
}
.btnBox {
    display: flex;
    margin: 30px 0px;
    div {
        flex: 1;
        text-align: center;

    }
}
</style>
