<template>
  <div v-swiper="swiperOption" class="swiper" :loadtheme="false">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="product in products" :key="product.id">
        <ProductCard v-for="product in products" :key="product.id" :product="product"/>
        <!-- Render original HTML in server, render Swiper in browser (client) -->
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import {directive} from "vue-awesome-swiper";
import ProductCard from "@/components/ProductCard";


export default {
  name: "Swiper",

  components: {ProductCard},

  directives: {
    swiper: directive
  },

  props: {
    products: {
      type: Array,
      required: true,
    }

  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: -10,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    }
  }
}


</script>


<style scoped>


</style>
