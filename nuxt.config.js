export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pc-city',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main",
    "~/assets/css/transitions"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios",
    "~/plugins/test.js",
    "~/plugins/vee-validate.js",
    {src: "~/plugins/global-methods"},
    {src: "~/plugins/vue-datepicker", mode: "client"},
    {src: "~/plugins/vue-awesome-swiper", mode: "client"},

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt",
  ],

  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    icons: {
      solid: true,
      regular: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },

  env: {
    API_URL: "http://localhost:9092",
    BASE_URL: "http://localhost:3000"
  },

  server: {
    port: 3000,
    host: "0.0.0.0"
  },

  router: {
    scrollBehavior(to, from, savedPosition) {
      return {x: 0, y: 0}
    }
  },

  loading: '~/components/Loading.vue',

}
