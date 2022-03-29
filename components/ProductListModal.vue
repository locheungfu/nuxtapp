<template xmlns="http://www.w3.org/1999/html">
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <div class="modal-title">
          <h3>選擇產品</h3>
        </div>
        <div class="close">
          <font-awesome-icon :icon="['fas','window-close']" class="close-icon" @click="$emit('close-modal')"/>
        </div>
      </div>

      <div class="modal-body">
        <div class="body-header">
          <div class="input-field">
            <span class="input-field-icon"><font-awesome-icon :icon="['fas','search']" class="search-icon"/></span><input type="search" v-model="searchName" class="form-control" placeholder="搜尋"/>
          </div>
        </div>
        <div class="main-box">
          <div class="item" v-for="product in products" :key="product.id">
            <div class="item-box" @click="addToBuildList(product)">
              <div class="item-body">
                <figure class="item-info">
                  <img :src="product.thumbnailPath">
                  <figcaption class="item-title">
                    <h5>{{ product.name }}</h5>
                  </figcaption>
                </figure>
              </div>
              <div class="item-footer">
                <span class="price">{{ product.price }} HKD</span>
                <span class="stock"><small>現貨</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-footer">
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapActions, mapMutations} from "vuex";


export default {

  data() {
    return {
      searchName: ""
    }
  },

  computed: {
    ...mapState("product", ["products"]),
    ...mapState("builder", ["buildList"]),
    ...mapGetters("builder", ["getBuildProductByCategory"])

  },

  methods: {
    ...mapActions("product", ["getProductsByCategory"]),
    ...mapActions("builder", ["addProductToBuildList", "validateProduct"]),

    async addToBuildList(product) {
      let quantity = 1;
      await this.addProductToBuildList({product, quantity});
      await this.validate(product);
      this.$emit('close-modal');
    },

    filterBuildProduct(category) {
      return this.getBuildProductByCategory(category);
    },


    validate(product) {
      let category = product.category.name;
      let message = "";
      let field = "";

      if(category === "cpu") {
        let cpuSocket = product.specs.find(x => x.specsAttribute.name === "socket").specsValue.value;
        let motherboard = this.buildList.find(x => x.product.category.name === "motherboard");
        if(motherboard) {
          let motherboardSocket = motherboard.product.specs.find(x => x.specsAttribute.name === "socket").specsValue.value;
          if(cpuSocket !== motherboardSocket) {
            message = "CPU與主板插座不相符!";
            field =  "cpu"
          }
          console.log({message, field})
        }

      }

      if(category === "motherboard") {
        console.log("motherboard")
      }

      if(category === "ram") {
        console.log("ram")
      }

    }

  }


}
</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 9999;
}


.modal {
  display: block;
  position: relative;
  height: 70%;
  width: 70%;
  margin-top: 5%;
  max-width: 1200px;
  text-align: center;
  background-color: white;
  border: solid 2px;
  padding: 10px;
  overflow: auto;
  overflow-x: hidden;
}

.modal::-webkit-scrollbar {
  width: 10px;
}

.modal::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.modal::-webkit-scrollbar-thumb {
  background: #888;
}

.modal::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.modal .modal-header {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal .modal-title {
  padding: 6px;
}

.modal-header h3 {
  font-weight: 700;
  font-size: 1.8rem;
}

.modal-header .close {
  color: #00509F;
  cursor: pointer;
  font-size: 25px;
  border-radius: 10px;
  margin: 0;
  padding: 10px;
}

.modal .modal-body {
  margin-top: 25px;
  padding-left: 35px;
  padding-right: 35px;
}

.modal-body .body-header {
  padding: 8px;
}

.input-field {
  display: flex;
  cursor: pointer;
  align-items: center;
  color: #00509F;
  margin: 5px 3px 5px 3px;
  width: 50%;
  padding: 5px;
  border: solid 3px #f8f9fa;
  border-radius: 0.80rem;
}

.input-field-icon {
  padding: 5px 10px 5px 5px;
}

input[type='search'] {
  border: none;
  outline: none;
  box-shadow: none;
}

.modal .main-box {
  margin-top: 15px;
}

.modal .item {
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 10px 15px 10px;
  width: 100%;
  float: left;
}

.modal .item-box {
  display: flex;
  position: relative;
  flex-direction: column;
  word-wrap: break-word;
  border: solid 3px #f8f9fa;
  border-radius: 0.80rem;
  background-color: #fff;
  background-clip: border-box;
}

.item-box:hover {
  box-shadow: 13px 6px 35px -1px rgba(153, 153, 153, 0.3);
  transition: 0.2s;
  border-color: rgb(22, 22, 201);
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .item {
    max-width: 33%;
  }
}

.item-info img {
  display: block;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
}

.item-box .item-title {
  display: -webkit-box;
  overflow: hidden;
  text-align: left;
  min-height: 5rem;
  padding: 15px;
}

.item-title h5 {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.2rem;
}

.item-box .item-footer {
  display: inline-block;
  border-top: solid 3px #f8f9fa;
  padding: 15px;
  font-size: 0.96rem;
  text-align: left;
}

.item-footer .stock {
  color: #00be2e;
  float: right;
}

.modal .modal-footer {
  border: 0;
}


</style>
