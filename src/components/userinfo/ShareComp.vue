<template>
  <div>
    <!-- 一张图片 -->
    <div >
      <div v-if="info.cover.type === 0">
        <div class="info" >
          <div class="infoleft">
            <h2>{{ info.title }}</h2>
            <span>{{info.aut_name}}</span><span>{{info.comm_count}}</span><span>{{info.pubdate}}年前</span>
          </div>
        </div>
        <div class="opthen">
          <van-grid border center gutter="10" class="grid">
            <van-grid-item icon="comment-o" text="评论">  </van-grid-item>
            <van-grid-item icon="like-o"   text="点赞" />
            <van-grid-item icon="share-o" text="分享" />
          </van-grid>
        </div>
      </div>
      <!-- 三张图片 -->
      <div v-else>
        <div>
          <h2>{{ info.title }}</h2>
          <van-image
          v-for="  img  in   info.cover.image"
          :key="img"
            width="100"
            height="100"
            :src="img"
          />
        </div>
        <van-grid border center gutter="10" class="grid">
          <van-grid-item icon="comment-o"  text="评论"/>
          <van-grid-item icon="like-o" text="点赞"  />
          <van-grid-item icon="share-o" text="分享" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {

  },
  props: {
    info: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
}
.grid {
  display: flex;
  justify-content: space-around;
}
</style>
