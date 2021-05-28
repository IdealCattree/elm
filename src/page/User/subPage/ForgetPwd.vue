<template>
  <div class="forget-pwd-container">
    <Header :goback="true">
      重置密码
    </Header>
    <div class="form">
      <section class="form_item">
        <input type="text" readonly v-model="username" />
      </section>
      <section class="form_item">
        <input v-model="oldPwd" type="password" placeholder="请输入旧密码" />
      </section>
      <section class="form_item">
        <input v-model="newPwd" type="password" placeholder="请输入新密码" />
      </section>
      <section class="form_item">
        <input v-model="comfirmNewPwd" type="password" placeholder="请确认新密码" />
      </section>
      <section class="form_item">
        <input type="text" v-model="code" placeholder="验证码 " />
        <img v-if="QRCode" :src="QRCode.code" alt="" />
      </section>

      <button @click="confirm" class="confirm">确认修改</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapState } from "vuex";
import { getQRCode, changePwd } from "@/apis";
export default {
  components: {
    Header,
  },

  data() {
    return {
      QRCode: null,
      code: "", // 验证码
      oldPwd: "", // 旧密码
      newPwd: "", // 新密码
      comfirmNewPwd: "", // 确认密码
      username: "",
    };
  },

  computed: {
    ...mapState("user", ["userInfo"]),
  },

  methods: {
    async confirm() {
      const data = await changePwd(
        this.username,
        this.oldPwd,
        this.newPwd,
        this.comfirmNewPwd,
        this.code
      );
      if (data.status === 1) {
        this.$showMessage({
          content: "修改成功",
          duration: 1000,
          cb: () => {
            this.$router.go(-1);
          },
        });
      } else {
        this.$showMessage({ content: data.message });
      }
    },
  },

  async created() {
    this.QRCode = await getQRCode();
    this.username = this.userInfo.username;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.forget-pwd-container {
  height: 100vh;
  background-color: #f1f1f1;

  .form {
    .form_item {
      background-color: #fff;
      padding: 0.5rem 0.8rem;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        font-size: 0.7rem;
        height: 1.3rem;
        color: $word;
      }
    }
  }

  .confirm {
    display: block;
    margin: 1rem auto;
    width: 14rem;
    height: 1.8rem;
    font-size: 0.65rem;
    border-radius: 0.2rem;
    color: #fff;
    background-color: $success;
  }
}
</style>
