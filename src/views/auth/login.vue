<script setup>
import logo from "@/assets/logo.png";
import router from "@/router";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const account = reactive({
  username: "",
  email: "",
  password: "",
  errorMessage: "",
});

const handleLogin = async () => {
  try {
    const response = await axios.get("/api/users", {
      params: { username: account.username, password: account.password },
    });
    const user = response.data[0];

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push({ name: "dashboard" });
    } else {
      account.errorMessage = "Invalid Username or Password";
    }
  } catch (error) {
    account.errorMessage = "An error occured during login";
    console.error(error);
  }
};
</script>

<template>
  <div class="login-box">
    <div v-if="account.errorMessage" class="alert alert-danger">
      {{ account.errorMessage }}
    </div>

    <div class="card card-outline card-ligth">
      <div class="card-header text-center">
        <a href="/"
          ><img class="img-circle" :src="logo" alt="Logo" width="90"
        /></a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Sign In</p>

        <form @submit.prevent="handleLogin">
          <div class="input-group mb-3">
            <input
              v-model="account.username"
              name="username"
              type="text"
              class="form-control"
              placeholder="Username"
              required
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              v-model="account.password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
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
                if you don't have an <br />
                account please
                <RouterLink to="/register"><u>Sign Up</u></RouterLink>
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
