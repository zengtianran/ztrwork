
const routes = [
  {
    path: '/recursion',
    name: 'recursion',
    component: () => import('@/views/recursion/index.vue'),
    meta: {
      title: '',
      keepalive: false
    }
  },
  {
    path: '/virtualList',
    name: 'virtualList',
    component: () => import('@/views/virtualList/index.vue'),
    meta: {
      title: '',
      keepalive: false
    }
  }
]

export default routes
