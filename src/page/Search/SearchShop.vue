<template>
  <div class="search-shop-container">
    <Header :goback="true">
      {{ title }}
    </Header>
    <FilterHeader @modify="againRequest" />
    <ShopList v-if="shoplist" :shopList="shoplist" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import FilterHeader from "@/components/FilterHeader";
import ShopList from "@/components/ShopList";
import { getSearchShopList } from "@/apis";
import { mapState } from "vuex";
export default {
  components: {
    FilterHeader,
    Header,
    ShopList,
  },

  data() {
    return {
      title: "",
      foodtypeId: null,
      orderbyId: null,
      shoplist: null,
    };
  },

  computed: {
    ...mapState("location", ["geohash"]),
  },

  methods: {
    againRequest(query, type) {
      if (type === "type") {
        this.foodtypeId = query;
      } else if (type === "orderby") {
        this.orderbyId = query;
      } else if (type === "filter") {
        // 筛选条件
      }
    },
  },

  async created() {
    this.title = this.$route.query.key;
    const data = await getSearchShopList(this.geohash, this.title);

    if (data.status === 0) {
      this.$showMessage({ content: data.message });
      return;
    }
    this.shoplist = data;
  },
};
</script>

<style lang="scss" scoped>
.search-shop-container {
}
</style>
