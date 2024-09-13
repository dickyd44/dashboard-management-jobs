<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import { RouterLink } from "vue-router";
import { reactive, onMounted } from "vue";
import axios from "axios";

const state = reactive({
  job: {},
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs`);
    state.job = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <CardHeader text="List Jobs" />

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-end">
              <RouterLink to="/jobs/add" class="btn btn-success"
                >Add Job</RouterLink
              >
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table
                id="table-export"
                class="table table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Job Title</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="job in state.job" :key="job.id">
                    <td>{{ job.id }}</td>
                    <td>{{ job.title }}</td>
                    <td>{{ job.type }}</td>
                    <td>{{ job.description.substring(0, 70) }}...</td>
                    <td>{{ job.location }}</td>
                    <td>{{ job.salary }}</td>
                    <td class="d-flex">
                      <RouterLink
                        :to="'/jobs/' + job.id"
                        type="button"
                        class="btn btn-secondary mr-2"
                      >
                        <i class="fa fa-eye mr-1" /> Detail
                      </RouterLink>
                      <RouterLink
                        :to="`/jobs/edit/${state.job.id}`"
                        type="button"
                        class="btn btn-info mr-2"
                      >
                        <i class="fa fa-edit mr-1" /> Edit
                      </RouterLink>
                      <button type="button" class="btn btn-danger">
                        <i class="fa fa-trash mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
