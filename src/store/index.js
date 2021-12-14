import { createStore } from 'vuex'

// 创建store实例
const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

export default store
