import axios from 'axios'
import { Message } from 'element-ui'

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '', 
  timeout: 5000 
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    
    if (res.code !== 200) {
      Message({
        message: res.msg || '错误',
        type: 'error',
      })

      if (res.code === 401) {

      }
      return Promise.reject(new Error(res.msg || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message || '请求失败',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default request 