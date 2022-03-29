<template>
  <ul v-if="maxPage >=2" class="pagination">
    <li class="pagination-li">
      <button class="button" @click="onClickFirstPage" :class="{ disabled : isFirstPage }" :disabled="isFirstPage">首頁</button>
    </li>
    <li class="pagination-li">
      <button class="button" @click="onClickPreviousPage" :class="{ disabled : isFirstPage }" :disabled="isFirstPage">上頁</button>
    </li>

    <li class="pagination-li" v-for="page in pages" :key="page.name">
      <button class="button page-button" @click="onClickPage(page.name)" :class="{ active: isPageActive(page.name) }" :disabled="page.isDisabled">{{ page.name }}</button>
    </li>

    <li class="pagination-li">
      <button class="button" @click="onClickNextPage" :class="{ disabled : isLastPage }" :disabled="isLastPage">下頁</button>
    </li>

    <li class="pagination-li">
      <button class="button" @click="onClickLastPage" :class="{ disabled : isLastPage }" :disabled="isLastPage">最後</button>
    </li>

  </ul>
</template>

<script>
import {mapState} from "vuex";

export default {

  data() {
    return {

      maxVisibleButtons: 5,

    }
  },

  computed: {
    ...mapState("pagination", ["pagination"]),

    currentPage() {
      return parseInt(this.$route.query.pageNo);
    },

    maxPage() {
      return parseInt(this.pagination.totalPages);
    },

    isFirstPage() {
      return this.currentPage === 1;
    },

    isLastPage() {
      return this.currentPage === this.maxPage;
    },

    startPage() {

      if (this.isFirstPage) {
        return 1;
      }

      return this.currentPage;
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.maxPage); i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },

  },

  methods: {

    changePage(pageNo) {
      let pathName = this.$route.name
      this.$router.push(
        {
          name: pathName,
          params: this.$route.params,
          query: {...this.$route.query, pageNo: pageNo}
        }
      )
    },

    onClickFirstPage() {
      this.changePage(1)
    },

    onClickPreviousPage() {
      this.changePage(this.currentPage - 1);
    },

    onClickNextPage() {
      this.changePage(this.currentPage + 1);
    },

    onClickPage(page) {
      this.changePage(page);
    },

    onClickLastPage() {
      this.changePage(this.maxPage);
    },

    isPageActive(pageNo) {
      return this.currentPage === pageNo;
    },


  }
}


</script>

<style scoped>

.pagination {
  display: flex;
  width: 100%;
}

.pagination-li {
}

.button {
  border: none;
  background-color: rgba(121, 120, 120, 0.49);
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  margin-right: 1rem;
}

.button:hover {
  background-color: #7c7c7c;
}

.active {
  background-color: #00be2e;
}

.disabled {
  background: #e5e5e5;
  color: #d7d7d7;
  cursor: default;
}

.disabled:hover {
  background: #e5e5e5;
}

</style>
