export const state = () => ({
  buildList: [],

})


export const getters = {

  getBuildProduct(category) {
    return state().buildList.find(x => x.product.category.name === category)
  },


  getBuildProductByCategory(state) {
    return (category) => {
      return state.buildList.filter(x => x.product.category.name === category)
    }
  },

  countTotalPrice(state) {
    let total = 0;

    state.buildList.forEach(item => (
      total += item.product.price * item.quantity
    ));

    return total;

  }

}

export const mutations = {


  setBuildProduct(state, {product, quantity}) {
    let categoryType = ["ram", "hdd", "ssd"];

    if (categoryType.includes(product.category.name)) {
      state.buildList.push({product, quantity})
    } else {

      let existingProduct = state.buildList.find(x => {
        return x.product.category.name === product.category.name
      })

      if (existingProduct) {
        let index = state.buildList.findIndex(x => x.product.id === existingProduct.product.id);
        state.buildList[index] = {product, quantity};

      } else {
        state.buildList.push({product, quantity})
      }
    }

  },

  removeProductFromList(state, product) {
    let existingProduct = state.buildList.findIndex(x => x.product.id === product.id);
    state.buildList.splice(existingProduct, 1);
  },

}

export const actions = {
  addProductToBuildList({commit}, {product, quantity}) {
    try {
      commit("setBuildProduct", {product, quantity});
    } catch (error) {
      console.log(error);
    }
  },

  deleteBuildListProduct({commit}, product) {
    try {
      commit("removeProductFromList", product);
    } catch (error) {
      console.log(error);
    }
  },

  validateProduct({commit}) {
    commit("validate");
  }

}
