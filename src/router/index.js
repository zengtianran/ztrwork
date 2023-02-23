import { createRouter, createWebHashHistory } from 'vue-router'
// 菜单相关路由
import menu from './modules/menu'
import other from './modules/other'
import hoc from './modules/hoc'
// 拆出路由模块化引入
const routes = [
  ...menu,
  ...other,
  ...hoc
]
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})
export default router
