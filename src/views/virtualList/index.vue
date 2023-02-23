<template>
  <div class="virtual-container">
    <div
      class="virtual-list"
      ref="container"
      :style="`height:${container.height}px;`"
      @scroll="init"
    >
      <div
        class="virtual-list-inner"
        :style="
          `height: ${item.height * list.length}px; padding-top: ${item.height *
            start_pos}px;`
        "
      >
        <div
          class="virtual-item"
          :style="`height: ${item.height}px;`"
          v-for="item in renderList"
          :key="item"
        >
          <header>标题{{ item }}</header>
          <div class="sub-title">子标题</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['#ddd', '#ee8686', '#5c72e1', '#ee28f5', '#4dd792'],
      list: [],
      // 列表项信息
      item: {
        height: 70
      },
      // 容器信息
      container: {
        height: 600
      },
      start_pos: 0, // 起始显示元素下标
      max_num: 10, // 容器最多显示多少项
      timer: null, // 定时器
      throttle: true // 节流标识
    }
  },
  computed: {
    renderList() {
      const data = this.list.slice(this.start_pos, (this.start_pos + this.max_num))
      return data
    }
  },
  mounted() {
    this.list = new Array(10000).fill('').map((v, i) => i + 1)
  },
  methods: {
    init() {
      if (this.throttle) {
        const { container, item } = this
        this.max_num = Math.ceil(container.height / item.height)
        const scrollTop = this.$refs.container.scrollTop
        // 计算当前第一排下标
        this.start_pos = Math.round(scrollTop / item.height)
        console.log('>>>>>>', this.max_num, this.start_pos)
        this.throttle = false
        this.timer = setTimeout(() => {
          this.throttle = true
          clearTimeout(this.timer)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.virtual-container {
  background: #f5f5f5;
  padding: 10px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  .virtual-list {
    overflow: scroll;
    .virtual-item {
      padding: 10px;
      margin-top: 15px;
      box-shadow: 10px 10px 10px #eee;
      > header {
        font-size: 26px;
        font-weight: 700;
        padding: 10px;
      }
      .sub-title {
        font-size: 24px;
        padding: 10px;
      }
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
}
</style>
