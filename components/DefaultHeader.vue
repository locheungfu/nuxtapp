<template>
  <div class="header-wrapper">
    <header class="container-fluid">
      <b-navbar toggleable="md">
        <b-navbar-brand href="/">
          <img class="nav-logo-img img-fluid" src="/icons/pc-shop-logo.svg" alt="online shop logo">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"/>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-for="page in pageLinks" :key="page.name" class="nav-left">
            <b-nav-item :class="{'active-nav': activePageName === page.path }" @click="goPage(page.path)">{{ page.name }}</b-nav-item>

          </b-navbar-nav>
          <b-navbar-nav class="nav-right">
            <b-nav-item class="nav-icon" @click="activePageName='';$router.push('/cart')">
              <font-awesome-icon icon="shopping-cart" class="nav-icon-cart"/>
              <span class="nav-icon-cart-text">{{ cartTotalQuantity }}</span>
            </b-nav-item>
            <b-nav-item v-if="!getJwtToken" class="nav-btn" @click="resetActivePage;$router.push('/users/login')">注冊/登入</b-nav-item>

              <b-nav-item-dropdown class="m-md-2" v-if="getJwtToken && !isAdminRole" text="我的帳號" toggle-class="align-items-center" right>
                <b-dropdown-item @click="resetActivePage;$router.push('/users/profile')">會員中心</b-dropdown-item>
                <b-dropdown-item @click="logout">登出</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown class="m-md-2" v-if="getJwtToken && isAdminRole" text="管理員中心" toggle-class="align-items-center" right>
                <b-dropdown-item @click="resetActivePage;$router.push('/users/profile')">概覽</b-dropdown-item>
                <b-dropdown-item @click="resetActivePage;$router.push({path:'/admin/products', query: {pageNo: 1}})">商品管理</b-dropdown-item>
                <b-dropdown-item @click="resetActivePage;$router.push('/admin/users')">用戶管理</b-dropdown-item>
                <b-dropdown-item @click="resetActivePage;$router.push('/admin/orders')">訂單管理</b-dropdown-item>
                <b-dropdown-item @click="logout">登出</b-dropdown-item>
              </b-nav-item-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
  </div>
</template>

<script>

import {mapMutations, mapGetters} from "vuex";

export default {
  name: "DefaultHeader",


  data() {
    return {

      pageLinks: [
        {
          id: "home",
          name: "首頁",
          path: "/",
        },
        {
          id: "products",
          name: "商品目錄",
          path: "/products",
        },
        {
          id: "support",
          name: "技術支援",
          path: "/support",
        },
        {
          id: "contact",
          name: "聯絡我們",
          path: "/contact",
        },

      ],

      activePageName: "",


    }
  },

  components: {
  },


  mounted() {
    if (this.$store.state.auth.token) {
      this.$store.dispatch("cart/getCartItems");
    }

    this.$store.commit("cart/initializeCartItems")

  },

  computed: {

    ...mapGetters("cart", ["cartTotalQuantity"]),
    ...mapGetters("auth", ["getJwtToken", "getUserRole", "isAdminRole"])

  },

  methods: {
    ...mapMutations("auth", ["LOGOUT_USER"]),

    goPage(path) {
      this.activePageName = path;
      this.$router.push(path);
    },

    resetActivePage() {
      this.activePageName = "";
    }

  }
}

</script>

<style scoped>

.header-wrapper {
  background-color: #ffffff;
  border-bottom: solid 1px rgba(0, 69, 159, 0.94);
  box-shadow: -1px 5px 16px -2px #c9c9c9;
}

.navbar {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 25px;
}

.navbar-brand {
  font-size: 1.5rem;
  white-space: nowrap;
}

.nav-logo-img {
  width: 100%;
  height: 55px;
}

.nav-item {
  padding-left: 0.85rem;
  padding-right: 0.85rem;
  font-weight: bolder;
  font-size: 1.1rem;
}

.nav-left > .nav-item:hover {
  box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
  transition: .3s;
  border-radius: 1.25rem;
}

.nav-right {
  margin-left: auto;
  margin-right: 0;
}

.nav-icon {
  display: inline-block;
  padding: 8px;
}

.nav-icon-cart {
  font-size: 1.4rem;
  overflow: hidden;
}

.nav-icon-cart-text > a {
  margin: 0;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  line-height: 8px;
}

.nav-btn {
  display: inline-block;
  box-shadow: inset 0 1px 0 0 #bbdaf7;
  background: #79bbff linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
  border-radius: 12px;
  border: 1px solid #84bbf3;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 6px 18px;
  text-shadow: 0 1px 0 #528ecc;
  height: fit-content;
}

.nav-btn:hover {
  background: #378de5 linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
}

.nav-btn > a {
  color: #fff !important;
}

.active-nav {
  background-color: #00509F;
  border-radius: 1.25rem;
  transition: .3s;
}

.active-nav .nav-link {
  color: #e5e5e5!important;
}





</style>
