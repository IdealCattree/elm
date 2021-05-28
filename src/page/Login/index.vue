<template>
  <div class="login-container">
    <div class="logo">
      <img src="https://gw.alicdn.com/tfs/TB1kHnqpcKfxu4jSZPfXXb3dXXa-750-192.png" alt="" />
    </div>
    <div class="form">
      <section class="login">
        <input v-model="loginId" type="text" placeholder="账号" />
      </section>
      <section class="login">
        <input v-model="loginPwd" type="password" placeholder="密码" />
      </section>
      <section class="login">
        <img :src="QRCode.code" alt="" />
        <input v-model="code" type="text" placeholder="验证码" />
      </section>
      <p class="agreement">
        新用户登录即自动注册，并表示已同意
        <a href="#">《用户服务协议》</a>
        和
        <a href="#">《隐私权政策》</a>
      </p>
      <section class="login_btn">
        <button @click="login">登录</button>
      </section>
      <section class="about">
        关于我们
      </section>
    </div>
  </div>
</template>

<script>
import { getQRCode } from "@/apis";
export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
      QRCode: "",
      code: "",
    };
  },

  methods: {
    async login() {
      if (this.loginId && this.loginPwd) {
        const result = await this.$store.dispatch("user/login", {
          loginId: this.loginId,
          password: this.loginPwd,
          code: this.code,
        });
        if (result.user_id) {
          // 登录成功
          this.$showMessage({
            content: "登录成功",
            duration: 1000,
            cb: () => {
              this.$router.go(-1);
            },
          });
        } else {
          // 登录失败
          this.$showMessage({
            content: result.message,
            duration: 1000,
          });
        }
      } else {
        this.$showMessage({ content: "请填写账号密码" });
      }
    },
  },

  async created() {
    this.QRCode = await getQRCode();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.login-container {
  padding: 0 2rem;
  .logo {
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 0.5rem;
    img {
      width: 6rem;
      height: 1.5rem;
    }
  }

  .form {
    .login {
      margin-bottom: 1rem;
      position: relative;
      img {
        position: absolute;
        right: 0;
        top: 0.35rem;
      }
      input {
        width: 11rem;
        height: 1.5rem;
        border: 1px solid #ddd;
        padding: 0.2rem 0.5rem;
        border-radius: 0.15rem;
        font-size: 0.6rem;
      }
    }

    .agreement {
      margin-bottom: 0.5rem;
      font-size: 0.6rem;
      color: $lightWord;
      a {
        color: $primary;
      }
    }

    .login_btn {
      button {
        width: 11rem;
        height: 1.5rem;
        padding: 0.1rem 0.5rem;
        border-radius: 1rem;
        background-color: $primary;
        box-sizing: content-box;
        color: #fff;
        font-size: 0.6rem;
        font-weight: bold;
      }
    }

    .about {
      text-align: center;
      color: $lightWord;
      font-size: 0.5rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
