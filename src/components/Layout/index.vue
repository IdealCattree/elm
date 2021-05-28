<template>
  <div class="layout-container">
    <div class="main">
      <RouterView />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .main {
    width: 100%;
    height: 100%;
  }
  .footer {
    width: 100%;
  }
}
</style>
