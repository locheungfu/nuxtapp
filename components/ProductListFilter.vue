<template xmlns="http://www.w3.org/1999/html">
  <div class="panel-wrapper">
    <div class="panel-box">
      <div class="panel-box-header">
        <div v-if="categoryData" class="filter-title"><span>正在瀏覽 <strong class="title-main-text">{{ categoryName }}</strong> 總共找到 {{ totalItemsCount }} 件商品</span></div>
        <div v-if="$route.params.category === 'all'" class="filter-title"><span>正在瀏覽 <strong class="title-main-text">{{ categoryName }}</strong> 總共找到 {{ totalItemsCount }} 件商品</span></div>
      </div>
      <div class="panel-box-body">
        <div class="filter-search-bar">
          <div class="input-field">
            <span class="input-field-icon"><font-awesome-icon :icon="['fas','search']" class="search-icon"/></span><input type="search" v-model="searchName" class="form-control" placeholder="輸入商品名稱" @keydown.enter="OnClickSearch"/>
            <b-button class="search-button" @click="OnClickSearch">搜索</b-button>
          </div>
        </div>
        <div v-if="filteredBrands" class="filter-group brand">
          <strong class="filter-label">廠商</strong>
          <b-button size="md" class="filter-button" :class="{'btn-active': buttonActiveName === 'all'}" variant="outline-success" @click="onClickActive('all');filterAll()">全部</b-button>
          <b-button size="md" class="filter-button" :class="{'btn-active': buttonActiveName === item.brand.name }" variant="outline-success" @click="onClickActive(item.brand.name);changeBrandQuery(item.brand.name)"
                    v-for="item in filteredBrands" :key="item.brand.name">{{ item.brand.displayName }}
          </b-button>
        </div>

        <div class="filter-group sorting">
          <strong class="filter-label">排序</strong>
          <b-btn-group class="sort-btn-gp">
            <b-button class="sort-button" size="sm" variant="outline-secondary" @click="changeSortDirection('price','desc')">
              <span><font-awesome-icon icon="arrow-up" class="filter-icon" />價錢</span>
            </b-button>
            <b-button class="sort-button" size="sm" variant="outline-secondary" @click="changeSortDirection('price','asc')">
              <span><font-awesome-icon icon="arrow-down" class="filter-icon" />價錢</span>
            </b-button>
          </b-btn-group>

          <b-btn-group class="sort-btn-gp">
            <b-button class="sort-button" size="sm" variant="outline-secondary" @click="changeSortDirection('releaseDate','desc')"> <span><font-awesome-icon icon="arrow-up" class="filter-icon" />最新</span></b-button>
            <b-button class="sort-button" size="sm" variant="outline-secondary" @click="changeSortDirection('releaseDate','asc')"> <span><font-awesome-icon icon="arrow-down" class="filter-icon" />最新</span></b-button>
          </b-btn-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {

  watch: {
    "$route.params.category": {
      handler() {
        this.buttonActiveName = "";
        this.searchName = "";
      }
    }

  },

  data() {
    return {

      buttonActiveName: "",
      searchName: "",

    }
  },

  computed: {
    ...mapState("product", ["categories"]),
    ...mapGetters("pagination", ["currentViewPage"]),

    categoryData() {
      return this.categories.find(category => category.name === this.$route.params.category);
    },

    totalItems() {
      return this.$store.state.pagination.pagination.totalItems;
    },

    filteredBrands() {
      return this.categories.find(category => category.name === this.$route.params.category)?.categoryBrandRelations;
    },

    totalItemsCount() {
      const totalItems = this.$store.state.pagination.pagination?.totalItems;

      return totalItems > 0 ? totalItems : 0;
    },

    categoryName() {
      return this.$route.params.category === "all" ? "全部商品" : this.categoryData.displayName;
    },


  },

  methods: {


    onClickActive(button) {
      this.buttonActiveName = button;
    },

    changeBrandQuery(brandName) {
      this.$router.push({path: this.$route.path, query: {...this.$route.query, brandName: brandName}});
    },

    changeSortDirection(sort, direction) {
      this.$router.push({path: this.$route.path, query: {...this.$route.query, sort: `${sort},${direction}`}});
    },

    OnClickSearch() {
      this.$nuxt.$loading.start();
      setTimeout(() => {
        this.$nuxt.$loading.finish();
        this.$router.push({path: this.$route.path, query: {...this.$route.query, displayName: this.searchName}});
        this.searchName = "";
      }, 500)
    },

    filterAll() {
      this.$router.push({path: this.$route.path, query: {...this.$route.query, brandName: undefined}});
    }
  }
}


</script>

<style scoped>

.panel-wrapper {

}

.panel-box {
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  background-color: #fff;
  padding: 1.25rem 2rem;
  -webkit-box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
}

.panel-box-header {
  display: inline-block;
}

.filter-title {
  font-size: 1.8rem;
}

.title-main-text {
  color: #00509F;
}

.filter-group {
  display: flex;
  flex-flow: wrap;
  width: 100%;
  flex-direction: row;
  margin: 1.25rem 0;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1.25rem;
}

.filter-label {
  padding: 0.2rem 0;
  margin-right: 1.25rem;
  text-align: left;
}

.filter-button {
  font-size: 1rem;
  font-weight: 500;
  padding: 0.2rem 0.85rem;
  border-radius: 1.25rem;
  margin-right: 0.85rem;
}

.sort-btn-gp {
  margin-right: 0.85rem;
}

.sort-button {
  font-weight: 500;
}

.btn-active {
  background-color: #00be2e;
  color: #fff;
}

.filter-search-bar {
  display: flex;
  position: relative;
  margin: 1rem 0;
}

.input-field {
  display: flex;
  cursor: pointer;
  align-items: center;
  color: #00509F;
  width: 100%;
  border: solid 3px #f8f9fa;
  border-radius: 0.80rem;
}

.input-field-icon {
  margin: 0 0.25rem;
}

input[type='search'] {
  border: none;
  outline: none;
  box-shadow: none;
}

.search-button {
  white-space: nowrap;
}

.filter-icon {
  font-size: .65rem;
}


</style>
