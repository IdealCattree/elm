<template>
  <div class="remark-container">
    <Header :goback="true">
      订单备注
    </Header>

    <section class="quick common_style">
      <header class="header">
        快速备注
      </header>
      <ul class="remark_arr">
        <li class="remark_item" v-for="(remarks, index) in remarkList.remarks">
          <span
            @click="addRemark(remark, index)"
            :class="{ active: selectRemark.find(item => item.remark === remark) }"
            v-for="(remark, i) in remarks"
          >
            {{ remark }}
          </span>
        </li>
      </ul>
    </section>

    <section class="other common_style">
      <header class="header">
        其他备注
      </header>
      <textarea
        v-model="remarkText"
        cols="43"
        rows="5"
        placeholder="请输入备注内容（可不填）"
      ></textarea>
    </section>

    <button @click="confirm" class="confirm">确认</button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { getRemark } from "@/apis";
export default {
  components: {
    Header,
  },

  data() {
    return {
      id: "", // 购物车id
      sig: "", // sig
      remarkList: [], // 口味备注
      selectRemark: [],
      remarkText: "",
    };
  },

  methods: {
    addRemark(remark, index) {
      if (!this.selectRemark.find(item => item.remark === remark)) {
        this.selectRemark.push({ remark: remark, index: index });
        console.log(this.selectRemark);
        return;
      }

      this.selectRemark.forEach((item, i) => {
        if (item.index === index && item.remark === remark) {
          this.selectRemark.splice(i, 1);
        } else if (item.index === index && item.remark !== remark) {
          item.remark = remark;
        }
      });
    },

    confirm() {
      let remarkStr = this.selectRemark.map(item => item.remark).join("，");
      this.$store.commit("confirmOrder/setConfirmRemark", {
        remarkList: remarkStr,
        remarkText: this.remarkText,
      });
      this.$router.go(-1);
    },
  },

  created() {
    this.id = this.$route.query.id;
    this.sig = this.$route.query.sig;
  },
  async mounted() {
    this.remarkList = await getRemark(this.id, this.sig);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.remark-container {
  background-color: #f1f1f1;
  height: 100vh;

  .common_style {
    background-color: #ffff;
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 0.7rem;
    color: $dark;
    .header {
      height: 1.5rem;
      line-height: 1.5rem;
      margin-bottom: 0.3rem;
    }
  }
  .quick {
    .remark_arr {
      display: flex;
      flex-wrap: wrap;
      font-size: 0.6rem;
      .remark_item {
        border: 1px solid $primary;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3rem;
        overflow: hidden;
        display: flex;

        span {
          display: block;
          padding: 0.3rem 0.6rem;
          border-right: 1px solid $primary;
          &.active {
            background-color: $primary;
            color: #fff;
          }
          &:last-of-type {
            border: none;
          }
        }
      }
    }
  }

  .other {
    textarea {
      background-color: #f1f1f1;
      resize: none;
      display: block;
      margin: 0 auto;
      padding: 0.5rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      font-size: 0.6rem;
      font-family: "Microsoft Yahei";
    }
  }

  .confirm {
    width: 12rem;
    height: 1.8rem;
    background-color: $success;
    color: #fff;
    font-size: 0.7rem;
    border-radius: 0.2rem;
    display: block;
    margin: 0.5rem auto;
  }
}
</style>
