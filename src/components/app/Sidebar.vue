<script setup>
import logo from "@/assets/logo.png";
import { RouterLink, useRoute } from "vue-router";

const isActiveLink = (routePath) => {
  const route = useRoute();
  return (
    route.path === routePath ||
    (routePath === "/" && route.path === "/dashboard")
  );
};
</script>

<template>
  <aside class="main-sidebar bg-success elevation-4">
    <!-- Brand Logo -->
    <RouterLink to="/" class="brand-link">
      <img
        :src="logo"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">Management Jobs</span>
    </RouterLink>

    <!-- Sidebar -->
    <div class="sidebar">
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <RouterLink
              to="/dashboard"
              class="nav-link text-white"
              :class="{ 'active-link': isActiveLink('/dashboard') }"
            >
              <i class="nav-icon fas fa-th"></i>
              <p>Dashboard</p>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/jobs"
              class="nav-link text-white"
              :class="{ 'active-link': isActiveLink('/jobs') }"
            >
              <i class="nav-icon fas fa-edit"></i>
              <p>Jobs</p>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'report-job' }"
              class="nav-link text-white"
              :class="{ 'active-link': isActiveLink('/jobs/report') }"
            >
              <i class="nav-icon fas fa-file"></i>
              <p>Reports</p>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<style scoped>
/* Hover state for all nav-links */
.nav-link:hover,
.nav-link.active-link {
  background-color: white; /* Background color on hover or active */
  color: #000000b4 !important; /* Text color on hover or active; use !important to override other styles */
}

/* Active link state specifically */
.active-link {
  background-color: white; /* Background color for active link */
  color: #000000b4 !important; /* Text color for active link; use !important to ensure it overrides */
}
</style>
