export default function ({ store, redirect }) {

  if (!store.getters["auth/getJwtToken"] && store.state.auth.user?.role[0] === "Admin") {
    return redirect("/users/login");
  }

}
