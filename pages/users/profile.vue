<template>
  <div class="wrapper">
    <div class="user-box">
      <div class="user-info">
        <div class="title"><h3>用戶資料</h3></div>
        <div class="info-content">
          <ul class="info-ul">
            <li class="info-li"><strong class="inf0-strong">登入名稱</strong><strong v-if="user">{{ user.username }}</strong></li>
            <li class="info-li"><strong class="inf0-strong">會員名稱</strong><strong v-if="user">{{ getUserFullName }}</strong></li>
            <li class="info-li"><strong class="inf0-strong">電郵地址</strong><strong v-if="user">{{ user.email }}</strong></li>
            <li class="info-li"><strong class="inf0-strong">加入日期</strong><strong v-if="user">{{ formatDate }}</strong></li>
          </ul>
        </div>
      </div>
      <div class="user-orders">
        <div class="title"><h3>訂單記錄</h3></div>
        <div class="info-content">
          <div v-if="orders.length === 0" class="no-order-msg">
            <p>沒有任何訂單記錄</p>
          </div>
          <div class="order-list-wrap">
            <div class="order-list" v-for="order in orderList" :key="order.id">
              <div class="order-header">
                <div class="order-no"><strong>訂單編號</strong> {{ order.id }}</div>
                <div class="order-date"><strong>創建日期</strong> {{ formatOrderDate(order.createTimestamp) }}</div>
                <div class="order-badge">
                  <b-badge size="md" variant="dark">{{ order.status }}</b-badge>
                </div>
              </div>
              <div class="order-body">
                <div class="card cart-item-card" v-for="item in order.orderItems" :key="item.product.id">
                  <div class="row no-gutters">
                    <div class="img-wrap">
                      <img class="img-fluid" :src="item.product.thumbnailPath"/>
                    </div>
                    <div class="card-body">
                      <h5 class="item-name">{{ item.product.displayName }}</h5>
                      <p class="item-quantity">數量: {{ item.quantity }}件</p>
                    </div>
                    <div class="card-right">
                      <div class="item-price">${{ item.price }}</div>
                    </div>
                  </div>
                </div>
              </div>
                <div class="order-footer">
                  <div class="cart-footer-box-cal">
                    <ul class="cart-cal-ul">
                      <li class="cart-cal-li"><strong class="cart-cal-strong-name">運費計算</strong><strong>免費</strong></li>
                      <li class="cart-cal-li"><strong class="cart-cal-strong-name">優惠</strong><strong>$0</strong></li>
                      <li class="cart-cal-li"><strong class="cart-cal-strong-name">訂單總額</strong>
                        <h3 class="cart-cal-h3">${{ order.totalPrice }}</h3>
                      </li>
                    </ul>
                  </div>
                  <div v-if="order.address " class="address-field">送貨地址 {{ order.address.recipientName }} {{ order.address.recipientPhone}} {{ order.address.detailAddress }} {{ order.address.district}}</div>
                  <div class="total-price"></div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


</template>

<script>

import authenticate from "../../middleware/authenticate";
import {mapGetters, mapState} from "vuex";

export default {

  middleware: "authenticate",

  layout: "user-main",

  data() {
    return {}
  },

  async asyncData({$axios, store}) {
    try {
      const orders = await $axios.$get(process.env.API_URL + "/orders/getOrderByUsername", {params: {username: store.state.auth.user.username}});
      return {orders};
    } catch (e) {
      console.log(e)
    }
  },

  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["getUserRole", "getUserFullName"]),

    orderList() {

      return this.orders.sort((a, b) => {
          const toTimestamp = (strDate) => {
            const datetime = Date.parse(strDate);
            return datetime / 1000;
          }
          return toTimestamp((b.createTimestamp)) - toTimestamp((a.createTimestamp));
        }
      )
    },



    formatDate() {
      return this.user.createTimestamp.split(" ")[0];
    },
  },

  methods: {

    formatOrderDate(date) {
      return date.toString().split(" ").splice(0, 2).join(" ");
    },
  }

}
</script>

<style scoped>

.user-box {
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
  padding: 2.25rem;
  margin-bottom: 1.25rem;
}

.user-info {
  margin-bottom: 1.25rem;
}

.title {
  border-bottom: #e5e5e5 1px solid;
}

.info-ul {
  list-style: none;
  margin-left: 0;
  margin-bottom: 5px;
  padding-left: 0;
}

.info-li {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #efefef;
  padding-top: 10px;
  padding-bottom: 10px;
}

.no-order-msg {
  font-size: 1.25rem;
  font-weight: 500;
  padding: 1.25rem 0;
  text-align: center;
  color: #00509F;
}

.order-list {
  border: 1px solid #aad4ff;
  padding: .25rem;
  margin-bottom: 1rem;
}

.order-header {
  background-color: #e5e5e5;
  color: #7c7c7c;
  display: flex;
  padding: 1rem .25rem;
}

.order-list-wrap {
  padding: 1.25rem 0;
}

.order-date {
  padding: 0 1rem;
}

.order-badge {
  margin-left: auto;;
}

.order-body {
  padding: 1rem 0;
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

.address-field{
  color: #7c7c7c;
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


.info-strong-name {
  color: #7c7c7c;
}


</style>
