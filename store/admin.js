export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

  async getAllProducts({commit}, requestParams) {

    await this.$axios.$get(process.env.API_URL + "/products/adminGetAllProducts", {params: requestParams})
      .then((response) => {

        const pagination = {
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalItems: response.totalItems
        };

        commit("product/SET_PRODUCTS", response.list, {root: true});
        commit("pagination/SET_PAGINATION", pagination, {root: true})
      })
      .catch((error) => {
        console.log(error)
      })


  }


}
