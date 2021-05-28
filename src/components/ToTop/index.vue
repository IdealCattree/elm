<template>
  <div class="to-top-container">
    <Icon type="toTop" />
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.to-top-container {
  border: 0.133333vw solid $lightWord;
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  position: fixed;
  bottom: 20vw;
  right: 4vw;
}
</style>
