<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted () {
    localStorage.setItem('time', JSON.stringify(Date.now()))
  }
}
</script>

<style lang="less">

</style>
