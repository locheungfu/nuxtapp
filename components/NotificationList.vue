<template>
  <div>
    <div class="message-list">
      <NotificationMessage v-for="notification in notifications" :key="notification.id" :notification="notification" />
    </div>
  </div>


</template>

<script>
import NotificationMessage from "@/components/NotificationMessage";
import {mapState} from "vuex";

export default {

  components: {NotificationMessage},

  computed: {
    ...mapState("notification", ["notifications"])





  }

}
</script>

<style scoped>

.message-list {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 1.25rem;
  z-index: 9999;
}


</style>
