export default function ({ store, redirect }) {

  if (!store.getters["auth/getJwtToken"] && !store.state.auth.user.username) {
    return redirect("/users/login");
  }

}
