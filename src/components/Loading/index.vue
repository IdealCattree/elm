<template>
  <div class="loading-container">
    <div class="loading_content">
      <div class="load_img"></div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes load {
  from {
    background-position-x: 0;
  }

  to {
    background-position: 100%;
  }
}
.loading-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: 100;
  .loading_content {
    width: 13.3333vw;
    height: 13.333333vw;
    z-index: 100;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    // background-image: url("../../assets/shop_back_svg.svg");
    // background-size: 100% 100%;
    background-color: #eeeeee;
  }

  .load_img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: 0 0;
    background-image: url("../../assets/loading.png");
    animation: load 1.5s normal infinite steps(43);
  }
}
</style>
