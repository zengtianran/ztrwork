<template>
    <div>
        <span class="inner-body" v-if="hasRight">我是HOC-1</span>
        <noRightTips v-else></noRightTips>
    </div>
</template>

<script>
import noRightTips from './noRightTips.vue'
import rightMixin from './right-mixin'
export default {
  components: {
    noRightTips
  },
  mixins: [rightMixin('RIGHT_PAGE_1')]
}
</script>

<style lang="less" scoped>

</style>

