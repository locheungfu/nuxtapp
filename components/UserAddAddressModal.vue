<template>
  <div>
    <b-modal
      id="modal-add-address"
      ref="modal"
      title="新增地址"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="收貨人名稱"
          label-for="name-input"
        >
          <b-form-input
            id="name-input"
            v-model="addressForm.recipientName"
            required
          ></b-form-input>
        </b-form-group>


        <b-form-group
          label="收貨人電話"
          label-for="phone-input"
        >
          <b-form-input
            id="phone-input"
            v-model="addressForm.recipientPhone"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="地址"
          label-for="address-input"
        >
          <b-form-input
            id="district-input"
            v-model="addressForm.detailAddress"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="地區"
          label-for="district-input"
        >
          <b-form-select
            id="district-input"
            v-model="addressForm.district"
            :options="districtOptions"
          ></b-form-select>
        </b-form-group>
      </form>

      <template #modal-footer>
        <b-button
          variant="outline-secondary"
          @click="$bvModal.hide('modal-add-address')"
        >
          取消
        </b-button>
        <b-button
          variant="primary"
          @click="onClickSubmitForm"
        >
          確定
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from "vuex";
import error from "@/layouts/error";

export default {
  name: "UserAddAddressModal",

  data() {
    return {
      addressForm: {
        recipientName: "",
        recipientPhone: "",
        detailAddress: "",
        district: null,
        user: {
          username: "",
        }
      },

      districtOptions: [
        {value: null, text: "請選擇地區"},
        {
          label: "香港",
          options: [
            {value: "中西區", text: "中西區"},
            {value: "灣仔區", text: "灣仔區"},
            {value: "九龍城區", text: "九龍城區"},
            {value: "黃大仙區", text: "黃大仙區"},
            {value: "觀塘區", text: "觀塘區"},
          ]
        },
        {
          label: "九龍",
          options: [
            {value: "深水埗區", text: "深水埗區"},
            {value: "油尖旺區", text: "油尖旺區"},
            {value: "東區", text: "東區"},
            {value: "南區", text: "南區"},
          ]
        },
        {
          label: "新界",
          options: [
            {value: "葵青區", text: "葵青區"},
            {value: "荃灣區", text: "荃灣區"},
            {value: "屯門區", text: "元朗區"},
            {value: "北區", text: "北區"},
            {value: "大埔區", text: "大埔區"},
            {value: "沙田區", text: "沙田區"},
            {value: "西貢區", text: "西貢區"},
            {value: "離島區", text: "離島區"},
          ]
        },
      ],
      warningMessage: "",
    };
  },

  computed: {
    ...mapState("auth", ["user"]),

  },

  methods: {

    resetFormData() {
      Object.assign(this.$data, this.$options.data.call(this));
    },

    async onClickSubmitForm() {

      this.$nuxt.$loading.start();
      this.addressForm.user.username = this.user?.username;

      await this.$axios.$post(process.env.API_URL + "/users/addAddress", this.addressForm)
        .then((response) => {
          if (response.code === "OK") {
            this.$store.commit("notification/PUSH_NOTIFICATION", {type: "success", message: "已成功新增地址"});
          }
        }).catch((error) => {
          this.$store.commit("notification/PUSH_NOTIFICATION", {type: "alert", message: error.response.data.message});
        }).finally(() => {
            setTimeout(() => {
              this.resetFormData();
              this.$nuxt.refresh();
              this.$nuxt.$loading.finish();
              this.$bvModal.hide("modal-add-address");
            }, 500)
          }
        )
    },
  },
};

</script>

<style scoped>

.warn-msg {
  color: #ab0101;
}


</style>
