<template>
  <div class="detail">
      <!-- 头部标题 -->
      <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" title="文章详情" />
      <!-- 文章标题 -->
      <h2 class="title">哈哈哈哈哈哈哈</h2>
      <!-- 作者信息 -->
      <van-cell>
          <template slot="title">
              <div class="autBox">
                  <div class="img">
                      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583613884253&di=7405ad50bc0491549b3c291e7cee3422&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20171028%2F93f19e3e70b94b33a99b6d222170db07.jpeg" alt="">
                  </div>
                  <div class="msg">
                      <div>彭于晏</div>
                      <div>1 年前</div>
                  </div>
                  <div class="btn">
                      <van-button type="info">+ 关注</van-button>
                  </div>
              </div>
          </template>
      </van-cell>
      <!-- 文章内容 -->
      <div v-for="item in 20" :key="item">文章内容</div>
      <!-- 点赞&不喜欢区域 -->
      <div class="btnBox">
          <div>
              <van-button round type="default"><van-icon name="like" />点赞</van-button>
          </div>
          <div>
              <van-button round plain type="danger"><van-icon name="delete" />不喜欢</van-button>
          </div>
      </div>
      <!-- 评论区域 -->
      <comment v-for="item in 3" :key="item" />
      <!-- 评论书写区域 -->
      <write />
  </div>
</template>

<script>
// 导入评论组件
import comment from './com/comment.vue'
// 导入 评论书写组件
import write from './com/write.vue'
export default {
  components: {
    // 注册评论组件
    comment,
    // 注册评论书写组件
    write
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
        .btn {}
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
