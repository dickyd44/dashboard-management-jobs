<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import { RouterLink } from "vue-router";
import { reactive, onMounted, nextTick } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const state = reactive({
  job: [],
  isLoading: true,
});

const deleteJob = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`/api/jobs/${id}`);
      state.job = state.job.filter((job) => job.id !== id);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });

      // toast.success("Deleted job successfully");
    } catch (error) {
      console.error(error);
      toast.error("Job wasn't deleted!");
    }
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs`);
    state.job = response.data;
    await nextTick();
    initializeDataTable();
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
});

const initializeDataTable = () => {
  $("#table-primary").DataTable({
    paging: true,
    lengthChange: false,
    searching: true,
    ordering: true,
    info: true,
    responsive: true,
    autoWidth: false,
    //
    scrollX: false,
    scrollCollapse: false,
  });
};
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
                  <tr v-for="(job, idx) in state.job" :key="job.id" :job="job">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ job.title }}</td>
                    <td>{{ job.type }}</td>
                    <td>{{ job.description.substring(0, 70) }}...</td>
                    <td>{{ job.location }}</td>
                    <td>{{ job.salary }}</td>
                    <td class="d-flex">
                      <RouterLink
                        :to="`/jobs/${job.id}`"
                        type="button"
                        class="btn btn-secondary mr-2"
                      >
                        <i class="fa fa-eye mr-1" /> Detail
                      </RouterLink>
                      <RouterLink
                        :to="`/jobs/edit/${job.id}`"
                        type="button"
                        class="btn btn-info mr-2"
                      >
                        <i class="fa fa-edit mr-1" /> Edit
                      </RouterLink>
                      <button
                        @click="() => deleteJob(job.id)"
                        type="button"
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
    </div>
  </section>
</template>
