<template>
  <!-- 店铺菜单区域 -->
  <div class="menu-list-container">
    <!-- 菜单 -->
    <div class="food_container">
      <div class="menu_list">
        <!-- 菜单左侧区域 -->
        <div class="menu_left">
          <ul>
            <!-- 食物的分类 -->
            <li
              class="food_type"
              :class="{ active: i === currIndex }"
              :key="foodType.id"
              v-for="(foodType, i) in foodData"
              @click="currIndex = i"
            >
              {{ foodType.name }}
            </li>
          </ul>
        </div>
        <!-- 菜单右侧区域 -->
        <div class="menu_right">
          <!-- 该分类的标题与简介 -->
          <div class="title">
            <span class="title_name">{{ foodData[currIndex].name }}</span>
            <span class="title_desc">{{ foodData[currIndex].description }}</span>
          </div>
          <ul>
            <!-- 每一个食物 -->
            <li class="food_item" v-for="food in foodData[currIndex].foods" :key="food.item_id">
              <div class="food_left">
                <img :src="`/img/${food.image_path}`" alt="" />
              </div>
              <div class="food_right">
                <div class="food_name">{{ food.name }}</div>
                <div class="food_desc">{{ food.description }}</div>
                <p class="food_sale_rating">
                  <span>月售{{ food.month_sales }}份 </span>
                  <span>好评率{{ food.satisfy_rate }}%</span>
                </p>
                <div class="price_add">
                  <div class="food_price">
                    <span class="icon">¥</span>
                    <span class="price">{{ food.specfoods[0].price }}</span>
                    <span v-if="food.specifications.length > 0">起</span>
                  </div>
                  <!-- 增加和减少的按钮 -->
                  <ChooseNum :isShow="isShow" @choose="handleChooseSpecs" :food="food" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 选择规格的弹出窗 -->
    <AlertTip :isShow="isShow">
      <div class="title">
        <span>{{ currFood.name }}</span>
        <Icon @click.native="handleChooseSpecs(false)" type="close" />
      </div>
      <div class="content">
        <div class="specs_detail">规格</div>
        <ul class="specs">
          <li
            :class="{ active: currSpecIndex === i }"
            @click="changeSpecs(i)"
            v-for="(spec, i) in currFood.specfoods"
          >
            {{ spec.specs_name }}
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="price">
          <span>¥</span>
          <span class="num">{{ selectFoodSpec.price }}</span>
        </div>
        <button @click="addToCart" class="add_cart">加入购物车</button>
      </div>
    </AlertTip>
    <!-- 朦层 -->
    <Hazy @closeHazy="handleChooseSpecs" :isShow="isShow" />
  </div>
</template>

