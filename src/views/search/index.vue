<template>
  <div>
    <!-- 头部搜索框 -->
    <van-search
      @input="think"
      v-model="value"
      background="#3296fa"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 联想区域 -->
    <van-cell-group v-if="thinkList.length > 0">
      <van-cell title="联想区域" />
      <van-cell
        @click="onSearch(item.oldItem)"
        icon="search"
        v-for="(item,index) in thinkList"
        :key="index"
      >
        <template slot="title">
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史区域 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template slot="default">
          <van-icon @click="delAll" name="delete"></van-icon>
        </template>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="(item,index) in historyList"
        icon="search"
        :key="index"
        :title="item"
      >
        <template slot="default">
          <van-icon @click.stop="delHistory(index)" name="cross"></van-icon>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入联想的方法
import { apiThink } from '../../api/user'
// 导入 localStorage  方法
import { setLocal, getLocal, delLocal } from '../../utils/mylocal'

export default {
  data () {
    return {
      // 搜索框中的值
      value: '',
      //   保存联想的结果
      thinkList: [],
      // 定义一个定时器
      timer: null,
      // 定义一个搜索历史
      historyList: getLocal('history') || []
    }
  },
  methods: {
    //   点击回车按钮时会触发的搜索方法
    onSearch (key) {
      this.$router.push(`/searchResult/${key}`)
      // 将搜索的数据保存到 historyList 中
      this.historyList.unshift(key)
      // 使用 set 对象进行去重
      this.historyList = [...new Set(this.historyList)]
      // 还需要将搜索结果保存到本地 localStorage 中
      setLocal('history', this.historyList)
    },
    //   点击取消按钮时会触发的搜索方法
    onCancel () {
      console.log('onCancel')
    },
    // 当输入框中输入内容的时候要进行联想操作
    think () {
      // 判断输入内容是否为空
      if (this.value.trim().length === 0) {
        // 清除之前联想的结果
        this.thinkList = []
        return
      }
      // 清除定时器
      clearTimeout(this.timer)
      // 设置定时器
      this.timer = setTimeout(async () => {
        // 根据输入的内容发送请求到服务器
        // 得到联想的结果
        const res = await apiThink(this.value)
        //   保存结果
        this.thinkList = res.data.data.options
        // 将结结果中的关键字进行替换
        this.thinkList = this.thinkList.map(item => {
          return {
            oldItem: item,
            newItem: item.replace(
              this.value,
              `<span style="color:red">${this.value}</span>-world`
            )
          }
        })
      }, 500)
    },
    // 删除历史记录
    delHistory (index) {
      // 根据下标从数据源中删除数据
      this.historyList.splice(index, 1)
      // 将数据重新保存到本地
      setLocal('history', this.historyList)
    },
    // 清空历史记录
    delAll () {
      // 询问用户是否需要清理搜索历史
      this.$dialog.confirm({
        title: '提示',
        message: '您确定需要清搜索记录吗?'
      }).then(() => {
        // 清空历史数据
        this.historyList = []
        // 清除本地记录
        delLocal('history')
      }).catch(() => {
        // 点击取消 什么也不做
      })
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
