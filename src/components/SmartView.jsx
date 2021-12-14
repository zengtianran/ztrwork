
// functional: true, // 声明函数式
import { h } from 'vue'

// 文本组件
const textOptions = {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render() {
    console.log('textOptions :>> ', this.data)
    return h('div', [h('p', '文本组件'), h('p', this.data.content)])
  }
}
// 图片组件
const imgOptions = {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render() {
    return h('div', [
      h('p', '图片组件'),
      h('img', {
        src: this.data.url,
        height: 100,
        weight: 200
      })
    ])
  }
}
// 视频组件
const videoOptions = {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render() {
    return h('div', [
      h('p', '视频组件'),
      h('video', {
        src: this.data.url,
        controls: 'controls',
        autoplay: 'autoplay',
        height: 100,
        weight: 200
      })
    ])
  }
}

export default {
  functional: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render() {
    const _data = this.data
    function get() {
      switch (_data.type) {
        case 'text':
          return textOptions
        case 'img':
          return imgOptions
        case 'video':
          return videoOptions
        default:
          break
      }
    }
    return h(get(), {
      data: this.data
    }, undefined)
  }
}
