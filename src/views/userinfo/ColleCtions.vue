<template>
  <!-- 收藏和历史 -->
  <div>
    <van-nav-bar
  title="标题"
  left-text="返回"

  left-arrow
  @click-left="onClickLeft"

/>
    <van-tabs v-model="active">
      <van-tab title="收藏"> <sharecomp :info="item"  v-for="(item, i) in colles" :key="i"></sharecomp></van-tab>
      <van-tab title="历史"> <sharecomp :info="item"  v-for="(item, i) in datas" :key="i"></sharecomp></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import sharecomp from '@/components/userinfo/ShareComp.vue'
import { getshare, getcllections } from '@/api/userinfo/profile'
export default {
  async created () {
    const info = await getshare()
    const colles = await getcllections()
    this.datas = info.data.data.results
    this.colles = colles.data.data.results
    console.log(this.colles)
  },
  components: {
    sharecomp
  },
  data () {
    return {
      active: 0,
      datas: [],
      colles: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
