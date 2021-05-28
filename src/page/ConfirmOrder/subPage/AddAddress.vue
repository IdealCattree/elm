<template>
  <div class="add-address-container">
    <Header :goback="true">
      添加地址
    </Header>
    <div class="form">
      <section class="section_list">
        <span class="section_left">联系人</span>
        <div class="section_right">
          <input v-model="name" class="input_style" type="text" placeholder="你的名字" />
          <div class="choose_sex">
            <div @click="sex = 1" class="male sex" :class="{ active: sex === 1 }">
              <Icon type="success" />
              <span>先生</span>
            </div>
            <div @click="sex = 0" class="female sex" :class="{ active: sex === 0 }">
              <Icon type="success" />
              <span>女士 </span>
            </div>
          </div>
        </div>
      </section>
      <section class="section_list">
        <span class="section_left">联系电话</span>
        <div class="section_right">
          <div class="phone_add">
            <input v-model="phone" type="text" class="input_style" placeholder="你的手机号" />
            <img @click="isShowbk_phone = true" src="../../../assets/add_phone.png" alt="" />
          </div>
          <input
            v-show="isShowbk_phone"
            v-model="phone_bk"
            class="input_style"
            type="text"
            placeholder="备选手机号"
          />
        </div>
      </section>

      <section class="section_list">
        <span class="section_left">送餐地址</span>
        <div class="section_right">
          <div class="phone_add input_style">
            小区/写字楼/学校等
          </div>
          <input
            class="input_style"
            v-model="address_detail"
            type="text"
            placeholder="详细地址（如门牌号等）"
          />
        </div>
      </section>

      <section class="section_list">
        <span class="section_left">标签</span>
        <div class="section_right">
          <div class="phone_add input_style">
            <input v-model="tag" class="input_style" type="text" placeholder="无/家/学校/公司" />
          </div>
        </div>
      </section>
    </div>
    <button @click="addAddress">确定</button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { postAddress } from "@/apis";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Icon,
  },

  data() {
    return {
      sex: 1, // 收货人性别
      name: "", // 姓名
      phone: "", // 手机号
      phone_bk: "", // 备用手机号
      address: "河北省", // 地址
      address_detail: "", // 详细地址
      tag: "", //标签
      tag_type: 1, // 备注类型
      poi_type: 0, // 地址类型
      isShowbk_phone: false, // 是否显示备选电话
    };
  },

  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("location", ["geohash"]),
  },

  methods: {
    async addAddress() {
      if (!(this.userInfo && this.userInfo.user_id)) {
        this.$showMessage({ content: "请先登录" });
        return;
      } else if (!this.name) {
        this.$showMessage({ content: "请先登录" });
        return;
      } else if (!this.phone) {
        this.$showMessage({ content: "请输入手机号" });
        return;
      } else if (!this.phone_bk) {
        this.phone_bk = this.phone;
        return;
      } else if (!this.address) {
        this.$showMessage({ content: "请输入地址" });
        return;
      } else if (!this.address_detail) {
        this.$showMessage({ content: "请输入详细地址" });
        return;
      }

      if (this.tag == "家") {
        this.tag_type = 2;
      } else if (this.tag == "学校") {
        this.tag_type = 3;
      } else if (this.tag == "公司") {
        this.tag_type = 4;
      }

      const res = await postAddress({
        name: this.name,
        sex: this.sex,
        phone: this.phone,
        phone_bk: this.phone_bk,
        address: this.address,
        address_detail: this.address_detail,
        tag: this.tag,
        tag_type: this.tag_type,
        poi_type: this.poi_type,
        geohash: this.geohash,
        user_id: this.userInfo.user_id,
      });
      if (res.message) {
        this.$showMessage({ content: res.message });
      } else {
        this.$showMessage({
          content: "添加成功",
          cb: () => {
            this.$router.go(-1);
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.add-address-container {
  height: 100vh;
  background-color: #f1f1f1;

  .form {
    background-color: #fff;
    padding: 0.3rem 0.7rem;
  }
  .header-container {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .section_list {
    display: flex;
    font-size: 0.75rem;
    color: $dark;
    .section_left {
      flex: 2;
      line-height: 2.5rem;
    }
    .section_right {
      flex: 5;
      .input_style {
        width: 100%;
        height: 2.5rem;
        font-size: 0.7rem;
        color: #999;
        line-height: 2.5rem;
        border-top: 1px solid #f7f7f7;
      }
      .choose_sex {
        display: flex;
        line-height: 2.5rem;
        border-top: 0.025rem solid #f5f5f5;
        .sex {
          margin-right: 0.6rem;
          .icon-container {
            color: #aaa;
            margin-right: 0.3rem;
            font-size: 0.8rem;
          }
          &.active {
            .icon-container {
              color: $success;
            }
          }
        }
      }

      .phone_add {
        position: relative;

        img {
          position: absolute;
          right: 0.6rem;
          top: 0.8rem;
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  button {
    display: block;
    width: 14rem;
    height: 2rem;
    border-radius: 0.2rem;
    font-size: 0.7rem;
    background-color: $success;
    color: #fff;
    margin: 1rem auto;
  }
}
</style>
