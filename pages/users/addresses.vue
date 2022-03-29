<template>
  <div class="wrapper">
    <div class="main-box">
      <div class="box-header">
        <h3>收貨地址管理</h3>
      </div>

      <div class="box-body">
        <div class="button-group">
          <b-button squared variant="outline-secondary" v-b-modal.modal-add-address>新增地址</b-button>
        </div>
        <div class="address-list-wrap">
          <div class="address-card" v-for="address in addresses" :key="address.id">
            <div class="rows">
              <div class="col-lg-12 p-0">
                <div class="address-card-content">
                  <div class="address-header-wrap">
                    <div class="address-card-header">
                      <h4 class="rcpt-name">{{ address.recipientName }}</h4><strong>{{ address.recipientPhone }}</strong>
                      <div class="address-card-button-group"><a href="#" class="address-card-button">
                        <font-awesome-icon :icon="['fas','pen']" class="svg-icon"/>
                      </a>
                        <a href="#" class="address-card-button">
                          <font-awesome-icon :icon="['fas','trash']" class="svg-icon" @click="onClickShowRemoveModal(address.id)"/>
                        </a></div>
                    </div>
                  </div>
                  <div class="address-card-info">
                    <p>
                      <font-awesome-icon :icon="['fas', 'map']" class="svg-icon map"/>
                      {{ address.detailAddress }} {{ address.district }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserAddAddressModal/>
      <b-modal v-model="showRemoveModal" title="確認刪除">
        <p>將刪除地址</p>
        <template #modal-footer>
          <div>
            <b-button squared variant="outline-secondary" size="md" @click="showRemoveModal = false">取消</b-button>
            <b-button squared variant="primary" size="md" @click="onClickRemoveAddress">確定</b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import UserSidebar from "@/components/UserSidebar";
import UserAddAddressModal from "@/components/UserAddAddressModal";
import {mapState} from "vuex";
import error from "@/layouts/error";

export default {
  components: {
    UserAddAddressModal
  },

  layout: "user-main",

  watchQuery: true,

  data() {
    return {
      showRemoveModal: false,
      addressId: "",
      addresses: [],
    };
  },

  async fetch() {

    const data = await this.$axios.$get(process.env.API_URL + "/users/getAddresses", {params: {username: this.user.username}});
    return this.addresses = data;

  },

  computed: {
    ...mapState("auth", ["user"]),
  },

  methods: {

    deleteMappedAddressData() {
      this.addresses.splice(this.addresses.findIndex(address => address.id === this.addressId), 1);
    },

    onClickShowRemoveModal(id) {
      this.showRemoveModal = true;
      this.addressId = id;
    },

    async onClickRemoveAddress() {

      await this.$axios.$delete(process.env.API_URL + "/users/deleteAddress", {params: {id: this.addressId}})
        .then((response) => {
          if (response.code === "OK") {
            this.deleteMappedAddressData();
            return this.$store.dispatch("notification/addNotification", {type: "success", message: "成功刪除地址"});
          } else {
            throw new Error("無法刪除地址");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.dispatch("notification/addNotification", {type: "alert", message: error});
        })
        .finally(() => {
          this.showRemoveModal = false;
        })
    },
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

.main-box {
  margin: 0 auto;
  padding: 1.85rem;
  background-color: #ffffff;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
}

.box-header {
  border-bottom: #e5e5e5 solid 1px;
  margin-bottom: 1.25rem;
}

.button-group {
  margin-bottom: 1.25rem;
}

.address-card {
  display: flex;
  position: relative;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);;
}

.address-card:hover {
  border: 3px solid #00509F;
}

.address-header-wrap {
  background-color: #e5e5e5;
}

.address-card-header {
  display: flex;;
  align-items: center;
  padding: 1rem;
}

.rcpt-name {
  font-weight: 700;
  margin-right: 10px;
}

.address-card-button-group {
  display: inline-block;
  margin-left: auto;
}

.address-card-button {
  margin-left: 3px;
}

.address-card-info {
  padding: 1rem;
}

.address-card-info {
  opacity: 0.7;
}

.map {
  margin-right: 5px;
}

</style>
