<template>
  <van-cell :to="{name:'textinfo', query:{id:article.art_id} }">
    <div slot="title">{{ article.title }}</div>

    <div slot="label">
      <div v-if="article.cover.type === 3"  class="lable">
          <div v-for="(img,index) in  article.cover.images" :key="index" >
              <van-image width="100" height="100" :src="img" />
          </div>

      </div>
      <span>{{ article.aut_name }}</span
      ><span>{{ article.comm_count }}评论</span
      ><span>{{ article.pubdate }}</span>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      width="100"
      height="100"
      :src="article.cover.images[0]"
      slot="default"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>

.lable{
    display: flex;
    /* border: 1px solid #000; */
}
</style>
