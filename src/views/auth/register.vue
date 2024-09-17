<script setup>
import logo from "@/assets/logo.png";
</script>

<template>
  <div class="login-box">
    <div class="card card-outline card-ligth">
      <div class="card-header text-center">
        <a href="/"
          ><img class="img-circle" :src="logo" alt="Logo" width="90"
        /></a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Sign Up</p>

        <form action="/login" method="post">
          <div class="input-group mb-3">
            <input
              name="username"
              type="text"
              class="form-control"
              placeholder="Username"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              name="email"
              type="email"
              class="form-control"
              placeholder="Email"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              name="confirm-password"
              type="password"
              class="form-control"
              placeholder="Confirm Password"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <!-- /.col -->
            <div class="col-12">
              <button type="submit" class="btn btn-success btn-block w-100">
                Login
              </button>
              <span class="btn-block w-100">
                if you have an <br />
                account please
                <a href="/login"><u>Sign In</u></a>
              </span>
            </div>
            <!-- /.col -->
          </div>
        </form>
      </div>
      <!-- /.card-body -->
    </div>
  </div>
</template>
