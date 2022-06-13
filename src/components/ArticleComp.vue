<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"

        >
          <template #default>
            <Articleitem :article="item"></Articleitem>
          </template>
        </van-cell>
      </van-list>
      <!--
      <van-card v-for="(item, index) in results" :key="index">
        <template #title>
          <h5>
            {{ item.title }}
          </h5>
        </template>
        <template #price>
          <div>
            <span>{{ item.aut_name }}</span>
            <span>{{ item.istop }}</span>
          </div>
        </template>
        <template #footer>
          <div><van-icon name="cross" /></div>
        </template>
      </van-card> -->
    </van-pull-refresh>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import { gettimemap } from '../api/home'
import Articleitem from '../components/ArtclieItem.vue'
export default {
  components: {
    Articleitem
  },
  created () {
    this.runder()
    console.log(this.list)
  },
  data () {
    return {
      results: [],
      isLoading: false,
      // 列表
      list: [],
      loading: false,
      finished: false,
      // 下页的时间缀
      timestamp: null
    }
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  methods: {
    async runder () {
      const res = await gettimemap({
        timestamp: this.timestamp || Date.now(),
        channel_id: this.channel.id,
        with_top: 1
      })
      this.results = res.data.data.results
      this.list.push(...this.results)
      this.loading = false
      if (this.results.length) {
        this.timestamp = res.data.data.pre_timestamp
        // console.log(this.timestamp, '传输的时间', Date.now())
      } else {
        this.finished = true
      }
      return res.status
    },
    async onRefresh () {
      //  this.isLoading = false
      // console.log(await this.runder())
      if ((await this.runder()) === 200) {
        this.isLoading = false
      }
    },
    // 关于列表渲染的函数
    onLoad () {
      this.runder()

      // console.log(this.list, this.results)
      // this.list.push(...this.results)
      // this.loading = false
    }
  }
}
</script>

<style>
</style>
