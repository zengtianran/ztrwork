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
  }, {
    path: '/video',
    name: 'DuoxueVideo',
    component: () => import('@/views/DuoxueVideo'),
    meta: {
      title: 'DuoxueVideo'
    }
  }, {
    path: '/executeComponent',
    name: 'executeComponent',
    component: () => import('@/views/ExecuteComponent'),
    meta: {
      title: 'executeComponent'
    }
  }, {
    path: '/vuexDemo',
    name: 'vuexDemo',
    component: () => import('@/views/VuexDemo'),
    meta: {
      title: 'vuexDemo'
    }
  }, {
    path: '/functional',
    name: 'functional',
    component: () => import('@/views/Functional'),
    meta: {
      title: 'functional'
    }
  }
]
export default routes
