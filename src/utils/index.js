/**
 * 通用工具类
 */
const _utils = {
  /**
    * 格式化日期
    * @param {*} date
    * @param {*} fmt
    */
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const k in o) {
      const str = o[k] + ''
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        )
      }
    }
    return fmt
  },
  /**
 * @description: 获取问候语
 * @param {type}
 * @return {String}
 * @author: ztr
 * @example: getWelcomeText()
 */
  getWelcomeText() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9
      ? '早上好'
      : hour <= 11
        ? '上午好'
        : hour <= 13
          ? '中午好'
          : hour < 20
            ? '下午好'
            : '晚上好'
  },

  /**
   * @description: 节流 按一定的频率触发函数
   * @param {Function} fn
   * @param {Number} time
   * @return {function}
   * @author: ztr
   * @example: throttle(fn, 2000)()
   */
  throttle(fn, time = 1500) {
    let _lastTime = null
    return function() {
      const _nowTime = +new Date()
      if (_nowTime - _lastTime > time || !_lastTime) {
        fn.apply(this, arguments)
        _lastTime = _nowTime
      }
    }
  },
  /**
   * @description: 去抖 一段时间后触发函数
   * @author: ztr
   * @param  {Number} time 空闲时间，单位毫秒
   * @param  {Function} fn 请求关联函数，实际应用需要调用的函数
   * @return {function}    返回客户调用函数
   * @example: debounce(fn, 200)()
   */
  debounce(fn, time = 300) {
    let last = null
    return function() {
      const ctx = this
      const args = arguments
      console.log('debounce :>> ', last)
      clearTimeout(last)
      last = setTimeout(function() {
        fn.apply(ctx, args)
      }, time)
    }
  }
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export default _utils
