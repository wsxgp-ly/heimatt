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
      <van-button :loading="loginLoading" loading-text="登录中..." type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入axios
import { apiLogin } from '../../api/user'
// 导入封装的localstorage 的方法
import { setLocal } from '../../utils/mylocal'
export default {
  data () {
    return {
      obj: {
        mobile: '15586865656',
        code: '246810'
      },
      // 验证的文本
      errorMsg: {
        mobile: '',
        code: ''
      },
      // 是否处于加载状态
      loginLoading: false
    }
  },
  methods: {
    // 使用 async & await 来简化异步代码
    // async 用来修饰异步代码所在的函数
    // await 用来修饰异步代码
    login () {
      // 验证不通过  打断
      if (!this.yanzheng()) {
        return
      }
      // 验证通过 将参数提交到服务器
      // 以同步的方法来接收异步代码返回的数据
      // 点击登陆将loading设置为true
      this.loginLoading = true
      // 用定时器模拟网络延迟的效果
      setTimeout(async () => {
        try {
        // 已同步的方式来接收异步代码返回的数据
          const res = await apiLogin({
            mobile: this.obj.mobile,
            code: this.obj.code
          })
          // 将登录成功后的信息保存到  vuex
          this.$store.commit('setUser', res.data.data)
          console.log(this.$store.state.user)
          // 将登录成功后的信息保存到  localsroreage 中
          // window.localStorage.setItem('userInfo', JSON.stringify(res.data.data))
          setLocal('userInfo', res.data.data)
          // 跳转到首页
          // console.log(res.data.data)

          this.$router.push('/home')
        } catch (err) {
          // console.log(err)
          // 登录失败 提示用户
          this.$toast.fail('验证码错误')
        }
        // 跳转完成后,将登录的加载状态设置为false
        this.loginLoading = false
      }, 1500)
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
