import axios from '../utils/requist'
export const gettimemap = (poms) => axios.get('/v1_0/articles', { params: poms })
// 获取用户频道
export const getchanels = () => axios.get('/v1_0/user/channels')
// 获取所有频道
export const getchanelsAll = () => axios.get('/v1_0/channels')
// 修改频道
export const putchannels = (obj) => axios.put('/v1_0/user/channels', obj)
