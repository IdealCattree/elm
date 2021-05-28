<template>
  <div class="test-container">
    <FilterHeader @modify="againRequest" />
  </div>
</template>

<script>
import FilterHeader from "./index";
export default {
  components: {
    FilterHeader,
  },
  methods: {
    againRequest(query) {
      console.log(query);
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
.test-container {
}
</style>
