<template>
  <div class="filter-header-container">
    <div class="filter-nav">
      <span @click="typeShow = !typeShow">
        {{ shopTypes[typeCurrIndex] ? shopTypes[typeCurrIndex].name : "分类" }}
      </span>
      <Icon type="arrowDown" />
      <div class="category-container drop_down" v-show="typeShow">
        <div class="category left">
          <ul>
            <li
              @click="typeCurrIndex = i"
              v-for="(type, i) in shopTypes"
              :class="{ active: i === typeCurrIndex }"
              :key="type.id"
            >
              <div>
                <img :src="type.image_url" alt="" />
                <span class="name">{{ type.name }}</span>
              </div>
              <div>
                <span class="count">{{ type.count }}</span>
                <Icon type="arrowRight" />
              </div>
            </li>
          </ul>
        </div>
        <div class="category right">
          <ul>
            <li
              v-for="type in shopTypes[typeCurrIndex] && shopTypes[typeCurrIndex].sub_categories"
              :key="type.id"
              @click="changeType(type.id)"
            >
              <span>
                {{ type.name }}
              </span>
              <span>
                {{ type.count }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="filter-nav">
      <span @click="orderByShow = !orderByShow">{{ orderby[orderCurrIndex].title }}</span>
      <Icon type="arrowDown" />
      <div class="orderby-container drop_down" v-show="orderByShow">
        <ul>
          <li @click="changeOrderBy(item.id, i)" v-for="(item, i) in orderby" :key="i">
            <Icon :style="{ color: item.color }" :type="item.icon" />
            <p>
              {{ item.title }}
              <Icon type="check" />
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-nav">
      <span @click="filterShow = !filterShow">筛选</span>
      <Icon type="arrowDown" />
      <div v-show="filterShow" class="filter-container drop_down">
        <div class="filter_ul">
          <div class="title">配送方式</div>
          <ul class="delivery">
            <li
              @click="checkedCondition('delivery', delivery.id)"
              v-for="delivery in deliverys"
              :key="delivery.id"
            >
              <Icon
                :type="checkedAvtivitys.delivery_mode.includes(delivery.id) ? 'check' : 'bird'"
                :class="delivery.color"
                :style="{ color: `#${delivery.color}` }"
              />
              {{ delivery.text }}
            </li>
          </ul>
        </div>
        <div class="filter_ul">
          <div class="title">商家属性（可多选）</div>
          <ul class="activity">
            <li
              @click="checkedCondition('activity', activity.id)"
              v-for="activity in activitys"
              :key="activity.id"
            >
              <span
                v-show="!checkedAvtivitys.support_ids.includes(activity.id)"
                :style="{
                  color: `#${activity.icon_color}`,
                  border: `1px solid #${activity.icon_color}`,
                  borderRadius: '.2rem',
                  padding: `0 .1rem`,
                }"
              >
                {{ activity.icon_name }}
              </span>
              <Icon
                :style="{ color: `rgb(87, 169, 255)` }"
                v-show="checkedAvtivitys.support_ids.includes(activity.id)"
                type="check"
              />
              <span>{{ activity.name }}</span>
            </li>
          </ul>
        </div>
        <div class="button">
          <button @click="deleteAvtivitys" class="close">取消</button>
          <button @click="confirm" class="confirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { getShopTypes, getFoodActivity, getFoodDelivery } from "@/apis";
