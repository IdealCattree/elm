<template>
  <div class="alert-tip-container" v-show="isShow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/common.scss";
@import "~@/style/var.scss";
.alert-tip-container {
  @include self-center(fixed);
  width: 70vw;
  background-color: #fff;
  z-index: 2;
}
</style>
