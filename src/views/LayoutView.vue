<template>
  <div>

    <!-- 展示的内容 -->
    <router-view></router-view>
    <!-- 切换 -->
    <van-tabbar v-model="active" @change="onChange" :date="times" :one="2222">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>

      <van-tabbar-item icon="manager-o" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {

  data () {
    return {
      // 数据
      active: '',
      // 时间戳当前
      times: Date.now()
    }
  },
  methods: {

    onChange (index) {
      if (index === 0) {
        this.$router.push({ name: 'home' })
      }
      if (index === 1) {
        this.$router.push({ name: 'user' })
      }
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.seach {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>
