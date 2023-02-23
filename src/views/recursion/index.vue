<template>
  <div class="recursion-container">
    <div class="recursion-list">
        <recursion :data="list"></recursion>
    </div>
    <ul class="dom-tree">
      <li>
        海贼王
        <ul>
          <li>白胡子</li>
          <li>
            卡普
            <ul>
              <li>风龙
                <ul>
                <li>路飞</li>
                <li>艾斯</li>
              </ul>
              </li>
              <li>萨博</li>
            </ul>
          </li>
          <li>红发</li>
        </ul>
      </li>
      <li>火影忍者</li>
  </ul>
  </div>
</template>

<script>
import Recursion from './components/recursion.vue'
export default {
  name: 'RecursionIndex',
  components: {
    Recursion
  },
  data() {
    return {
      colors: ['#ddd', '#ee8686', '#5c72e1', '#ee28f5', '#4dd792'],
      list: []
    }
  },
  mounted() {
    this.list = [
      {
        name: '海贼王',
        children: [
          {
            name: '卡普',
            children: [
              {
                name: '风龙',
                children: [
                  {
                    name: '路飞'
                  },
                  {
                    name: '艾斯'
                  }
                ]
              },
              {
                name: '萨博'
              }
            ]
          },
          {
            name: '白胡子'
          },
          {
            name: '红发'
          }
        ]
      },
      {
        name: '火影忍者'
      }
    ]
  }
}
</script>

<style lang="less" scoped>
.recursion-container {
  background: #f5f5f5;
  padding: 10px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  .recursion-list {
    .recursion-item {
      padding: 10px;
      > header {
        font-size: 26px;
        font-weight: 700;
      }
      .sub-title {
        font-size: 24px;
      }
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
}

ul {
    &.dom-tree {
        margin: 0;
        padding: 0 0 0 2em;
        ul{
            margin: 0;
            padding: 0 0 0 2em;
        }
        li{
            list-style: none;
            position: relative;
            font-size: 28px;
            &:before{
                content: "";
                position: absolute;
                top: -0.1em;
                left: -0.5em;
                width: 0.4em;
                height: 0.615em;
                border-style: none none solid solid;
                border-width: 0.05em;
            }
            &:not(:last-child):after{
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
