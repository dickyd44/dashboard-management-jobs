<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import Content from "@/components/atoms/Content.vue";
import ContainerFluid from "@/components/atoms/ContainerFluid.vue";
import { onMounted } from "vue";
import { useReportStore } from "@/store/modules/useReportStore";

const ReportStore = useReportStore();

onMounted(() => {
  ReportStore.fetchReportJobs();
});
</script>

<template>
  <CardHeader text="Reports Jobs" />

  <Content>
    <ContainerFluid>
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
                  <tr
                    v-for="(job, idx) in ReportStore.report.job"
                    :key="job.id"
                    :job="job"
                  >
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
    </ContainerFluid>
  </Content>
</template>
