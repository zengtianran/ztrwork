<template>
    <div>
        <h2 class="g-promise">promise测试</h2>
    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  created() {
    console.log('created----->promise')
  },
  mounted() {
    Toast('promise test')
    console.log('mounted----->promise')
  }
}
</script>

<style lang="less" scoped>

</style>
