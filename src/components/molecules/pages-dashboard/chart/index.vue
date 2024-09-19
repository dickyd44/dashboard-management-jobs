<script setup>
import Content from "@/components/atoms/Content.vue";
import ContainerFluid from "@/components/atoms/ContainerFluid.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";

const state = reactive({
  chartData: {
    donut: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#f56954",
            "#00a65a",
            "#f39c12",
            "#00c0ef",
            "#3c8dbc",
            "#d2d6de",
          ],
        },
      ],
    },
    bar: {
      labels: [],
      datasets: [
        {
          data: [],
          label: "Job Types",
          backgroundColor: "rgba(60,141,188,0.9)",
          borderColor: "rgba(60,141,188,0.8)",
        },
      ],
    },
  },
  canvasContext: {
    donut: null,
    bar: null,
  },
  charts: {
    donut: null,
    bar: null,
  },
});

// Initialize charts using reactive state
const initializeCharts = () => {
  const { donut, bar } = state.canvasContext;

  if (state.charts.donut) state.charts.donut.destroy();
  if (state.charts.bar) state.charts.bar.destroy();

  state.charts.donut = new Chart(donut, {
    type: "doughnut",
    data: state.chartData.donut,
    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
  });

  state.charts.bar = new Chart(bar, {
    type: "bar",
    data: state.chartData.bar,
    options: {
      maintainAspectRatio: false,
      datasetFill: false,
      responsive: true,
    },
  });
};

onMounted(async () => {
  try {
    const donutCanvas = document.getElementById("donutChart");
    const barChartCanvas = document.getElementById("barChart");
    state.canvasContext.donut = donutCanvas.getContext("2d");
    state.canvasContext.bar = barChartCanvas.getContext("2d");

    const response = await axios.get("/api/jobs");
    const jobs = response.data;

    state.chartData.donut.labels = jobs.map((job) => job.type);
    state.chartData.donut.datasets[0].data = jobs.map(
      (job) => parseFloat(job.salary.replace(/[^\d.-]/g, "")) || 0
    );

    const jobCounts = jobs.reduce((acc, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    }, {});

    state.chartData.bar.labels = Object.keys(jobCounts);
    state.chartData.bar.datasets[0].data = Object.values(jobCounts);

    initializeCharts();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Content>
    <ContainerFluid>
      <div class="row">
        <!-- DONUT CHART -->
        <div class="col-md-6">
          <div class="card card-danger">
            <div class="card-header">
              <h3 class="card-title">Donut Chart</h3>

              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <canvas
                id="donutChart"
                style="
                  min-height: 250px;
                  height: 250px;
                  max-height: 250px;
                  max-width: 100%;
                "
              ></canvas>
            </div>
            <!-- /.card-body -->
          </div>
        </div>

        <!-- BAR CHART -->
        <div class="col-md-6">
          <div class="card card-success">
            <div class="card-header">
              <h3 class="card-title">Bar Chart</h3>

              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="chart">
                <canvas
                  id="barChart"
                  style="
                    min-height: 250px;
                    height: 250px;
                    max-height: 250px;
                    max-width: 100%;
                  "
                ></canvas>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
      </div>
    </ContainerFluid>
  </Content>
</template>
