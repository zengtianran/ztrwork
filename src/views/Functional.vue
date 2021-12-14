<template>
    <div>
        <smart-view :data="data"></smart-view>
        <button @click="change('img')">图片组件</button>
        <button @click="change('video')">视频组件</button>
        <button @click="change('text')">文本组件</button>
    </div>
</template>

<script>
// https://i.mtres.cn/banner_video.mp4
import SmartView from '../components/SmartView'
import { reactive } from 'vue'
export default {
  name: 'Functional',
  components: {
    SmartView
  },
  setup() {
    const data = reactive({
      type: 'text',
      content: 'P9999999999'
    })
    const methods = {
      change(type) {
        switch (type) {
          case 'text':
            data.type = 'text'
            data.content = '我是文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本'
            break
          case 'img':
            data.type = 'img'
            data.url = 'http://pic-bucket.ws.126.net/photo/0001/2019-02-07/E7D8PON900AO0001NOS.jpg'
            break
          case 'video':
            data.type = 'video'
            data.url = 'https://i.mtres.cn/banner_video.mp4'
            break
          default:
            console.log('data 类型不合法：' + type)
            break
        }
      }
    }
    return {
      data,
      ...methods
    }
  }
}
</script>

<style lang="less" scoped>

</style>
