export const state = () => ({
  pagination: {},
})

export const getters = {

  currentViewPage(state) {
    return state.pagination.currentPage + 1;
  },

}

export const mutations = {

  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
}

export const actions = {}

