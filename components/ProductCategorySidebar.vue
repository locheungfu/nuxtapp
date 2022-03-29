<template>
  <div>
    <div v-if="categories.length !== 0" class="cat-sidebar">
      <div class="sidebar-header">
        <h5 class="sidebar-title">分類</h5>
      </div>
      <ul class="cat-parent-ul">
        <li class="cat-parent-li">
          <a href="#" @click.prevent.self="routeToPage('all')">
            <img class="cat-icon img-fluid" src="/icons/all.svg" alt="icon">
            所有產品
          </a>
        </li>
        <li class="cat-parent-li" v-for="category in categories" :key="category.name">
          <a href="#" @click.prevent.self="routeToPage(category.name)">
            <img class="cat-icon img-fluid" :src=category.logoUrl alt="icon">
            {{ category.displayName }}
          </a>
        </li>
      </ul>
    </div>
    <div class="cat-sidebar-mobile">
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand href="#">分類</b-navbar-brand>
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-for="category in categories" :key="category.name" @click="routeToPage(category.name)">{{ category.displayName }}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>


      </b-navbar>


    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import { BIcon, BIconChevronBarUp, BIconChevronBarDown } from 'bootstrap-vue'

export default {

  components: {BIcon, BIconChevronBarUp, BIconChevronBarDown},

  mounted() {

    if (this.categories.length === 0) {
      this.getCategories();
    }
  },

  data() {
    return {}
  },

  computed: {

    ...mapState("product", ["categories"]),

  },

  methods: {

    ...mapActions("product", ["getCategories"]),

    routeToPage(category, brand) {
      const pathName = "products-category";
      this.$router.push({
        name: pathName,
        params: {
          category: category,
        },
        query: {
          brandName: brand,
          pageNo: 1,
          sort: "createTimestamp,desc"
        }
      })
    }
  },


}


</script>

<style scoped>

a {
  text-decoration: none;
}

.cat-sidebar {
  border: 1px solid #00509F;
  box-shadow: -1px 4px 19px -4px #9C9C9C;
  padding: 0.25rem;
}

@media screen and (max-width: 768px) {
  .cat-sidebar {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .cat-sidebar-mobile {
    display: none;
  }
}

ul {
  margin-bottom: 0;
  padding: 0;
  list-style: none;
}

.cat-parent-li {
  padding: 5px;
  font-size: 1.2rem;
  border-bottom: 1px solid #e5e5e5;
}

.cat-parent-li > a {
  color: #7c7c7c;
  font-weight: 600;
  text-decoration: none;
}

.cat-parent-li > a:hover {
  color: #00509F;
}

.cat-icon {
  margin-right: 5px;
  height: 1.5rem;
  padding: 0;
}

.sidebar-header {
  text-align: center;
  padding: 0.25rem 0;
  background-color: #e5e5e5;
}

.sidebar-title {
  font-weight: 600;
  color: #525252;
}

.navbar {
  border-radius: 1.25rem;
}


</style>
