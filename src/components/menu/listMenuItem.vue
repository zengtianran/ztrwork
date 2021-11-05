<template>
    <div class="list-menu-item" :class="exClass">
        <Item :isActive="activeId === menuItem.id" @active="$emit('active')">
            <div class="inner">
                <span>{{menuItem.name}}</span>
            </div>
        </Item>
    </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'ListMenu',
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
    Item
  }
}
</script>

<style lang="less" scoped>
.list-menu-item{
    font-size: @font-size-md;
    overflow: hidden;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
</style>
