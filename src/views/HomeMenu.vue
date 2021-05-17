<template>
    <div class="home-menu">
      <Search @search="handleSearch" />
       <TitleMenu :isActive="isSelect" @active="handleActive">
           <template v-slot:title>
              <!-- 给具名插槽传数据 -->
              <span>栏目分类</span>
           </template>
           <template v-slot:icon>
               <Icon type="arrowRight" />
           </template>
       </TitleMenu>
       <ListMenu :activeId="activeId" :menus="menus" :columns="2" @active="handleMenu" />
    </div>
</template>
<script>
import Search from '../components/topSearch/search'
import TitleMenu from '../components/menu/TitleMenu'
import ListMenu from '../components/menu/listMenu'
import menus from '@/assets/json/menuData'
import Icon from '../components/Icon'
export default {
  name: 'HomeMenu',
  components: {
    Search,
    TitleMenu,
    ListMenu,
    Icon
  },
  data() {
    return {
      isSelect: false,
      activeId: '1',
      menus
    }
  },
  mounted() {
    console.log(menus)
  },
  methods: {
    handleActive() {
      this.isSelect = (!this.isSelect)
    },
    handleMenu($event) {
      console.log($event)
      this.activeId = $event.itemId
      if ($event.itemPath) {
        this.$router.push($event.itemPath)
      }
    },
    handleSearch($event) {
      console.log('homeMenu-KeyWord:' + $event)
    }
  }
}
</script>
<style lang="less" scoped>
  .home-menu{
     background: @white;
  }
</style>
