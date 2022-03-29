<template>
  <div class="master-wrapper">
    <div class="container-fluid mh-vh">
      <div class="contact-box-wrap">
        <div class="box-header">
          <h2 class="box-title">聯絡我們</h2>
        </div>
        <div class="box-body">
          <div class="box-item">
            <h4 class="box-sub-title">客戶服務</h4>
          </div>
          <div class="box-item">
            <h4 class="box-sub-title">支援熱線</h4>
            <p>
              熱線電話：(852) 3888 8888<br>
              開放時間：<br>
              星期一至五：9:00AM ~ 1:00PM 及 2:00PM~6:00PM<br>
              星期六：9:30AM~1:00PM<br>
              星期日及公眾假期暫停<br>
              電郵：service@pccity.ddns.net<br>
            </p>
          </div>
          <div class="box-item">
            <h4 class="box-sub-title">公司地址</h4>
            <div class="iframe-map">
            <b-embed
              type="iframe"
              aspect="16by9"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922.698980916119!2d114.21365873461595!3d22.323556547272563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040135a6fd3813%3A0x462c653a9b4c8148!2s33%20Wai%20Yip%20St%2C%20Kowloon%20Bay!5e0!3m2!1sen!2shk!4v1646387130981!5m2!1sen!2shk"
              allowfullscreen
            ></b-embed>
              </div>
            <div class="text-field">
              <p>
                香港九龍偉業街33號德福廣場15樓01室<br>
                星期一至五 10:00AM ~ 20:00PM<br>
                星期六 10:00AM~1:00PM<br>
                星期日及公眾假期休息<br>
              </p>
            </div>
          </div>

        </div>
        <div class="box-footer">
          <div class="box-footer-header">
            <h4 class="box-footer-title">提交意見</h4>
          </div>

          <div class="box-footer-content">
            <p>閣下可於下方表格輸入資料提交意見或詢問，我們會有專人及時跟進。</p>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contact"
}
</script>

<style scoped>

.contact-box-wrap {
  margin: 45px auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
  min-height: 40vh;
}

.box-header {
  border-bottom: 1px #e5e5e5 solid;
  margin-bottom: 1.25rem;
}

.box-title {
  font-weight: 600;
  font-family: 微軟正黑體, sans-serif;
  color: #595959;
  margin-bottom: 1.25rem;
}

.box-sub-title {
  font-weight: 600;
  color: #00509F;
  margin-bottom: 1.25rem;
  font-style: italic;
}

.iframe-map{
  margin-bottom: 1.25rem;
}

.box-footer-title {
  font-weight: 600;
  color: #595959;
}

</style>
