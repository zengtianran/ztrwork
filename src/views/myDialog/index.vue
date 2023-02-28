<template>
  <div class="wrap">
    <div class="test-btn" @click="openDialog">打开弹窗</div>
    <!-- <my-dialog v-model:visible="isShow" :onConfirm="onConfirm"></my-dialog> -->
  </div>
</template>

<script>
// import MyDialog from './MyDialog.vue'
import dialog from './dialog'
export default {
  components: {
    // MyDialog
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
  },
  methods: {
    openDialog() {
      // this.isShow = true
      // console.log(this.isShow, '父组件openMask')
      dialog({
        visible: true
      })
    },
    onConfirm() {
      console.log('确认')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
    padding: 40px;
}
.test-btn {
  display: inline-block;
  height: 80px;
  line-height: 80px;
  padding: 0 28px;
  border-radius: 8px;
  margin-right: 24px;
  cursor: pointer;
  color: #ffffff;
  background: #509ee3;
  &:hover {
    background: #6fb0eb;
  }
}
</style>
