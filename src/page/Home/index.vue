<template>
  <div class="home-container" ref="mainContainer">
    <Header :goback="false">
      <template #position>
        <Icon type="position" />
        <RouterLink :to="{ name: 'City' }">
          <span>{{ cityName }}</span>
        </RouterLink>
        <Icon type="arrowDown" />
      </template>
    </Header>
    <section class="search">
      <div @click="$router.push({ name: 'Search' })" class="input">
        <Icon type="search" />
        搜索商家、商品名称
      </div>
    </section>

    <FoodTypes />
    <section class="shoplist-title">
      推荐商家
    </section>

    <FilterHeader @modify="againRequest" />

    <ShopList :shopList="shoplist" />
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import FoodTypes from "./foodTypes";
import FilterHeader from "@/components/FilterHeader";
import ShopList from "@/components/ShopList";
import Loading from "@/components/Loading";
import { getShopList, cityGuess } from "@/apis";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Header,
    Icon,
    FoodTypes,
    FilterHeader,
    ShopList,
    Loading,
  },

  data() {
    return {
      shoplist: [],
      foodtypeId: null,
      orderbyId: null,
      currPager: 0,
      isLoading: false,
      fetchMore: false, // 是否正在加载更多数据
    };
  },

  computed: {
    ...mapState("location", ["cityName", "latitude", "longitude"]),
  },

  methods: {
    ...mapMutations("location", ["setLoaction", "setCityName"]),
    async againRequest(query, type) {
      if (type === "type") {
        this.foodtypeId = query;
      } else if (type === "orderby") {
        this.orderbyId = query;
      } else if (type === "filter") {
        // 筛选条件
      }
      this.shoplist = await this.getData();
    },

    async getData() {
      this.fetchMore = true;
      let shoplist = await getShopList(
        {
          latitude: this.latitude,
          longitude: this.longitude,
          restaurant_category_id: this.foodtypeId,
          order_by: this.orderbyId,
        },
        this.currPager
      );
      shoplist = shoplist.map(shop => ({
        ...shop,
        image_path: "/img/" + shop.image_path,
      }));
      this.fetchMore = false;
      return shoplist;
    },

    handleScroll() {
      this.fetchMoreShoplist();
    },

    async fetchMoreShoplist() {
      const dom = this.$refs.mainContainer;
      const rect = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec < rect) {
        if (!this.fetchMore) {
          this.currPager++;
          const data = await this.getData();
          this.shoplist = [...this.shoplist, ...data];
        }
      }
    },
  },

  async created() {
    this.isLoading = true;
    this.shoplist = await this.getData();

    // 获取本地位置
    // try {
    //   const city = await cityGuess();
    //   this.setLoaction({
    //     latitude: city.latitude,
    //     longitude: city.longitude,
    //     geohash: `${city.latitude},${city.longitude}`,
    //   });
    //   this.setCityName(city.name);
    // } catch {
    //   console.log("定位失败");
    // }finally{

    // }
    
    this.$refs.mainContainer.addEventListener("scroll", this.handleScroll, false);
    this.isLoading = false;
  },
};
</script>
<style lang="scss" scoped>
@import "~@/style/var.scss";
.home-container {
  width: 100%;
  height: 90%;
  overflow-y: auto;

  .header-container {
    width: 100%;
    font-size: 0.7rem;
    padding: 1.5rem 0.5rem 0.3rem;
    box-sizing: border-box;
    height: 3.5rem;
    display: flex;
    align-items: center;

    span {
      // max-width: 40%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 0.5rem;
    }
  }

  .search {
    font-size: 0.6rem;
    background-image: linear-gradient(90deg, #0af, $primaryBg);
    padding: 0.4rem 0.6rem;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 10;

    .input {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      color: $lightWord;
      text-align: center;
      letter-spacing: 2px;
      background-color: #fff;
    }
  }

  .shoplist-title {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 0.6rem;
    color: $word;
    justify-content: center;

    &::before {
      content: "";
      display: block;
      height: 0.02rem;
      width: 1rem;
      background-color: $lightWord;
      margin-right: 0.8rem;
    }

    &::after {
      content: "";
      display: block;
      height: 0.02rem;
      width: 1rem;
      margin-left: 0.8rem;
      background-color: $lightWord;
    }
  }

  .filter-header-container {
    position: sticky;
    top: 2.3rem;
  }
}
</style>
