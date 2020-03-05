<template>
  <div>
    <!-- 头部搜索框 -->
    <van-search @input="think" v-model="value" background="#3296fa" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    <!-- 联想区域 -->
    <van-cell-group  v-if="thinkList.length > 0" >
  <van-cell title="联想区域" />
  <van-cell icon="search" v-for="(item,index) in thinkList" :key="index" :title="item" />
</van-cell-group>
    <!-- 搜索历史区域 -->
    <van-cell-group v-else>
  <van-cell title="搜索历史">
      <template slot="default">
          <van-icon name="delete"></van-icon>
      </template>
  </van-cell>
  <van-cell icon="search" title="程序员为什么会脱发">
      <template slot="default">
          <van-icon name="cross"></van-icon>
      </template>
  </van-cell>
  <van-cell icon="search" title="程序员为什么会秃顶">
      <template slot="default">
          <van-icon name="cross"></van-icon>
      </template>
  </van-cell>
  <van-cell icon="search" title="程序员为什么喜欢霸格">
      <template slot="default">
          <van-icon name="cross"></van-icon>
      </template>
  </van-cell>
</van-cell-group>
  </div>
</template>

<script>
// 导入联想的方法
import { apiThink } from '../../api/user'
export default {
  data () {
    return {
      // 搜索框中的值
      value: '',
      //   保存联想的结果
      thinkList: []
    }
  },
  methods: {
    //   点击回车按钮时会触发的搜索方法
    onSearch (key) {
      this.$router.push(`/searchResult/${key}`)
    },
    //   点击取消按钮时会触发的搜索方法
    onCancel () {
      console.log('onCancel')
    },
    // 当输入框中输入内容的时候要进行联想操作
    async think () {
      // 根据输入的内容发送请求到服务器
      // 得到联想的结果
      const res = await apiThink(this.value)
      //   保存结果
      this.thinkList = res.data.data.options
    }
  }
}
</script>

<style lang='less' scoped>
.van-search__action {
    color: #fff;
}
.van-search__action:active {
    background-color: #3296fa;
}
</style>
