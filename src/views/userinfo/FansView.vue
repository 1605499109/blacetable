<template>
  <!-- 关注和粉丝 -->
  <div>
    <van-nav-bar
      title="关注/粉丝"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active">
      <van-tab title="关注">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(item, i) in daca.results" :key="i">
            <div slot="title" class="title">
              <van-image width="30" height="30" round :src="item.photo" />

              <div>
                <h6>{{ item.name }}</h6>
                <p>{{ item.fans_count }}</p>
              </div>
            </div>
            <van-button
              type="danger"
              slot="default"
              v-if="item.mutual_follow"
              @click="issollw(item.id)"
              >关注</van-button
            >
            <van-button
              plain
              type="primary"
              slot="default"
              v-else
              @click="issollw(item.id)"
              >互相关注</van-button
            >
            <!-- <van-button plain type="primary" slot="default"  >互相关注</van-button> -->
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="粉丝">
        <!-- 粉丝部分 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(item, i) in resfollwers.results" :key="i">
            <div slot="title" class="title">
              <van-image width="30" height="30" round :src="item.photo" />

              <div>
                <h6>{{ item.name }}</h6>
                <p>{{ item.fans_count }}</p>
              </div>
            </div>
            <van-button
              type="danger"
              slot="default"
              v-if="item.mutual_follow"
              @click="issollw(item.id)"
              >关注</van-button
            >
            <van-button
              plain
              type="primary"
              slot="default"
              v-else
              @click="issollw(item.id)"
              >互相关注</van-button
            >
            <!-- <van-button plain type="primary" slot="default"  >互相关注</van-button> -->
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getfollowings, followings, followers } from '@/api/userinfo/followings'
export default {
  created () {
    this.runder()
  },
  data () {
    return {
      active: 0,
      // 数据
      daca: {},
      list: [],
      loading: false,
      finished: false,
      // 粉丝
      resfollwers: {}
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async runder () {
      const res = await getfollowings(1, 10)
      this.daca = res.data.data
      this.list.push(res.data.data)
      const resfollwers = await followers()
      this.resfollwers = resfollwers.data.data
    },
    onLoad () {
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
    },
    // 按钮
    async issollw (id) {
      console.log(id)
      const ststus = await followings(id)
      ststus.status === 201 ? this.runder() : console.log()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.title {
  display: flex;
}
</style>
