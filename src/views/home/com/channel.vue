<template>
  <div>
    <!-- 弹出层 面板 -->
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <!-- 我的频道:标题 -->
      <van-cell>
        <template slot="title">
          <div style="font-size: 20px;">我的频道</div>
        </template>
        <!-- 编辑按钮 -->
        <template slot="default">
          <van-button v-if="isEidt===false" @click="isEidt=true" plain round size="small" type="danger">编辑</van-button>
          <van-button v-if="isEidt===true" @click="isEidt=false" plain round size="small" type="danger">完成</van-button>
        </template>
      </van-cell>
      <!-- 我的频道:列表 -->
      <van-grid>
        <van-grid-item @click="changeActive(index)" class="crossFather" v-for="(item,index) in channelList" :key="index">
          <template slot="text">
            <span :class="{active: active === index}">{{item.name}}</span>
            <van-icon @click.stop="delChannel(item)" v-if="isEidt===true && index != 0" class="crossSon" name="close" />
            </template>
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道:标题 -->
      <van-cell>
        <template slot="title">
          <div style="font-size: 20px;">频道推荐</div>
        </template>
      </van-cell>
      <!-- 推荐频道:列表 -->
      <van-grid>
        <van-grid-item @click="addChannel(item)" v-for="(item,index) in tuijianChannel" :key="index">
          <template slot="text">{{item.name}}</template>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入操作频道的方法
import { apiGetAllchannel, apiResetChannel } from '../../../api/channel'
// 导入 localStorage  方法
import { setLocal } from '../../../utils/mylocal'
export default {
  data () {
    return {
      allChannel: [],
      // 控制编辑&完成按钮的显示
      isEidt: false
    }
  },
  // 接收父组件传入参数
  // channelList 父组件传过来的我的频道数据
  // active  选中频道的下标
  props: ['value', 'channelList', 'active'],
  methods: {
    // 得到所有频道数据
    async getAllChannel () {
      const res = await apiGetAllchannel()
      // console.log(res)
      // 保存频道数据
      this.allChannel = res.data.data.channels
    },
    // 点击添加频道
    async addChannel (item) {
      // 给 item 添加额外属性
      this.$set(item, 'articleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      // 添加到我的频道中
      this.channelList.push(item)
      // 1-判断用户是否登录
      const token = this.$store.state.user.token
      if (!token) {
        // 未登录  将操作后的数据保存到本地: localStorage 中
        setLocal('channels', this.channelList)
      } else {
        // 说明登录了
        // 准备提交到服务器的参数
        var newChanel = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        console.log(newChanel)

        // 将操作后的频道保存到服务器中
        await apiResetChannel(newChanel)
      }
    },
    // 点击删除频道
    async delChannel (channelObj) {
      // 从我的频道列表中 将 item 对应的数据进行删除
      this.channelList.forEach((item, index) => {
        // 判断 当前的channelObj 是否与 item 一样,如果一样,就删除
        if (item.id === channelObj.id) {
          // 删除当前index 对应的元素
          this.channelList.splice(index, 1)
        }
      })
      // 得到用户的登录信息 保存修改后的频道数据
      const token = this.$store.state.user.token
      if (!token) {
        // 未登录  将操作后的数据保存到本地: localStorage 中
        setLocal('channels', this.channelList)
      } else {
        // 说明登录了
        // 准备提交到服务器的参数
        var newChannels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })

        // 将操作后的频道保存到服务器中
        await apiResetChannel(newChannels)
      }
    },
    // 改变选中的频道颜色
    changeActive (index) {
      this.$emit('update:active', index)
    }
  },
  // 计算属性
  computed: {
    // 推荐频道
    tuijianChannel: function () {
      // 从所有频道中 去除 我的频道数据
      // 先得到我的频道数据的 所有ID
      var ids = this.channelList.map(item => {
        return item.id
      })
      // 然后从所有频道数据中筛选出满足条件的数据
      var newArr = this.allChannel.filter(item => {
        return ids.indexOf(item.id) === -1
      })
      return newArr
    }
  },
  mounted () {
    // 1-请求服务器得到所有频道数据
    this.getAllChannel()
  }
}
</script>

<style lang='less'>
button.van-button.van-button--danger.van-button--small.van-button--plain.van-button--round {
  font-size: 14px;
}
.crossFather{
  position: relative;
  .crossSon {
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
.active {
  color: red;
}
</style>
