import cookieparser from 'cookieparser'

export const actions = {

  nuxtServerInit({commit}, {req}) {

    if (req && req.headers && req.headers.cookie) {
      const token = cookieparser.parse(req.headers.cookie).token
      const user = JSON.parse(cookieparser.parse(req.headers.cookie).user)

      commit("auth/SET_TOKEN_AND_USER", {token, user})
    }
  },

}


