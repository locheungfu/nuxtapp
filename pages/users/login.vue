<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div class="form-box" :class="{'error-shake':isLoginFailed}">
            <div class="form-header">
              <h3 class="form-title">登入</h3>
            </div>
            <div class="form-box-body">
              <div class="form-group">
                <div class="input-field">
                  <font-awesome-icon icon="user" class="form-icon fa-fw"/>
                  <input type="text" v-model="form.username" class="form-control" placeholder="用戶名稱" required min="1" max="30" @click="clearErrorMessage">
                </div>
              </div>
              <div class="form-group">
                <div class="input-field">
                  <font-awesome-icon icon="lock" class="form-icon fa-fw"/>
                  <input type="password" v-model="form.password" class="form-control" placeholder="輸入密碼" required min="1" max="60" @click="clearErrorMessage">
                </div>
              </div>

              <div class="btn btn-primary btn-block form-submit-btn" @click="userLoginSubmit">登入</div>
              <div class="text-danger text-center" v-if="isLoginFailed">{{ errorMessage }}</div>
              <div class="form-text">沒有帳號?<a href="#" @click.prevent="$router.push('/users/register')"> 立即注冊</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  watch: {

  },

  data() {
    return {

      isLoginFailed: false,
      errorMessage: "",

      form: {
        username: "",
        password: ""
      },

    }
  },

  methods: {

    clearErrorMessage() {
      this.isLoginFailed = false;
      this.errorMessage = "";
    },

    userLoginSubmit() {

      this.isLoginFailed = false;
      this.errorMessage = "";

      if (this.form.username === "" || this.form.password === "") {
        this.isLoginFailed = true;
        this.errorMessage = "請填寫所有欄位!";
      } else {
        this.$axios.$post(process.env.API_URL + "/authenticate", this.form)
          .then(response => {
            if (response.user.status === "active") {
              this.$store.commit("auth/SET_TOKEN_AND_USER", {token: response.jwtToken, user: response.user})
              window.location.replace("/users/profile");
            }

            if( response.user.status === "inactive") {
                this.isLoginFailed = true;
                this.errorMessage = "帳戶未通過電郵驗證!"
            }

            if( response.user.status === "disabled") {
              this.isLoginFailed = true;
              this.errorMessage = "帳戶已被禁用!"
            }
          })
          .catch(() => {
            this.isLoginFailed = true;
            this.errorMessage = "登入失敗!名稱或密碼錯誤!"
          });
      }
    },
  },
};
</script>

<style scoped>

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}


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
input[type='password'] {
  width: 100%;
  border: none;
  outline: none;
  box-shadow: none;
}

.input-field:focus-within {
  border: 1px solid #00509F;
}

.form-icon {
  margin: 0 .35rem;
  color: #00509F;
}

.forgot-password {
  margin-left: auto;
  font-size: 0.8rem;
}

.form-text {
  text-align: center;
}

.form-submit-btn {
  margin-top: 1.25rem;
  border-radius: 1rem;
}

.error-shake {
  animation: shake 0.5s;
  animation-iteration-count: 1;
}


</style>


