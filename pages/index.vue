<template>
  <div class="home-page">
    <div class="container-fluid">
      <div class="row">
        <div class="main-box col">
          <div class="home-header col-md-12">
            <b-carousel
              id="carousel-fade"
              style="text-shadow: 0 0 2px #000"
              fade
              indicators
            >
              <b-carousel-slide
                v-for="banner in banners"
                :key="banner.url"
                :caption="banner.caption"
                :img-src="banner.url"
              ></b-carousel-slide>
            </b-carousel>
          </div>
          <div class="home-body col-md-12">
            <div class="showcase">
              <div class="showcase-title">最新上架</div>
              <div v-if="latestProds.length !== 0 " class="showcase-body">
                <product-card v-for="product in latestProds" :key="product.id" :product="product"/>
              </div>
            </div>
            <div class="showcase">
              <div class="showcase-title">特價產品</div>
              <div v-if="promoteProds.length !== 0 " class="showcase-body">
                <product-card v-for="product in promoteProds" :key="product.id" :product="product" :show-badge="true"/>
              </div>
            </div>
            <div class="showcase">
              <div class="showcase-title">熱賣產品</div>
              <div v-if="bestSellProds.length !== 0 " class="showcase-body">
                <product-card v-for="product in bestSellProds" :key="product.id" :product="product"/>
              </div>
            </div>

            <div class="home-footer col-md-12">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import slider from "@/components/Slider";
import productCard from "@/components/ProductCard";

export default {

  components: {
    productCard
  },

  data() {
    return {
      banners: [
        {url: "/slider/banner-001.jpg", caption: "自選砌機 打造最強電競組合"},
        {url: "slider/banner-002.jpg", caption: ""},
        {url: "/slider/banner-003.jpg", caption: "RTX30系列顯示卡已全線上架"}],
    }
  },

  async asyncData({$axios}) {
    try {
      let latestProds = await $axios.$get(process.env.API_URL + "/products/getLatestProduct");
      let promoteProds = await $axios.$get(process.env.API_URL + "/products/getPromoteProduct");
      let bestSellProds = await $axios.$get(process.env.API_URL + "/products/getBestSellProduct")

      return {latestProds, promoteProds, bestSellProds};
    } catch (e) {
      console.log(e);
    }
  },

}
</script>

<style scoped>

.main-box {
  padding: 0;
  margin: 0;
  box-shadow: none;
  border: 1px solid #e5e5e5;
}

.home-header {
  padding: 0;

}

.home-body {
  padding: 0 15px;
}

.showcase {
  padding: 15px;
  background-color: #ffffff;
}

.showcase-title {
  text-align: left;
  font-size: 1.7rem;
  font-weight: 700;
  color: #7c7c7c;
  padding-left: 5px;
  border-bottom: 1px solid #d2d2d2;
  margin-bottom: 10px;
}

.showcase-body {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}



</style>
