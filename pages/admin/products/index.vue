<template>
  <div class="product-mgmt-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-2 col-centered">
          <AdminSidebar/>
        </div>
        <div class="col-lg-10 col-centered">
          <div class="product-box">
            <div class="product-box-header">
              <h2 class="product-box-title">商品列表</h2>
              <font-awesome-icon icon="store" class="header-icon"/>
            </div>
            <div class="product-box-body">
              <div class="product-button-group">
                <b-button variant="secondary" @click="$router.push('/admin/products/add')">新增商品</b-button>
              </div>

              <div class="product-table-wrap table-responsive table-hover">
                <table class="table table-borderless product-table">
                  <thead class="product-table-thead">
                  <tr class="product-thead-tr">
                    <th class="product-thead-th"></th>
                    <th class="product-thead-th">商品編號</th>
                    <th class="product-thead-th">商品名稱</th>
                    <th class="product-thead-th">庫存</th>
                    <th class="product-thead-th">狀態</th>
                    <th class="product-thead-th">更新時間</th>
                    <th class="product-thead-th">創建日期</th>
                    <th class="product-thead-th"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="product-tbody-tr" v-for="product in products" :key="product.id">
                    <td class="product-tbody-td"></td>
                    <td class="product-tbody-td">
                      <div class="product-id"><a href="#" @click.prevent="jumpToProductDetail(product.category.name, product.id)">{{ product.id }}</a></div>
                    </td>
                    <td class="product-tbody-td">
                      <div class="row product-info-wrap">
                        <div class="col-md-3">
                          <div class="img-wrap"><img class="thumb-img" :src="product.thumbnailPath" alt="product"/></div>
                        </div>
                        <div class="col-sm-9">
                          <div class="product-info">
                            <div class="product-name">{{ product.displayName }}</div>
                            <div class="product-desc">{{ product.category.displayName }}</div>
                            <div class="product-desc">{{ product.brand.displayName }}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="product-tbody-td">
                      <div class="product-stock">{{ product.stockQuantity }}</div>
                    </td>
                    <td class="product-tbody-td">
                      <div class="product-badge-group">
                        <b-badge v-if="product.isActive" variant="success">已上架</b-badge>
                        <b-badge v-else variant="danger">已下架</b-badge>
                        <b-badge variant="warning" v-if="product.isPromote">特價</b-badge>
                        <b-badge variant="dark" v-if="product.isShortage">缺貨</b-badge>
                      </div>
                    </td>


                    <td class="product-tbody-td">
                      <div class="product-stock">{{ formatDate(product.updateTimestamp) }}</div>
                    </td>

                    <td class="product-tbody-td">
                      <div class="product-stock">{{ formatDate(product.createTimestamp) }}</div>
                    </td>

                    <td class="product-tbody-td">
                      <div class="user-button-wrap">
                        <b-button variant="outline-secondary" size="sm" class="table-button" @click="onClickShowUpdateModal(product)">編輯</b-button>
                        <b-button variant="outline-danger" size="sm" class="table-button" @click="onClickShowRemoveModal(product.id)">刪除</b-button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="product-box-footer">
                <ProductListPagination/>
              </div>
            </div>
          </div>
        </div>

        <UpdateProductModal :product="product" @updateData="refreshData()"/>
        <b-modal v-model="showRemoveModal" title="確認刪除">
          <p>將刪除以下物品</p>
          <p>{{ productId }}</p>
          <template #modal-footer>
            <div>
              <b-button squared variant="outline-secondary" size="md" @click="showRemoveModal = false">取消</b-button>
              <b-button squared variant="primary" size="md" @click="onClickRemove">確定</b-button>
            </div>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>

import AdminSidebar from "@/components/AdminSidebar";
import ProductListPagination from "@/components/ProductListPagination";
import {mapActions, mapMutations, mapState} from "vuex";
import moment from "moment";
import RemoveProductModal from "@/components/RemoveProductModal";
import UpdateProductModal from "@/components/UpdateProductModal";
import error from "@/layouts/error";

