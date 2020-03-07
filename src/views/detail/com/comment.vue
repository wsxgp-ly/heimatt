<template>
  <div>
    <van-cell>
      <template>
        <div class="comBox">
          <div class="img">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583613884253&di=7405ad50bc0491549b3c291e7cee3422&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20171028%2F93f19e3e70b94b33a99b6d222170db07.jpeg"
              alt
            />
          </div>
          <div class="msg">
            <div class="author">彭于晏</div>
            <div class="content">这是评论内容</div>
            <div class="info">
              <span>1个月前</span>
              <van-button round class="btn" size="small" color="#eff7f8">回复 6</van-button>
            </div>
          </div>
          <div class="like">
            <van-icon name="like" /> 0
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {}
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
