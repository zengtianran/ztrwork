// 菜单相关路由表
const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'HomeMenu',
    component: () => import('@/views/HomeMenu'),
    meta: {
      title: '首页导航菜单'
    }
  }
]
export default routes
