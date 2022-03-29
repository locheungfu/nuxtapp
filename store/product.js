export const state = () => ({
  products: [],
  categories: [],
})


export const getters = {}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },

  SET_PRODUCT(state, product) {
    state.product = product;
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  RESET_STATE(state) {
    state.products = [];
    state.product = null;
    state.categories = [];
    state.category = null;
  },
}

export const actions = {

  async getCategories({commit}) {
    try {
      let categories = await this.$axios.$get(process.env.API_URL + "/categories/all");
      commit("SET_CATEGORIES", categories);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllProducts({commit, params}, requestParams) {
    await this.$axios.$get(process.env.API_URL + "/products/getAll", {params: requestParams})
      .then((response) => {

        const pagination = {
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalItems: response.totalItems
        };

        commit("SET_PRODUCTS", response.list);
        commit("pagination/SET_PAGINATION", pagination, {root:true})
      })
      .catch((error) => {
        console.log(error)
      })
  },

  async getProductsByCat({commit, params}, requestParams) {
    await this.$axios.$get(process.env.API_URL + "/products/getByCategory", {params: requestParams})
      .then((response) => {

        const pagination = {
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalItems: response.totalItems
        };

        commit("SET_PRODUCTS", response.list);
        commit("pagination/SET_PAGINATION", pagination, {root:true})
      })
      .catch((error) => {
        console.log(error)
      })
  },

  async getProduct({commit, params}, pid) {
    await this.$axios.$get(process.env.API_URL + `/products/productId/${ pid }`)
      .then((response) => {

        commit("SET_PRODUCT", response);

      })
      .catch((error) => {
        console.log(error)
      })
  },

  resetState({commit}) {
    commit("RESET_STATE");
  }
}




