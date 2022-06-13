<template>
  <div>
    <div class="header">
      <van-cell :border="false"
        ><div slot="title">编辑频道</div>
        <van-button type="danger" plain size="mini" round @click="isshow=!isshow" v-if="isshow">完成</van-button>
         <van-button type="danger" plain size="mini" round @click="isshow=!isshow" v-if="!isshow">编辑</van-button>
      </van-cell>
    </div>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in titlelist"
        :key="index"
        :text="item.name"
        class="grid-item"
      >
        <van-icon name="clear" slot="icon" class=".van-icon" v-if="isshow"  @click="deletechannels(item)"/>
      </van-grid-item>
    </van-grid>
    <div>频道推荐</div>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in compchannels"
        :key="index"
        :text="item.name"
        round
        @click="addchannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isshow: false,
      titlelistas: this.titlelist
    }
  },
  props: {
    titlelist: {
      type: Array,
      require: true
    },
    compchannels: {
      type: Array,
      require: true
    }
  },
  methods: {
    // 给编辑添加
    addchannel (index) {
      // this.compchannels.spilce(index, 1)
      this.$emit('addchanel', index)
    },
    // 删除数据
    deletechannels (item) {
      this.$emit('deletechannels', item)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 30px 0;
}
.grid-item {
  width: 160px;
  height: 40px;
  position: relative;
}
/deep/.van-grid-item__content {
  background: rgb(150, 151, 153);
}
.van-icon {
  position: absolute;
  right: -34px;
  top: -14px;
  font-size: 15px;
}
</style>
