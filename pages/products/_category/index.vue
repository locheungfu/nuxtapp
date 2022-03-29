<template>
  <section class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="row">
        <div class="col-12 col-md-2 col-centered">
          <ProductCategorySidebar/>
        </div>
        <div class="col-12 col-md-10 col-centered">
          <div class="product-list-header">
            <ProductListFilter/>
          </div>
          <div class="product-list-body">
            <div class="body-box">
              <div class="msg-wrapper" v-if="!productsData">
                <div class="msg-box">
                  <font-awesome-icon :icon="['fas', 'binoculars']" class="msg-icon"/>
                  <p>沒有找到相關商品</p>
                </div>
              </div>
              <ProductCard v-for="product in productsData" :key="product.id" :product="product" :showBadge="true" :showButton="true"/>
              <div class="col-12 pagination-bar">
                <ProductListPagination/>
              </div>
            </div>
            <div class="product-list-footer">

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

import productCategorySidebar from "@/components/ProductCategorySidebar";
import productListFilter from "@/components/ProductListFilter";
import productListPagination from "@/components/ProductListPagination";
import productCard from "@/components/ProductCard";
import {mapActions, mapState} from "vuex";

export default {

  components: {
    productCategorySidebar, productCard, productListFilter, productListPagination
  },

  beforeDestroy() {
    this.resetState();
  },


  watch: {
    async $route(to, from) {
      if (to.name !== "products-category") return
      await this.$fetch();
    },
  },

  data() {
    return {

      pageSize: 12,
      sort: "name",
      productsData: [],
    }
  },

  async fetch() {
    let url = process.env.API_URL + "/products/getByCategory";

    if (this.$route.query.displayName) {

      if(this.$route.params.category === "all") {
        this.requestParams.categoryName = undefined;
      }

      url = process.env.API_URL + "/products/findByQuerydsl";
    }

    await this.$axios.$get(url, {params: this.requestParams})
      .then((response) => {
        this.productsData = response.list;
        const pagination = {
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalItems: response.totalItems
        };
        this.$store.commit("pagination/SET_PAGINATION", pagination);
      })
      .catch((error) => {
        this.$store.dispatch("notification/addNotification", {type: "alert", message: "無法獲取資料，請再嘗試刷新。" + error.response.data.message})
      })
  },


  computed: {
    ...mapState("product", ["products"]),

    requestPageNo() {
      return parseInt(this.$route.query.pageNo) - 1;
    },

    requestParams() {
      const query = {...this.$route.query, pageNo: this.requestPageNo}

      return {
        categoryName: this.$route.params.category,
        ...query,
      }
    },

  },

  methods: {
    ...mapActions("product", ["getAllProducts", "getProductsByCat", "resetState"]),
    ...mapActions("cart", ["addProductToCart"]),
  }

}
</script>

<style scoped>

.col-centered {
  margin: 45px auto 0 auto;
  float: none;
}

.product-list-header {
  margin-bottom: 25px;
}

.product-list-body {

}

.body-box {
  display: flex;
  flex-flow: wrap row;
  margin-bottom: 25px;
  align-items: center;
  min-height: 40vh;
  border: 1px #e5e5e5 solid;
  border-radius: 1.25rem;
  padding: 1.25rem 0.85rem;
  -webkit-box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
}

.msg-wrapper {
  display: flex;
  margin: 0 auto;
  padding: 1.65rem 3rem;
}

.msg-box {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(124, 124, 124, 0.49);
  text-align: center;
}

.msg-icon {
  font-size: 2.25rem;
  margin-bottom: 0.85rem;
}

.pagination-bar {
  display: flex;
  position: relative;
  margin-top: 1.25rem;
  padding-left: 0.8rem;
}

</style>
