<template>
  <div class="master-wrapper">
    <div class="container-fluid mb-45">
      <div class="row">
        <div class="col-12 col-md-2 col-centered">
          <ProductCategorySidebar/>
        </div>

        <div class="col-12 col-md-10 col-centered">
          <div class="product-detail-wrap">
            <div v-if="product && product.category" class="product-detail-box">

              <div class="product-detail-header">
                <div class="row">
                  <div class="product-img-box col-lg-6">
                    <img class="img-fluid" :src="product.thumbnailPath" alt="Product"/>
                  </div>
                  <div class="product-info-box col-lg-6">
                    <div class="product-title">
                      <h3 class="product-title-h3"> {{ product.displayName }} </h3>
                    </div>
                    <div class="product-ops-box">
                      <h4 v-if="product.isPromote" class="product-price promote-price">${{ product.promotePrice }}</h4>
                      <h4 class="product-price" :class="{ promote: product.isPromote}">${{ product.price }}</h4>
                      <div v-if="!product.isShortage" class="product-info-button">
                        <a href="#" class="ops-btn add-cart-btn" @click.prevent="addProductToCart(product)">
                          <font-awesome-icon :icon="['fas','shopping-cart']" class="cart-add-icon"/>
                          加到購物車</a>
                      </div>
                    </div>
                    <div class="product-info-base">
                      <ul class="product-info-base-ul">
                        <li class="product-info-base-li"><strong class="product-info-base-name">商品編號</strong><strong>{{ product.id }}</strong></li>
                        <li class="product-info-base-li"><strong class="product-info-base-name">類別</strong><strong>{{ product.category.displayName }}</strong></li>
                        <li class="product-info-base-li"><strong class="product-info-base-name">廠商</strong><strong>{{ product.brand.displayName }}</strong></li>
                        <li class="product-info-base-li"><strong class="product-info-base-name">原廠編號</strong><strong>{{ product.modelNumber }}</strong></li>
                        <li class="product-info-base-li"><strong class="product-info-base-name">推出日期</strong><strong>{{ product.releaseDate }}</strong></li>
                        <li class="product-info-base-li"><strong class="product-info-base-name">官方保養</strong><strong>{{ product.warrantyPeriod }} 年</strong></li>
                      </ul>
                    </div>


                  </div>
                </div>
              </div>

              <div class="product-detail-body">
                <div class="accordion-box">
                  <button v-b-toggle.collapse-1 class="product-accordion-btn">
                    規格參數<span class="accordion-btn-span"><font-awesome-icon :icon="['fas','plus']" class="accordion-icon-plus"/><font-awesome-icon :icon="['fas','minus']" class="accordion-icon-minus"/></span>
                  </button>
                  <b-collapse visible id="collapse-1">
                    <div class="accordion-card">
                      <div class="accordion-card-body">
                        <div class="table-responsive">
                          <table class="product-specs-table table-striped">
                            <tbody class="product-specs-tbody">
                            <tr class="product-specs-tbody-tr" v-for="spec in specsList" :key="spec.id">
                              <td class="product-specs-tbody-td t-attr">
                                {{ spec.specsAttribute.displayName }}
                              </td>
                              <td class="product-specs-tbody-td t-val">
                                {{ spec.specsValue.value }}
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </b-collapse>
                </div>
                <div class="accordion-box">
                  <button v-b-toggle.collapse-2 class="product-accordion-btn">
                    商品詳情<span class="accordion-btn-span"><font-awesome-icon :icon="['fas','plus']" class="accordion-icon-plus"/><font-awesome-icon :icon="['fas','minus']" class="accordion-icon-minus"/></span>
                  </button>
                  <b-collapse visible id="collapse-2">
                    <b-card>{{ product.contentHtml}}</b-card>
                  </b-collapse>
                </div>
                <div class="accordion-box">
                  <button v-b-toggle.collapse-3 class="product-accordion-btn">
                    其他資訊<span class="accordion-btn-span"><font-awesome-icon :icon="['fas','plus']" class="accordion-icon-plus"/><font-awesome-icon :icon="['fas','minus']" class="accordion-icon-minus"/></span>
                  </button>
                  <b-collapse visible id="collapse-3">
                    <b-card>官方連結: {{product.officialUrl }}}</b-card>
                  </b-collapse>
                </div>
              </div>


              <div class="product-detail-footer">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import ProductCategorySidebar from "@/components/ProductCategorySidebar";
import {mapActions, mapState} from "vuex";


export default {

  components: {
    ProductCategorySidebar
  },

  watchQuery: true,

  async asyncData({$axios, params}) {

    const product = await $axios.$get(process.env.API_URL + `/products/productId/${params.pid}`);
    return {product};

  },

  computed: {

     specsList() {
      const list = this.product.specs;
      const sortByPriority = list => [...list].sort((a, b) => a.specsAttribute.priority - b.specsAttribute.priority);
      return sortByPriority(list);
    }
  },

  methods: {
    ...mapActions("cart", ["addProductToCart"])
  }

}
</script>

<style scoped>

.col-centered {
  margin: 45px auto 0 auto;
  float: none;
}

a {
  text-decoration: none;
}

.mb-45{
  margin-bottom: 45px;
}

.product-detail-wrap {
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  background-color: #fff;
  padding: 1.25rem;
  border-radius: 1.25rem;
  border: 1px #e5e5e5 solid;
}

.product-detail-header {
  padding: 15px;
}

.product-title {
  margin-bottom: 18px;
}

.product-title-h3 {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-price {
  font-size: 1.5rem;
  margin-right: 10px
}

.product-info-button {
  margin: 0 auto;
}

.product-ops-box {
  display: inline-flex;
}

.add-cart-btn:hover {
  background: #40a600 linear-gradient(to bottom, #40a600 5%, #37b055 100%);
  color: #fff;
}

.cart-add-icon {
  margin-right: 2px;
}

.product-info-base-ul {
  list-style: none;
  margin-left: 0;
  margin-bottom: 5px;
  padding-left: 0;
}

.product-info-base-li {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #efefef;
  padding-top: 10px;
  padding-bottom: 10px;
}

.product-info-base-name {
  color: #7c7c7c;
}

.accordion-box {
  margin-bottom: 1.15rem;
}

.product-accordion-btn {
  display: inline-block;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 500;
  vertical-align: middle;
  color: #fff;
  background-color: #00509F;
  border-color: #efefef;
  margin: 0;
  width: 100%;
  line-height: 2;
  user-select: none;
}

.product-accordion-btn:hover {
  background-color: #001c36;
}

.accordion-btn-span {
  position: relative;
  float: right;
}

button[aria-expanded=true] .accordion-icon-plus {
  display: none;
}

button[aria-expanded=false] .accordion-icon-minus {
  display: none;
}

.accordion-card {
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);;
}

.accordion-card-body {
  min-height: 5px;
}

.product-specs-table {
  width: 100%;
}

.product-specs-tbody-td {
  padding: 5px 5px;
}

.t-attr {
  width: 40%;
}

.t-val {
  width: 60%;
}


</style>

