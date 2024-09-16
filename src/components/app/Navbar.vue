<script setup></script>

<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input
                class="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button
                  class="btn btn-navbar"
                  type="button"
                  data-widget="navbar-search"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown user user-menu">
          <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
            <span class="hidden-xs font-weight-bold">User</span>&nbsp;
            <img
              class="img-circle user-image"
              src="/dist/img/user2-160x160.jpg"
            />
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a
              href="/change-password"
              class="dropdown-item"
              data-target="#changePassword"
            >
              <i class="fas fa-lock mr-2"></i> Change Password
            </a>
            <div class="dropdown-divider"></div>
            <form action="/login" method="POST">
              <button type="submit" class="dropdown-item text-danger">
                <i class="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </form>
          </div>
        </li>
      </ul>
    </ul>
  </nav>
</template>

<style scoped>
.user-image {
  width: 29px !important; /* Adjust the width to make the image smaller */
  height: 29px !important; /* Adjust the height to make the image smaller */
  object-fit: cover; /* Ensure the image scales nicely */
}
</style>
