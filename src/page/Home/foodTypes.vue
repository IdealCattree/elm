<template>
  <div class="food-types-container">
    <Swiper>
      <SwiperSlide class="food-types-slider" :key="i" v-for="(foodType, i) in foodTypes">
        <RouterLink
          :key="type.id"
          v-for="type in foodType"
          :to="{ name: 'SearchShop', query: { key: type.title } }"
        >
          <div class="food_type">
            <img :src="type.image_url" alt="" />
            <span>{{ type.title }}</span>
          </div>
        </RouterLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { getFoodTypes } from "@/apis";
import { sliceArray } from "../../utils";
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";
import { Swiper as SwiperClass, Pagination, Mousewheel, Navigation } from "swiper/js/swiper.esm";
SwiperClass.use([Pagination, Mousewheel, Navigation]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      foodTypes: [],
    };
  },
  async created() {
    let data = await getFoodTypes();
    data = data.map(item => ({
      ...item,
      image_url: "https://fuss10.elemecdn.com" + item.image_url,
    }));
    this.foodTypes = sliceArray(data, 8);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.food-types-container {
  .food-types-slider {
    display: flex;
    flex-wrap: wrap;
    width: 100% !important;

    .food_type {
      font-size: 0.5rem;
      display: flex;
      flex-direction: column;
      width: 25vw;
      // text-align: center;
      margin: 0.4rem 0;
      align-items: center;
      box-sizing: border-box;
      color: $lightWord;
      img {
        width: 1.8rem;
        height: 1.8rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
