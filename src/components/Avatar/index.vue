<template>
  <div class="avatar-container">
    <img :src="url" :style="{ width: `${size}px`, height: `${size}px` }" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/common.scss";
.avatar-container {
  @include self-center;
  img {
    border-radius: 50%;
  }
}
</style>
