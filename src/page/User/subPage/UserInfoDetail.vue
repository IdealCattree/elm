<template>
  <div class="user-info-detail-container" v-if="userInfo && userInfo.user_id">
    <Header :goback="true">
      账户信息
    </Header>
    <section class="headportrait">
      <input type="file" />
      <h2 class="title">头像</h2>
      <div class="avatar">
        <img :src="`/img/${userInfo.avatar}`" alt="" />
        <Icon type="enter" />
      </div>
    </section>

    <section class="headportrait" @click="$router.push({ name: 'SetUserName' })">
      <h2 class="title">用户名</h2>
      <p>{{ userInfo.username }}</p>
      <div class="avatar">
        <Icon type="enter" />
      </div>
    </section>

    <section class="headportrait" @click="$router.push({ name: 'Address' })">
      <p></p>
      <h2 class="title">收货地址</h2>
      <div class="avatar">
        <Icon type="enter" />
      </div>
    </section>

    <section class="phone_bind">
      账号绑定
    </section>
    <section
      class="headportrait"
      @click="$showMessage({ content: '请在手机App中设置', duration: 1000 })"
    >
      <h2 class="title">
        <Icon type="mobile" />
        <span>手机</span>
      </h2>
      <div class="avatar">
        <Icon type="enter" />
      </div>
    </section>

    <section class="phone_bind">
      安全设置
    </section>
    <section class="headportrait" @click="$router.push({ name: 'ForgetPwd' })">
      <h2 class="title">
        <span>登录密码</span>
      </h2>
      <div class="avatar">
        <span>修改</span>
        <Icon type="enter" />
      </div>
    </section>

    <button @click="loginOut" class="sign_out">退出登录</button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Icon,
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },

  methods: {
    async loginOut() {
      const result = await this.$store.dispatch("user/loginOut");
      this.$showMessage({
        content: result,
        cb: () => {
          this.$router.push({ name: "User" });
        },
        duration: 500,
      });
    },
  },

  async created() {
    //获取用户的所有收货地址并保存到仓库中
    await this.$store.dispatch("user/saveAddressList", this.userInfo.user_id);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.user-info-detail-container {
  height: 100vh;
  background-color: #f1f1f1;

  .headportrait {
    position: relative;
    background-color: #fff;
    border-top: 1px solid #ddd;
    color: $dark;
    height: 1.8rem;
    &:first-of-type {
      height: 3rem;
    }

    input {
      width: 100%;
      height: 3rem;
      opacity: 0;
      display: block;
    }
    p {
      height: 1.8rem;
      line-height: 1.8rem;
      font-size: 0.65rem;
      padding-left: 3rem;
    }
    .title {
      .icon-container {
        font-size: 0.75rem;
        margin-right: 0.3rem;
      }
      font-size: 0.65rem;
      position: absolute;
      left: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .avatar {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0.5rem;
      span {
        font-size: 0.65rem;
        color: $lightWord;
      }
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .icon-container {
        margin-left: 0.3rem;
      }
    }
  }

  .phone_bind {
    font-size: 0.6rem;
    padding-left: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: $word;
  }

  .sign_out {
    display: block;
    width: 14rem;
    height: 1.8rem;
    color: #fff;
    background-color: darken($danger, 10%);
    border-radius: 0.2rem;
    font-size: 0.65rem;
    margin: 1rem auto;
  }
}
</style>
