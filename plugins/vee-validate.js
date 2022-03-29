import {extend} from "vee-validate";
import {confirmed, email, min, required} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "必須輸入此欄位",
});

extend("username", {
  validate: value => {
    const regex = new RegExp("");
    return regex.test(value);
  },
  message: "請輸入正確的電郵地址格式"
});

extend("email", {
  ...email,
  message: "請輸入正確的電郵地址格式"
});

extend('minmax', {
  validate(value, {min, max}) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: "{_field_}長度必須在{min}及{max}個字元之間"
});

extend('min', {
  validate(value, {min}) {
    return value.length >= min;
  },
  params: ['min'],
  message: "{_field_}長度必須在至少為{min}個字元"
});

extend("complex_password", {
  validate: ( value ) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regex.test(value);
  },
  message: "{_field_}必須包含至少一個數字，一個大階，一個細階英文字母及一個符號"
});

extend("password", {
  validate: ( value, { target }) => {
    return value === target;
  },
  params: ["target"],
  message: "輸入的密碼不一致"
})

extend("confirmed", {
  ...confirmed,
  message: "輸入的密碼不一致"
});

