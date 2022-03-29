<template>
  <div>
    <b-modal id="modal-update-product" size="lg" ref="modal" :title="`修改商品資料 ${product.id}`" :header-bg-variant="headerBgVariant" centered>
      <b-form-group ref="form">
        <b-form-group id="fieldset-1" label="商品名稱:" label-for="name-input">
          <b-form-input id="name-input" v-model="productForm.name" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-2" description="" label="顯示名稱:" label-for="input-product-displayname">
          <b-form-input id="input-product-displayname" v-model="productForm.displayName" type="text" required trim></b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-3" description="" label="原廠編號:" label-for="input-model-number">
          <b-form-input id="input-model-number" v-model="productForm.modelNumber" type="text" trim>
          </b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-4" description="" label="售價:" label-for="input-product-price">
          <b-input-group prepend="HKD $">
            <b-form-input id="input-product-name" v-model="productForm.price" type="number" required trim></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group id="fieldset-5" label="類別:" label-for="input-category">
          <b-form-select id="input-category" v-model="productForm.category.name" :options="categoryOptions" required></b-form-select>
        </b-form-group>

        <b-form-group id="fieldset-6" label="廠商:" label-for="input-brand">
          <b-form-select id="input-brand" v-model="productForm.brand.name" :options="brandOptions" required></b-form-select>
        </b-form-group>

        <b-form-group id="fieldset-7" label="推出日期:" label-for="input-release-date">
          <b-form-datepicker id="input-release-date" v-model="productForm.releaseDate" locale="zh" :date-format-options="{year: 'numeric' , month: 'numeric', day: 'numeric'}"></b-form-datepicker>
        </b-form-group>

        <b-form-group id="fieldset-8" label="原廠保養:" label-for="input-warranty">
          <b-form-select id="input-warranty" v-model="productForm.warrantyPeriod" :options="warrantyOptions"></b-form-select>
        </b-form-group>

        <b-form-row>
          <b-col cols="3">
            <b-form-group label="商品上架:" label-for="btn-radios-1" class="mr-2 text-nowrap">
              <b-form-radio-group id="btn-radios-1" v-model="productForm.isActive" :options="isActiveOption" button-variant="outline-primary" size="sm" name="radio-btn-outline" buttons></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="商品特價:" label-for="btn-radios-2" class="mr-2 text-nowrap">
              <b-form-radio-group id="btn-radios-2" v-model="productForm.isPromote" :options="isActiveOption" button-variant="outline-primary" size="sm" name="radio-btn-outline" buttons></b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group label="商品缺貨:" label-for="btn-radios-3" class="mr-2 text-nowrap">
              <b-form-radio-group id="btn-radios-3" v-model="productForm.isShortage" :options="isActiveOption" button-variant="outline-primary" name="radio-btn-outline" buttons size="sm"></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-form-row>


        <b-form-group id="fieldset-9" description="" label="特價售價:" :disabled="productForm.isPromote === false">
          <b-input-group prepend="售價">
            <b-form-input id="input-product-stock" v-model="productForm.promotePrice" type="number" required trim></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group id="fieldset-10" description="" label="商品庫存:" label-for="input-product-stock">
          <b-input-group prepend="數量">
            <b-form-input id="input-product-stock" v-model="productForm.stockQuantity" type="number" min="0" max="999999" required trim></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="fieldset-9"
          class="mb-1"
          label="商品圖片:"
          label-for="input-warranty">
          <div v-if="!preview" class="img-wrap">
            <img class="img-fluid" :src="product.thumbnailPath" alt="productImage"/>
          </div>
          <div v-else class="img-wrap">
            <p> 圖片預覽: </p>
            <img class="img-fluid" :src="preview" alt="previewImage"/>
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


      </b-form-group>


      <template #modal-footer>
        <div>
          <b-button squared variant="outline-secondary" size="md" @click="$bvModal.hide('modal-update-product')">取消</b-button>
          <b-button squared variant="primary" size="md" @click="onClickUpdateProduct" :disabled="isLoading">確定</b-button>
        </div>
      </template>
    </b-modal>


  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import error from "@/layouts/error";

export default {

  name: "UpdateProductModal",

  created() {
    this.getCategories();
  },


  watch: {
    product() {
      this.productForm.id = this.product.id;
      this.productForm.name = this.product.name;
      this.productForm.displayName = this.product.displayName;
      this.productForm.modelNumber = this.product.modelNumber;
      this.productForm.price = this.product.price;
      this.productForm.releaseDate = this.product.releaseDate;
      this.productForm.category.name = this.product.category.name;
      this.productForm.brand.name = this.product.brand.name;
      this.productForm.warrantyPeriod = this.product.warrantyPeriod;
      this.productForm.isActive = this.product.isActive;
      this.productForm.isShortage = this.product.isShortage;
      this.productForm.isPromote = this.product.isPromote;
      this.productForm.stockQuantity = this.product.stockQuantity;
      this.productForm.officialUrl = this.product.officialUrl;
      this.productForm.promotePrice = this.product.promotePrice;

    },
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {

      productForm: {
        id: "",
        name: "",
        displayName: "",
        modelNumber: "",
        price: 0,
        releaseDate: "",
        warrantyPeriod: null,
        category: {
          name: "",
        },
        brand: {
          name: "",
        },
        isActive: true,
        isShortage: false,
        isPromote: false,
        stockQuantity: 0,
        officialUrl: "",
        promotePrice: null,
      },

      isActiveOption: [
        {text: "開啟", value: true},
        {text: "關閉", value: false},

      ],

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

      headerBgVariant: "info",
    }
  },

  computed: {

    ...mapState("product", ["categories"]),

    categoryOptions() {

      return this.categories.map(
        ({name, displayName}) => ({value: name, text: displayName})
      );
    },

    brandOptions() {

      let categoryName = this.productForm.category.name;

      const brands = this.categories.find(category => category.name === categoryName);

      return brands?.categoryBrandRelations.map(
        o => {
          return {value: o.brand.name, text: o.brand.displayName};
        }
      );
    },


  },

  methods: {

    ...mapActions("product", ["getCategories"]),

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

    async onClickUpdateProduct() {

      this.isLoading = true;

      await this.$axios.$put(process.env.API_URL + "/products/update", this.productForm)
        .then(() => {
          if (this.image) {
            let uploadImage = new FormData();
            uploadImage.append("file", this.image);
            uploadImage.append("productId", this.productForm.id);
            uploadImage.append("isThumbnail", "true");
            this.$axios.$post(process.env.API_URL + "/file/uploadImage", uploadImage);
          }

          this.$nuxt.$loading.start();
          setTimeout(() => {
            this.$nuxt.$loading.finish();
            this.$emit("updateData");
            this.$bvModal.hide("modal-update-product");
          }, 500)
          this.$store.dispatch("notification/addNotification", {type: "success", message: "更新成功"});
        })
        .catch((error) => {
          this.$store.dispatch("notification/addNotification", {type: "alert", message: "無法更新產品" + error})
        })
        .finally(() => {
          this.isLoading = false;
        })

    },

    resetFormData() {
      Object.assign(this.$data, this.$options.data.call(this));
    },
  },


};


</script>

<style scoped>

img {
  height: 368px;
  width: 368px;
}


</style>
