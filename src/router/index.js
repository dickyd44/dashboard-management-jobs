import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/login.vue";
import ChangePassword from "@/views/auth/change-password.vue";
import Dashboard from "@/views/dashboard/index.vue";
import Jobs from "@/views/jobs-pages/jobs/index.vue";
import AddJobs from "@/views/jobs-pages/add-job/index.vue";
import DetailJob from "@/views/jobs-pages/detail-job/index.vue";
import EditJob from "@/views/jobs-pages/edit-job/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/change-password",
      name: "change-password",
      component: ChangePassword,
    },
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: Jobs,
    },
    {
      path: "/jobs/:id",
      name: "detail-job",
      component: DetailJob,
    },
    {
      path: "/jobs/add",
      name: "add-job",
      component: AddJobs,
    },
    {
      path: "/jobs/edit/:id",
      name: "edit-job",
      component: EditJob,
    },
  ],
});

export default router;
