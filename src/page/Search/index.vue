<template>
  <div class="search-container">
    <Header :goback="true">
      搜索
    </Header>
    <section class="search_input">
      <Icon type="search" />
      <input
        @keydown.enter="handleSearch"
        type="text"
        v-model="keyword"
        placeholder="搜索商家、商品名称"
      />
      <button @click="handleSearch">搜索</button>
    </section>

    <section class="search_history">
      <div class="title">
        <span>历史搜索</span>
        <Icon type="dustbin" @click.native="handleDelete" />
      </div>

      <ul>
        <li v-for="historySearch in historySearchs">
          {{ historySearch }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { editHistorySear } from "@/utils";
export default {
  components: {
    Header,
    Icon,
  },

  data() {
    return {
      keyword: "",
      historySearchs: [],
    };
  },

  methods: {
    handleSearch() {
      const key = this.keyword;
      if (!this.keyword.trim()) {
        return;
      }

      // 存储搜索记录
      editHistorySear.setHistorySearch(this.keyword);
      this.keyword = "";
      this.$router.push({
        name: "SearchShop",
        query: {
          key,
        },
      });
    },

    /**
     * 删除历史搜索
     */
    handleDelete() {
      editHistorySear.deleteHistorySearch();
    },
  },

  created() {
    editHistorySear.isNull(); // 先判断localStorage中的该key是否为空
    this.historySearchs = editHistorySear.getHistorySearch(); // 获取历史搜索
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.search-container {
  font-size: 0.7rem;
  .search_input {
    background-color: #fff;
    padding: 0.3rem 0.5rem;
    margin: 0.5rem 0;
    height: 1.5rem;
    text-align: center;
    position: relative;
    color: $lightWord;

    .icon-container {
      position: absolute;
      top: 0.7rem;
      left: 1.5rem;
    }

    input {
      width: 14rem;
      height: 1.5rem;
      box-shadow: 0 0 4px $lightWord;
      border-radius: 3rem;
      padding: 0 1.5rem;
      font-size: 0.5rem;
      box-sizing: border-box;
      transition: all 0.5s;
      &:focus {
        box-shadow: 0 0 4px $primary;
        border: none;
        & + button {
          opacity: 1;
        }
      }
    }

    button {
      position: absolute;
      top: 0.6rem;
      right: 1.7rem;
      background-color: transparent;
      font-size: 0.6rem;
      color: $primary;
      opacity: 0;
      transition: all 0.5s;
    }
  }

  .search_history {
    padding: 0 0.5rem;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      span {
        font-weight: bold;
      }
    }
    ul {
      font-size: 0.6rem;
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 0 0.6rem;
        background-color: #f5f5f5;
        line-height: 1.3rem;
        border-radius: 2.5rem;
        margin: 0 0.4rem 0.4rem 0;
        width: 3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
      }
    }
  }
}
</style>
