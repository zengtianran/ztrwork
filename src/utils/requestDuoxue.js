
import axios from 'axios'
import config from './config'
class Http {
  constructor() {
    this.baseUrl = config.base
    this.timeout = config.requestTimeout
    this.queue = []
  }
  // 合并配置参数
  mergeOptions(options) {
    return {
      baseUrl: this.baseURL,
      timeout: this.timeout,
      ...options
    }
  }
  setInterceptor(instance) {
    // 配置请求参数拦截
    instance.interceptors.request.use((config) => {
      // const timestamp = +new Date() + ''
      // if (config.method === 'post') {
      //     config.data['timestamp'] = timestamp
      // }
      // if (config.method === 'get') {
      //     config.params['timestamp'] = timestamp
      // }
      // TODO 设置变量请求头
      config.headers['authorization'] = 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiLnlKjmiLflkI0iLCJ0eXBlIjoiU0VOSU9SIiwidmVyc2lvbiI6IkVOVEVSUFJJU0UiLCJhdXRob3JpdGllcyI6WyIxMzU2MTg4NjA2ODUwNzE1NjUwX-aZrumAmuWRmOW3pSJdLCJjbGllbnRfaWQiOiIxMzU2MTQ2MzM5MjEzNTI0OTkyIiwiZXhwaXJlZCI6ZmFsc2UsInNjb3BlIjpbIm9wZW4iXSwiaWQiOjEzNTYxOTY0NzQ4MjM5NTAzMzYsImNvbXBuYW1lIjoi56aP5bu655yB5Y2O5riU5pWZ6IKy56eR5oqA5pyJ6ZmQ5YWs5Y-4IiwiZXhwIjozNzU5NjY0MDAxLCJkaWQiOjEzNTYxODg2MDY2ODcxMzc3OTIsImp0aSI6ImE5Y2UzYTQxLWJiMGQtNGNkYi1iN2E1LWMxYmEyMzU3NjM4OSIsImNpZCI6MTM1NjE4ODYwNjY4NzEzNzc5Mn0.h-nY_rf9QOokRCBeM0hvnEgLPBracb4elIit7_LM-vwMqzqcKsHp8PHfI5UjGotK4o9eMKSeepjilCEhO2HKG8Bp73AlEwUxa-xmFYGgfNFbNoGyVfRnI68RDNBmpRGasV4yNjA5BW9LiLNtoj0auUSnutlcJ1zVWU0L4RajlL-HY_3xpD0KMUwVNQIjkiSDH-dgsYG6TB5USbdPakfrI-kRhsWi6LTeL0-Uj-vhv93-HJxriXVs-33TJQZdpN5bJxknsiHVKumjAzYlWEtydztAZ7GvrVAtl3Af0lv1g7Sy1WUOWMVf3XQDKIczYtPMcCb6lKEWy7lGzWN6Dc3gSA'
      return config
    }, (err) => {
      return Promise.reject(err)
    })
    // 配置响应参数拦截
    instance.interceptors.response.use((response) => {
      // axios默认请求判断状态
      if (response.status === 200) {
        if (typeof response.data === 'string') {
          return Promise.resolve(response.data)
        }
        // 成功过滤处理，返回数据对象，属性信息走配置文件的配置
        if (response.data['data'].errCode > 0) {
          // 请求出错，统一处理
          return Promise.reject(response.data['data'])
        } else {
          try {
            return Promise.resolve(response.data['data'])
          } catch (error) {
            return Promise.reject(error)
          }
        }
      } else {
        return Promise.reject(response.data['data'])
      }
    }, (error) => {
      if (error.response) {
        // 处理错误状态码
        switch (error.response.status) {
          case 401:
            break
          default:
            break
        }
      }
      return Promise.reject(error)
    })
  }
  request(options) {
    const ops = this.mergeOptions(options)
    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout
    })
    // 设置拦截器
    this.setInterceptor(axiosInstance)
    return axiosInstance(ops)
  }
  post({
    url = config.url,
    method = 'POST',
    data = {},
    configs = {}
  }) {
    return this.request({
      url,
      method,
      data,
      ...configs
    })
  }
  get({
    url = config.url,
    method = 'GET',
    configs = {}
  }) {
    return this.request({
      url,
      method,
      ...configs
    })
  }
}
// 导出实例
export default new Http()
