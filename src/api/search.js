import axios from '../utils/requist'
// 获取用户信息
export const getsearch = (obj) => axios.get('/v1_0/search', { params: obj })
// 获取用户阅读历史
export const gethistories = () => axios.get('/v1_0/user/histories')
