
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
      return config
    }, (err) => {
      return Promise.reject(err)
    })
    // 配置响应参数拦截
    instance.interceptors.response.use((response) => {
      // axios默认请求判断状态
      if (response.status === 200) {
        // 成功过滤处理，返回数据对象，属性信息走配置文件的配置
        if (!config.responseConfig.isOK(response.data) || config.responseConfig.errorCodes.indexOf(response.data[config.responseConfig['code']]) >= 0) {
          // 请求出错，统一处理
          return Promise.reject(response.data[config.responseConfig.data])
        } else {
          try {
            return Promise.resolve(response.data[config.responseConfig.data])
          } catch (error) {
            return Promise.reject(error)
          }
        }
      } else {
        return Promise.reject(response.data[config.responseConfig.data])
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
      return Promise.reject(error.response.data)
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
