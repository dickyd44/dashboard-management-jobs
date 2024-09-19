<script setup>
import logo from "@/assets/logo.png";
import router from "@/router";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const register = reactive({
  username: "",
  email: "",
  role: "",
  password: "",
  real_password: "",
  errorMessage: "",
});

const handleRegister = async () => {
  if (register.password !== register.real_password) {
    register.errorMessage = "Password do not match!";
    return;
  }

  try {
    const response = await axios.post("/api/users", {
      username: register.username,
      email: register.email,
      role: register.role,
      password: register.password,
    });
    const user = response.data;
    toast.success("Successfully registered an account");

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push({ name: "login" });
    } else {
      register.errorMessage = "Account has been Sign Up";
    }
  } catch (error) {
    toast.error("Couldn't register an account successfully");
    register.errorMessage = "An error occured during Sign Up";
    console.error(error);
  }
};
</script>

<template>
  <div class="login-box">
    <div v-if="register.errorMessage" class="alert alert-danger">
      {{ register.errorMessage }}
    </div>

    <div class="card card-outline card-ligth">
      <div class="card-header text-center">
        <a href="/"
          ><img class="img-circle" :src="logo" alt="Logo" width="90"
        /></a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Sign Up</p>

        <form @submit.prevent="handleRegister">
          <div class="input-group mb-3">
            <input
              v-model="register.username"
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
              v-model="register.email"
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
            <select v-model="register.role" class="form-control" name="role">
              <option disabled value="">Select Role</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              v-model="register.password"
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
              v-model="register.real_password"
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
                Register
              </button>
              <span class="btn-block w-100">
                if you have an <br />
                account please
                <RouterLink to="/login"><u>Sign In</u></RouterLink>
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
