<template>
  <div>
    <DefaultHeader/>
    <div class="main-content">
      <div class="container-fluid mh-vh">
        <div class="row">
          <div class="col-lg-2 col-md-3 col-sm-4 col-centered">
            <UserSidebar/>
          </div>
          <div class="col-lg-10 col-md-9 col-sm-8 col-centered">
            <Nuxt keep-alive/>
          </div>
        </div>
      </div>
    </div>
    <default-footer/>
    <NotificationList/>
  </div>
</template>

<script>
import DefaultFooter from "@/components/DefaultFooter";
import DefaultHeader from "@/components/DefaultHeader";
import NotificationList from "@/components/NotificationList";
import UserSidebar from "@/components/UserSidebar";

export default {
  name: "user-main",

  components: {DefaultFooter, DefaultHeader, NotificationList, UserSidebar},

  middleware: "authenticate",
}
</script>

<style scoped>


</style>
