<template>
  <div class="admin-sidebar-wrap">
    <nav class="admin-sidebar">
      <ul class="admin-nav">
        <li class="admin-nav-item" v-for="item in navbarItems" :key="item.id">
          <a class="admin-nav-link" href="#" @click.prevent="pageRoute(item)">
            <font-awesome-icon :icon="item.icon" class="admin-nav-icon fa-fw"/>
            <span>{{ item.displayName }}</span></a>
        </li>
      </ul>
    </nav>


  </div>

</template>

<script>
export default {
  name: "AdminSidebar",

  data() {
    return {
      navbarItems: [
        {
          id: "products-mgmt",
          displayName: "商品管理",
          path: "/admin/products",
          icon: "store"
        },
        {
          id: "users-mgmt",
          displayName: "用戶管理",
          path: "/admin/users",
          icon: "users"
        },
        {
          id: "order-mgmt",
          displayName: "訂單管理",
          path: "/admin/orders",
          icon: "file-invoice"
        }
      ],
    };
  },

  methods: {

    pageRoute(item) {
      let dest = {path: item.path}

      dest = item.id === "products-mgmt" ? {path: item.path, query: {pageNo: 1}} : dest;

      this.$router.push(dest);
    },
  },

};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}


.admin-sidebar {
  border: 1px solid #e5e5e5;
  height: 100%;
  font-weight: 500;
  font-size: 1.05rem;
}

.admin-nav {
  list-style: none;
  display: block;
}

.admin-nav-item {
  display: inline-block;
  width: 100%;
  border: 1px solid #e5e5e5;
}

.admin-nav-item:hover {
  background-color: rgba(124, 124, 124, 0.49);
}

.admin-nav-link {
  display: block;
  position: relative;
  color: #7c7c7c;
  padding: 0.85rem 1.05rem;
}

.admin-nav-icon {
  display: inline;
  vertical-align: middle;
  margin-right: 0.85rem;
}


</style>
