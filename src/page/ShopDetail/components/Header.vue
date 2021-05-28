<template>
  <div class="header-container">
    <div class="bg">
      <img :src="`/img/${shopData.image_path}`" :alt="shopData.name" />
    </div>

    <div class="goback">
      <Icon @click.native="$router.back()" type="back" />
    </div>

    <div class="desc">
      <div class="desc-content">
        <div class="left">
          <img class="avatar" :src="`/img/${shopData.image_path}`" alt="" />
        </div>
        <div class="right">
          <div class="name">{{ shopData.name }}</div>
          <p class="delivery">
            商家配送
            <span>/</span>
            {{ shopData.order_lead_time }}分钟送达
            <span>/</span>
            {{ shopData.piecewise_agent_fee.tips }}
          </p>
          <p class="notice">公告：{{ shopData.promotion_info }}</p>
        </div>
        <Icon type="enter" />
      </div>
      <div class="desc-aside" v-if="shopData.activities.length > 0">
        <div class="aside-left">
          <span class="icon" :style="{ backgroundColor: `#${shopData.activities[0].icon_color}` }">
            {{ shopData.activities[0].icon_name }}
          </span>
          <span class="description">
            {{ shopData.activities[0].description }}
          </span>
          （App专享）
        </div>
        <div class="aside-right">
          {{ shopData.activities.length }}个活动
          <Icon type="enter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  props: {
    shopData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  position: relative;
  background-color: rgba(119, 103, 137, 0.43);
  color: #fff;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;

    img {
      width: 100%;
      opacity: 0.3;
    }
  }

  .goback {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .desc {
    padding: 0.3rem 0.5rem;

    .desc-content {
      display: flex;
      align-items: center;
      .left {
        overflow: hidden;
        border-radius: 0.1rem;
        .avatar {
          width: 3.5rem;
          height: 3.5rem;
          display: block;
        }
      }
      .right {
        flex-grow: 1;
        margin-left: 0.5rem;
        .name {
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 0.5rem;
          margin-bottom: 0.3rem;
        }
      }
    }
    .desc-aside {
      margin-top: 0.3rem;
      font-size: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .aside-left {
        .icon {
          display: inline-block;
          padding: 0 0.1rem;
        }
      }
    }
  }
}
</style>
