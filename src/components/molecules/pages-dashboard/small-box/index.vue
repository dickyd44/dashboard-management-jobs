<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import Content from "@/components/atoms/Content.vue";
import ContainerFluid from "@/components/atoms/ContainerFluid.vue";
import { reactive, onMounted } from "vue";
import axios from "axios";

const status = reactive({
  totalUser: 0,
  totalJobs: 0,
  fullTimeCount: 0,
  internshipCount: 0,
  partTimeCount: 0,
  remoteCount: 0,
  fullTimePercentage: 0,
  internshipPercentage: 0,
  partTimePercentage: 0,
  remotePercentage: 0,
  totalSalary: 0,
});

onMounted(async () => {
  try {
    const userResponse = await axios.get("/api/users");
    status.totalUser = userResponse.data.length;

    const jobsResponse = await axios.get("/api/jobs");
    status.totalJobs = jobsResponse.data.length;

    status.fullTimeCount = 0;
    status.internshipCount = 0;
    status.partTimeCount = 0;
    status.remoteCount = 0;

    // Calculate count for each job type
    jobs.forEach((job) => {
      if (job.type === "Full-Time") {
        status.fullTimeCount++;
      } else if (job.type === "Internship") {
        status.internshipCount++;
      } else if (job.type === "Remote") {
        status.remoteCount++;
      } else if (job.type === "Part-Time") {
        status.partTimeCount++;
      }
    });

    if (status.totalJobs > 0) {
      status.fullTimePercentage = (
        (status.fullTimeCount / status.totalJobs) *
        100
      ).toFixed(10);
      status.internshipPercentage = (
        (status.internshipCount / status.totalJobs) *
        100
      ).toFixed(10);
      status.partTimePercentage = (
        (status.partTimeCount / status.totalJobs) *
        100
      ).toFixed(10);
      status.remotePercentage = (
        (status.remoteCount / status.totalJobs) *
        100
      ).toFixed(10);
    }

    const totalSalary = job.reduce((acc, job) => {
      const salaryRange = job.salary.match(/\d+/g);
      if (salaryRange && salaryRange >= 2) {
        const minSalary = parseInt(salaryRange[0]) * 1000;
        const maxSalary = parseInt(salaryRange[1]) * 1000;
        const averageSalary = (minSalary + maxSalary) / 2;
        return acc + averageSalary;
      }
      return acc;
    }, 0);
    status.totalSalary = totalSalary;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <CardHeader text="Dashboard" />

  <Content>
    <ContainerFluid>
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ status.totalJobs }}</h3>

              <p>Jobs Vacancies</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>{{ status.totalUser }}</h3>

              <p>User Registrations</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-teal">
            <div class="inner">
              <h3>
                {{ status.fullTimePercentage
                }}<sup style="font-size: 20px">%</sup>
              </h3>

              <p>Full-Time</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-teal">
            <div class="inner">
              <h3>
                {{ status.internshipPercentage
                }}<sup style="font-size: 20px">%</sup>
              </h3>

              <p>Internship</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-teal">
            <div class="inner">
              <h3>
                {{ status.remotePercentage
                }}<sup style="font-size: 20px">%</sup>
              </h3>

              <p>Remote</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-teal">
            <div class="inner">
              <h3>
                {{ status.partTimePercentage
                }}<sup style="font-size: 20px">%</sup>
              </h3>

              <p>Part-Time Jobs Type</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>${{ (status.totalSalary / 1000).toFixed(2) }}K</h3>
              <p>Total Job Salary</p>
            </div>
            <div class="icon">
              <i class="ion ion-cash"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fas fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
    </ContainerFluid>
  </Content>
</template>
