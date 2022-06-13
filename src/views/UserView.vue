<template>
  <div>
    <header class="header">
      <div class="header-user">
        <router-link :to="{name:'personalinfo'}"><van-image width="100" height="100" round :src="userinfo.photo" /></router-link>

        <h2>{{ userinfo.name }}</h2>
        <span>今日阅读{{parseInt(num/60000) }} 分钟</span>
      </div>
      <div>
        <van-grid class="gous" center column-num="3">
          <van-grid-item :to="{name:'dynamic'}">
            <div>{{ userinfo.art_count }}</div>
            <span>动态</span></van-grid-item
          ><van-grid-item  :to="{name:'fans'}">
            <div>{{ userinfo.follow_count }}</div>
            <span>关注</span></van-grid-item
          ><van-grid-item :to="{name:'fans'}">
            <div>{{ userinfo.fans_count }}</div>
            <span>粉丝</span>
          </van-grid-item>
        </van-grid>
      </div>
      <div></div>
    </header>
    <van-grid class="grid" column-num="3" center>
      <van-grid-item :to="{name:'collections'}">
        <van-icon name="star-o" />
        <span>收藏</span></van-grid-item
      ><van-grid-item :to="{name:'collections'}">
        <van-icon name="underway-o" />
        <span>历史</span></van-grid-item
      ><van-grid-item :to="{name:'dynamic'}">
        <van-icon name="edit" />
        <span >作品</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link  :to="{name:'message'}"/><van-cell
      title="用户反馈"
      is-link
    /><van-cell title="小智同学" is-link  :to="{name:'robot'}"/>
  </div>
</template>

<script>
import { getuserinfo } from '@/api/user'
export default {
  mounted () {
    this.timer = setInterval(() => {
      const time = Date.now()
      const timePrev = +localStorage.getItem('time')
      this.num = time - timePrev
    }, 1000)
  },
  props: {
    date: {
      type: Number,
      require: true
    },
    one: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      userinfo: '',
      num: 0,
      timer: null
    }
  },
  beforeDestroy () {
    this.timer = null
  },
  async created () {
    const res = await getuserinfo()
    // console.log(res)
    this.userinfo = res.data.data
  }

}
</script>

<style lang="less" scoped>
.header {
  height: 200px;
  //   border: 1px solid #000;
  background: #3e9df8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  .header-user {
    display: flex;
    justify-content: space-between;
    margin: 5px 15px;
    h2 {
      color: #fff;
      font-family: "微软雅黑";
    }
    // border: 1px solid #000;
  }
}
</style>
