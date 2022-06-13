<template>
  <div><van-nav-bar
      title="消息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    </div>
</template>

<script>
export default {
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }

}
</script>

<style>

</style>
