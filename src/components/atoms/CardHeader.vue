<script setup>
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
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-md-12">
          <h1 class="m-0">{{ text }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
