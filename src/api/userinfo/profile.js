
import axios from '@/utils/requist'
// 获取用户个人资料
export const getprofile = () => axios.get('/v1_0/user/profile')
// 上传头像

export const photo = (fromdata) => axios.patch('/v1_0/user/photo', fromdata)
// 上传其他数据

export const pachuser = (data) => axios.patch('v1_0/user/profile', data)
// 历史
export const getcllections = () => axios.get('/v1_0/article/collections')

export const getshare = () => axios.get('/v1_0/user/histories')
// 收藏
