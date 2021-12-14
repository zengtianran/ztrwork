import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// 引用全局公共样式
import './assets/less/index.less'
// 引入移动端rem适配函数
import './plugins/rem'
// 挂载
const app = createApp(App)
// 函数式组件
app.component('smart-component', {
  functional: true,
  props: {

  },
  render() {
    return h('h1', null, 'smart-component')
  }
})
app.use(router).use(store).mount('#app')
