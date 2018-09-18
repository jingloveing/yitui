import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getSessionId } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: "http://192.168.0.147:8091", // 本地的接口域名
  baseURL: 'http://www.yituizhineng.top:8091', // 线上的接口域名
  // baseURL: 'http://106.14.3.202:8091', // 测试的接口域名
})
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // const res = response.data
    // if(res.data.code && res.data.code == 500){
    //   Message({
    //     message: res.data.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject('error')
    // } else {
    //   console.log(res)
    //   return res
    // }
    return response.data
  },
  error => {
    console.log(error)
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
