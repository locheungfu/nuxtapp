import Vue from 'vue'
Vue.mixin({
  methods:{

    formatDatetime(datetime) {
        return datetime.toString().split(" ").splice(0, 2).join(" ");
      },

    logout() {

      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        this.$store.commit("auth/LOGOUT_USER");
        setTimeout(() => {
          this.$nuxt.$loading.finish();
          window.location.replace("/");
        },500)
      })
    },

    }
})
