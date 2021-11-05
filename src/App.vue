<template>
  <div class="app-wrap">
    <router-view />
  </div>
</template>

<script>
// import Utils from './utils/index'
export default {
  name: 'App',
  components: {

  },
  created() {
    // console.log('created----->app')
    // setTimeout(() => {
    //   console.log('created---timeout-->app')
    // }, 1000)
  },
  mounted() {
    // console.log('mounted----->app')
    // function test1() {
    //   console.log('log----->test1')
    //   console.log(this.formatDate(new Date(), 'yyyy-MM-dd'))
    // }
    // test1.call(Utils)
    // console.log(Utils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))
  }
}
</script>

<style lang="less">

</style>
