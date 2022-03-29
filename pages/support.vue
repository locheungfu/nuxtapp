<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="body-wrap">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="常見問題">
              <b-card v-for="question in generalQuestions" :key="question.title" :title="question.title" class="question-card">
                <b-card-text>
                  產品壞了
                </b-card-text>
              </b-card>
            </b-tab>

            <b-tab title="送貨服務">
              <b-card v-for="question in deliveryQuestions" :key="question.title" :title="question.title" class="question-card">
                <b-card-text>
                  產品壞了
                </b-card-text>
              </b-card>
            </b-tab>


            <b-tab title="購物流程">
              <b-card v-for="question in shopQuestions" :key="question.title" :title="question.title" class="question-card">
                <b-card-text>
                  產品壞了
                </b-card-text>
              </b-card>
            </b-tab>
          </b-tabs>
        </b-card>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "support",

  data() {
    return {

      generalQuestions: [
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
      ],

      deliveryQuestions: [
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
      ],

      shopQuestions: [
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
        {title: "產品出現問題，怎麼辦?", text: "我們為客戶提供電話熱線支援，線上客服系統及上門檢查服務。"},
      ],

    }
  },
}
</script>

<style scoped>

.body-wrap {
  margin: 45px auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
  min-height: 40vh;
}

.question-card {
  margin-bottom: 1.25rem;

}


</style>
