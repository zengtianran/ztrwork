<template>
  <div class="list-menu-item" :class="exClass">
      <div class="inner">
        <span>{{ menuItem.title }}</span>
        <span style="color:green">ID：{{ menuItem.fileId || '--'}}</span>
        <span style="color:blue">时长：{{ (menuItem.duration/60).toFixed(2) }}分钟</span>
        <!-- <span>{{ menuItem.IV }}</span>
        <span>{{ menuItem.m3u8 }}</span> -->
        <button v-if="!menuItem.children" @click="handleClick">获取秘钥</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'VedioItem',
  props: {
    activeId: {
      type: String,
      default: ''
    },
    menuItem: {
      type: Object,
      default: () => ({})
    },
    exClass: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  methods: {
    handleClick() {
      this.$emit('active')
    }
  }
}
</script>

<style lang="less" scoped>
.list-menu-item {
  font-size: @font-size-md;
  overflow: hidden;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-top: 20px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  span {
    display: inline-block;
    padding-left: 32px;
  }
  button {
    border: none;
    margin-left: 24px;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    font-size: 14px;
    padding: 6px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    -webkit-transition: opacity 0.2s;
    transition: opacity 0.2s;
    -webkit-appearance: none;
    color: #fff;
    background-color: #07c160;
    border: 1px solid #07c160;
  }
}
</style>
