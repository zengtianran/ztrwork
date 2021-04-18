<template>
    <i class="iconfont" :class="[iconClass, extraClass]"></i>
</template>
<script>
const classMap = {
  arrowRight: 'iconiconfontjiantou2',
  arrowLeft: '',
  arrowDown: 'iconxiajiantou_huaban',
  arrowUp: 'iconshangjiantou',
  search: 'iconsousuo'
}
export default {
  props: {
    type: {
      type: String,
      require: true
    },
    extraClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconClass() {
      return classMap[this.type]
    }
  }
}
</script>
<style lang="less" scoped>
// 导入iconfont样式文件
@import '//at.alicdn.com/t/font_2479698_zubyoepsiq.css';
</style>