export default {

  middleware: "isAdmin",

  watch: {
    async $route(to, from) {
      if (to.name !== "admin-products") return
      await this.$fetch();
    },

  },

  components: {AdminSidebar, ProductListPagination, UpdateProductModal},

  data() {
    return {
      showRemoveModal: false,
      productId: null,
      products: [],
      product: {},
      pagination: {},
    }
  },

  async fetch() {

    await this.$axios.$get(process.env.API_URL + "/products/findByQuerydsl", {params: this.requestParams})
      .then((response) => {
        const pagination = {currentPage: response.currentPage, totalPages: response.totalPages, totalItems: response.totalItems};
        this.products = response.list;
        this.SET_PAGINATION(pagination);
      })
      .catch((error) => {
        console.log(error);
      })

  },

  computed: {

    requestPageNo() {
      return parseInt(this.$route.query.pageNo) - 1;
    },

    requestParams() {
      const query = {...this.$route.query, pageNo: this.requestPageNo}

      return {
        ...query,
      }
    },
  },

  methods: {

    ...mapMutations("pagination", ["SET_PAGINATION"]),

    formatDate(date) {
      return date.toString().split(" ").splice(0, 2).join(" ");
    },


    jumpToProductDetail(category, pid) {
      this.$router.push({
          name: 'products-category-pid', params: {category: category, pid: pid}
        }
      );
    },


    onClickRemove() {

      this.$axios.$delete(process.env.API_URL + "/products/deleteProduct", {params: {id: this.productId}})
      .then((response) => {
        this.products.splice(this.products.findIndex(item => item.id === this.productId), 1);
        this.showRemoveModal = false;
        this.productId = null;
        this.$store.dispatch("notification/addNotification", {type: "success", message: "已移除商品"})
        console.log(response)
      })
      .catch((error) => {
        this.$store.dispatch("notification/addNotification", {type: "alert", message: "未知錯誤，刪除失敗! "})
        console.log(error)
      })
      .finally(() => {
        this.refreshData();
      })
    },


    onClickShowRemoveModal(pid) {
      this.showRemoveModal = true;
      this.productId = pid;
    },

    onClickShowUpdateModal(product) {
      this.product = product;
      this.$bvModal.show("modal-update-product");
    },

    async refreshData() {
      await this.$nuxt.refresh()
    }
  }
}


</script>

<style scoped>

.product-box {
  margin-bottom: 2rem;
  min-height: 80vh;
  border: 1px #e5e5e5 solid;
  border-radius: 1.25rem;
  -webkit-box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
}

.product-box-header {
  display: flex;
  justify-content: center;
  border-bottom: 1px #e5e5e5 solid;
  padding: 0.85rem 0;
  border-radius: 1.25rem 1.25rem 0 0;
}

.product-box-title {
  color: #7c7c7c;
  margin: 0;
  padding: 0;
}

.header-icon {
  color: #00509F;
  font-size: 1.25rem;
  text-align: center;
  width: 1.5rem;
  height: auto;
}

.product-box-body {
  padding: 0 .85rem;
}

.product-button-group {
  padding: 1.25rem 0;
}

.product-table-wrap {
  margin-bottom: 1.25rem;
}

.product-table-thead {
  background-color: #667c96;
}

.product-thead-th {
  color: #ffffff;
  font-weight: 600;
  white-space: nowrap;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.product-tbody-tr {
  position: relative;
  vertical-align: middle;
  padding: 1rem;
  border: 1px solid transparent;
}

.product-tbody-td {
  font-size: .85rem;
  vertical-align: middle;
}

.product-id {
  font-weight: 600;
}

.product-info-wrap {
  display: flex;
  align-items: center;
}

.thumb-img {
  width: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .img-wrap {
    display: none;
  }
}

.product-info {

}

.product-name {
  font-weight: 600;
}

.product-desc {
  font-size: .75rem;
  opacity: .5;
}

.product-badge-group {
  display: block;
  font-size: 1rem;
}

.user-button-wrap {
  display: block;
}

.table-button {
  white-space: nowrap;
  margin: .25rem 0;
}


</style>
