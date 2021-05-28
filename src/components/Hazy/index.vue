<template>
  <div @click.stop="handleCloseHazy" class="hazy-container" v-show="isShow"></div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleCloseHazy() {
      this.$emit("closeHazy", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.hazy-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
</style>
