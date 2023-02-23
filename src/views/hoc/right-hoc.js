
import { h } from 'vue'
import NoRightTips from './noRightTips.vue'

const rightList = ['0', 'RIGHT_PAGE_1', 'RIGHT_PAGE_2']

export default function(CurComponent, rightType) {
  return {
    component: {
      CurComponent,
      NoRightTips
    },
    computed: {
      hasRight() {
        console.log('=========computed hasRight=======', rightType)
        return rightList.indexOf(rightType)
      }
    },
    render() {
      console.log('=========render hasRight=======', this.hasRight)
      return this.hasRight > 0 ? h(CurComponent, {}) : h(NoRightTips, {})
    }
  }
}

