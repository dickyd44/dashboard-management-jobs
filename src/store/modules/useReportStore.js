import { defineStore } from "pinia";
import { reactive, nextTick } from "vue";
import axios from "axios";

export const useReportStore = defineStore("ReportStore", () => {
  const report = reactive({
    job: [],
    isLoading: true,
  });

  const fetchReportJobs = async () => {
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
  };

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

  return {
    report,
    fetchReportJobs,
    initializeDataTable,
  };
});
