<script setup>
import logo from "@/assets/logo.png";
import { RouterLink } from "vue-router";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import router from "@/router";
import axios from "axios";

const toast = useToast();

const form = reactive({
  old_password: "",
  new_password: "",
  confirm_password: "",
  error_message: "",
});

const handleChangePassword = async () => {
  if (form.new_password !== form.confirm_password) {
    form.error_message = "Passwords do not match!";
    return;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      form.error_message = "User not found!";
      return;
    }

    // First, verify the old password
    const userResponse = await axios.get(`/api/users/${user.id}`);
    const userData = userResponse.data;

    if (userData.password !== form.old_password) {
      form.error_message = "Old password is incorrect!";
      return;
    }

    // Update the password
    const updateResponse = await axios.put(`/api/users/${user.id}`, {
      ...userData,
      password: form.confirm_password,
    });

    if (updateResponse.status === 200) {
      form.error_message = "Password changed successfully";
      localStorage.removeItem("user");
      router.push({ name: "login" });
    } else {
      form.error_message = "Failed to change password";
    }
    toast.success("Password changed successfully");
  } catch (error) {
    form.error_message = "An error occurred during password change";
    console.error(error);
  }
};
</script>

<template>
  <div class="login-box">
    <div v-if="form.error_message" class="alert alert-danger">
      {{ form.error_message }}
    </div>

    <div class="card">
      <div class="card-body login-card-body">
        <div class="login-logo">
          <a href="/">
            <img :src="logo" alt="Logo" width="100" />
          </a>
        </div>
        <p class="login-box-msg">Page Changed Password</p>

        <form @submit.prevent="handleChangePassword">
          <div class="mb-3">
            <div class="input-group">
              <input
                v-model="form.old_password"
                type="password"
                name="password"
                class="form-control"
                placeholder="Old Password"
                required
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
              v-model="form.new_password"
              type="password"
              name="new_password"
              class="form-control"
              placeholder="New Password"
              required
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
                v-model="form.confirm_password"
                type="password"
                name="confirm_new_password"
                class="form-control"
                placeholder="Confirm New Password"
                required
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
              <RouterLink to="/dashboard" class="btn btn-dark btn-block">
                Cancel
              </RouterLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
