import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引用全局公共样式
import './assets/less/index.less'
// 引入移动端rem适配函数
import './plugins/rem'
// 挂载
createApp(App).use(router).mount('#app')
