<template>
  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 col-6">
    <div class="product-card">
      <div class="product-card-header">
        <div v-if="showBadge" class="product-badge-gp">
          <div v-if="!product.isShortage" class="product-badge stock-badge">現貨</div>
          <div v-if="product.isShortage" class="product-badge shortage-badge">缺貨</div>
          <div v-if="product.isPromote" class="product-badge promote-badge">減價</div>
        </div>

        <div class="product-card-img-wrap">
          <a href="#" @click.prevent="isLinkActive && jumpToProductDetail(product.category.name,product.id)"><img class="product-thumb" :src="product.thumbnailPath" alt="Product"></a>
        </div>

      </div>

      <div class="product-card-body">
        <div class="product-category"> {{ product.category.displayName }}</div>
        <span class="product-title"><a href="#" @click.prevent.self="isLinkActive && jumpToProductDetail(product.category.name,product.id)">{{ product.name }}</a></span>
        <span v-if="product.isPromote" class="product-price promote-price">${{ product.promotePrice }}</span>
        <span class="product-price" :class="{ promote: product.isPromote}"> ${{ product.price }}</span>
      </div>

      <div v-if="showButton" class="product-card-footer">
        <div class="product-button-group">
          <a class="product-btn btn-wishlist">
            <font-awesome-icon :icon="['fas','heart']" class="svg-icon wishlist"/>
            <span>收藏</span></a>
          <a v-if="!product.isShortage" class="product-btn btn-cart" @click="addProductToCart(product)">
            <font-awesome-icon :icon="['fas','shopping-cart']" class="svg-icon cart"/>
            <span>加到購物車</span></a>
          <a class="product-btn btn-detail" @click.prevent="jumpToProductDetail(product.category.name, product.id)">
            <font-awesome-icon :icon="['fas','arrow-right']" class="svg-icon detail"/>
            <span>產品資料</span></a>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ProductCard",

  props: {

    showBadge: {
      type: Boolean,
      required: false,
      default: false,
    },

    showButton: {
      type: Boolean,
      required: false,
      default: false,
    },

    isLinkActive: {
      type: Boolean,
      required: false,
      default: true,
    },

    isBuildList: {
      type: Boolean,
      required: false,
      default: false,
    },

    product: {
      type: Object,
      required: true,
      default: null,
    },
  },

  computed: {},

  methods: {

    ...mapActions("cart", ["addProductToCart"]),

    jumpToProductDetail(category, pid) {
      this.$router.push({
          name: 'products-category-pid', params: {category: category, pid: pid}
        }
      );
    },
  },
};

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #232323;;
}

.product-card {
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: #fff;
  margin: 5px 7px;
}

.product-card:hover {
  box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
  transition: .3s;
}

.product-thumb {
  display: block;
  width: 100%;
  user-select: none;
}

.product-card-header {
  padding: 10px;
}

.product-badge-gp {
  display: flex;
}

.product-badge {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .055rem;
  line-height: 18px;
  border-radius: 3px;
  padding: 2px 6px 2px 6px;
  color: #fff;
  margin-right: 5px;
}

.stock-badge {
  background-color: #fff;
  color: #00be2e;
}

.shortage-badge {
  background-color: #212529;
}

.promote-badge {
  background-color: #dc3545;
}

.product-card-body {
  padding: 10px;
}

.product-card-img-wrap {
  padding: 5px;
}

.product-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 3px;
  overflow: hidden;
  min-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-category {
  width: 100%;
  font-size: 0.8rem;
  margin-bottom: 5px;
  color: #7c7c7c;
}

.product-price {
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 5px;
  font-size: 1.15rem;
  font-weight: 700;
  color: #00509F;
}

.promote-price {
  color: #dc3545;
}

.promote {
  color: #7a7a7a;
  text-decoration: line-through solid 2px;
}

.product-button-group {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-top: 1px solid #e5e5e5;
}

.product-btn {
  display: table-cell;
  position: relative;
  height: 58px;
  padding: 8px;
  overflow: hidden;
  vertical-align: middle;
  text-align: center;
  color: #4f4e4e;
  transition: background-color .3s;
  background: none;
  border-right: 1px solid #e5e5e5;
}

.product-button-group a:hover {
  color: #00509F;
  cursor: pointer;
}

.product-btn > span {
  display: block;
  position: absolute;
  bottom: 7px;
  left: 0;
  width: 100%;
  -webkit-transform: translateY(10px);
  -ms-transform: translateY(10px);
  transform: translateY(10px);
  white-space: nowrap;
  opacity: 0;
  font-size: 0.7rem;
  user-select: none;
}

.product-btn > .svg-icon,
.product-btn > span {
  transition: all .3s;
}

.product-btn:hover > span {
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
}

.product-btn > .svg-icon {
  display: inline-block;
  position: relative;
  margin-top: 5px;
  font-size: 15px;
}

.product-btn:hover > .svg-icon {
  -webkit-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
  transform: translateY(-10px);
}

</style>
