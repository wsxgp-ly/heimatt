<template>
  <div>
      <!-- 用户信息 -->
      <div class="usermsg">
        <div class="infobox">
          <div class="info">
            <img :src="userself.photo" alt="">
            <span>{{userself.name}}</span>
          </div>
          <div class="msg">
            <div>今日阅读</div>
            <div>0 分钟</div>
          </div>
        </div>
        <div class="sourcebox">
          <div class="source">
            <div class="num">{{userself.art_count}}</div>
            <div class="name">动态</div>
          </div>
          <div class="source">
            <div class="num">{{userself.follow_count}}</div>
            <div class="name">关注</div>
          </div>
          <div class="source">
            <div class="num">{{userself.fans_count}}</div>
            <div class="name">粉丝</div>
          </div>
        </div>
      </div>
      <!-- 收藏区域 -->
      <van-grid :column-num="3">
        <van-grid-item style="color:#f05f65" icon="star-o" text="收藏" />
        <van-grid-item style="color:#eea537" icon="underway-o" text="历史" />
        <van-grid-item style="color:#7c98e3" icon="records" text="作品" />
      </van-grid>
      <!-- 消息区域 -->
      <van-cell-group>
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="用户反馈" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </van-cell-group>
  </div>
</template>

<script>
// 导入操作用户的方法
import { apiGetSelfInfo } from '../../api/user'
export default {
  data () {
    return {
      userself: {}
    }
  },
  async mounted () {
    // 得到用户自己的信息
    const res = await apiGetSelfInfo()
    this.userself = res.data.data
  }
}
</script>

<style lang="less" scoped>
.usermsg {
  background-color: #3e9df8;
  color: #fff;
  overflow: hidden;
  .infobox{
    margin: 40px 40px 0 40px;
    display: flex;
    position: relative;
    .info{
      img{
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        float: left;
      }
    }
    .msg{
       position: absolute;
      top:0px;
      right: -40px;
      background-color: rgba(0, 0, 0, .3);
      font-size: 12px;
      padding: 5px 15px;
      text-align: center;
      border-radius: 20px 0 0 20px;
      div{

      }

    }
  }
  .sourcebox{
    display: flex;
    padding: 30px 0 40px;
    .source{
      flex:1;
      text-align: center;
      .num{}
      .name{}
    }
  }
}

</style>
