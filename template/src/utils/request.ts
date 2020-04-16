import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { message } from 'antd'
import qs from 'qs'
import * as NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let baseUrl

location.href.includes('test.hello.com')
  ? (baseUrl = 'https://test-api.hello.com/')
  : location.href.includes('pre.hello.com')
  ? (baseUrl = 'https://pre-api.hello.com/')
  : location.href.includes('localhost') || location.href.includes('0.0.0.0')
  ? (baseUrl = 'http://dev-api.hello.com/')
  : (baseUrl = 'https://api.hello.com/')

const service = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 5000,
  maxContentLength: Infinity,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start()

    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = localStorage.getItem('token')
    }
    if (config.method === 'get') {
      if (config.method === 'get') {
        // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        config.paramsSerializer = (params: any) => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }
    }
    return config
  },
  (err: AxiosError) => {
    console.log(err)
    NProgress.done()
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    NProgress.done()

    if (res.data && res.data.errors) {
      message.warning(res.data.errors || '网络异常，请稍后重试')
      return Promise.reject(new Error(res.data.errors || '网络异常，请稍后重试'))
    }

    return res.data || res
  },
  (error: AxiosError) => {
    NProgress.done()

    if (error.response) {
      if (error.response.status === 401) {
        if (!location.href.includes('login')) {
          message.error('您的身份信息已过期，请重新登录')
          localStorage.removeItem('token')
          location.href = `/login`
        }
      } else if (error.response.status === 403) {
        message.error('您没有权限访问该系统')
      } else {
        message.error(error.response.data.msg || error.response.data.error || '网络异常，请稍后重试')
      }
    } else {
      message.error(error.message || '网络异常，请稍后重试')
    }

    console.log('err' + error)

    return Promise.reject(error)
  }
)

export default service
