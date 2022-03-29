import Cookies from "js-cookie"

export const state = () => ({
  token: "",
  user: null
})

export const getters = {

  getJwtToken(state) {
    if (state.token)
      return "bearer "+ state.token;
    else
      return null;
  },

  getUserRole(state) {
    return state.user?.role[0]?.name;
  },

  isAdminRole(state, getter) {
    return getter.getUserRole === "Admin";
  },

  getUserFullName(state) {
    return state.user.lastName + " " + state.user.firstName;
  }

}

export const mutations = {

  SET_TOKEN_AND_USER(state, {token, user}) {
    state.token = token;
    state.user = user;
    let expiredInFiveHours = new Date(new Date().getTime() + 5 * 60 * 60 * 1000)
    Cookies.set("token", token, { expires: expiredInFiveHours });
    Cookies.set("user", JSON.stringify(user), { expires: expiredInFiveHours });
  },

  LOGOUT_USER(state){
    state.token = null;
    state.user = null;
    Cookies.remove("token");
    Cookies.remove("user");
    sessionStorage.removeItem("cart");
  },
}

export const actions = {

}
