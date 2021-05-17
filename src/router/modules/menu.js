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
  }, {
    path: '/promise',
    name: 'Promise',
    component: () => import('@/views/Promise'),
    meta: {
      title: 'Promise'
    }
  }, {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('@/views/EchartsMap'),
    meta: {
      title: 'Echarts'
    }
  }
]
export default routes
