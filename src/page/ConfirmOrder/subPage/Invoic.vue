<template>
  <div class="invoic-container">
    <Header :goback="true">
      选择发票抬头
    </Header>
    <section @click="invoice = !invoice" class="choose_invoice">
      <span>不需要开发票</span>
      <Icon :class="{ active: invoice }" type="success" />
    </section>
    <button @click="confrimInvoice">确认</button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { mapMutations } from "vuex";
export default {
  components: {
    Header,
    Icon,
  },
  data() {
    return {
      invoice: false, // 是否需要开发票
    };
  },

  methods: {
    ...mapMutations("confirmOrder", ["setConfrimInvoice"]),

    /**
     * 确认
     */
    confrimInvoice() {
      this.setConfrimInvoice(this.invoice);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.invoic-container {
  height: 100vh;
  background-color: #f1f1f1;
  .choose_invoice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    height: 2rem;
    padding: 0 0.6rem;
    background-color: #fff;
    margin-top: 0.5rem;
    .icon-container {
      font-size: 0.9rem;
      color: #aaa;

      &.active {
        color: $success;
      }
    }
  }

  button {
    width: 14rem;
    height: 1.8rem;
    background-color: $success;
    color: #fff;
    font-size: 0.7rem;
    border-radius: 0.2rem;
    display: block;
    margin: 1rem auto;
  }
}
</style>
