import axios from '../utils/requist'
export const postuser = (obj) => axios.post('/v1_0/authorizations', obj)
