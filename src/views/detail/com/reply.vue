<template>
  <div>
      <van-popup :value="value" @input="$emit('input',$event)" position="bottom" :style="{ height: '60%' }">
        <!-- 当前评论 -->
      <van-cell title="当前评论"></van-cell>
       <comment :isreply="true" :commentMsg="currentComment" />
      <!-- 评论回复 -->
      <van-cell title="评论回复"></van-cell>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
           <comment :isreply="true" :commentMsg="item" v-for="(item,index) in replyList" :key="index" />
        </van-list>
        <!-- 添加回复的组件 -->
        <write @addComment="addComment" :commid="currentComment.com_id" :isReply="true" />
      </van-popup>
  </div>
</template>

<script>
// 导入 bus
import bus from '../../../utils/bus'
// 导入comment
import comment from './comment'
// 导入得到评论回复的方法
import { apiGetReply } from '../../../api/common'
// 导入 write 组件
import write from './write'
export default {
  data () {
    return {
      // 当前评论数据
      currentComment: {},
      loading: false,
      finished: false,
      // 偏移量
      offset: null,
      // 结束的标识
      endid: 0,
      // 保存回复的列表
      replyList: []
    }
  },
  components: {
    comment,
    write
  },
  methods: {
    async onLoad () {
      // 等到当前评论的id
      const id = this.currentComment.com_id.toString()
      // 根据 id 得到当前评论的数据
      const res = await apiGetReply({
        comid: id,
        offset: this.offset
      })
      // 保存数据
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.replyList = [...this.replyList, ...res.data.data.results]
      // 关闭加载状态
      this.loading = false
      // 判断是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 添加评论的回复数据
    addComment (newObj) {
      this.replyList.unshift(newObj)
      // 给评论的回复数加1
      this.currentComment.reply_count += 1
    }
  },
  //  value : index.vue 中用来控制回复面板显示和隐藏的属性
  props: ['value'],
  mounted () {
    // 接收  bus 参数
    bus.$on('passcomment', value => {
      // 保存当前评论
      this.currentComment = value
    })
  }
}
</script>

<style>

</style>
