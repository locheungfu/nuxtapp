<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div class="form-box" v-if="!isSubmitted && !isValidated && !isValidateFailed">
            <div class="form-header">
              <h3 class="form-title">用戶注冊</h3>
            </div>
            <div class="form-box-body">
              <ValidationObserver ref="form" v-slot="{ invalid }">
                <div class="form-group">
                  <ValidationProvider v-slot="{ errors }" vid="username" name="登入名稱" rules="required|minmax:3,20|username">
                    <div class="input-field">
                      <font-awesome-icon icon="user" class="form-icon fa-fw"/>
                      <input type="text" v-model="form.username" class="form-control" placeholder="登入名稱" name="登入名稱" minlength="3" maxlength="20" required>
                    </div>
                    <small class="warn">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider v-slot="{ errors }" name="電郵" rules="required|email">
                    <div class="input-field">
                      <font-awesome-icon :icon="['fas','envelope']" class="form-icon fa-fw"/>
                      <input type="email" v-model="form.email" class="form-control" placeholder="電郵" name="電郵" required>
                    </div>
                    <small class="warn">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider v-slot="{ errors }" name="密碼" rules="required|min:8|complex_password">
                    <div class="input-field">
                      <font-awesome-icon icon="lock" class="form-icon fa-fw"/>
                      <input type="password" v-model="form.password" class="form-control" placeholder="輸入密碼" name="密碼" minlength="8"
                             maxlength="60" required>
                    </div>
                    <small class="warn">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <ValidationProvider v-slot="{ errors }" name="確認密碼" rules="required|password:@密碼">
                    <div class="input-field">
                      <font-awesome-icon icon="unlock" class="form-icon fa-fw"/>
                      <input type="password" v-model="confirmPassword" class="form-control" placeholder="再次輸入密碼" minlength="8"
                             maxlength="60" name="確認密碼" required>
                    </div>
                    <small class="warn">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>

                <div class="inline-form-group">
                    <div class="form-group">
                      <ValidationProvider v-slot="{ errors }" name="LastName" rules="required">
                        <div class="input-field">
                          <font-awesome-icon icon="user" class="form-icon fa-fw"/>
                          <input type="text" v-model="form.lastName" class="form-control" placeholder="姓氏" name="LastName" minlength="1"
                                 maxlength="30" required>
                        </div>
                        <small class="warn">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </div>


                    <div class="form-group">
                      <ValidationProvider v-slot="{ errors }" name="FirstName" rules="required">
                        <div class="input-field">
                          <font-awesome-icon icon="user" class="form-icon fa-fw"/>
                          <input type="text" v-model="form.firstName" class="form-control" placeholder="名字" name="FirstName" minlength="1"
                                 maxlength="30" required>
                        </div>
                        <small class="warn">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </div>
                  </div>

                <button class="btn btn-primary btn-block form-submit-btn" :class="{'disable-button': invalid  }" @click="onClickSubmitRegister" :disabled="invalid">確認提交</button>
              </ValidationObserver>
            </div>
          </div>
          <transition name="fade">
            <div id="box-success" class="box" v-if="isSubmitted">
              <div class="box-heading">
                <div class="box-icon">
                  <font-awesome-icon :icon="['fas','check-circle']" class="svg-icon"/>
                  <h4>注冊成功!</h4>
                </div>
              </div>
              <div class="box-body item-center">
                <p>感謝您的注冊。系統已發送一封確認郵件到閣下的郵箱，請檢查郵件並啟用帳戶。</p>
              </div>
              <div class="box-footer">
                <div class="btn btn-success" @click="$router.push('/users/login')">OK</div>
              </div>
            </div>
          </transition>

          <div id="box-validate" class="box" v-if="isValidated">
            <div class="box-heading">
              <div class="box-icon">
                <font-awesome-icon :icon="['fas','check-circle']" class="svg-icon"/>
                <h4>驗證成功!</h4>
              </div>
            </div>
            <div class="box-body item-center">
              <p>你的帳戶已成功啟用，請重新登入。</p>
            </div>
            <div class="box-footer">
              <div class="btn btn-success" @click="$router.push('/users/login')">重新登入</div>
            </div>
          </div>

          <div id="box-alert" class="box" v-if="isValidateFailed">
            <div class="box-heading">
              <div class="box-icon">
                <font-awesome-icon :icon="['fas','exclamation-circle']" class="svg-icon"/>
                <h4>驗證失敗!</h4>
              </div>
            </div>
            <div class="box-body item-center">
              <p>帳號驗證已失效。</p>
            </div>
            <div class="box-footer">
              <div class="btn btn-success" @click="$router.push('/users/login')">返回</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {


  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  watchQuery: true,

  watch: {
    $route(to, from) {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  },

  data() {
    return {

      form: {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      },

      confirmPassword: "",

      isSubmitted: false,
      isValidated: false,
      isValidateFailed: false,

    }
  },

  computed: {},

  mounted() {
    if (this.$route.query.registerKey) {
      this.validateNewUser();
    }
  },

  methods: {

    async onClickSubmitRegister() {

      this.$nuxt.$loading.start();

      await this.$axios.$post(process.env.API_URL + "/users/register", this.form)
        .then(() => {
          this.isSubmitted = true;
        })
        .catch((error) => {
         alert(error.response.data.message);
        })
      this.$nuxt.$loading.finish();
    },

    validateNewUser() {
      let registerKey = this.$route.query.registerKey
      const response = this.$axios.$post(process.env.API_URL + "/users/validate?registerKey=" + registerKey)
        .then(
          response => {
            if (response === true) {
              this.isValidated = true;
              console.log(response);
            } else {
              this.isValidateFailed = true;
              console.log(response)
            }
          })
        .catch(error => {
          console.log(error.response.data);
        })
    },
  },
};


</script>

<style scoped>

a:hover {
  text-decoration: none;
}

.form-header {
  text-align: center;
}

.form-title {
  font-weight: 600;
  font-size: 1.85rem;
}

.form-box {
  background-color: #ffffff;
  min-height: 350px;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
  padding: 1.25rem .85rem;
  margin: 2.5rem 0;
  border-radius: .85rem;
}

.form-box-body {
  padding: 1.25rem 0;
}

.input-field {
  border-radius: .25rem;
  padding: .35rem 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  border: 1px solid #ddd;
}

input[type="text"],
input[type='password'],
input[type="email"] {
  width: 100%;
  border: none;
  outline: none;
  box-shadow: none;
}

.input-field:focus-within {
  border: 1px solid #00509F;
}

.inline-form-group {
  display: inline-flex;
}

.form-icon {
  margin: 0 .35rem;
  color: #00509F;
}

.form-submit-btn {
  margin-top: 1.25rem;
  border-radius: 1rem;
}

.box-icon {
  margin-bottom: 20px;
  text-align: center;
  font-size: 100px;
}

#box-success .box-icon {
  color: #32CD32FF;
}

#box-validate .box-icon {
  color: #00d9ff;
}

#box-alert .box-icon {
  color: #FF8C00FF;
}

h4 {
  font-weight: 600;
}

.box-body.item-center {
  display: flex;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 20px;
}

p {
  text-align: justify;
  font-size: 1rem;
}

.box-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
}

.btn-success {
  font-size: 25px;
  font-weight: 700;
  border: 0;
  border-radius: 15px;
  padding: 10px 60px 10px 60px;
}

#box-success .btn-success {
  background-color: #32CD32FF;
}

#box-validate .btn-success {
  background-color: #00d9ff;

}

#box-alert .btn-success {
  background-color: #FF8C00FF;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.warn {
  color: #ff4747;
}

.disable-button {
  background-color: #7c7c7c;
  border: #7c7c7c 1px solid;
}

</style>
