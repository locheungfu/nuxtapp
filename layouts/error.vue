<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <div class="msg-box">
              <div class="msg-icon-wrap">
                <font-awesome-icon icon="exclamation" class="msg-icon"/>
              </div>
              <div class="msg-text"><h2 class="err-code">{{ error.statusCode}}</h2><h3 class="err-msg">{{ error.message }}</h3></div>
              <b-button variant="secondary" @click="$router.back()" class="back-button">返回上一頁</b-button>
              <b-button variant="secondary" @click="$router.replace('/')" class="back-button">返回主頁</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "error",
  props: ["error"],
  layout: "layout-error",

  computed: {

  }
}

</script>

<style scoped>

.msg-box{
  display: block;
  margin-top: 20%;
  text-align: center;
}

.err-code{
  font-size: 2.5rem;
}

.err-msg {
  font-weight: 500;
  font-size: 2rem;
}

.msg-icon-wrap {
  display: flex;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  border: 3px solid #7a7777;
  margin: 0 auto;
  align-items: center;
}

.msg-icon {
  margin: 0 auto;
  font-size: 2rem;
  color: #7a7777;
}

.msg-text {
  color: #7a7777;
  padding: 1.25rem 0;
}

.back-button {
  width: 35%;
}


</style>
