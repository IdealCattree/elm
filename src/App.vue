<template>
  <div id="app">
    <RouterView />
  </div>
</template>
<script>
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
export default {
  components: {
    Layout,
    Footer,
  },
};
</script>

<style lang="scss">
@import "~@/style/common.scss";
@import "~@/style/var.scss";
#app {
}
</style>
