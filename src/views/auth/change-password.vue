<script setup>
import logo from "@/assets/logo.png";
</script>

<template>
  <div class="login-box">
    <div class="card">
      <div class="card-body login-card-body">
        <div class="login-logo">
          <a href="/">
            <img :src="logo" alt="Logo" width="100" />
          </a>
        </div>
        <p class="login-box-msg">Page Changed Password</p>

        <form action="#" method="post">
          <div class="mb-3">
            <div class="input-group">
              <input
                type="password"
                name="password"
                class="form-control"
                placeholder="Old Password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              name="new_password"
              class="form-control"
              placeholder="New Password"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="input-group">
              <input
                type="password"
                name="confirm_new_password"
                class="form-control"
                placeholder="Confirm New Password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn bg-success btn-block">
                Change password
              </button>
              <a href="#" class="btn btn-dark btn-block">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
