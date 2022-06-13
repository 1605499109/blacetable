import io from 'socket.io-client'

export default io('http://toutiao.itheima.net', {
  query: {
    token: localStorage.getItem('token')
  },
  transports: ['websocket']
})
