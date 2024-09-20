<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import Content from "@/components/atoms/Content.vue";
import ContainerFluid from "@/components/atoms/ContainerFluid.vue";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import { useJobStore } from "@/store/modules/useJobStore";

const jobStore = useJobStore();

onMounted(() => {
  jobStore.fetchJobs();
});
</script>

<template>
  <CardHeader text="List Jobs" />

  <Content>
    <ContainerFluid>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-end">
              <RouterLink to="/jobs/add" class="btn bg-olive">
                Add Job
              </RouterLink>
            </div>
            <div class="card-body">
              <table
                id="table-primary"
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
                  <tr v-for="(job, idx) in jobStore.state.job" :key="job.id">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ job.title }}</td>
                    <td>{{ job.type }}</td>
                    <td>{{ job.description.substring(0, 70) }}...</td>
                    <td>{{ job.location }}</td>
                    <td>{{ job.salary }}</td>
                    <td class="d-flex">
                      <RouterLink
                        :to="`/jobs/${job.id}`"
                        class="btn btn-secondary mr-2"
                      >
                        <i class="fa fa-eye mr-1" /> Detail
                      </RouterLink>
                      <RouterLink
                        :to="`/jobs/edit/${job.id}`"
                        class="btn btn-info mr-2"
                      >
                        <i class="fa fa-edit mr-1" /> Edit
                      </RouterLink>
                      <button
                        @click="jobStore.deleteJob(job.id)"
                        class="btn btn-danger"
                      >
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
    </ContainerFluid>
  </Content>
</template>
