<script setup>
import ContainerFluid from "./ContainerFluid.vue";
import { defineProps } from "vue";

defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="content-header">
    <ContainerFluid>
      <div class="row mb-2">
        <div class="col-md-12">
          <h1 class="m-0">{{ text }}</h1>
        </div>
      </div>
    </ContainerFluid>
  </div>
</template>
