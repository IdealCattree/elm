<template>
  <div class="rating-container">
    <header class="header">
      <div class="rating_header_left">
        <p>{{ overAll }}</p>
        <p>综合评价</p>
        <p>高于周边上商家 {{ compare }}</p>
      </div>
      <div class="rating_header_right">
        <p>
          <span>服务态度</span>
          <Star :width="shopScore.service_score" />
          <span>{{ service }}</span>
        </p>
        <p>
          <span>菜品评价</span>
          <Star :width="shopScore.food_score" />
          <span>{{ food }}</span>
        </p>
        <p>
          <span>送达时间</span>
          <span class="time">{{ shopScore.deliver_time }}分钟</span>
        </p>
      </div>
    </header>

    <ul class="tag_list">
      <li
        @click="requestRating(i)"
        :class="{ unsatisfied: tag.unsatisfied, active: i === currIndex }"
        v-for="(tag, i) in RatingTags"
      >
        {{ tag.name }}({{ tag.count }})
      </li>
    </ul>

    <ul class="rating_list">
      <li class="rating" v-for="itemRating in shopRating">
        <div class="avatar">
          <img :src="itemRating.avatar || 'https://elm.cangdu.org/img/default.jpg'" alt="" />
        </div>
        <div class="content">
          <div class="rating_header">
            <div class="name">
              <span>{{ itemRating.username }}</span>
              <span>{{ itemRating.rated_at }}</span>
            </div>

            <Star :width="itemRating.rating_star" />

            <div class="rating_desc">
              {{ itemRating.time_spent_desc }}
            </div>
          </div>
          <ul class="picture">
            <li v-for="item in itemRating.item_ratings" :key="item.food_id">
              <img
                src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg"
                alt=""
              />
            </li>
          </ul>
          <ul class="food_name">
            <li v-for="item in itemRating.item_ratings">
              {{ item.food_name }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Star from "@/components/Star";
export default {
  components: {
    Star,
  },
  props: {
    shopRating: {
      type: Array,
      required: true,
    },
    RatingTags: {
      type: Array,
      required: true,
    },
    shopScore: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currIndex: 0,
    };
  },

  computed: {
    overAll() {
      return Math.round(this.shopScore.overall_score);
    },
    compare() {
      return `${(this.shopScore.compare_rating * 100).toFixed(1)}%`;
    },
    service() {
      return this.shopScore.service_score.toFixed(1);
    },
    food() {
      return this.shopScore.food_score.toFixed(1);
    },
  },

  methods: {
    requestRating(index) {
      this.currIndex = index;
      // 根据tag的id重新请求评价
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.rating-container {
  font-size: 0.7rem;
  color: $word;
  background-color: #f1f1f1;
  .header {
    background-color: #fff;
    display: flex;
    padding: 0.8rem 0.5rem;
    margin-bottom: 0.6rem;
    .rating_header_left {
      flex-grow: 3;
      text-align: center;
      p {
        &:first-of-type {
          font-size: 1rem;
          color: #f60;
          margin: 0.2rem 0;
        }
        &:nth-of-type(3) {
          font-size: 0.5rem;
          color: $lightWord;
        }
      }
    }
    .rating_header_right {
      flex-grow: 4;
      font-size: 0.6rem;
      padding-left: 0.3rem;

      p {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        .star-container {
          margin: 0 0.4rem;
        }
        &:nth-of-type(3) {
          .time {
            margin-left: 0.4rem;
            font-size: 0.5rem;
            color: $lightWord;
          }
        }
      }
    }
  }

  .tag_list {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    li {
      padding: 0.3rem;
      background-color: #ebf5ff;
      border-radius: 0.3rem;
      color: #6d7885;
      margin-right: 0.4rem;
      margin-bottom: 0.2rem;
      font-size: 0.6rem;

      &.unsatisfied {
        background-color: #f5f5f5;
        color: #aaa;
      }
      &.active {
        background-color: $primaryWord;
        color: #fff;
      }
    }
  }

  .rating_list {
    margin-top: 0.8rem;
    background-color: #fff;
    padding: 0.5rem;
    .rating {
      display: flex;
      align-items: flex-start;
      padding: 0.6rem 0;
      border-top: 1px solid #f1f1f1;

      .avatar {
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
      }
      .content {
        flex-grow: 1;
        padding-left: 0.6rem;
        .rating_header {
          .name {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.3rem;
            span {
              &:nth-of-type(2) {
                font-size: 0.5rem;
                color: $lightWord;
              }
            }
          }

          .rating_desc {
            margin-top: 0.3rem;
          }
        }

        .picture {
          display: flex;
          flex-wrap: wrap;
          li {
            margin-right: 0.3rem;
            margin-top: 0.3rem;
            img {
              width: 3rem;
              height: 3rem;
            }
          }
        }

        .food_name {
          display: flex;
          flex-wrap: wrap;
          margin-top: 0.3rem;
          li {
            width: 2.2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.55rem;
            padding: 0.2rem;
            border: 0.025rem solid #ebebeb;
            border-radius: 0.15rem;
            margin-right: 0.3rem;
            margin-bottom: 4px;
            color: $lightWord;
          }
        }
      }
    }
  }
}
</style>
