<template>
  <span class="countdown-container">
    {{ remarining }}
  </span>
</template>

<script>
export default {
  props: {
    countNum: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      time: 0,
    };
  },
  computed: {
    remarining() {
      let minute = parseInt(this.time / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }

      let second = parseInt(this.time % 60);
      if (second < 10) {
        second = "0" + second;
      }
      return `00:${minute}:${second}`;
    },
  },

  methods: {
    /**
     * 支付倒计时
     */
    remainingTime() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.timer);
          this.$showMessage({ content: "支付超时" });
        }
      }, 1000);
    },
  },

  mounted() {
    this.time = this.countNum;
    this.remainingTime();
  },
};
</script>

<style></style>
