<template>
  <div class="msg-box fade-in fade-out" :class="typeOfBoxClass">
    <div class="msg-icon" :class="typeOfIconClass">
      <font-awesome-icon :icon="typeOfIcon" class="fa-fw"/>
    </div>
    <div class="msg-text"><span>{{ notification.message }}</span></div>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {

  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification);
    }, 3500);
  },

  beforeDestroy() {
    clearTimeout(this.timeout);
  },

  props: {

    notification: {
      type: Object,
      required: true,
    }

  },

  data() {
    return {
      timeout: null
    };
  },

  computed: {

    typeOfBoxClass() {
      return `msg-box-${this.notification.type}`;
    },

    typeOfIconClass() {
      return `msg-icon-${this.notification.type}`;
    },

    typeOfIcon() {
      switch (this.notification.type) {
        case "success":
          return ['fas', 'check-circle'];
        case "warning":
          return ['fas', 'exclamation-circle'];
        case "alert":
          return ['fas', 'exclamation-circle']
        default:
          return null;
      }
    },

  },

  methods: {

    ...mapActions("notification", ["removeNotification"])

  }


}
</script>

<style scoped>

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
}

.msg-box {
  display: table;
  position: relative;
  margin-bottom: 1.25rem;
  color: #ffffff;
  background-color: #e5e5e5;
  width: 100%;
  border: 1px solid #bbbbbb;
  box-shadow: 8px 7px 9px -3px rgba(71,71,71,0.5);
  opacity: 0.85;
  min-width: 300px;
}

.msg-icon {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 50px;
  font-size: 1.25rem;
  background-color: #fff;
}

.msg-text {
  margin: auto;
  display: table-cell;
  vertical-align: middle;
  padding: 18px 10px;
  font-size: 1rem;
  font-weight: 500;
  min-width: 12rem;
}

.msg-icon-success {
  background-color: #00b750;
}

.msg-icon-alert {
  background-color: #CC0000;
}

.msg-icon-warning {
  background-color: #FF8800;
}

.msg-box-success {
  background-color: #3acc88;
}

.msg-box-alert {
  background-color: #ff4444;
}

.msg-box-warning {
  background-color: #ffbb33;
}

</style>
