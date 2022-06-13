<template>
  <!-- 用户详情 -->
  <div>
    <!-- table -->
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 表格部分 -->
    <van-cell
      title="头像"
      is-link
      cente
      :clickable="true"
      @click="avatershow = !avatershow"
    >
      <van-image
        slot="default"
        width="30"
        height="30"
        round
        :src="data.photo"
      />
    </van-cell>
    <van-cell center title="昵称" is-link @click="nameshow = !nameshow">
      <van-field :value="data.name" disabled />
    </van-cell>
    <van-cell center title="介绍" is-link @click="introshow = !introshow">
      <van-field :value="data.intro" disabled />
    </van-cell>
    <van-cell center title="性别" is-link @click="gendershow = !gendershow">
      <van-field :value="data.gender === 0 ? '男' : '女'" disabled />
    </van-cell>
    <van-cell
      center
      title="生日"
      :value="data.birthday"
      is-link
      @click="birthdayshow = !birthdayshow"
    >
      <van-field :value="data.birthday" disabled />
    </van-cell>
    <!-- 弹出层 -->
    <!-- 头像 -->
    <van-popup
      v-model="avatershow"
      :style="{ height: '30%', width: '100%' }"
      class="text"
    >
<van-uploader :after-read="afterRead" >
    <van-button plain block>从相册选择</van-button>
</van-uploader>
      <van-button plain block>拍照</van-button>
      <van-button plain block @click="  avatershow = false">取消</van-button>
    </van-popup>
    <!-- 昵称 -->
    <van-popup
      v-model="nameshow"
      position="bottom"
      :style="{ height: '30%', width: '100%' }"
    >
      <van-field v-model="data.name"></van-field>
    </van-popup>
    <!-- 介绍 -->
    <van-popup
      v-model="introshow"
      position="bottom"
      :style="{ height: '30%', width: '100%' }"
    >
      <van-field v-model="data.intro"></van-field>
    </van-popup>
    <!-- 性别 -->
    <van-popup
      v-model="gendershow"
      position="bottom"
      :style="{ height: '30%', width: '100%' }"
    >
      <van-action-sheet
        v-model="gendershow"
        :actions="actions"
        @select="onSelect"
        close-on-click-action
      />
    </van-popup>
    <!-- 生日 -->
    <van-popup
      v-model="birthdayshow"
      position="bottom"
      :style="{ height: '30%', width: '100%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { getprofile, photo, pachuser } from '@/api/userinfo/profile'
export default {
  data () {
    return {
      data: '',
      actions: [
        { name: '男', sex: 0 },
        { name: '女', sex: 1 }
      ],
      userinfo: {},
      // 头像弹出
      avatershow: false,
      // 昵称弹出
      nameshow: false,
      // 介绍弹出
      introshow: false,
      // 性别弹出
      gendershow: false,
      // 生日弹出
      birthdayshow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  created () {
    this.runder()
    // console.log(this.data)
  },

  methods: {
    // 返回
    onClickLeft () {
      this.$router.go(-1)
    },
    // 保存
    async  onClickRight () {
      const pach = await pachuser(this.data)
      console.log(pach)
    },
    onSelect (item) {
      console.log(this.currentDate)
      this.gendershow = false
      this.data.gender = item.sex
    },
    // 时间选择完成
    confirm (v) {
    //   const date = ''
    //   console.log(v)
      const date = new Date(v)
      const y = date.getFullYear()
      const d = date.getMonth()
      const r = date.getDate()
      this.data.birthday = `${y}-${d + 1}-${r}`
    },
    // 文件上传
    async afterRead (file) {
      console.log(file)
      const fomdata = new FormData()
      fomdata.append('photo', file.file)
      const path = await photo(fomdata)
      if (path.status === 200) {
        this.avatershow = false
        this.runder()
      }
      //
      console.log(path)
    },
    async runder () {
      const res = await getprofile()
      this.data = res.data.data
      this.userinfo = this.data
    }
  }

}
</script>

<style>
.text {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
