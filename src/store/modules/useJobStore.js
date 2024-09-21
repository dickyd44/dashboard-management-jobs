import { defineStore } from "pinia";
import { reactive, nextTick } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

export const useJobStore = defineStore("jobStore", () => {
  const toast = useToast();

  const state = reactive({
    job: [],
    isLoading: true,
  });

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`/api/jobs`);
      state.job = response.data.sort((a, b) => a - b);
      console.log("Fetched jobs:", state.job); // Check if jobs are fetched correctly
      await nextTick();
      initializeDataTable(); // Initialize the DataTable
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      state.isLoading = false;
    }
  };

  // Function to delete a job
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
          text: "Your job has been deleted.",
          icon: "success",
        });
        const table = $("#table-primary").DataTable();
        const row = table.row(`#row-${id}`); // Assumes row IDs match job IDs
        row.remove().draw(); // Remove the row from DataTable
        await nextTick();
        initializeDataTable(); // Reinitialize DataTable after updating data
      } catch (error) {
        console.error(error);
        toast.error("Job wasn't deleted!");
      }
    }
  };

  // Initialize the DataTable
  const initializeDataTable = () => {
    // Check if DataTable exists
    if (!$.fn.DataTable.isDataTable("#table-primary")) {
      $("#table-primary").DataTable({
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        autoWidth: false,
        scrollX: false,
        scrollCollapse: false,
        order: [[0, "desc"]],
      });
    } else {
      $("#table-primary")
        .DataTable()
        .order([[0, "desc"]])
        .draw();
    }
  };

  return {
    state,
    fetchJobs,
    deleteJob,
    initializeDataTable,
  };
});
