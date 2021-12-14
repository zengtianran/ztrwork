<template>
    <div class="vuex">
        <div class="store-demo">{{count}}--22=={{$store.state.count}}</div>
      <!-- <div v-for="(item, i) in vuexList" :key="i" class="vuex-demo">
          {{item.id}}:{{item.name}}
      </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      vuexList: []
    }
  },
  computed: {
    ...mapState({
      count: 'count'
    })
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.vuexList.push({
        id: i,
        name: `VUEX-${i}`
      })
    }
    // test
    this.tPromise()
  },
  methods: {
    tPromise() {
      const p1 = new Promise((resolve, reject) => {
        resolve('成功了')
      })

      const p2 = new Promise((resolve, reject) => {
        resolve('success')
      })

      const p3 = Promise.reject('失败')

      Promise.all([p1, p2]).then((result) => {
        console.log(result) // ['成功了', 'success']
      }).catch((error) => {
        console.log(error)
      })

      Promise.all([p1, p3, p2]).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error) // 失败了，打出 '失败'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.vuex{
    padding-left: 30px;
}
</style>
