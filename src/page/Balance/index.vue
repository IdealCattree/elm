<template>
  <div class="balance-container">
    <Header :goback="true">
      我的余额
    </Header>
    <section class="content_container">
      <section class="content">
        <header class="title">
          <span>当前余额</span>
          <span class="description" @click="$router.push({ name: 'BlanceDetail' })">
            <Icon type="wenhao" />
            余额说明
          </span>
        </header>
        <p class="content_num"><span>0.00</span>元</p>
        <button class="submit_button">提现</button>
      </section>
    </section>

    <p class="deal_detail">交易明细</p>

    <div class="no_log">
      <img src="../../assets/no-log.png" alt="" />
      <p>暂无明细记录</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
export default {
  components: {
    Header,
    Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.balance-container {
  .content_container {
    background-color: $primaryBg;
    padding: 0.3rem;
    .content {
      padding: 0.3rem;
      background-color: #fff;
      border-radius: 0.2rem;
      font-size: 0.7rem;
      .title {
        font-size: 0.55rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .description {
          display: flex;
          align-items: center;
          color: $primary;
          .icon-container {
            font-size: 0.6rem;
            margin-right: 0.2rem;
          }
        }
      }
      .content_num {
        span {
          font-size: 1.8rem;
          color: $dark;
          margin-right: 0.3rem;
        }
      }
      .submit_button {
        width: 100%;
        height: 2rem;
        font-size: 0.8rem;
        color: #fff;
        border-radius: 0.15rem;
        line-height: 2rem;
        margin-top: 1rem;
        text-align: center;
        background-color: #ccc;
      }
    }
  }

  .deal_detail {
    font-size: 0.6rem;
    color: #999;
    line-height: 2rem;
    padding-left: 0.5rem;
  }

  .no_log {
    text-align: center;
    font-size: 0.6rem;
    color: $word;
    p {
      margin-top: 0.3rem;
    }
  }
}
</style>
