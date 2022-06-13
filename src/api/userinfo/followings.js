
import axios from '@/utils/requist'
// 获取关注了列表
export const getfollowings = (page, per) => axios.get('/v1_0/user/followings', { params: { page: page, per_page: per } })
// 关注用户
// /v1_0/user/followings
export const followings = (id) => axios.post('/v1_0/user/followings', { target: id })
// 粉丝列表
export const followers = () => axios.get('/v1_0/user/followers')
