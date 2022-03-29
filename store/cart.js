export const state = () => ({
  cart: [],
  buildFee: false,
  order: {},
})

export const getters = {

  getCartProductById(state) {
    return (pid) => {
      return state.cart.find(item => item.product.id === pid);
    };
  },

  getCartProductQuantity(state) {
    return (pid) => {
      return state.cart.find(x => x.product.id === pid).quantity;
    };
  },

  cartTotalQuantity(state) {
    let total = 0;

    state.cart.forEach(item => (
      total += item.quantity
    ));

    return total;
  },

  cartTotalPrice(state) {
    let total = 0, price = 0;

    state.cart.forEach(item => {

      price = item.product.isPromote ? item.product.promotePrice : item.product.price;
      total += price * item.quantity;

    })

    return total;
  },
}

export const mutations = {

  initializeCartItems(state) {

    if (sessionStorage.getItem("cart")) {
      state.cart = JSON.parse(sessionStorage.getItem("cart"));
    }
  },

  ADD_PRODUCT_TO_CART(state, {product, quantity}) {
    state.cart.push({product, quantity});
  },

  ADD_PRODUCT_QUANTITY(state, {product, quantity}) {

    const existingProduct = state.cart.find(item => {
      return item.product.id === product.id;
    })
    existingProduct.quantity += quantity;
  },

  REDUCE_PRODUCT_QUANTITY(state, {pid, quantity}) {

    const existingProduct = state.cart.find(item => {
      return item.product.id === pid;
    })
    existingProduct.quantity -= quantity;

  },

  REMOVE_PRODUCT_FROM_CART(state, pid) {

    state.cart.splice(state.cart.findIndex(item =>
      item.product.id === pid), 1);
  },

  CLEAN_ALL_PRODUCTS_FROM_CART(state) {
    state.cart = [];
  },

  SAVE_CART_DATA(state) {
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
  },

  SET_CART_PRODUCTS(state, cartItems) {
    state.cart = cartItems;
  },

  SET_ORDER_USERNAME(state, username) {
    state.order["user"] = {username: username};
  },

  SET_ORDER_MESSAGE(state, message) {
    state.order["message"] = message;
  },

  SET_ORDER_TOTAL_PRICE(state, price) {
    state.order["totalPrice"] = price;
  },

  SET_ORDER_ITEMS(state, orderItems) {
    state.order["orderItems"] = orderItems;
  },

  SET_ORDER_ADDRESS(state, addressId) {
    state.order["address"] = {id: addressId};
  }

}

export const actions = {


  addProductToCart({commit, getters, dispatch}, product) {

    const existingProduct = getters.getCartProductById(product.id);
    const quantity = 1;

    try {
      if (existingProduct) {
        if (existingProduct.quantity < 99) {

          commit("ADD_PRODUCT_QUANTITY", {product, quantity});
          dispatch("notification/addNotification", {type: "success", message: "已成功添加到購物車!"}, {root: true})
          commit("SAVE_CART_DATA");

          if (this.state.auth.token && this.state.auth.user) {
            const save = this.$axios.$post(process.env.API_URL + "/cart/add?pid=" + product.id + "&quantity=" + quantity + "&username=" + this.state.auth.user.username)
            console.log(save);
          }
        } else {
          dispatch("notification/addNotification", {type: "warning", message: "物品數量已達上限，請先結算!"}, {root: true})
        }
      } else {
        commit("ADD_PRODUCT_TO_CART", {product, quantity});
        dispatch("notification/addNotification", {type: "success", message: "已成功添加到購物車!"}, {root: true})
        commit("SAVE_CART_DATA");

        if (this.state.auth.token && this.state.auth.user) {
          const save = this.$axios.$post(process.env.API_URL + "/cart/add?pid=" + product.id + "&quantity=" + quantity + "&username=" + this.state.auth.user.username)
          console.log(save);
        }
      }
    } catch (e) {
      dispatch("notification/addNotification", {type: "alert", message: "發生未知錯誤，請再嘗試!"}, {root: true})
    }
  },

  reduceProductQuantity({commit, getters}, pid) {

    try {
      const existingProduct = getters.getCartProductById(pid);
      const quantity = 1

      if (existingProduct.quantity > quantity) {
        commit("REDUCE_PRODUCT_QUANTITY", {pid, quantity})

        if (this.state.auth.token && this.state.auth.user) {
          this.$axios.$post(process.env.API_URL + "/cart/reduce?pid=" + pid + "&quantity=" + quantity + "&username=" + this.state.auth.user.username)
            .then(r => console.log(r))
        }
      } else {
        console.log("At least be 1.");
      }
    } catch (e) {
      console.log(e);
    }
  },

  removeProductFromCart({commit, dispatch}, pid) {

    commit("REMOVE_PRODUCT_FROM_CART", pid);
    commit("SAVE_CART_DATA");

    if (this.state.auth.token && this.state.auth.user) {
      this.$axios.$delete(process.env.API_URL + "/cart/delete", {params: {pid: pid, username: this.state.auth.user.username}})
        .then(r => console.log(r))
        .catch((error) => {
          console.log(error);
        })
    }
  },

  cleanAllProductsFromCart({commit}) {
    commit("CLEAN_ALL_PRODUCTS_FROM_CART");
    commit("SAVE_CART_DATA");

    if (this.state.auth.token && this.state.auth.user) {
      this.$axios.$delete(process.env.API_URL + "/cart/clean?&username=" + this.state.auth.user.username)
        .then(r => console.log(r))
        .catch((error) => {
          console.log(error);
        })
    }
  },

  getCartItems({commit}) {
    this.$axios.$get(process.env.API_URL + "/cart/" + this.state.auth.user.username)
      .then(response => {
          commit("SET_CART_PRODUCTS", response);
          console.log(response)
        }
      ).catch((error) => {
      console.log(error)
    })
  },

  setOrderUsername({commit}) {
    commit("SET_ORDER_USERNAME", this.state.auth.user.username);
  },

  setOrderMessage({commit}, message) {
    commit("SET_ORDER_MESSAGE", message)
  },

  setOrderTotalPrice({commit}, price) {
    commit("SET_ORDER_TOTAL_PRICE", price)
  },

  setOrderAddress({commit}, addressId) {
    commit("SET_ORDER_ADDRESS", addressId)
  },


  setOrderItems({commit}) {

    const orderItems = this.state.cart.cart.map(
      item => ({
        product: { id: item.product.id },
        quantity:  item.quantity,
        price: item.product.isPromote ? item.product.promotePrice : item.product.price,
      })
    )
    commit("SET_ORDER_ITEMS", orderItems);
  }
}








