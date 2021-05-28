<template>
  <div class="set-username-container">
    <Header :goback="true">
      修改用户名
    </Header>
    <section class="set_name">
      <input v-model="username" type="text" placeholder="请输入用户名" />
      <p>用户名只能修改一次（5-24字符之间）</p>
    </section>

    <button @click="confirm" class="confirm">确认修改</button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Header,
  },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    ...mapMutations("user", ["setUserName"]),
    checkName() {
      if (this.username.length > 5 && this.username.length < 24) {
        return true;
      } else {
        this.$showMessage({ content: "用户名不规范" });
      }
    },
    confirm() {
      const result = this.checkName();
      if (result) {
        this.setUserName(this.username);
        this.$router.go(-1);
      }
    },
  },

  created() {
    this.username = this.userInfo.username;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.set-username-container {
  height: 100vh;
  background-color: #f1f1f1;

  .set_name {
    padding-top: 0.4rem;
    font-size: 0.6rem;
    input {
      background: none;
      box-sizing: border-box;
      width: 15.2rem;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0.2rem 0.5rem;
      line-height: 1.2rem;
      font-size: 0.7rem;
      display: block;
      margin: 0 auto;
    }

    p {
      padding-left: 0.5rem;
      margin-top: 0.5rem;
      color: $lightWord;
    }
  }
  .confirm {
    width: 14rem;
    height: 1.8rem;
    background-color: $primaryBg;
    color: #fff;
    font-size: 0.7rem;
    display: block;
    margin: 1rem auto;
  }
}
</style>
