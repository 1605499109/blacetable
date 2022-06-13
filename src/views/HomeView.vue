<template>
  <div>
    <van-sticky>
      <van-search
        v-model="value"
        shape="round"
        show-action
        background="#3194ff"
        placeholder="请输入搜索关键词"
        class="seach"
        @focus="focus"
      >
        <template #left>
          <van-icon name="coupon-o" @click="show = !show" />
        </template>
        <template #action>
          <van-icon name="search" />
          <!-- <div @click="onSearch">搜索</div> -->
        </template>
      </van-search>
    </van-sticky>

    <van-tabs v-model="active" class="tables">
      <van-tab
        v-for="(item, index) in titlelist"
        :key="index"
        :title="item.name"
      >
        <ArticleView :channel="item"></ArticleView>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->

    <van-popup
      v-model="show"
      position="left"
      class="mask"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :titlelist="titlelist"
        :compchannels="compchannels"
        @addchanel="addchanel"
        @deletechannels="deletechannels"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ArticleView from '../components/ArticleComp.vue'
import ChannelEdit from '../components/ChannelEdit.vue'
import { getchanels, getchanelsAll, putchannels } from '../api/home'
export default {
  created () {
    this.runder()
    // const getchannel = await getchanels()
    // const getchanelsall = await getchanelsAll()
    // this.titlelist = getchannel.data.data.channels
    // console.log(getchanelsall)
    // this.getchanelsall = getchanelsall.data.data.channels
  },

  data () {
    return {
      active: 0,
      // 当前user'
      titlelist: [],
      // 说有频道
      getchanelsall: [],

      // 控制弹出层显示隐藏
      show: false,
      tableactive: '',
      value: '',
      count: 0,
      isLoading: false
    }
  },
  methods: {
    onSearch () {},
    // 刷新
    async runder () {
      const getchannel = await getchanels()
      const getchanelsall = await getchanelsAll()
      this.titlelist = getchannel.data.data.channels
      // console.log(getchanelsall)
      this.getchanelsall = getchanelsall.data.data.channels
    },
    // 添加
    async addchanel (index) {
      this.titlelist.push(index)
      const res2 = await putchannels({ channels: this.titlelist })
      if (res2.data.status === 200) {
        this.runder()
      }
    },
    // 删除
    async deletechannels (index) {
      console.log(this.titlelist.indexOf(index))

      this.titlelist.splice(this.titlelist.indexOf(index), 1)
      const res3 = await putchannels({ channels: this.titlelist })
      // console.log(res3)
      if (res3.data.status === 200) {
        this.runder()
      }
    },
    // 跳转
    focus () {
      this.$router.push({ name: 'search' })
    }
  },
  components: {
    ArticleView,
    ChannelEdit
  },
  computed: {
    compchannels () {
      const newarr = []
      this.getchanelsall.forEach((all) => {
        const ref = this.titlelist.find((item) => item.id === all.id)
        if (!ref) {
          return newarr.push(all)
        }
      })

      return newarr
    }
  }
}
</script>

<style lang="less" scoped>
.tables {
  padding-bottom: 100px;
}
.mask {
  width: 80%;
  height: 100%;
}
</style>
