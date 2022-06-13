import axios from '@/utils/requist'
export const work = (page) => axios.get('/v1_0/user/articles', { params: { page: page } })
// 获取粉丝数
export const fans = () => axios.get('/v1_0/user/figure')
// 公告
export const notice = () => axios.get('/v1_0/announcements')
