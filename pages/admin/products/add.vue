<template>
  <div class="product-add-page">
    <div class="container-fluid">
      <div class="col-lg-8 col-centered">
        <div class="form-wrap">
          <div class="form-header">
            <h2 class="form-title">
              新增商品
            </h2>
          </div>

          <div v-if="!isLoading" class="form-body">
            <b-form-group
              id="fieldset-1"
              label="商品名稱:"
              label-for="input-product-name"
            >
              <b-form-input
                id="input-product-name"
                v-model="form.name"
                type="text"
                required
                trim>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-2"
              description=""
              label="商品顯示名稱:"
              label-for="input-product-displayname"
            >
              <b-form-input
                id="input-product-displayname"
                v-model="form.displayName"
                type="text"
                required
                trim>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-3"
              description=""
              label="原廠編號:"
              label-for="input-model-number"
            >
              <b-form-input
                id="input-model-number"
                v-model="form.modelNumber"
                type="text"
                trim>
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-4"
              description=""
              label="售價:"
              label-for="input-product-price"
            >
              <b-input-group prepend="HKD $">
                <b-form-input
                  id="input-product-name"
                  v-model="form.price"
                  type="number"
                  required
                  trim>
                </b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              id="fieldset-5"
              label="類別:"
              label-for="input-category">
              <b-form-select
                id="input-category"
                v-model="form.category.name"
                :options="categoryOptions"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="fieldset-6"
              label="廠商:"
              label-for="input-brand">
              <b-form-select
                id="input-brand"
                v-model="form.brand.name"
                :options="brandOptions"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="fieldset-7"
              label="推出日期:"
              label-for="input-release-date">
              <b-form-datepicker
                id="input-release-date"
                v-model="form.releaseDate"
                locale="zh"
                :date-format-options="{year: 'numeric' , month: 'numeric', day: 'numeric'}"
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group
              id="fieldset-8"
              label="原廠保養:"
              label-for="input-warranty">
              <b-form-select
                id="input-warranty"
                v-model="form.warrantyPeriod"
                :options="warrantyOptions"
              >
              </b-form-select>
            </b-form-group>

            <b-form-group
              id="fieldset-9"
              label="上傳圖片:"
              label-for="input-warranty">
              <div v-if="preview" class="img-wrap">
                <p> 圖片預覽: </p>
                <img class="img-fluid img-preview" :src="preview" alt="previewImage"/>
                <p> 圖片名稱: {{ image.name }}</p>
                <p> 圖片大小: {{ imageSize }}</p>
                <p> 圖片格式: {{ image.type }}</p>

              </div>
              <b-form-file
                placeholder="選擇圖片"
                drop-placeholder="拖放圖片到這裡..."
                accept="image/jpeg, image/png, image/gif"
                @change="previewImage"
                browse-text="瀏覽本機檔案"
              ></b-form-file>
              <b-button @click="resetImage">重設圖片</b-button>
            </b-form-group>
          </div>

          <div class="form-footer">
            <b-button variant="primary" @click="onClickSubmit">確認新增</b-button>
            <b-button variant="outline-secondary" @click="resetForm">重設</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import error from "@/layouts/error";

export default {

  middleware: "isAdmin",

  data() {
    return {
      form: {
        name: "",
        displayName: "",
        modelNumber: "",
        price: 0,
        releaseDate: new Date,
        warrantyPeriod: null,
        category: {
          name: "cpu",
        },
        brand: {
          name: "amd",
        },
      },

      warrantyOptions: [
        {value: null, text: "-請選擇年數-"},
        {value: 0, text: "沒有保養"},
        {value: 1, text: "1年"},
        {value: 2, text: "2年"},
        {value: 3, text: "3年"},
        {value: 4, text: "4年"},
        {value: 5, text: "5年"},
        {value: 10, text: "10年"}
      ],

      image: null,
      preview: null,

      isLoading: false,

    };
  },

  async asyncData({$axios}) {

    try {
      const categories = await $axios.$get(process.env.API_URL + "/categories/all")
      return {categories};

    } catch (e) {
      console.log(e);
    }

  },

  computed: {

    categoryOptions() {

      return this.categories.map(
        ({name, displayName}) => ({value: name, text: displayName})
      );

    },

    brandOptions() {

      let categoryName = this.form.category.name;

      const brands = this.categories.find(category => category.name === categoryName);
      return brands.categoryBrandRelations.map(
        o => {
          return {value: o.brand.name, text: o.brand.displayName};
        }
      );
    },

    imageSize() {
      if (this.image) {
        return Math.floor(this.image.size / 1024) + " KB"
      }
    }

  },

  methods: {

    previewImage(event) {

      const file = event.target.files[0];

      if (file) {
        this.image = event.target.files[0]
        this.preview = URL.createObjectURL(file);
      }

    },

    resetImage() {
      this.image = null;
      this.preview = null;
    },

    resetForm() {
      Object.assign(this.$data, this.$options.data.call(this));
    },

    async onClickSubmit() {

      await this.$axios.$post(process.env.API_URL + "/products/addProduct", this.form)
        .then((response) => {

          if (this.image) {
            let uploadImage = new FormData();
            uploadImage.append("file", this.image);
            uploadImage.append("productId", response.id);
            uploadImage.append("isThumbnail", "true");
            this.$axios.$post(process.env.API_URL + "/file/uploadImage", uploadImage);
          }
          this.$store.dispatch("notification/addNotification", {type: "success", message: "成功新增商品!" + response.id})
          this.$router.back()
        }).catch((error) => {
            this.$store.dispatch("notification/addNotification", {type: "alert", message: "發生未知錯誤，請再嘗試! " + error.response.data.message});
          }
        ).finally(() => {
          this.resetForm();
        })
    },

  },
};
</script>

<style scoped>

.col-centered {
  margin: 45px auto;
}

.form-header {
  text-align: center;
}

.form-wrap {
  margin: 0 auto;
  padding: 1.85rem;
  background-color: #ffffff;
  box-shadow: 15px 15px 75px rgb(210, 210, 210);
}

.img-wrap {
  padding: 0.5rem;
  border: 1px solid #e5e5e5;
  margin: 0.55rem 0;
}

.img-preview {
  max-width: 300px;
}

.btn {
  margin: 0.55rem 0;
}

</style>
