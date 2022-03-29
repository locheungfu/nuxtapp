<template>
  <div class="footer-wrapper">
    <footer class="container-fluid">
      <div class="row">
        <div class="col topper-field">
          <div class="row">
            <div class="col-3" v-for="icon in iconType" :key="icon.name">
              <div class="icon-field">
                <div class="icon-wrap">
                  <font-awesome-icon :icon="icon.icon" class="main-icon"/>
                </div>
                <span class="icon-text">{{ icon.text }}</span>
              </div>
            </div>
          </div>
          <div class="row bottom-field">
            <div class="col-lg-4">
                <ul class="item-list">
                  <li>聯絡方法</li>
                  <li>電話: 3888 8888  </li>
                  <li>郵箱: contact@pccity.ddns.net</li>
                  <li>地址: 香港九龍偉業街33號德福廣場15樓01室</li>
                </ul>
              </div>

            <div class="col-lg-4">
              <p class="bottom-text">
                ©Copright 2022 LO CHEUNG FU<br>
              </p>
            </div>

            <div class="col-lg-4">

            </div>

          </div>


        </div>

      </div>
    </footer>
  </div>
</template>

<script>
export default {

  name: "defaultFooter",

  data() {
    return {

      iconType: [
        {name: "icon-1", icon: ['fas', 'truck-moving'], text: "免費送貨"},
        {name: "icon-2", icon: ['fas', 'wrench'], text: "14天退貨"},
        {name: "icon-3", icon: ['fas', 'headset'], text: "線上支援"},
        {name: "icon-4", icon: ['fas', 'check'], text: "正版貨品"},
      ],

    }
  }


}
</script>

<style scoped>

.footer-wrapper {
  padding: 1.25rem;
  border-top: 2px #00509F solid;
  background-color: #002642;
}

.topper-field {
  margin: 2rem auto;
}

.icon-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrap {
  padding: 1.25rem;
  border-radius: 2.5rem;
  background-color: #00335d;
}

.main-icon {
  font-size: 2rem;
  color: #e5e5e5;
}

.icon-text {
  color: #e5e5e5;
  margin: 0.25rem auto;
}

.bottom-field {
  margin: 1.85rem auto 0.25rem auto;
}

.item-list {
  list-style: none;
  color: #e5e5e5;
}

.bottom-text {
  text-align: center;
  margin: 1.25rem auto;
  color: #e5e5e5;
}

</style>
