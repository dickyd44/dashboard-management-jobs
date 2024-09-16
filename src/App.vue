<script setup>
import AppLayout from "./layouts/AppLayout.vue";
import AppAuth from "./layouts/AppAuth.vue";
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isAuthRoute = computed(() => {
  return route.name === "login" || route.name === "change-password";
});
</script>

<template>
  <component :is="isAuthRoute ? AppAuth : AppLayout">
    <RouterView />
  </component>
</template>
