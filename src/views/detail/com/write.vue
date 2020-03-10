<template>
  <div class="write">
      <van-search background="#ccc" v-model="value" show-action placeholder="请输入评论" @search="onSearch">
          <template slot="left-icon">
             <van-icon name="edit" />
          </template>
          <template slot="action">
              <div @click="onSearch">
                发送
              </div>
          </template>
      </van-search>
  </div>
</template>

<script>
// 导入操作评论的方法
import { apiAddArticleComment, apiAddCommentReply } from '../../../api/common'
export default {
  // isReply 用来判断当前要操作的逻辑 1.提交评论数据  2.提交回复数据
  // commid  当前评论的id
  props: ['isReply', 'commid'],
  data () {
    return {
      //   输入框中的关键字
      value: ''
    }
  },
  methods: {
    async onSearch () {
      // 按回车发送
      // 需要处理两个逻辑
      // 在detail 页面 提交评论的数据到服务器
      // 在reply 页面 提交评论回复的数据到服务器
      // -------------在detail 页面处理的逻辑-----------------
      if (this.isReply === false) {
        // 得到添加评论文章的id
        const artid = this.$route.params.artid
        const res = await apiAddArticleComment({
          artid: artid,
          content: this.value
        })
        // 保存服务器返回的数据
        const newCommentObj = res.data.data.new_obj
        // 这个数据应该去 detail 组件中进行渲染  说以需要传入
        this.$emit('addComment', newCommentObj)
        // 清空输入框
        this.value = ''
      } else {
        // -------------在reply 页面处理的逻辑-----------------
        const res = await apiAddCommentReply({
          commid: this.commid, // 评论的id
          content: this.value,
          artid: this.$route.params.artid // 评论所属文章的id
        })
        // 接收返回的评论回复数据
        const newObj = res.data.data.new_obj
        // 这个数据应该去 reply 组件中进行渲染  说以需要传入
        this.$emit('addComment', newObj)
        // 清空输入框
        this.value = ''
      }
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
