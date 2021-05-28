<template>
  <div class="star-container">
    <div class="gray">
      <img :src="starGray" alt="" />
    </div>
    <div class="fill" :style="{ width: `${width * 20}%`, overflow: 'hidden' }">
      <img :src="starFill" alt="" />
    </div>
  </div>
</template>

<script>
import starFill from "../../assets/score-active.svg";
import starGray from "../../assets/score-gray.svg";
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      starFill,
      starGray,
    };
  },
};
</script>

<style lang="scss" scoped>
.star-container {
  position: relative;
  width: 3rem;
  height: 0.5rem;
  margin-right: 0.3rem;
  div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  img {
    width: 3rem;
    height: 0.5rem;
    display: block;
    object-fit: cover;
  }
}
</style>
