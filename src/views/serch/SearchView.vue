<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @input="search"
      @cancel="removeSearch"
    >
    </van-search>
    <!-- 搜索的内容 -->
    <div><van-cell :title="item.title" icon="search"  v-for=" (item,index) in results" :key="index"></van-cell></div>
    <!-- 历史记录 -->
  <div  v-if="!results"> <van-cell title="历史记录"  ><van-icon name="delete"  slot="right-icon" @click="del"/> </van-cell>
  <van-grid>
    <template >
    <van-grid-item :text="item.title"  v-for="(item,index) in stories" :key="index"/>
    </template>

</van-grid>

  </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getsearch, gethistories } from '@/api/search'
export default {
  async   created () {
    this.search = _.debounce(this.onSearch, 300)
    const stories = await gethistories()
    // console.log(stories)
    this.stories = stories.data.data.results
  },

  data () {
    return {
      value: '',
      results: [],
      // 历史记录
      stories: []
    }
  },
  methods: {
    async onSearch () {
      if (this.value) {
        const res = await getsearch({ q: this.value })
        this.results = res.data.data.results
      } else {
        this.results = null
      }
    },
    // 取消
    removeSearch () {
      this.$router.go(-1)
    },
    del () {

    }
  }

}

</script>

<style>
</style>
