<template>
  <div class="user-sidebar-wrap">
    <nav class="user-sidebar">
      <ul class="user-nav">
        <li class="user-nav-item" v-for="item in navbarItems" :key="item.id">
          <a class="user-nav-link" href="#" @click.prevent="pageRoute(item)">
            <font-awesome-icon :icon="item.icon" class="admin-nav-icon fa-fw"/>
            <span>{{ item.displayName }}</span></a>
        </li>
      </ul>
    </nav>
  </div>

</template>

<script>
export default {

  data() {
    return {
      navbarItems: [
        {
          id: "profile",
          displayName: "概覽",
          path: "/users/profile",
          icon: "list"
        },
        {
          id: "change-pw",
          displayName: "更改密碼",
          path: "/users/resetpassword",
          icon: "lock"
        },
        {
          id: "addresses",
          displayName: "地址管理",
          path: "/users/addresses",
          icon: "truck"
        },
      ],
    };
  },

  methods: {

    pageRoute(item) {
      let dest = {path: item.path}

      dest = item.id === "products-mgmt" ? {path: item.path, query: {page: 1}} : dest;

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

.user-sidebar {
  border: 1px solid #e5e5e5;
  height: 100%;
  font-weight: 500;
  font-size: 1.05rem;
}

.user-nav {
  list-style: none;
  display: block;
}

.user-nav-item {
  display: inline-block;
  width: 100%;
  border: 1px solid #e5e5e5;
  white-space: nowrap;
}

.user-nav-item:hover {
  background-color: rgba(225, 223, 223, 0.49);
}

.user-nav-item a:hover {
  color: #00509F;
}

.user-nav-link {
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
