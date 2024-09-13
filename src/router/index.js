import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/dashboard/index.vue";
import Jobs from "@/views/jobs/index.vue";
import AddJobs from "@/views/add-job/index.vue";
import DetailJob from "@/views/detail-job/index.vue";
import EditJob from "@/views/edit-job/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
