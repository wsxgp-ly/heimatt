<template>
  <div class="write">
      <van-search background="#ccc" v-model="value" show-action placeholder="请输入评论" @search="onSearch">
          <template slot="left-icon">
             <van-icon name="edit" />
          </template>
          <template slot="action">
              发送
          </template>
      </van-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //   输入框中的关键字
      value: ''
    }
  },
  methods: {
    onSearch () {
      // 按回车发送
      console.log('发送')
    }
  }
}
</script>

<style lang='less' scoped>
.write {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
}
</style>
