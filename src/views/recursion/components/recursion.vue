<template>
  <div>
    <ul class="dom-tree">
      <li v-for="(item, index) in data" :key="index">
        {{ item.name }}
        <recursion :data="item.children"></recursion>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Recursion',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  &.dom-tree {
    margin: 0;
    padding: 0 0 0 2em;
    ul {
      margin: 0;
      padding: 0 0 0 2em;
    }
    li {
      list-style: none;
      position: relative;
      font-size: 28px;
      &:before {
        content: "";
        position: absolute;
        top: -0.1em;
        left: -0.5em;
        width: 0.4em;
        height: 0.615em;
        border-style: none none solid solid;
        border-width: 0.05em;
      }
      &:not(:last-child):after {
        content: "";
        position: absolute;
        top: 0;
        left: -0.5em;
        bottom: 0;
        border-style: none none none solid;
        border-width: 0.05em;
      }
    }
  }
}
</style>
