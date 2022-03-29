<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="order-box">
        <div class="row">
          <div class="col-md-8">
            <div class="item-list-wrap">
              <div class="field-header">
                <h3 class="field-title">訂單確認</h3>
              </div>
              <div class="field-body">
                <div class="card cart-item-card" v-for="item in cart" :key="item.product.id">
                  <div class="row no-gutters">
                    <div class="img-wrap">
                      <img class="img-fluid" :src="item.product.thumbnailPath"/>
                    </div>
                    <div class="card-body">
                      <h5 class="item-name">{{ item.product.displayName }}</h5>
                      <p class="item-quantity">數量: {{ item.quantity }}件</p>
                    </div>
                    <div class="card-right">
                      <div v-if="item.product.isPromote" class="item-price">${{ item.product.promotePrice }}</div>
                      <div class="item-price" :class="{'item-promote': item.product.isPromote }">${{ item.product.price }}</div>
                    </div>
                  </div>
                </div>
                <div class="cart-footer-box-cal">
                  <ul class="cart-cal-ul">
                    <li class="cart-cal-li"><strong class="cart-cal-strong-name">商品總計 </strong><strong>${{ cartTotalPrice }}</strong></li>
                    <li class="cart-cal-li"><strong class="cart-cal-strong-name">運費計算</strong><strong>免費</strong></li>
                    <li class="cart-cal-li"><strong class="cart-cal-strong-name">優惠</strong><strong>$0</strong></li>
                    <li class="cart-cal-li"><strong class="cart-cal-strong-name">訂單總額</strong>
                      <h3 class="cart-cal-h3">${{ cartTotalPrice }}</h3>
                    </li>
                  </ul>
                </div>
                <div v-if="order.message" class="user-message-wrap">
                  <span>買家留言:</span>
                  <p class="custom-msg-p">{{ order.message }}</p>
                </div>

              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-12">
                <div class="address-wrap">
                  <div class="field-header">
                    <h3 class="field-title">送貨地址</h3>
                  </div>
                  <div class="address-select-wrap">
                    <div class="address-item" v-for="address in addresses" :key="address.id">
                      <div class="address-row">
                        <input type="radio" :value="address.id" v-model="addressId" name="address-id">
                        {{ address.recipientName }}
                        {{ address.recipientPhone }}
                      </div>
                      <div class="address-row">
                        {{ address.detailAddress }}
                        {{ address.district }}
                      </div>

                    </div>
                    <div class="button-wrap">
                      <b-button variant="secondary" @click="onClickAddAddress">新增地址</b-button>
                    </div>
                    <p class="error-msg-p">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="payment-wrap">
                  <div class="field-header">
                    <h3 class="field-title">付款方式</h3>
                  </div>
                  <div class="button-wrap">
                    <b-button variant="primary" @click="onClickCreateOrder" block>付款</b-button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
    <UserAddAddressModal/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import UserAddAddressModal from "@/components/UserAddAddressModal";

export default {

  name: "confirm",

  components: { UserAddAddressModal },

  data() {
    return {
      addressId: null,
      errorMessage: "",
    }
  },

  async asyncData({$axios, store}) {

    const addresses = await $axios.$get(process.env.API_URL + "/users/getAddresses", {params: {username: store.state.auth.user.username}});
    console.log(addresses)
    return {addresses};

  },

  computed: {
    ...mapState("cart", ["order", "cart"]),
    ...mapGetters("cart", ["cartTotalPrice"]),

    isOrderEmpty() {
      return this.order && Object.keys(this.order).length === 0 && this.order.constructor === Object;
    },
  },

  methods: {

    ...mapActions("cart", ["setOrderAddress", "cleanAllProductsFromCart"]),

    onClickAddAddress() {
      this.$bvModal.show("modal-add-address")
    },

    onClickCreateOrder() {

      if (this.addressId) {

        this.setOrderAddress(this.addressId);

        this.$axios.$post(process.env.API_URL + "/orders/createOrder/", this.order)
          .then((response) => {
            console.log(response);
            this.cleanAllProductsFromCart();
            this.$router.push({path: "/orders/payment", query: {order: response.id, username: response.user.username}})
          })
          .catch(error => {
            console.log(error);
            return this.$nuxt.error({statusCode: 404, message: "發生錯誤"})
          })
      } else {
        this.errorMessage = "請選擇送貨地址"
        this.$store.dispatch("notification/addNotification", {type: "warning", message: "請選擇送貨地址"})
      }

    }
  }
}
</script>

<style scoped>

.order-box {
  margin: 1.25rem 0;
}

.item-list-wrap {
  min-height: 60vh;
  border-radius: .25rem;
  box-shadow: 2px 5px 8px 1px #D6D6D6;
  border: 1px solid #e5e5e5;
  margin-bottom: 1.25rem;
}

.field-header {
  border-bottom: 1px solid #a2a2a2;
  background-color: #d5d5d5;
  border-radius: .25rem .25rem 0 0;
}

.field-title {
  font-weight: 600;
  margin: 0;
  padding: .85rem;
}

.field-body {
  padding: .85rem;
}

.cart-item-card {
  margin-bottom: .25rem;
}

.img-wrap {
  padding: .25rem;
  max-width: 6rem;
}

.card-body {
  padding: 0;
  margin: auto 0;
  max-width: 60%;
}

.item-name {
  font-weight: 500;
  font-size: 1rem;
}

.item-quantity {
  font-weight: 400;
  font-size: .85rem;
  opacity: 0.8;
}

.card-right {
  font-weight: 500;
  font-size: 1rem;
  color: #00509F;
  margin: auto 1rem auto auto;
  max-width: 40%;
}

.item-promote {
  color: #4f4e4e;
  text-decoration: line-through;
}

.cart-cal-ul {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.cart-cal-li {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #efefef;
  padding-top: 10px;
  padding-bottom: 10px;
}

.user-message-wrap {
  font-size: .85rem;
}

.address-wrap {
  min-height: 10vh;
  border-radius: .25rem;
  box-shadow: 2px 5px 8px 1px #D6D6D6;
  border: 1px solid #e5e5e5;
}

.address-select-wrap {
  padding: .85rem;
}

.address-item {
  padding: 0.25rem 0;
}

.payment-wrap {
  margin: .85rem 0;
  border-radius: .25rem;
  box-shadow: 2px 5px 8px 1px #D6D6D6;
  border: 1px solid #e5e5e5;
}

.button-wrap {
  padding: .25rem .85rem;
  text-align: center;
}


.error-msg-p {
  visibility: visible;
  color: red;
}

.msg-box {
  display: block;
  margin-top: 20%;
  text-align: center;
}

.msg-p {
  font-weight: 500;
  font-size: 2rem;
}


.msg-icon-wrap {
  display: flex;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  border: 3px solid #dc3545;
  margin: 1.25rem auto;
  align-items: center;
}

.msg-icon {
  margin: 0 auto;
  font-size: 2rem;
  color: #dc3545;
}

.back-button {
  width: 50%;
}
</style>
