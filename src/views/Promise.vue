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
    let startX, startY

    document.addEventListener('touchstart', function(e) {
      startX = e.targetTouches[0].pageX
      startY = e.targetTouches[0].pageY
    })

    document.addEventListener('touchmove', function(e) {
      const moveX = e.targetTouches[0].pageX
      const moveY = e.targetTouches[0].pageY

      if ((Math.abs(moveX - startX) > Math.abs(moveY - startY)) && (Math.abs(moveX - startX) > 160)) {
        Toast('stop')
        e.preventDefault()
      }
    }, { passive: false })
  }
}
</script>

<style lang="less" scoped>

</style>
