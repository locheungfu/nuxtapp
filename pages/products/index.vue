<template>
  <div class="master-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-2 col-centered">
          <ProductCategorySidebar/>
        </div>
        <div class="col-12 col-md-10  col-centered">
          <div class="cat-box">
            <div class="cat-box-header">
              <h2>商品目錄</h2>
            </div>
            <div class="cat-box-item" v-for="category in categories" :key="category.name">
              <div class="cat-list-card" @click="jumpToPage(category.name)">
                <img class="cat-list-card-img img-fluid" :src="category.thumbnailUrl" alt="category-thumbnail">
                <div class="cat-list-card-body">
                  <h5 class="cat-list-card-title">{{ category.displayName }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import ProductCategorySidebar from "@/components/ProductCategorySidebar";


export default {

  head: {
    title: '商品目錄',
    meta: [
      {
        hid: 'products',
        name: 'description',
        content: 'Home page description'
      }
    ],
  },

  components: {ProductCategorySidebar},

  data() {
    return {}
  },

  computed: {
    ...mapState("product", ["categories"])
  },

  methods: {
    jumpToPage(category) {
      let pathName = "products-category";
      this.$router.push({
        name: pathName,
        params: {
          category: category
        },
        query: {
          pageNo: 1,
          sort: "createTimestamp,desc",
        }
      })
    }
  }
}
</script>


<style scoped>

.col-centered {
  margin: 45px auto 0 auto;
  float: none;
}

.cat-box {
  margin: 0 auto 2rem auto;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px #e5e5e5 solid;
  border-radius: 1.25rem;
}

.cat-box-header {
  margin-bottom: 15px;
  text-align: center;
}

.cat-box-item {
  display: inline-block;
  position: relative;
  max-width: 30%;
}

.cat-list-card {
  display: flex;
  position: relative;
  flex-direction: column;
}

.cat-list-card:hover {
  border: solid 1px #00e83b;
  outline-offset: 0px;
  cursor: pointer;
}

.cat-list-card-img {
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  overflow: hidden;
}

.cat-list-card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cat-list-card-title {
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
}


</style>
