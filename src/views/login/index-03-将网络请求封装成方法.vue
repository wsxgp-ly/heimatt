<template>
  <div>
    <!-- 头部标题 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <!-- 手机号输入框 -->
    <van-field v-model="obj.mobile" :error-message="errorMsg.mobile" placeholder="请输入手机号">
      <template slot="left-icon">
        <span class="iconfont icon-phone"></span>
      </template>
    </van-field>
    <!-- 验证码输入框 -->
    <van-field v-model="obj.code" :error-message="errorMsg.code" placeholder="请输入验证码">
      <template slot="left-icon">
        <span class="iconfont icon-suo"></span>
      </template>
      <template slot="button">
        <van-button round color="#ccc" size="small" type="default">发送验证码</van-button>
      </template>
    </van-field>
    <!-- 登录按钮 -->
    <div class="btnbox">
      <van-button type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入axios
import { apiLogin } from '../../api/user'
export default {
  data () {
    return {
      obj: {
        mobile: '',
        code: ''
      },
      // 验证的文本
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    login () {
      // 验证不通过  打断
      if (!this.yanzheng()) {
        return
      }
      // 验证通过 将参数提交到服务器
      apiLogin({
        mobile: this.obj.mobile,
        code: this.obj.code
      }).then(res => {
        this.$router.push('/home')
      })
    },
    yanzheng () {
      // 定义一个数组来保存,两个参数是否验证通过
      var isPass = []
      // 判断手机号长度是否为11
      if (this.obj.mobile.trim().length === 11) {
        // 手机号正确
        isPass.push(true)
      } else {
        // 手机号不正确
        isPass.push(false)
        this.errorMsg.mobile = '手机号验证不成功'
      }
      // 判断验证码长度是否为6
      if (this.obj.code.trim().length === 6) {
        // 验证码正确
        isPass.push(true)
      } else {
        // 验证码不正确
        isPass.push(false)
        this.errorMsg.code = '验证码验证不成功'
      }
      // 如果isPass中有一个 false  说明验证不通过
      return !isPass.includes(false)
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
}
span.van-button__text {
  color: #333;
}
.btnbox {
  margin: 20px;
  span.van-button__text {
    color: #fff;
  }
}
</style>
