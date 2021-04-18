<template>
    <div class="top-search-wrap">
      <form class="search-inner" @submit="handleSearch">
       <div class="search-inp">
            <Input type="text" v-model:value="inpVal" placeholder="请输入关键字" />
       </div>
       <div class="search-icon" @click="handleSearch">
            <Icon type="search" extraClass="search" />
       </div>
      </form>
    </div>
</template>

<script>
import Input from '../Input'
import Icon from '../Icon'
export default {
  props: {

  },
  components: {
    Input,
    Icon
  },
  data() {
    return {
      inpVal: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.inpVal)
    }
  }
}
</script>

<style lang="less" scoped>
.top-search-wrap{
    padding: 14px;
    .search-inner{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
        border: 1px solid @border-color;
        border-radius: 5px;
    }
    .search-inp{
       flex: 1;
    }
    .search-icon{
        padding-left: 20px;
        padding-right: 20px;
      .search{
          font-size: 42px;
          color: @text-color;
      }
    }
}
</style>