<script>
import ChooseNum from "./ChooseNum";
import AlertTip from "@/components/AlertTip";
import Hazy from "@/components/Hazy";
import Icon from "@/components/Icon";
export default {
  components: {
    ChooseNum,
    AlertTip,
    Hazy,
    Icon,
  },
  props: {
    // 该商铺中所有的食物
    foodData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isActive: true, // 切换 是显示商品页面还是评价页面
      currIndex: 0, // 当前所选中的食物分类
      isShow: false, // 是否显示朦层
      currFood: {}, // 当前选择规格的食物
      currSpecIndex: 0, // 当前所选中的食品规格
    };
  },

  computed: {
    // 根据当前选择规格的食物与当前所选中的食品规格计算出弹出框的食物价格
    selectFoodSpec() {
      if (this.currFood.specfoods) {
        return this.currFood.specfoods[this.currSpecIndex];
      }
      return {};
    },
  },

  methods: {
    /**
     * 添加食物到购物车
     * 当点击可以选择规格食物的 <Icon type='plus'/> 的按钮时触发的函数
     */
    handleChooseSpecs(isShow, food) {
      this.currSpecIndex = 0;
      this.isShow = isShow;
      if (food) {
        this.currFood = food;
      }
    },
    changeSpecs(index) {
      this.currSpecIndex = index;
    },
    addToCart() {
      if (this.currFood.specfoods) {
        const shop_id = this.currFood.restaurant_id;
        const category_id = this.currFood.category_id;
        const item_id = this.currFood.item_id;
        const food_id = this.currFood.specfoods[this.currSpecIndex].food_id;
        const name = this.currFood.name;
        const price = this.currFood.specfoods[this.currSpecIndex].price;
        const specs = this.currFood.specfoods[this.currSpecIndex].specs_name;
        const packing_fee = this.currFood.specfoods[this.currSpecIndex].packing_fee;
        const sku_id = this.currFood.specfoods[this.currSpecIndex].sku_id;
        const stock = this.currFood.specfoods[this.currSpecIndex].stock;
        this.$store.commit("buyCart/addToCart", {
          shop_id,
          category_id,
          item_id,
          food_id,
          name,
          price,
          specs,
          packing_fee,
          sku_id,
          stock,
          food: this.currFood,
        });
        this.isShow = false;
      }
    },
    switchChange(isShow) {
      this.isActive = isShow;
      this.$emit("change", isShow);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.menu-list-container {
  height: calc(100vh - 2rem);

  .food_container {
    box-sizing: border-box;
    display: flex;
    font-size: 0.7rem;
    width: 100vw;
    height: calc(100% - 2rem);
    .menu_list {
      width: 100%;
      display: flex;
      .menu_left {
        width: 5.5rem;
        background-color: #f1f1f1;
        overflow-y: auto;
        ul {
          padding-bottom: 1rem;
          .food_type {
            padding: 0.8rem 0;
            box-sizing: border-box;
            text-align: center;
            border-bottom: 2px solid #ededed;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &.active {
              border-left: 2px solid $primary;
              background-color: #fff;
            }
          }
        }
      }
      .menu_right {
        flex-grow: 1;
        overflow-y: auto;
        .title {
          height: 2rem;
          line-height: 2rem;
          background-color: #f1f1f1;
          padding-left: 0.3rem;
          .title_name {
            font-size: 0.7rem;
            font-weight: bold;
            color: $word;
            margin-right: 0.3rem;
          }
          .title_desc {
            font-size: 0.5rem;
            color: $lightWord;
          }
        }
        ul {
          padding-bottom: 1rem;
          .food_item {
            display: flex;
            align-items: center;
            padding: 0.3rem 0rem 0.3rem 0.4rem;
            border-bottom: 1px solid #f8f8f8;
            .food_left {
              margin-right: 0.4rem;
              img {
                width: 3rem;
                height: 3rem;
              }
            }
            .food_right {
              color: $dark;
              font-size: 0.5rem;
              flex-grow: 1;
              overflow: hidden;
              .food_name {
                font-size: 0.6rem;
                font-weight: bold;
                margin-bottom: 0.2rem;
                width: 7rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .food_desc {
                color: $lightWord;
              }
              .food_sale_rating {
                margin: 0.2rem 0;
                span {
                  margin-right: 0.5rem;
                }
              }
              .price_add {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 0.2rem;
                .food_price {
                  color: $lightWord;
                  .icon {
                    color: #f40;
                  }
                  .price {
                    font-size: 0.6rem;
                    font-weight: bold;
                    color: #f40;
                    margin-right: 0.2rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .alert-tip-container {
    padding: 0.4rem;
    border-radius: 0.2rem;
    .title {
      font-size: 0.8rem;
      position: relative;
      text-align: center;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ededed;
      .icon-container {
        position: absolute;
        right: 0;
        top: 0.05rem;
      }
    }
    .content {
      .specs_detail {
        font-size: 0.6rem;
        color: $word;
      }
      .specs {
        display: flex;
        flex-wrap: wrap;
        font-size: 0.6rem;
        margin: 0.5rem 0;
        li {
          padding: 0.3rem 0.5rem;
          border-radius: 0.3rem;
          border: 1px solid #ddd;
          margin-right: 0.4rem;
          margin-bottom: 0.3rem;
          &.active {
            border: 1px solid $primaryBg;
            color: $primaryBg;
          }
        }
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      font-size: 0.7rem;
      .price {
        color: #f40;
        font-size: 0.6rem;
        font-weight: bold;
        .num {
          font-size: 0.8rem;
          margin-left: 0.2rem;
        }
      }
      .add_cart {
        padding: 0.2rem 0.5rem;
        background-color: $primaryWord;
        color: #fff;
        border-radius: 0.15rem;
      }
    }
  }
}
</style>
