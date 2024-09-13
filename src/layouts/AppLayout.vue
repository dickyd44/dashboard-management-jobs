<script setup>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import Footer from "@/components/app/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
      <slot />
    </div>
    <Footer />
  </div>
</template>
