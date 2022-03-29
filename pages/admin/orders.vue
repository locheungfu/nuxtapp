<template>
  <div class="master-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 col-centered">
          <AdminSidebar/>
        </div>

        <div class="col-md-10 col-centered">
          <div class="orders-box">
            <div class="orders-box-header">
              <h2 class="orders-box-title">訂單列表</h2>
              <font-awesome-icon icon="file-invoice" class="header-icon"/>
            </div>

            <div class="orders-box-body">
              <div class="orders-table-wrap table-responsive table-hover">
                <table class="table table-borderless user-table">
                  <thead class="user-table-thead">
                  <tr class="user-thead-tr">
                    <th class="user-thead-th">訂單編號</th>
                    <th class="user-thead-th">用戶</th>
                    <th class="user-thead-th">總價</th>
                    <th class="user-thead-th">狀態</th>
                    <th class="user-thead-th">更新時間</th>
                    <th class="user-thead-th">創建時間</th>
                    <th class="user-thead-th"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="user-tbody-tr" v-for="order in orders" :key="order.id">
                    <td class="user-tbody-td">
                      <div class="cell-text">{{ order.id }}</div>
                    </td>
                    <td class="user-tbody-td">
                      <div v-if="order.user" class="cell-text">{{ order.user.username }}</div>
                    </td>
                    <td class="user-tbody-td">
                      <div v-if="order.totalPrice" class="cell-text">$ {{ order.totalPrice }}</div>
                    </td>
                    <td class="user-tbody-td">
                      <div v-if="order.status">
                        <b-badge v-if="order.status === '未付款'" variant="dark">未付款</b-badge>
                        <b-badge v-if="order.status === '己付款'" variant="success">己付款</b-badge>
                        <b-badge v-if="order.status === '備貨中'" variant="info">備貨中</b-badge>
                        <b-badge v-if="order.status === '己發貨'" variant="warning">己發貨</b-badge>
                        <b-badge v-if="order.status === '已取消'" variant="secondary">已取消</b-badge>
                        <b-badge v-if="order.status === '已收貨'" variant="primary">已收貨</b-badge>
                      </div>
                    </td>
                    <td class="user-tbody-td">
                      <div v-if="order.updateTimestamp" class="cell-text">{{ formatDatetime(order.updateTimestamp) }}</div>
                    </td>
                    <td class="user-tbody-td">
                      <div v-if="order.createTimestamp" class="cell-text">{{ formatDatetime(order.createTimestamp) }}</div>
                    </td>
                  </tr>
                  </tbody>


                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "@/components/AdminSidebar";

export default {
  name: "orders",

  middleware: "isAdmin",

  components: {AdminSidebar},

  async asyncData({$axios, error}) {

    try {
      const orders = await $axios.$get(process.env.API_URL + "/orders/getAll");
      return {orders}
    } catch (e) {
      error({statusCode: 404, message: e.message})
    }
  }

}
</script>

<style scoped>

.orders-box {
  margin-bottom: 2rem;
  min-height: 80vh;
  border: 1px #e5e5e5 solid;
  border-radius: 1.25rem;
  -webkit-box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
}

.orders-box-header {
  display: flex;
  justify-content: center;
  border-bottom: 1px #e5e5e5 solid;
  padding: 0.85rem 0;
  border-radius: 1.25rem 1.25rem 0 0;
}

.orders-box-title {
  color: #7c7c7c;
  margin: 0;
  padding: 0;
}

.header-icon {
  color: #00509F;
  font-size: 1.25rem;
  text-align: center;
  height: auto;
}

.orders-table-wrap {
  padding: 0 1.25rem;
}

.orders-table-wrap {
  margin: 1.25rem auto;
}

.user-table-thead {
  background-color: #667c96;
  white-space: nowrap;
}

.user-thead-th {
  color: #ffffff;
  font-weight: 600;
  padding: 1.25rem 0.25rem;
}

.user-thead-th:nth-of-type(1) {
  width: 15%;
}

.user-thead-th:nth-of-type(2) {
  width: 15%;
}

.user-thead-th:nth-of-type(3) {
  width: 10%;
}

.user-thead-th:nth-of-type(4) {
  width: 10%;
}

.user-thead-th:nth-of-type(5) {
  width: 15%;
}

.user-thead-th:nth-of-type(6) {
  width: 15%;
}

.user-thead-th:nth-of-type(5) {
  width: 20%;
}

.user-tbody-tr {
  position: relative;
  vertical-align: middle;
  padding: 1rem;
  border: 1px solid transparent;
}

.user-tbody-td {
  padding: 1.25rem 0.25rem;
  vertical-align: middle;
  white-space: nowrap;
}

.cell-text {
  font-weight: 500;
  font-size: .85rem;
}


</style>
