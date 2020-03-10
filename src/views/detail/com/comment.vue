<template>
  <div>
    <van-cell>
      <template>
        <div class="comBox">
          <div class="img">
            <img
              :src="commentMsg.aut_photo"
              alt
            />
          </div>
          <div class="msg">
            <div class="author">{{commentMsg.aut_name}}</div>
            <div class="content">{{commentMsg.content}}</div>
            <div class="info">
              <span>{{commentMsg.pubdate | myrelativeTime}}</span>
              <van-button v-if="isreply === false" @click="openreply" round class="btn" size="small" color="#eff7f8">回复 {{commentMsg.reply_count}}</van-button>
            </div>
          </div>
          <div class="like">
            <van-icon name="like" /> {{commentMsg.like_count}}
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 导入 bus 组件
import bus from '../../../utils/bus'
export default {
  // commentMsg 当前评论的数据
  // isreply : 控制回复按钮的显示与隐藏
  props: ['commentMsg', 'isreply'],
  methods: {
    // 打开回复面板
    openreply () {
      this.$emit('showreply', true)
      // 将当前评论数据传入到 eventbus 中
      bus.$emit('passcomment', this.commentMsg)
    }
  }
}
</script>

<style lang='less' scoped>
.comBox {
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
    flex: 1;
    .author {
      color: #7991ba;
    }
    .content {
      padding: 10px 5px;
    }
    .info {
      .btn {
          margin-left:10px;
        }
      span.van-button__text {
        color: #666;
      }
    }
  }
  .like {
      font-size: 20px;
  }
}
</style>
