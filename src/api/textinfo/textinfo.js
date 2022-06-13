import axios from '@/utils/requist'
export const gettext = (id) => axios.get(`/v1_0/articles/${id}`)
// 对文章点赞
// http://toutiao.itheima.net/v1_0/article/likings
export const likes = (id) => axios.post('/v1_0/article/likings', { target: id })

// http://toutiao.itheima.net/v1_0/article/likings/:target
// 取消对文章的点赞
export const notlike = (id) => axios.delete(`/v1_0/article/likings/${id}`)
// 举报文章
// http://toutiao.itheima.net/app/v1_0/article/reports
export const reports = (obj) => axios.post('/app/v1_0/article/reports', obj)
// 对文章不喜欢
// http://toutiao.itheima.net/v1_0/article/dislikes
export const notliks = (id) => axios.post('/v1_0/article/dislikes', { target: id })
// 取消对文章的不喜欢
// http://toutiao.itheima.net/v1_0/article/dislikes/:target
export const nonotliks = (id) => axios.delete(`/v1_0/article/dislikes/${id}`)
// 获取评论或评论回复
// http://toutiao.itheima.net/v1_0/comments
export const getcomments = (type, id) => axios.get('/v1_0/comments', { params: { type: type, source: id } })
// 对文章进行评论
// http://toutiao.itheima.net/v1_0/comments
export const postinput = (obj) => axios.post('/v1_0/comments', obj)
// 关注用户
// http://toutiao.itheima.net/v1_0/user/followings
export const follow = (id) => axios.post('/v1_0/user/followings', { target: id })
// 取消关注
// http://toutiao.itheima.net/v1_0/user/followings/:target
export const deletefollow = (id) => axios.delete(`v1_0/user/followings/${id}`)
// 对评论的回复
// 对评论点赞
// http://toutiao.itheima.net/v1_0/comment/likings
export const iscommentlike = (id) => axios.post('/v1_0/comment/likings', { target: id })
// 取消点赞
// http://toutiao.itheima.net/v1_0/comment/likings/:target
export const deletelike = (id) => axios.delete(`/v1_0/comment/likings/${id}`)
// 收藏文章
// http://toutiao.itheima.net/v1_0/article/collections
export const postcollections = (id) => axios.post('/v1_0/article/collections', { target: id })
// 取消收藏
// http://toutiao.itheima.net/v1_0/article/collections/:target
export const deletecollections = (id) => axios.delete(`/v1_0/article/collections/${id}`)
