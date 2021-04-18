<template>
    <div class="title-menu">
        <Item :isActive="isActive" @active="$emit('active')">
            <div class="inner">
                <div class="left">
                    <slot name="title"></slot>
                </div>
                <div class="right">
                    <slot name="icon"></slot>
                </div>
            </div>
        </Item>
    </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'TitleMune',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Item
  }
}
</script>

<style lang="less" scoped>
.title-menu{
    overflow: hidden;
    background: @grey-light;
    width: 100%;
    height: 92px;
    line-height: 92px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    border-bottom: 1px @grey solid;
    margin-bottom: 20px;
    .left{
       float: left;
       font-size: @font-size-md;
    }
    .right{
       float:right;
       font-size: @font-size-md;
    }
}
</style>
