import axios from '../utils/requist'
// 获取用户信息
export const getuserinfo = () => axios.get('/v1_0/user')

// /v1_0/user/profile
