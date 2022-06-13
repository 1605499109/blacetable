<template>
  <div>
    <van-nav-bar
      title="小智同学"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="out">
      <span>我是小智 </span>
      <van-image
        width="30"
        height="30"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <div class="put">
      <van-image
        width="30"
        height="30"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <span>nihaoya</span>
    </div>

    <van-cell-group class="input">
      <van-field v-model="value" placeholder="请输入用户名"
        ><van-button type="primary" slot="button">发送</van-button></van-field
      >
    </van-cell-group>
  </div>
</template>

<script>
// import rebot from '@/api/robot/robot'
export default {
  created () {
    // rebot()
    // reboot.emit()
    // console.log(rebot().message({ msg: 'ww', timestamp: Date.mow() }))
    // this.$message({ msg: 'ww', timestamp: Date.mow() })
    console.log(
      this.$message(this.$socket.emit({ msg: 'ww', timestamp: Date.mow() }))
    )
    // huifude shuju
    console.log(
      this.$message(
        this.sockets.subscribe((data) => {
          console.log(data)
        })
      )
    )
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
  /// /fasong
}
</script>

<style>
.input {
  position: absolute;
  width: 100%;
  bottom: 0;
}
/* 返回的数据 */
.out {
  display: flex;
  justify-content: right;
}
/* 发送的数据 */
.put {
  display: flex;
  justify-content: left;
}
span {
  background: rgb(117, 185, 222);
  border-radius: 15%;
  margin: 0 15px;
}
</style>
