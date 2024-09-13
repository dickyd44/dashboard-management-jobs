<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import CardHeader from "@/components/atoms/CardHeader.vue";
import axios from "axios";

const route = useRoute();

const idJob = route.params.id;

const state = reactive({
  job: {},
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${idJob}`);
    state.job = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <CardHeader text="Detail Specific" />

  <section v-if="!state.isLoading" class="content">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Job Details</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12 col-md-12 col-lg-7 order-2 order-md-1">
            <div class="row">
              <div class="col-12">
                <h4>Details History</h4>
                <div class="post">
                  <div class="user-block">
                    <img
                      class="img-circle img-bordered-sm"
                      src="/dist/img/user1-128x128.jpg"
                      alt="user image"
                    />
                    <span class="username">
                      <a href="#">{{ state.job.type }}</a>
                    </span>
                    <span class="description">{{ state.job.title }}</span>
                  </div>
                  <!-- /.user-block -->
                  <p>
                    {{ state.job.description }}
                  </p>

                  <p>
                    <i aria-hidden="true" class="fa fa-location-arrow mr-2"></i
                    >{{ state.job.location }}
                  </p>
                  <p>
                    <i aria-hidden="true" class="fa fa-credit-card mr-2"></i
                    >{{ state.job.salary }} / Year
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-5 order-1 order-md-2">
            <h3 class="text-primary">
              <i class="fas fa-paint-brush"></i> {{ state.job.company.name }}
            </h3>
            <p class="text-muted">
              {{ state.job.company.description }}
            </p>
            <br />
            <div class="text-muted">
              <p class="text-sm">
                Email
                <b class="d-block">{{ state.job.company.contactEmail }}</b>
              </p>
              <p class="text-sm">
                Contact
                <b class="d-block">{{ state.job.company.contactPhone }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </section>

  <div v-else class="text-center text-secondary">
    <PulseLoader />
  </div>
</template>
