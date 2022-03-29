<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div v-if="order" class="msg-box">
            <div class="box-header">
              <div class="shop-icon-wrap">
                <img class="img-fluid shop-icon-img" src="/icons/pc-shop-logo.svg" alt="online shop logo">
              </div>
            </div>
            <div class="box-body">
              <div class="main-msg">
                <div class="msg-wrap">
                  <div class="icon-wrap">
                    <font-awesome-icon icon="check" class="msg-icon"/>
                  </div>
                  <div class="msg-p"><span>你的訂單已成功建立!</span></div>
                </div>
              </div>

              <div class="order-info">
                <div class="info-left">訂單編號: {{ order.id }}</div>
                <div class="info-right">建立日期: {{ this.formatDatetime(order.createTimestamp) }}</div>
              </div>

              <div class="order-list">
                <table class="item-list-table">
                  <thead>
                  <tr>
                    <th>
                      商品名稱
                    </th>
                    <th>
                      數量
                    </th>
                    <th>
                      單價
                    </th>
                  </tr>
                  </thead>
                  <tr v-for="item in order.orderItems" :key="item.id">
                    <td>
                      {{ item.product.name }}
                    </td>
                    <td>
                      x{{ item.quantity }}
                    </td>
                    <td>
                      {{ item.price}}
                    </td>
                  </tr>
                </table>
              </div>

              <div class="order-list-total">
                <ul class="cart-cal-ul">
                  <li class="cart-cal-li"><strong class="cart-cal-strong-name">運費計算</strong><strong>免費</strong></li>
                  <li class="cart-cal-li"><strong class="cart-cal-strong-name">優惠</strong><strong>$0</strong></li>
                  <li class="cart-cal-li"><strong class="cart-cal-strong-name">訂單總額</strong>
                    <h5 class="cart-cal-h3">${{ order.totalPrice }}</h5>
                  </li>
                </ul>
              </div>
              <div class="order-list-bottom">
                <strong>送貨地址</strong>
                <P>{{ order.address.recipientName }} {{ order.address.recipientPhone}} {{ order.address.detailAddress}} {{ order.address.district}}</P>
              </div>
            </div>
          </div>
          <div class="button-group">
          <b-button variant="primary" class="b-button" @click="$router.replace('/users/profile')">回到會員主頁</b-button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payment",

  data() {
    return {
    }
  },

  async asyncData({$axios, query, error}) {
    try {
      const order = await $axios.$get(process.env.API_URL + "/orders/getOrderByIdAndUsername", {params: {order: query.order, username: query.username}});
      return {order};
    } catch (e) {
      console.log(e)
      error({ statusCode: 404, message: "網頁出錯"});
    }
  }

}
</script>

<style scoped>

.msg-box {
  margin-top: 1.25rem;
  border: 1px solid #e5e5e5;
}

.box-header {
  position: relative;
  background-color: #002042;
  padding: 1.25rem 0;
}

.shop-icon-img {
  width: 100%;
  max-height: 2rem;
}

.msg-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.icon-wrap {
  color: #00509F;
  font-size: 3rem;
  text-align: center;
  padding: .45rem .85rem;
  border: 3px solid #00509F;;
  border-radius: 1rem;
}

.msg-p {
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem;
}

.order-info {
  display: flex;
  font-size: .85rem;
  opacity: .85;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.info-left {
  display: table-cell;
}

.info-right {
  margin-left: 1rem;
  display: table-cell;
}

.order-list {
  padding: 1rem;
}

.item-list-table{
  width: 100%;
}

.item-list-table th {
  padding: 1.25rem 0;
  white-space: nowrap;
}

.item-list-table td {
  padding: .25rem 0;
}

.order-list-total {
  padding: 1.25rem;
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

.order-list-bottom {
  padding: 0 1.25rem;
}

.button-group {
  display: flex;
  padding: 1rem 0;
}

.b-button {
  margin: 0 auto;
  width: 50%;
}







</style>
