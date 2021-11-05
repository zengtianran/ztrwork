<template>
  <div>
    <div class="home-list-menu">
      <div
        class="list-menu"
        v-for="item in menus"
        :key="item.id"
        :style="{ width: `${100 / columns}%` }"
      >
        <VedioItem
          :activeId="activeId"
          :class="exClass"
          :menuItem="item"
          @active="
            $emit('active', {
              item: item,
              itemId: item.id,
              itemPath: item.path
            })
          "
        />
        <template v-if="item.children && item.children.length">
          <div class="sub-inner" v-for="(subItem) in item.children" :key="subItem.id">
            <VedioItem
              :activeId="activeId"
              :menuItem="subItem"
              exClass= 'list-menu-item--sub'
              @active="
                $emit('active', {
                  item: subItem,
                  itemId: subItem.id,
                  itemPath: subItem.path
                })
              "
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import VedioItem from './VedioItem'
import Icon from './Icon'
export default {
  name: 'VedioList',
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
      default: () => []
    },
    exClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isExpand: true
    }
  },
  computed: {},
  components: {
    VedioItem,
    Icon
  }
}
</script>

<style lang="less" scoped>
.home-list-menu {
  overflow: hidden;
}
.list-menu {
  float: left;
}
.collapse {
  text-align: center;
  height: 54px;
  line-height: 54px;
  color: @orange;
}
.icon {
  font-size: 12px;
  margin-left: 6px;
}
.sub-inner{
  padding-left: 40px;
}
.list-menu-item--sub{
  color: red;
}
</style>
