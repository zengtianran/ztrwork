<template>
<div>
    <div class="home-list-menu">
       <div class="list-menu" v-for="(item) in menus" :key="item.id" :style="{width: `${100 / columns}%`}">
          <ListMenuItem :activeId="activeId" :menuItem="item" @active="$emit('active', {itemId: item.id, itemPath: item.path})" />
       </div>
    </div>
    <div class="collapse" @click="isExpand = !isExpand">
           <span>{{expandTxt}}</span>
           <Icon :type="iconType" extraClass="icon" />
    </div>
</div>
</template>

<script>
import ListMenuItem from './listMenuItem'
import Icon from '../Icon'
export default {
  name: 'ListMenu',
  props: {
    activeId: {
      type: String,
      default: ''
    },
    columns: {
      type: Number,
      default: 2
    },
    menus: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      isExpand: true
    }
  },
  computed: {
    expandTxt() {
      return this.isExpand ? '折叠' : '展开'
    },
    iconType() {
      return this.isExpand ? 'arrowUp' : 'arrowDown'
    }
  },
  components: {
    ListMenuItem,
    Icon
  }
}
</script>

<style lang="less" scoped>
.home-list-menu{
  overflow: hidden;
}
.list-menu{
    float: left;
}
.collapse{
  text-align: center;
  height: 54px;
  line-height: 54px;
  color: @orange;
}
.icon{
  font-size: 12px;
  margin-left: 6px;
}
</style>
