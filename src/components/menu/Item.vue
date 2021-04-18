<template>
    <div class="item" :class="{active: isActive}" @click="handleClick">
      <!-- 内容可变用插槽占位 -->
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('active')
    }
  }
}
</script>

<style lang="less" scoped>
    .item{
        overflow: hidden;
        height: 100%;
        width: 100%;
        &.active{
          background: @bg-color-light;
          color: @blue;
        }
    }
</style>
