export default function ({$axios, store}) {
  $axios.onRequest(config => {
    $axios.defaults.baseURL = "https://localhost:9092"

    if (store.state.auth.token) {
      $axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.auth.token;
    }
  })

}


