
import { createApp } from 'vue'

import Dialog from './MyDialog.vue'

Dialog.newInstance = (properties) => {
  const props = properties || Dialog.props
  console.log(props, 'sssssss')
  console.log('Dialog 组件：', Dialog)
  const app = createApp(Dialog, {
    ...props,
    close: () => {
      app.unmount(root)
      document.body.removeChild(root)
    }
  })
  const root = document.createElement('div')
  document.body.appendChild(root)
  app.mount(root)
  console.log('子组件app', app)
}

// 提示单例
// let messageInstance
// function getMessageInstance() {
//   messageInstance = messageInstance || Dialog.newInstance()
//   return messageInstance
// }
// function notice() {
//   // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
//   const instance = getMessageInstance()
//   console.log('getMessageInstance', instance)
//   instance.open()
// }

// 对外暴露的方法
export default Dialog.newInstance
