<template>
  <div>
    <b-modal
      id="modal-update-password"
      ref="modal"
      title="重設用戶密碼"
      @hide="resetForm"
      hide-footer
    >
      <ValidationObserver ref="observer" v-slot="{ validate, passes }">
        <b-form ref="form" @submit.stop.prevent="passes(submitResetPassword)">
          <validation-provider
            name="新密碼"
            vid="new-password"
            rules="required|min:8|complex_password"
            v-slot="{errors, valid}"
          >
            <b-form-group
              id="fieldset-1"
              label="新密碼"
              label-for="password-input"
              :invalid-feedback="errors[0]"
            >
              <b-form-input
                id="password-input"
                v-model="user.password"
                type="password"
                :state="errors[0] ? false : (valid ? true : null)"
                placeholder="輸入新密碼"
                required
              ></b-form-input>
            </b-form-group>
          </validation-provider>
          <div class="footer-button">
            <b-button type="submit" variant="primary" class="float-right">確認</b-button>
            <b-button variant="secondary" class="float-right mr-2" @click="resetForm">取消</b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: "ResetUserPasswordModal",

  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  props: {
    username: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      user: {
        username: "",
        password: "",
      }
    }
  },

  methods: {

    resetForm() {
      this.user = {
        username: "",
        password: "",
      };

      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
      this.$emit("reset-username");
      this.$bvModal.hide("modal-update-password")
    },


    submitResetPassword() {

      this.user.username = this.username;

      this.$axios.$put(process.env.API_URL + "/users/updatePassword", this.user)
        .then((response) => {
          if (response.code === "OK") {
            this.$store.dispatch("notification/addNotification", {type: "success", message: "密碼更新成功"})
            this.$emit("reset-username");
            this.$bvModal.hide("modal-update-password");
          }
        }).catch((error) => {
        this.$store.dispatch("notification/addNotification", {type: "alert", message: error})
      })
    },
  },
};
</script>

<style scoped>

.footer-button {
  display: block;
}

</style>
