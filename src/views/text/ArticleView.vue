<template>
  <div>
    <van-nav-bar
      :title="data.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="markdown-body">
      <h2>{{ data.title }}</h2>
      <van-sticky z-index>
        <van-cell value="内容">
          <div slot="title" class="tirle">
            <van-image width="30" height="30" :src="data.aut_photo" />
            <div>
              <div>{{ data.aut_name }}</div>
              <div>{{ data.pubdate }}年前</div>
            </div>
          </div>
          <div slot="default">
            <van-button
              type="info"
              v-if="data.is_followed"
              @click="delfllow(data.aut_id)"
              >已经关注</van-button
            >
            <van-button
              type="info"
              icon="plus"
              v-else
              @click="followuser(data.aut_id)"
            >
              关注</van-button
            >
          </div>
        </van-cell>
      </van-sticky>
      <div v-html="data.content"></div>
      <div class="btn">
        <van-button
          plain
          hairline
          round
          icon="like-o"
          :class="{ active: isactive }"
          @click="like"
        >
          点赞</van-button
        >
        <van-button
          plain
          hairline
          round
          icon="delete-o"
          :class="{ active: isactivelike }"
          @click="islike"
          >不喜欢</van-button
        >
      </div>
      <div>猜你喜欢</div>
      <!-- 文章评论 -->
      <van-cell v-for="(item, i) in rescommetss" :key="i">
        <div slot="title" class="titlle">
          <van-image width="30" height="30" :src="item.aut_photo" />
          <div>
            <div>{{ item.aut_name }}</div>
            <p>{{ item.content }}</p>
            <div>
              {{ item.pubdate }}小时前
              <span class="huifu" @click="isshow(item.com_id)"
                >回复{{ item.reply_count }}</span
              >
              <!-- 弹出回复层 -->
              <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '80%' }"
              >
                <!-- 回复 -->
                <van-cell v-for="(item, i) in comment.results" :key="i">
                  <van-image width="30" height="30" :src="item.aut_photo" />
                  <div>{{ item.aut_name }}</div>
                  <p>{{ item.content }}</p>
                  <div slot="extra">
                    <van-icon
                      name="like-o"
                      :class="{ someactive: item.is_liking }"
                      @click="clicklike(item.com_id, item.is_liking)"
                    />
                    <span>{{ item.like_count }}</span>
                  </div>
                </van-cell>
                <div>
                  <!-- 回复评论在弹出层 -->
                  <van-field
                    v-model="value"
                    placeholder="请输入评论"
                    @keyup.enter="putinput(lastid)"
                  >
                    <div slot="extra">
                      <van-badge :content="rescommetss.reply_count">
                        <van-icon name="comment-o" />
                      </van-badge></div
                  ></van-field>
                </div>
              </van-popup>
            </div>
          </div>
        </div>
        <div slot="extra">
          <van-icon
            name="like-o"
            :class="{ someactive: item.is_liking }"
            @click="clicklike(item.com_id,item.is_liking)"
          />
          <span>{{ item.like_count }}</span>
        </div>
      </van-cell>
      <!-- 评论 -->
      <div>
        <van-sticky>
          <van-field
            v-model="value"
            placeholder="请输入评论"
            @keyup.enter="putinput($route.query.id)"
          >
            <div slot="extra">
              <van-badge :content="rescommetss.reply_count">
                <van-icon name="comment-o" />
              </van-badge>
              <van-icon name="star-o"  @click="collection" :class="{'star':data.is_collected}"/><van-icon name="share-o" /></div
          ></van-field>
        </van-sticky>
      </div>
    </div>
  </div>
</template>

<script>
import {
  gettext,
  likes,
  notlike,
  notliks,
  nonotliks,
  getcomments,
  postinput,
  follow,
  deletefollow,
  iscommentlike,
  deletelike,
  postcollections,
  deletecollections
} from '@/api/textinfo/textinfo'
export default {
  mounted () {},
  created () {
    this.runder()
  },
  data () {
    return {
      data: {},
      container: null,
      value: '',
      // 是否点击
      isactive: false,
      // 是否喜欢
      isactivelike: false,
      // 对文章的评论
      rescommetss: [],
      // 控制弹出层的显示
      show: false,
      // 评论id
      lastid: '',
      comment: {}
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 点击点赞
    async like () {
      if (this.isactive) {
        const notlink = await notlike(this.$route.query.id)
        notlink.status === 204
          ? (this.isactive = false)
          : console.log('取消失败')
      } else {
        const reslike = await likes(this.$route.query.id)
        reslike.status === 201
          ? (this.isactive = true)
          : console.log('点赞失败')
      }
      this.runder()
    },
    // 点击喜欢
    async islike () {
      if (this.isactivelike) {
        const noenollike = await nonotliks(this.$route.query.id)
        noenollike.status === 204
          ? (this.isactivelike = false)
          : console.log('nolike')
      } else {
        const activelike = await notliks(this.$route.query.id)
        activelike.status === 201
          ? (this.isactivelike = true)
          : console.log('nolike')
      }
      this.runder()
    },
    // 对文章进行评论
    async putinput (id) {
      const resinput = await postinput({
        target: id,
        content: this.value,
        art_id: this.$route.query.id
      })
      if (resinput.status === 201) {
        this.value = ''
        this.runder()
        this.show = false
      }
    },
    // 渲染函数
    async runder () {
      const res = await gettext(this.$route.query.id)
      this.data = res.data.data
      // console.log(res),
      // 获取评论
      const rescommets = await getcomments('a', this.$route.query.id)
      this.lastid = rescommets.data.data.last_id

      this.rescommetss = rescommets.data.data.results
    },
    // 用户关注

    async followuser (id) {
      const resfllow = await follow(id)
      if (resfllow.status === 201) {
        alert('关注成功')
        this.runder()
      }
    },
    // 取消关注
    async delfllow (id) {
      const resdelfllow = await deletefollow(id)
      if (resdelfllow.status === 204) {
        this.runder()
      }
    },
    async isshow (id) {
      this.show = true
      const comment = await getcomments('c', id)
      this.comment = comment.data.data
      this.lastid = id
    },
    // 爱心
    async clicklike (id, islike) {
      console.log(islike)
      if (islike) {
        // 取消请求
        const lelect = await deletelike(id)
        lelect.status === 204 ? this.runder() : console.log()
        this.show = false
      } else {
        const reslinke = await iscommentlike(id)
        reslinke.status === 201 ? this.runder() : console.log()
        this.show = false
      }
    },
    // 收藏
    async collection () {
      if (!this.data.is_collected) {
        await postcollections(this.$route.query.id)
        this.runder()
      } else {
        console.log(2323)
        // 取消收藏
        await deletecollections(this.$route.query.id)
        this.runder()
      }
    }

  }
}
</script>

<style>
@import "@/assets/artical.css";

.tirle .titlle {
  display: flex;
}
.huifu {
  background: rgb(239, 247, 248);
  border-radius: 15%;
  font-size: 16px;
}
.btn {
  display: flex;
  justify-content: center;
}
.active {
  background: red;
  color: #fff;
}
.someactive {
  background: red;
  color: #fff;
}
.star{
  color: orange;

}
</style>
