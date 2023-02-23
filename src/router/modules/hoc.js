
import rightHoc from '../../views/hoc/right-hoc'
import hocComp1 from '@/views/hoc/index3.vue'
import hocComp2 from '@/views/hoc/index4.vue'
// 高阶组件
const routes = [
  {
    path: '/hoc1',
    name: 'hoc1',
    component: rightHoc(hocComp1, 'RIGHT_PAGE_1'),
    meta: {
      title: '',
      keepalive: false
    }
  },
  {
    path: '/hoc2',
    name: 'hoc2',
    component: rightHoc(hocComp2, 'RIGHT_PAGE_6'),
    meta: {
      title: '',
      keepalive: false
    }
  },
  {
    path: '/hoc3',
    name: 'hoc3',
    component: () => import('@/views/hoc/index.vue'),
    meta: {
      title: '',
      keepalive: false
    }
  }
]

export default routes
