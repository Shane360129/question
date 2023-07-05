<script>
import { RouterView } from "vue-router";
import HeaderView from "./views/Header.vue";
export default {
  components: {
    HeaderView,
    RouterView
  }
}
</script>

<template>
  <HeaderView />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container{
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
