<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import { reactive, onMounted, nextTick } from "vue";
import axios from "axios";

const report = reactive({
  job: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs`);
    report.job = response.data;
    console.log("Fetched Jobs:", report.job); // Debugging line
    await nextTick();
    initializeDataTable();
  } catch (error) {
    console.error(error);
  } finally {
    report.isLoading = false;
  }
});

const initializeDataTable = () => {
  $("#table-export")
    .DataTable({
      responsive: true,
      paging: true,
      lengthChange: false,
      autoWidth: false,
      buttons: ["excel", "pdf", "print"],
    })
    .buttons()
    .container()
    .appendTo("#table-export_wrapper .col-md-6:eq(0)");
};
</script>

<template>
  <CardHeader text="Reports Jobs" />

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(job, idx) in report.job" :key="job.id" :job="job">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ job.title }}</td>
                    <td>{{ job.type }}</td>
                    <td>{{ job.description.substring(0, 70) }}...</td>
                    <td>{{ job.location }}</td>
                    <td>{{ job.salary }}</td>
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
