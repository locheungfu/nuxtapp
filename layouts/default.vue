<template>
  <div>
      <DefaultHeader/>
    <Nuxt/>
    <DefaultFooter/>
    <notification-list/>
  </div>

</template>

<script>
import DefaultHeader from "../components/DefaultHeader";
import DefaultFooter from "../components/DefaultFooter";
import NotificationList from "@/components/NotificationList";

export default {
  name: "default",
  components: {DefaultFooter, DefaultHeader, NotificationList},

}
</script>

<style scoped>


</style>
