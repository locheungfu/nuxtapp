<template>
  <div class="wrapper">
    <div class="main-box">
      <div class="box-header">
        <h3>更改密碼</h3>
      </div>
      <div class="box-body">
        <div class="form-wrapper">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <validation-provider
              name="新密碼"
              vid="new-password"
              rules="required|min:8|complex_password"
              v-slot="{errors, valid}"
            >
              <b-form-group
                id="fieldset-1"
                label="新密碼:"
                label-for="input-1"
                :invalid-feedback="errors[0]"
              >
                <b-form-input id="input-1" v-model="form.password" type="password" :state="errors[0] ? false : (valid ? true : null)" trim></b-form-input>
              </b-form-group>
            </validation-provider>
            <validation-provider
              name="確認密碼"
              rules="required|password:@new-password"
              v-slot="{errors, valid}"
            >
              <b-form-group
                id="fieldset-2"
                label="再次輸入密碼:"
                label-for="input-2"
                :invalid-feedback="errors[0]"
              >
                <b-form-input id="input-2" v-model="confirmPassword" type="password" :state="errors[0] ? false : (valid ? true : null)" trim></b-form-input>
              </b-form-group>
            </validation-provider>

            <b-button variant="primary" @click="onClickSubmitResetPassword" :disabled="invalid" :class="{'disable-button' : invalid}">提交確認</b-button>
          </validation-observer>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {

  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  created() {
    Object.assign(this.$data, this.$options.data());
  },

  data() {
    return {

      form: {
        username: "",
        password: "",
      },
      confirmPassword: "",
      isLoading: false,
    }
  },

  layout: "user-main",

  computed: {

    ...mapState("auth", ["user"])

  },

  methods: {

    async onClickSubmitResetPassword() {

      this.form.username = this.user?.username;

      await this.$axios.$put(process.env.API_URL + "/users/updatePassword", this.form)
        .then((response) => {
          if (response.code === "OK") {
            this.$store.dispatch("notification/addNotification", {type: "success", message: "密碼更新成功"})
            this.$router.push("/users/profile");
          }
        }).catch((error) => {
          this.$store.dispatch("notification/addNotification", {type: "alert", message: error.response.data.message})
        })
    },
  },
};

</script>

<style scoped>

.main-box {
  margin: 0 auto;
  padding: 1.85rem;
  background-color: #ffffff;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
}

.box-header {
  border-bottom: #e5e5e5 solid 1px;
  margin-bottom: 1.25rem;
}

.disable-button {
  background-color: #7c7c7c;
  border: #7c7c7c 1px solid;
}


</style>
