<template>
  <div>
    <van-popup class="box" :value="value" @input="$emit('input',$event)">
      <div>
        <van-cell-group v-if="isReport === false">
          <van-cell @click="dislike" icon="warning-o" title="不感兴趣" />
          <van-cell @click="isReport=true" icon="chat-o" is-link title="反馈垃圾内容" />
          <van-cell icon="manager-o" title="拉黑作者" />
        </van-cell-group>
        <van-cell-group v-else>
            <!-- 顶部向左图标 -->
          <van-cell @click="isReport=false" icon="arrow-left"></van-cell>
          <!-- 举报选项列表 -->
          <van-cell @click="report(item.id)" v-for="(item,index) in reportList" is-link :key="index" :title="item.name" />
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入操作文章的方法
// 导入举报文章的方法
import { apiDisLike, apiReport } from '../../../api/article'
export default {
  data () {
    return {
      // 举报的列表
      reportList: [
        { id: 0, name: '其他问题' },
        { id: 1, name: '标题夸张' },
        { id: 2, name: '低俗色情' },
        { id: 3, name: '错别字多' },
        { id: 4, name: '旧闻重复' },
        { id: 5, name: '广告软文' },
        { id: 6, name: '内容不实' },
        { id: 7, name: '涉嫌违法犯罪' },
        { id: 8, name: '侵权' }
      ],
      //  是否处于举报状态
      isReport: false
    }
  },
  // moreshow : 控制面板的显示和隐藏
  // artid : 当前要操作的文字id
  props: ['value', 'artid'],
  methods: {
    // 完成不感兴趣的逻辑
    async dislike () {
      // 将当前 artid 对应的文字数据从页面上删除
      this.$emit('delar', this.artid)
      //   将当前 artid 提交到服务器 将这篇文章标记为不喜欢
      await apiDisLike(this.artid)
    },
    // 举报文章的方法
    async report (type) {
      try {
        // 请求服务器举报文章
        await apiReport({
          artid: this.artid,
          type: type
        })
        //   提示举报成功
        this.$toast.success('举报成功')
      } catch (error) {
        this.$toast.fail('举报失败')
      }
      //   切换到 不感兴趣页面
      this.isReport = false
      //   关闭面板
      this.$emit('input', false)
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  width: 85%;
  border-radius: 5px;
}
</style>
