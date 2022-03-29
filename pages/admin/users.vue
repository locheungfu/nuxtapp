<template>
  <div class="master-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 col-centered">
          <AdminSidebar/>
        </div>
        <div class="col-md-10 col-centered">
          <div class="user-box">
            <div class="user-box-header">
              <h2 class="user-box-title">用戶列表</h2>
              <font-awesome-icon icon="users" class="header-icon"/>
            </div>
            <div class="user-box-body">
              <div class="user-table-wrap table-responsive table-hover">
                <table class="table table-borderless user-table">
                  <thead class="user-table-thead">
                  <tr class="user-thead-tr">
                    <th class="user-thead-th"></th>
                    <th class="user-thead-th">用戶名稱</th>
                    <th class="user-thead-th">電郵</th>
                    <th class="user-thead-th">狀態</th>
                    <th class="user-thead-th"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="user-tbody-tr" v-for="user in users" :key="user.username">
                    <td class="user-tbody-td"></td>
                    <td class="user-tbody-td">
                      <div class="user-info-wrap">
                        <div class="user-name">{{ user.username }}</div>
                        <p class="user-fullname">{{ user.lastName + " " + user.firstName }}</p>
                      </div>
                    </td>
                    <td class="user-tbody-td">
                      <div class="user-email">{{ user.email }}</div>
                    </td>
                    <td class="user-tbody-td">
                      <div v-if="user.status === 'active'" class="user-status-wrap">
                        <div class="status-circle"></div>
                        <div class="user-status">已驗證</div>
                      </div>
                      <div v-if="user.status === 'inactive' " class="user-status-wrap invalid">
                        <div class="status-circle invalid-circle"></div>
                        <div class="user-status">未驗證</div>
                      </div>
                      <div v-if="user.status === 'disabled'" class="user-status-wrap disabled">
                        <div class="status-circle disabled-circle"></div>
                        <div class="user-status">已禁用</div>
                      </div>
                    </td>
                    <td class="user-tbody-td">
                      <div class="user-button-wrap">
                        <b-button variant="outline-secondary" size="sm" class="table-button">查看</b-button>
                        <b-button variant="outline-secondary" size="sm" class="table-button" @click="showResetPasswordModal(user.username)">重設密碼</b-button>
                        <b-button v-if="user.status === 'active'" variant="outline-secondary" size="sm" class="table-button" @click="disableUserRequest(user.username)">禁用</b-button>
                        <b-button v-if="user.status === 'disabled'" variant="outline-secondary" size="sm" class="table-button" @click="activatedUserRequest(user.username)">啟用</b-button>
                      </div>
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
    <ResetUserPasswordModal :username="username" @reset-username="setUsername" />
  </div>

</template>

<script>
import AdminSidebar from "@/components/AdminSidebar";
import ResetUserPasswordModal from "@/components/ResetUserPasswordModal";

export default {
  name: "users",

  middleware: "isAdmin",

  components: {AdminSidebar, ResetUserPasswordModal},

  data() {
    return {

      username:"",
    }
  },

  async asyncData({$axios, error}) {

    try {
      const data = await $axios.$get(process.env.API_URL + "/users/getUsers");
      return {users: data.data}
    } catch (e) {
      error({errorCode: 404, message: "無法取得用戶資料: " + e})
    }

  },

  computed: {},

  methods: {

    findUserIndex(username) {
      return this.users.findIndex(user => user.username === username);
    },

    showResetPasswordModal(username) {
      this.username = username;
      this.$bvModal.show("modal-update-password");
    },

    disableUserRequest(username) {
      try {
        const index = this.findUserIndex(username);

        this.$axios.$patch(process.env.API_URL + "/users/disable?user="+ username);
        this.$store.dispatch("notification/addNotification", {type: "success", message: "已禁用用戶 ! " + username});
        this.users[index].status = "disabled";
      } catch (e) {
        console.log(e)
        this.$store.dispatch("notification/addNotification", {type: "alert", message: "操作失敗! " + e.response.data.message})
      }
    },
    activatedUserRequest(username) {
      try {
        const index = this.findUserIndex(username);

        this.$axios.$patch(process.env.API_URL + "/users/reactivate?user="+ username);
        this.$store.dispatch("notification/addNotification", {type: "success", message: "已啟用用戶 ! " + username});
        this.users[index].status = "active";
      } catch (e) {
        console.log(e)
        this.$store.dispatch("notification/addNotification", {type: "alert", message: "操作失敗! " + e.response.data.message})
      }
    },

    setUsername() {
      this.username = "";
    },

  },


};


</script>

<style scoped>

.user-box {
  margin-bottom: 2rem;
  min-height: 80vh;
  border: 1px #e5e5e5 solid;
  border-radius: 1.25rem;
  -webkit-box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
  box-shadow: 4px 9px 29px -3px rgba(84, 84, 84, 0.52);
}

.user-box-header {
  display: flex;
  justify-content: center;
  border-bottom: 1px #e5e5e5 solid;
  padding: 0.85rem 0;
  border-radius: 1.25rem 1.25rem 0 0;
}

.user-box-title {
  color: #7c7c7c;
  margin: 0;
  padding: 0;
}

.header-icon {
  color: #00509F;
  font-size: 1.25rem;
  text-align: center;
  width: 1.5rem;
  height: auto;
}

.user-table-wrap {
  padding: 0 1.25rem;
}

.user-table-wrap {
  margin: 1.25rem auto;
}

.user-table-thead {
  background-color: #667c96;
}

.user-thead-th {
  color: #ffffff;
  font-weight: 600;
  padding: 1.25rem 0.25rem;
}

.user-thead-th:nth-of-type(1) {
  width: 10%;
}

.user-thead-th:nth-of-type(2) {
  width: 25%;
}

.user-thead-th:nth-of-type(3) {
  width: 25%;
}

.user-thead-th:nth-of-type(4) {
  width: 15%;
}

.user-thead-th:nth-of-type(5) {
  width: 25%;
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

.user-name {
  font-weight: 600;
  padding-bottom: .25rem;
}

.user-fullname {
  opacity: 0.5;
  margin: 0;
  font-weight: 500;
  font-size: 0.85rem;
}

.user-email {
  font-weight: 600;
}

.user-status-wrap {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  padding: .1rem .65rem;
  border-radius: 1rem;
  background-color: #9af3b2;
  color: #1aad00;
}

.invalid {
  background-color: #ffd9a9;
  color: #FFA000;
}

.disabled {
  background-color: #ff3838;
  color: #ffe3e3;
}

.status-circle {
  border-radius: 50%;
  width: 0.55rem;
  height: 0.55rem;
  background-color: #1aad00;
}

.invalid-circle {
  background-color: #FFA000;
}

.disabled-circle {
  background-color: #ffe3e3;
}

.user-status {
  padding-left: .25rem;
}

.user-button-wrap {
  display: inline-flex;
}

.table-button {
  margin-right: .25rem;
}


</style>
