<template>
  <div>
    <van-nav-bar
      title="消息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active">
      <van-tab title="作品">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(item,i) in newar" :key="i"><Article :article="item"></Article></van-cell>
        <!-- 封面为1时候 -->

        </van-list>
      </van-tab>
      <van-tab title="公告">
        <div v-for="(item,i) in hotices " :key="i"> <h2>{{item.title}} </h2> <p>{{item.pubdate}}</p></div>
      </van-tab>
      <van-tab title="数据">
        <div class="hass">
            <div>粉丝数 <p>{{hass.fans_count}}</p></div>
            <div> 阅读数 <p>{{hass.read_count}}</p></div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Article from '@/components/ArtclieItem.vue'
import { work, fans, notice } from '@/api/dynamic/works'
export default {
  components: {
    Article
  },
  created () {
    this.runder()
  },
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      newar: [],
      hass: {},
      hotices: []
    }
  },

  methods: {
    onLoad () {
      this.page += 1
      this.runder()
      this.loading = false
      // 异步跟新数据
      //   setTimeout(() => {
      //     this.loading = false
      //   }, 1000)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    async runder () {
      const res = await work(this.runder)
      this.newar.push(...res.data.data.results)
      const hass = await fans()
      const notices = await notice()
      this.hotices = notices.data.data.results

      console.log(this.hotices)
      this.hass = hass.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.info  .hass{
    display: flex;

}
</style>
