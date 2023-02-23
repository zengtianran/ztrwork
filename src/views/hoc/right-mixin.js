
// 是否有权限

const rightList = ['0', 'RIGHT_PAGE_1', 'RIGHT_PAGE_2']

export default rightType => (
  {
    computed: {
      hasRight() {
        return rightList.indexOf(rightType)
      }
    }
  }
)
