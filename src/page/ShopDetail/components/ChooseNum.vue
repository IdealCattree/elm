<template>
  <div class="choose-num-container">
    <div class="choose_num" v-if="food.specifications && food.specifications.length > 0">
      <Icon type="reduce" @click.native="handleAlert" />
      <span class="num">{{ foodNum }}</span>
      <Icon @click.native="changeSpecs" type="plus" />
    </div>
    <div v-else class="choose_num">
      <Icon
        type="reduce"
        @click.native="
          chooseCart(
            'remove',
            food.restaurant_id,
            food.category_id,
            food.item_id,
            food.specfoods[0].food_id
          )
        "
      />

      <span class="num">{{ foodNum }}</span>

      <Icon
        type="plus"
        @click.native="
          chooseCart(
            'add',
            food.restaurant_id,
            food.category_id,
            food.item_id,
            food.specfoods[0].food_id,
            food.name,
            food.specfoods[0].price,
            '',
            food.specfoods[0].packing_fee,
            food.specfoods[0].sku_id,
            food.specfoods[0].stock,
            food
          )
        "
      />
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import chooseBuyCart from "@/mixins/chooseBuyCart";
import { mapState } from "vuex";
export default {
  mixins: [chooseBuyCart()],
  components: {
    Icon,
  },
  props: {
    food: {
      type: Object,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState("buyCart", ["cartList"]),

    shopCart() {
      const shop_id = this.$route.query.id;
      return { ...this.cartList[shop_id] };
    },
    foodNum() {
      let category_id = this.food.category_id;
      let item_id = this.food.item_id;
      if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
          num += item.num;
        });
        return num;
      }
      return 0;
    },
  },

  methods: {
    changeSpecs() {
      this.$emit("choose", !this.isShow, this.food);
    },

    handleAlert() {
      this.$showMessage({ content: "多规格以及带属性的商品只能去购物车删除哦" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.choose-num-container {
  margin-right: 0.4rem;
  .icon-container {
    font-size: 0.7rem;
    color: $primary;
  }
  .choose {
    padding: 0.1rem 0.2rem;
    background-color: $primary;
    border-radius: 0.2rem;
    color: #fff;
  }
  .choose_num {
    .num {
      margin: 0 0.3rem;
      font-size: 0.6rem;
    }
  }
}
</style>
