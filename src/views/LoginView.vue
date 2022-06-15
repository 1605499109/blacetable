<template>
  <div class="home">
    <van-nav-bar title="登录" />
    <van-form>
      <van-field
        v-model="mobile"
        name="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="code"
        type="text"
        name="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      ></van-field
      ><van-button native-type="button" round class="pobutton"
        >发送验证码</van-button
      >
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="onSubmit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { postuser } from '@/api/login'
export default {
  name: 'HomeView',
  components: {},
  data () {
    return {
      mobile: '13911111111',
      code: '246810'
    }
  },
  methods: {
    async onSubmit () {
      const res = await postuser({ code: this.code, mobile: this.mobile })
      if (res.status === 201) {
        localStorage.setItem('token', 'Bearer ' + res.data.data.token)
        localStorage.setItem(
          'refresh_token',
          'Bearer ' + res.data.data.refresh_token
        )
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
<style lang="less">
.van-nav-bar__content {
  background-color: rgb(62, 157, 248);

  .van-nav-bar__title {
    color: #fff;
  }
}
.van-form {
  position: relative;

  .pobutton {
    position: absolute;
    right: 0;
    bottom: 58px;
  }
}
</style>
