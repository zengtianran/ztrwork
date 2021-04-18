<template>
<div class="inp-groups">
      <input
      :type="type"
      class="g-input"
      :value="value"
      @input="handleInp"
      :placeholder="placeholder"
      :class="extraClass" />
</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      require: true,
      default: 'text'
    },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    extraClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  methods: {
    handleInp($event) {
      this.$emit('update:value', $event.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
   .g-input{
       border: none;
       outline: none;
       padding: 16px 24px;
       width: 100%;
       height: 90px;
       line-height: 90px;
       box-sizing: border-box;
       font-size: 30px;
       color: @text-color;
       &::placeholder{
           color: @text-color;
       }
   }
</style>
