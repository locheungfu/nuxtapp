<template>
    <section class="builder">
      <div class="container-fluid mh-vh">
        <div class="row">
          <div class="col-md-8 col-centered">
            <div class="builder-box main">
              <div class="builder-box-header">
                <h3>砌機列表</h3>
              </div>
              <div class="builder-box-body">
                <div class="item-gp" v-for="category in filteredCategories" :key="category.name">
                  <div class="item-gp-header">{{ category.displayName }}
                    <font-awesome-icon :icon="['fas','plus']" class="svg-icon" @click="showProductList(category.name)"/>
                  </div>
                  <div class="item-row">
                    <div class="item-row-card" v-for="item in filterBuildProduct(category.name)">
                      <div class="item-row-card-info left">
                        <img class="item-pic" :src="item.product.thumbnailPath" height="50px" alt="#">
                        <span class="item-name">{{ item.product.name }}</span>
                      </div>
                      <div class="item-row-card-info center">
                        <span class="item-price">${{ item.product.price }}</span>
                      </div>

                      <div class="item-row-card-info right">
                        <div class="btn btn-rm" @click="removeSelectedProduct(item.product)">
                          <font-awesome-icon :icon="['fas','trash-alt']" class="svg-icon"/>
                        </div>
                        <div class="btn btn-rs">
                          <font-awesome-icon :icon="['fas','sync-alt']" class="svg-icon"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="builder-box-footer">
                <div class="msg-area">
                  <span>環境局局長黃錦星在社交媒體發文，祝市民「6綠大順」。</span>
                  <span>環境局局長黃錦星在社交媒體發文，祝市民「6綠大順」。</span>
                </div>


                <div class="count-detail">
                  <table class="count-detail-table">
                    <tbody>
                    <tr>
                      <th class="count-detail-th">商品總額</th>
                      <td class="count-detail-td">{{ countTotalPrice }}</td>
                    </tr>
                    <tr>
                      <th class="count-detail-th">砌機服務</th>
                      <td class="count-detail-td">是</td>
                    </tr>
                    <tr>
                      <th class="count-detail-th">總共</th>
                      <td class="count-detail-td">$ {{ countTotalPrice }}</td>
                    </tr>
                    <tr>
                      <td class="count-detail-td" colspan=2>
                        <div class="btn btn-success btn-block">加到購物車</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-centered">
            <div class="builder-box sub">
              <div class="builder-box-header"></div>
              <h3>推薦組合</h3>
              <div class="builder-box-body"></div>
              <div class="builder-box-footer"></div>
            </div>
          </div>
        </div>
      </div>
      <ProductListModal v-if="showModal" @close-modal="showModal = false"/>
    </section>
</template>

<script>

import productListModal from "@/components/ProductListModal";
import {mapActions, mapGetters, mapState} from "vuex";


export default {

  components: {productListModal},

  data() {
    return {
      showModal: false,
    }
  },

  async asyncData({$axios}) {
    const categories = await $axios.$get(process.env.API_URL + "/categories/all");
    return {categories};
  },

  computed: {

    ...mapState("builder", ["buildList"]),
    ...mapGetters("builder", ["getBuildProductByCategory", "countTotalPrice"]),

    filteredCategories() {
      return this.categories.filter(category => category.isActive && category.isBuildList)
    }

  },

  methods: {

    ...mapActions("product", ["getProductsByCategory"]),
    ...mapActions("builder", ["deleteBuildListProduct"]),


    showProductList(categoryName) {
      this.getProductsByCategory(categoryName);
      this.showModal = true;
    },

    filterBuildProduct(category) {
      return this.getBuildProductByCategory(category);
    },

    removeSelectedProduct(product) {
      this.deleteBuildListProduct(product);
    },


  }
}
</script>


<style scoped>

.col-centered {
  margin: 45px auto;
  float: none;
}

.builder-box {
  background-color: #ffffff;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
  padding: 25px 15px 20px 15px;
}

.builder-box-header {
  padding-left: 10px;
}

.builder-box-body {
  padding: 10px;
}

.item-gp-header {
  margin-top: 15px;
}

.item-row {
  margin-top: 3px;
  color: #7c7c7c;
}

.item-row-card {
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.08)
}

.item-row-card-info {
  display: flex;
  flex-direction: row;
  margin: auto 0;
  align-items: center;
}

.item-row-card-info.left {
  width: 100%;
  max-width: 600px;
}

.item-pic img {
  max-width: 100%;
  margin: auto;
}

.item-row-card-info.center {
  margin: 0 5px 0 5px;
  text-align: left;
}

.item-row-card-info span {
  display: block;
  font-weight: bold;
  padding-left: 5px;
}

.btn {
  padding-right: 5px;
  color: #7c7c7c;
}

.btn-rm:hover {
  color: red;
}

.btn-rs:hover {
  color: blue;
}

.builder-box-footer {
  display: flex;
  border-top: solid 2px #7c7c7c;
  padding: 10px;
}

.msg-area {
  display: flex;;
  flex-direction: column;
  margin-left: 0;
  margin-right: auto;
  font-size: small;
  justify-items: left;
  padding: 5px;
}

.count-detail {
  display: flex;
  margin-left: 10px;
  margin-right: 0;
  white-space: nowrap;
}

.count-detail-table {
  text-align: left;
}

.count-detail-td {
  padding: 5px;
}

.count-detail-th {
  padding: 5px;
}

.btn.btn-success {
  border-radius: 15px;
  padding: 5px;
  color: white;
  font-weight: 700;
}


</style>
