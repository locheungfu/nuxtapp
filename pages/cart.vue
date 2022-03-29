<template>
  <section class="cart-page">
    <div class="container-fluid mh-vh">
      <div class="row">
        <div class="cart-box main col-md-12">
          <div class="cart-header">
            <h3 class="cart-title">我的購物車<span> 總共{{ cartTotalQuantity }}件商品</span></h3>
          </div>
          <div class="cart-body">
            <div class="table-responsive">
              <table class="cart-table">
                <thead class="cart-thead">
                <tr class="cart-thead-tr">
                  <th scope="col" class="cart-thead-th t-name">
                    <div class="cart-th-title">商品名稱</div>
                  </th>
                  <th scope="col" class="cart-thead-th t-price">
                    <div class="cart-th-title">價錢</div>
                  </th>
                  <th scope="col" class="cart-thead-th t-quantity">
                    <div class="cart-th-title">數量</div>
                  </th>
                  <th scope="col" class="cart-thead-th t-operate">
                    <div class="cart-th-title"></div>
                  </th>
                </tr>
                </thead>

                <tr v-for="item in cart" :key="item.product.id" class="cart-tbody-tr">
                  <td data-th="商品名稱" class="cart-tbody-td">
                    <div class="row">
                      <div class="col-md-3"><img :src="item.product.thumbnailPath" alt="Product" class="cart-thumb-img"></div>
                      <div class="col-sm-9">
                        <div class="cart-item-info">
                          <h5 class="cart-item-h5">{{ item.product.name }}</h5>
                          <span class="cart-item-span">{{ item.product.brand.displayName }}</span>
                          <span class="cart-item-span">{{ item.product.category.displayName }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-th="價錢" class="cart-tbody-td">
                    <div v-if="item.product.isPromote" class="cart-item-price promote-price"><strong>${{ item.product.promotePrice }}</strong></div>
                    <div class="cart-item-price"><strong :class="{promote : item.product.isPromote}">${{ item.product.price }}</strong></div>

                  </td>
                  <td data-th="數量" class="cart-tbody-td">
                    <div class="cart-item-qty">
                      <a href="#" class="cart-reduce" @click.prevent="reduceProductQuantity(item.product.id)">
                        <font-awesome-icon :icon="['fas','minus']" class="cart-qty-icon"/>
                      </a>
                      <strong class="item-qty-num">{{ item.quantity }}</strong>
                      <a href="#" class="cart-add" @click.prevent="addProductToCart(item.product)">
                        <font-awesome-icon :icon="['fas','plus']" class="cart-qty-icon"/>
                      </a>
                    </div>

                  </td>
                  <td data-th="" class="cart-tbody-td"><a class="btn-remove" @click.prevent="removeProductFromCart(item.product.id)">
                    <font-awesome-icon :icon="['far','trash-alt']" class="cart-remove-icon"/>
                  </a></td>
                </tr>

                <tr v-show="cart.buildFee" class="cart-tbody-tr">
                  <td data-th="商品名稱" class="cart-tbody-td">
                    <div class="row">
                      <div class="col-md-3"><img src="/icons/build-fee.svg" alt="Product" class="cart-thumb-img"></div>
                      <div class="col-sm-9">
                        <div class="cart-item-info">
                          <h5 class="cart-item-h5">砌機服務費</h5>
                          <span class="cart-item-span">送1年免費上門檢查</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-th="價錢" class="cart-tbody-td">
                    <div class="cart-item-price"><strong>$200</strong></div>
                  </td>
                  <td data-th="數量" class="cart-tbody-td">
                  </td>
                  <td data-th="" class="cart-tbody-td"><a class="btn-remove" @click.prevent="removeProductFromCart(item.product.id)">
                    <font-awesome-icon :icon="['far','trash-alt']" class="cart-remove-icon"/>
                  </a></td>
                </tr>


              </table>
            </div>
            <div v-if="cart.length === 0" class="cart-body-msg-box">
              <div class="cart-body-msg">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" class="cart-msg-icon"/>
                <p class="cart-body-msg-p">購物車是空的，請返回商品目錄。</p>
              </div>


            </div>


            <div v-if="cart.length > 0" class="cart-table-bottom">
              <a href="#" class="btn-clean" @click.prevent="cleanAllProductsFromCart">清空購物車</a>
            </div>
          </div>
          <div v-if="cart.length > 0" class="cart-footer">
            <div class="row">
              <div class="col-md-6">
                <div class="cart-footer-box">
                  <div class="cart-footer-box-header">
                    <font-awesome-icon :icon="['fas','gift']" class="cart-bottom-icon"/>
                    優惠碼
                  </div>
                  <div class="cart-footer-box-content">
                    <div class="cart-footer-content-text"><p>如果你擁有優惠券碼，請於下方欄位輸入</p></div>
                    <div class="cart-coupon-gp input-group-prepend">
                      <input v-model="couponCode" type="text" placeholder="使用優惠券" class="form-control">
                      <button type="button" class="cart-apply-btn">使用</button>
                    </div>

                    <div class="cart-footer-box-header">
                      <font-awesome-icon :icon="['fas','pen']" class="cart-bottom-icon"/>
                      買家留言
                    </div>
                    <div class="cart-footer-box-content">
                      <div class="cart-footer-content-text"><p>如有需要，請於下方欄位輸入備注資料</p></div>
                      <div class="cart-memo-gp">
                        <textarea v-model="message" name="memo" cols="30" rows="2" class="form-control memo-textarea" maxlength="300"/>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="cart-footer-box">
                  <div class="cart-footer-box-header">
                    <font-awesome-icon :icon="['fas','calculator']" class="cart-bottom-icon"/>
                    總結
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
                    <button type="button" class="cart-apply-btn cart-submit-btn" @click="goOrderConfirm">確認</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapState, mapGetters, mapActions} from "vuex";

