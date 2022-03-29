<template>
  <div>
    <default-header/>
    <nuxt/>
    <default-footer/>
  </div>
</template>

<script>
import DefaultHeader from "../components/DefaultHeader";
import DefaultFooter from "../components/DefaultFooter";
export default {
  name: "layout-error",
  components: {
    DefaultFooter, DefaultHeader
  }
}
</script>

<style scoped>

</style>