import { insertStr } from "@/utils";
import "../../style/main.css";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      shopTypes: [], // 所有食物类型
      typeCurrIndex: 0, // 当前所选中的类型的index
      orderCurrIndex: 0, // 当前所选中的排序的index
      typeShow: false, // 是否显示类型的drop
      orderByShow: false, // 是否显示排序的drop
      filterShow: false, // 是否显示shai选的drop
      activitys: [], // 筛选中的商家活动列表
      deliverys: [], // 筛选中的配送方式
      checkedAvtivitys: {
        // 用户所筛选的条件
        delivery_mode: [], //配送方式id
        support_ids: [], //餐馆支持特权的id
      },
      // 排序的类型信息
      orderby: [
        { id: 4, color: "#3b87c8", title: "智能排序", icon: "sort" },
        { id: 5, color: "#2a9bd3", title: "距离最近", icon: "near" },
        { id: 6, color: "#f07373", title: "销量最高", icon: "fire" },
        { id: 1, color: "#e6b61a", title: "起送价最低", icon: "money" },
        { id: 2, color: "#37c7b7", title: "配送速度最快", icon: "clock" },
        { id: 3, color: "#eba53b", title: "评分最高", icon: "star" },
      ],
    };
  },

  methods: {
    /**
     * 修改食物类型时触发的函数
     */
    changeType(id = []) {
      this.typeShow = !this.typeShow;
      this.$emit("modify", id, "type");
    },
    /**
     * 修改排序方式时触发的函数
     */
    changeOrderBy(orderby_id, i) {
      this.orderCurrIndex = i;
      this.orderByShow = !this.orderByShow;
      this.$emit("modify", orderby_id, "orderby");
    },

    /**
     * 修改筛选条件触发的函数
     */
    checkedCondition(type, id) {
      if (type === "delivery") {
        const index = this.checkedAvtivitys.delivery_mode.indexOf(id);
        if (index === -1) {
          this.checkedAvtivitys.delivery_mode.push(id);
        } else {
          this.checkedAvtivitys.delivery_mode.splice(index, 1);
        }
      } else if (type === "activity") {
        const index = this.checkedAvtivitys.support_ids.indexOf(id);
        if (index === -1) {
          this.checkedAvtivitys.support_ids.push(id);
        } else {
          this.checkedAvtivitys.support_ids.splice(index, 1);
        }
      }
    },

    /**
     * 取消用户所筛选的条件
     * 点击close按钮
     */
    deleteAvtivitys() {
      // 将用户所选的条件清空
      this.checkedAvtivitys = {
        delivery_mode: [],
        support_ids: [],
      };
    },

    /**
     * 提交用户筛选的条件
     * 点击confirm按钮
     */
    confirm() {
      this.$emit("modify", this.checkedAvtivitys, "filter");
      this.filterShow = false;
    },
  },

  async created() {
    let data = await getShopTypes(); // 获取所有食物类型
    this.activitys = await getFoodActivity(); // 获取商家活动列表
    this.deliverys = await getFoodDelivery(); // 获取配送方式

    // 由于接口返回的数据有问题，对返回的数据进行了调整
    data.forEach(item => {
      if (item.image_url.endsWith("png")) {
        item.image_url = item.image_url + ".png";
      } else {
        item.image_url = item.image_url + ".jpeg";
      }
      item.image_url = insertStr(item.image_url, 1, "/");
      item.image_url = insertStr(item.image_url, 4, "/");
      item.sub_categories.forEach(i => {
        if (i.image_url.endsWith("png")) {
          i.image_url = i.image_url + ".png";
        } else {
          i.image_url = i.image_url + ".jpeg";
        }
        i.image_url = insertStr(i.image_url, 1, "/");
        i.image_url = insertStr(i.image_url, 4, "/");
      });
      item.sub_categories = item.sub_categories.map(item => ({
        ...item,
        image_url: `https://fuss10.elemecdn.com/${item.image_url}`,
      }));
    });
    data = data.map(item => ({
      ...item,
      image_url: `https://fuss10.elemecdn.com/${item.image_url}`,
    }));

    // 请求到数据赋值给data
    this.shopTypes = data;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.filter-header-container {
  display: flex;
  font-size: 0.6rem;
  position: relative;
  color: $word;
  border-bottom: 1px solid #e4e4e4;
  padding: 0.3rem;
  background-color: #fff;
  z-index: 10;
  .filter-nav {
    flex: 1;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-of-type(2) {
      border-left: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
    }

    .icon-container {
      font-size: 1rem;
      vertical-align: sub;
    }

    span {
      margin-right: 0.5rem;
    }

    .drop_down {
      text-align: start;
      position: absolute;
      left: 0;
      top: 1.8rem;
      display: flex;
      width: 100vw;
      background-color: #fff;
    }
    .category-container {
      .category {
        flex: 1 1;
        height: 14.6rem;
        li {
          padding: 0.3rem 0.3rem;
          line-height: 1rem;
          height: 1rem;
          font-size: 0.5rem;
        }

        &.left {
          background-color: #f1f1f1;
          ul {
            li {
              display: flex;
              justify-content: space-between;
              &.active {
                background-color: #fff;
              }

              img {
                width: 0.8rem;
                height: 0.8rem;
                margin-right: 0.5rem;
              }
              .name {
                vertical-align: 0.2rem;
              }

              .count {
                background-color: #ccc;
                color: #fff;
                padding: 0.1rem 0.2rem;
                border-radius: 1.1rem;
              }

              .icon-container {
                font-size: 0.5rem;
                vertical-align: baseline;
              }
            }
          }
        }

        &.right {
          overflow: auto;
          li {
            display: flex;
            padding-left: 1rem;
            padding-right: 1rem;
            border-bottom: 1px solid #e4e4e4;
            justify-content: space-between;
          }
        }
      }
    }

    .orderby-container {
      ul {
        width: 100%;
        li {
          display: flex;
          height: 2.5rem;
          line-height: 2.5rem;
          .icon-container {
            height: 100%;
            padding: 0 1rem;
            font-size: 0.8rem;
          }
          p {
            font-size: 0.6rem;
            border-bottom: 1px solid #e4e4e4;
            flex-grow: 1;
            height: 100%;
            .icon-container {
              color: $primary;
              float: right;
              display: none;
            }
          }
        }
      }
    }

    .filter-container {
      flex-direction: column;
      .filter_ul {
        padding: 0 0.5rem;

        .title {
          margin: 0.3rem 0;
          line-height: 1rem;
          font-size: 0.6rem;
        }

        li {
          display: flex;
          align-items: center;
          border: 0.025rem solid #eee;
          width: 3.6rem;
          height: 1rem;
          margin-right: 0.3rem;
          border-radius: 0.3rem;
          padding: 0.2rem 0.5rem;
          margin-bottom: 0.6rem;
          font-size: 0.5rem;
        }

        .delivery {
          display: flex;
          flex-wrap: wrap;
        }

        .activity {
          display: flex;
          flex-wrap: wrap;
        }
      }

      .button {
        width: 100%;
        box-shadow: 0px -1px 2px #ededed;
        margin-top: 0.2rem;
        button {
          width: 50%;
          height: 2rem;
          background-color: #fff;
          font-size: 1rem;
          color: $lightWord;
          &.confirm {
            background-color: $success;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