export default {

  data() {

    return {
      couponCode: "",
      message: "",
    }

  }
  ,

  computed: {

    ...mapState("cart", ["cart"]),

    ...mapGetters("cart", ["cartTotalPrice", "cartTotalQuantity", "getCartProductById", "getCartProductQuantity"])


  }
  ,

  methods: {
    ...mapActions("cart", ["addProductToCart", "removeProductFromCart", "cleanAllProductsFromCart", "reduceProductQuantity", "setOrderUsername", "setOrderMessage", "setOrderTotalPrice", "setOrderItems"]),

    goOrderConfirm() {

      if (this.$store.state.auth.token) {

        this.$nuxt.$loading.start();
        this.setOrderUsername();
        this.setOrderMessage(this.message);
        this.setOrderTotalPrice(this.cartTotalPrice);
        this.setOrderItems();

        setTimeout(() => {
          this.$router.push("/orders/confirm");
          this.$nuxt.$loading.finish();
        }, 500)
      } else {
        this.showMsgBox();
      }
    },

    showMsgBox() {
      this.$bvModal.msgBoxOk("請先進行會員登錄", {
        title: "登錄提示",
        headerBgVariant: "light",
        size: 'md',
        buttonSize: 'md',
        okVariant: 'success',
        headerClass: 'border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
        .then(() => {
         this.$router.push("/users/login");
        })
        .catch(err => {
          // An error occurred
        })
    }


  }
  ,
}
</script>

<style scoped>


a {
  text-decoration: none;
  color: #000;
}

p {
  font-size: 0.85rem;
}

.cart-box {
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
  margin-top: 45px;
  padding: 15px;
}

.main {
  margin-bottom: 45px;
  min-height: 50vh;
}

.cart-header {
  margin-bottom: 45px;
  text-align: center;
}

.cart-table {
  padding: 15px;
  width: 100%;
}

.cart-body {
  margin-bottom: 15px;
}

.cart-thead-th {
  background-color: #e5e5e8;
}

.cart-th-title {
  padding: 1.5rem 0.55rem 1.5rem;
}

.t-name {
  width: 60%;
}

.t-price {
  width: 16%
}

.t-quantity {
  width: 16%;
}

.t-operate {
  width: 8%;
}

.cart-tbody-tr {
  border-bottom: 1px solid #e5e5e8;
}


.cart-tbody-td {
  padding: 1.2rem 0.55rem 1.5rem;
  font-size: 1.2rem;
}

.cart-thumb-img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
  vertical-align: middle;
  border-style: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .cart-thumb-img {
    display: none;
  }
}

.cart-item-info {
  margin: auto;
}

.cart-item-span {
  font-weight: 400;
  color: #7c7c7c;
}

.cart-item-qty {
  display: inline-flex;
  align-items: center;
}

.item-qty-num {
  padding-left: 4px;
  padding-right: 4px;
}

.cart-qty-icon {
  font-size: small;
  color: #7c7c7c;
}

.cart-qty-icon:focus {
  color: #00509F;
}

.cart-add:active {
  position: relative;
  top: 1px;
}

.cart-reduce:active {
  position: relative;
  top: 1px;
}

.btn-remove {
  color: #7c7c7c;
}

.btn-remove:hover {
  cursor: pointer;
  color: #e80b0b;
}


.cart-body-msg-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-body-msg {
  padding: 25px;
  font-weight: 700;
  text-align: center;

}

.cart-msg-icon {
  font-size: 100px;
  color: #b7b7b7;
  padding: 10px;
  margin-bottom: 15px;
}


.btn-clean {
  box-shadow: inset 0 1px 0 0 #cf866c;
  background: #d0451b linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  border-radius: 3px;
  border: 1px solid #942911;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 13px;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0 1px 0 #854629;
}

.btn-clean:hover {
  background: #bc3315 linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
}

.btn-clean:active {
  position: relative;
  top: 1px;
}

.cart-footer-box {
  padding: 15px;
}

.cart-footer-box-header {
  background-color: #efefef;
  border: none;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 8px;
  font-weight: 700;
  border-radius: 16px;
  width: 100%;
}

.cart-footer-content-text {
  padding-left: 10px;
}

.cart-coupon-gp {
  display: flex;
  border: solid 1px #efefef;
  padding: 5px;
  margin-bottom: 20px;
  font-weight: 700;
  border-radius: 16px;
  width: 100%;
}


input[type="text"] {
  width: 100%;
  border: none;
  outline: none;
  box-shadow: none;
}

.cart-apply-btn {
  background-color: #000033;
  color: #fff;
  border: none;
  width: 50%;
  border-radius: 16px;
  font-weight: 700;
}

.cart-bottom-icon {
  margin-right: 5px;
}

.memo-textarea {
  box-shadow: none;
}

.cart-footer-box-cal {
  padding: 15px;

}

.cart-cal-ul {
  list-style: none;
  margin-left: 0;
  margin-bottom: 5px;
  padding-left: 0;
}

.cart-cal-li {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #efefef;
  padding-top: 10px;
  padding-bottom: 10px;
}

.cart-cal-strong-name {
  color: #7c7c7c;
}

.cart-submit-btn {
  width: 40%;
  float: right;
  padding-top: 7px;
  padding-bottom: 6px;
}

.item-enter-active, .item-leave-active {
  transition: opacity .5s;
}

.item-enter, .item-leave-active {
  opacity: 0;
}


</style>

