<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import Content from "@/components/atoms/Content.vue";
import ContainerFluid from "@/components/atoms/ContainerFluid.vue";
import router from "@/router";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const form = reactive({
  type: "Full-Time",
  title: "",
  description: "",
  salary: "",
  location: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const handleSubmit = async () => {
  const newJob = {
    title: form.title,
    type: form.type,
    location: form.location,
    description: form.description,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    await axios.post("/api/jobs", newJob);
    toast.success("Job Added Successfully");
    router.push("/jobs");
  } catch (error) {
    console.error(error);
    toast.error("Job wasn't Added!");
  }
};
</script>

<template>
  <CardHeader text="Add Job" class="text-center" />

  <Content>
    <ContainerFluid>
      <div
        class="row justify-content-center align-items-center"
        style="height: 100%"
      >
        <div class="col-md-6">
          <div class="card card-light">
            <div class="card-header">
              <h3 class="card-title">Add Job Desc and Company From!</h3>
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg mr-lg-3">
                    <div class="form-group">
                      <label>Job Title</label>
                      <input
                        v-model="form.title"
                        type="text"
                        class="form-control"
                        name="name"
                        id="name"
                        placeholder="Enter Job Title"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="type">Job Type</label>
                      <select
                        v-model="form.type"
                        id="type"
                        name="type"
                        class="form-control"
                        required
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="description">Description</label>
                      <textarea
                        v-model="form.description"
                        type="text"
                        class="form-control"
                        name="description"
                        id="description"
                        placeholder="Description"
                        style="height: 100px"
                      />
                    </div>

                    <div class="form-group">
                      <label for="type">Salary</label>
                      <select
                        v-model="form.salary"
                        id="salary"
                        name="salary"
                        class="form-control"
                        required
                      >
                        <option value="Under $50K">under $50K</option>
                        <option value="$50K - $60K">$50 - $60K</option>
                        <option value="$60K - $70K">$60 - $70K</option>
                        <option value="$70K - $80K">$70 - $80K</option>
                        <option value="$80K - $90K">$80 - $90K</option>
                        <option value="$90K - $100K">$90 - $100K</option>
                        <option value="$100K - $125K">$100 - $125K</option>
                        <option value="$125K - $150K">$125 - $150K</option>
                        <option value="$150K - $175K">$150 - $175K</option>
                        <option value="$175K - $200K">$175 - $200K</option>
                        <option value="Over $200K">Over $200K</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label>Location</label>
                      <input
                        v-model="form.location"
                        type="text"
                        class="form-control"
                        name="location"
                        id="location"
                        placeholder="Company Location"
                        required
                      />
                    </div>
                  </div>

                  <div class="col-lg">
                    <h5 class="mb-3">Company Info</h5>

                    <div class="form-group">
                      <label for="company">Company</label>
                      <input
                        v-model="form.company.name"
                        type="text"
                        class="form-control"
                        name="company"
                        id="company"
                        placeholder="Company Name"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="company_description"
                        >Company Description</label
                      >
                      <textarea
                        v-model="form.company.description"
                        id="company_description"
                        name="company_description"
                        class="form-control"
                        placeholder="What does your company do?"
                        style="height: 100px"
                      ></textarea>
                    </div>

                    <div class="form-group">
                      <label for="contact_email">Contact Email</label>
                      <input
                        v-model="form.company.contactEmail"
                        type="email"
                        id="contact_email"
                        name="contact_email"
                        class="form-control"
                        placeholder="Email address for applicants"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="contact_phone">Contact Phone</label>
                      <input
                        v-model="form.company.contactPhone"
                        type="tel"
                        id="contact_phone"
                        name="contact_phone"
                        class="form-control"
                        placeholder="Optional phone for applicants"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- /.card-body -->

              <div class="card-footer d-flex justify-content-end">
                <button type="submit" class="btn bg-olive">Add Job</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ContainerFluid>
  </Content>
</template>
