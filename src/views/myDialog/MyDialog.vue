<template>
  <div class="ztr-dialog" v-show="isShow">
    <div class="ztr-dialog__container">
      <div class="ztr-dialog__title">{{ title }}</div>
      <div class="ztr-dialog__content" v-html="content"></div>
      <div class="ztr-dialog__buttons">
        <div class="danger-btn" @click="cancel">
          {{ cancelText }}
        </div>
        <div class="confirm-btn" @click="confirm">
          {{ confirmText }}
        </div>
      </div>
      <div class="close-btn" @click="close">
        <i class="icon-font icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '内容'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    onConfirm: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  watch: {
    'visible': {
      handler(value) {
        console.log('watch: ' + value)
        this.isShow = value
      },
      immediate: true
    }
  },
  methods: {
    close() {
      this.isShow = false
      this.$emit('update:visible', this.isShow)
    },
    open() {
      this.isShow = true
    },
    cancel() {
      this.close()
      this.onCancel()
    },
    confirm() {
      this.close()
      this.onConfirm()
    }
  }
}
</script>

<style lang="less" scoped>
.ztr-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  &__container {
    width: 500px;
    height: 380px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    position: relative;
    .inp {
      margin: 20px 0 0 40px;
      width: 200px;
      height: 40px;
      padding-left: 4px;
      border-radius: 4px;
      border: none;
      background: #efefef;
      outline: none;
      &:focus {
        border: 1px solid #509ee3;
      }
    }
    .ztr-dialog__buttons {
      width: 100%;
      height: 120px;
      // line-height: 60px;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: right;
      padding: 0 32px;
      box-sizing: border-box;
      & > div {
        display: inline-block;
        height: 80px;
        line-height: 80px;
        padding: 0 28px;
        color: #ffffff;
        background: #f1f1f1;
        border-radius: 8px;
        margin-right: 24px;
        cursor: pointer;
      }
      .default-btn {
        color: #787878;
        &:hover {
          color: #509ee3;
        }
      }
      .danger-btn {
        background: #ef8c8c;
        &:hover {
          background: rgb(224, 135, 135);
        }
        &:active {
          background: #ef8c8c;
        }
      }
      .confirm-btn {
        color: #ffffff;
        background: #509ee3;
        &:hover {
          background: #6fb0eb;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 32px;
      right: 32px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 28px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
  &__title {
      width: 100%;
      height: 120px;
      font-size: 28px;
      color: #696969;
      font-weight: 600;
      padding: 16px 50px 0 20px;
      box-sizing: border-box;
    }
    &__content {
      color: #797979;
      line-height: 52px;
      padding: 0 40px;
      box-sizing: border-box;
    }
}
</style>
