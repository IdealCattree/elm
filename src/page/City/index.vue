<template>
  <div class="city-container">
    <Header :goback="true">
      城市选择
    </Header>

    <section class="curr_city">
      <div class="title">
        <span>当前定位城市：</span>
        <p v-if="!currCity">定位不准时，请在城市列表中选择</p>
      </div>
      <RouterLink class="curr" tag="div" to="/">
        上海
        <Icon type="back" />
      </RouterLink>
    </section>

    <section class="hotcities">
      <div class="title">热门城市</div>
      <ul class="list">
        <li
          @click="handleChangeCity(city.name, city.latitude, city.longitude)"
          v-for="city in hotCities"
          :key="city.id"
          class="hot_city"
        >
          <RouterLink to="/">
            {{ city.name }}
          </RouterLink>
        </li>
      </ul>
    </section>

    <section class="allcities">
      <dl v-for="initial in initials">
        <dt :id="initial">{{ initial }}</dt>

        <dd
          @click.prevent="handleChangeCity(city.name, city.latitude, city.longitude)"
          v-for="city in allCities[initial]"
          :key="city.id"
        >
          <RouterLink to="/" tag="div">
            {{ city.name }}
          </RouterLink>
        </dd>
      </dl>
    </section>

    <aside class="nav">
      <ul>
        <li v-for="initial in initials">
          <a :href="'#' + initial">{{ initial }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { getCities } from "@/apis";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import store from "../../store";
export default {
  components: {
    Header,
    Icon,
  },
  data() {
    return {
      allCities: [], // 所有城市
      hotCities: [], // 热门城市
      currCity: null, // 当前城市
      initials: [], // 城市首字母
    };
  },
  methods: {
    handleChangeCity(cityname, latitude, longitude) {
      const geohash = latitude + "," + longitude;
      store.commit("location/setLoaction", { latitude, longitude, geohash });
      store.commit("location/setCityName", cityname);
    },
  },
  async created() {
    const allCities = await getCities("group"); // 获取所有城市
    const hotCities = await getCities("hot"); //获取热门城市
    console.log(allCities);
    this.initials = Object.keys(allCities).sort();
    this.allCities = allCities;
    this.hotCities = hotCities;

    try {
      const currCity = await getCities("guess"); // 获取当前城市
    } catch (error) {
      console.log(error);
    }

    // this.currCity = currCity;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.city-container {
  font-size: 0.7rem;
  background-color: $lightBg;
  .header-container {
    position: fixed;
    top: 0;
    left: 0;
  }
  .curr_city {
    padding: 2.5rem 0.5rem 0;
    background-color: #fff;
    font-size: 0.6rem;
    color: $word;
    line-height: 1.5rem;

    .title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e4e4;
    }

    .curr {
      line-height: 1.8rem;
      display: flex;
      justify-content: space-between;
      font-size: 0.6rem;
      .icon-container {
        display: block;
        transform: rotate(180deg);
        font-size: 0.8rem;
      }
    }
    p {
      font-weight: bold;
      color: $lightWord;
    }
  }

  .hotcities {
    font-size: 0.6rem;
    background-color: #fff;
    margin-top: 0.8rem;
    .title {
      padding: 0.5rem;
      line-height: 1rem;
      color: $word;
      border-bottom: 1px solid #e4e4e4;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      color: $primary;
      li {
        width: 25vw;
        text-align: center;
        line-height: 1.5rem;
        border-bottom: 1px solid #e4e4e4;
        border-right: 1px solid #e4e4e4;
        box-sizing: border-box;
      }
    }
  }

  .allcities {
    dl {
      line-height: 1.5rem;
      background-color: #fff;
      dt {
        padding: 0 0.5rem;
        background-color: #f5f5f5;
      }
      dd {
        font-size: 0.6rem;
        margin: 0.1rem 0.5rem;

        border-bottom: 1px solid #e4e4e4;
      }
    }
  }

  .nav {
    position: fixed;
    transform: translate(0%, -50%);
    top: 50%;
    right: 0.3rem;
    font-size: 0.6rem;
    color: $lightWord;
    li {
      width: 1rem;
      text-align: center;
      margin-bottom: 0.1rem;
    }
  }
}
</style>
