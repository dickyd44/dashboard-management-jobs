<script setup>
import CardHeader from "@/components/atoms/CardHeader.vue";
import Content from "@/components/atoms/Content.vue";
import ContainerFluid from "@/components/atoms/ContainerFluid.vue";
import { reactive, onMounted, nextTick, computed, ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const state = reactive({
  user: [],
  isLoading: true,
});

const adminUsers = computed(() =>
  state.user.filter(
    (user) => user.role === "superadmin" || user.role === "admin"
  )
);
const allUsers = computed(() =>
  state.user.filter((user) => user.role === "user")
);

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
      await axios.delete(`/api/users/${id}`);
      state.user = state.user.filter((user) => user.id !== id);
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
    const response = await axios.get(`/api/users`);
    state.user = response.data;
    console.log("Fetched Jobs:", state.user); // Debugging line
    await nextTick();
    initializeDataTable("#table-admin");
    initializeDataTable("#table-users");
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
});

const initializeDataTable = (tableId) => {
  $(tableId).DataTable({
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

const useRole = ref(null);

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    useRole.value = parsedUser.role;
  }
});
</script>

<template>
  <CardHeader text="Users" />

  <Content>
    <ContainerFluid>
      <div class="row">
        <div class="col-12">
          <!-- Custom Tabs -->
          <div class="card">
            <div class="card-header d-flex p-0">
              <ul class="nav nav-pills ml-auto p-2">
                <li class="nav-item">
                  <a class="nav-link active" href="#admin" data-toggle="tab"
                    >Admin</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#users" data-toggle="tab">Users</a>
                </li>
              </ul>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane active" id="admin">
                  <div class="card-body">
                    <table
                      id="table-admin"
                      class="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th
                            v-if="
                              useRole === 'superadmin' || useRole === 'admin'
                            "
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(user, idx) in adminUsers"
                          :key="user.id"
                          :user="user"
                        >
                          <td>{{ idx + 1 }}</td>
                          <td>{{ user.username }}</td>
                          <td>{{ user.email }}</td>
                          <td>{{ user.role }}</td>
                          <td
                            v-if="
                              useRole === 'superadmin' || useRole === 'admin'
                            "
                          >
                            <button
                              @click="() => deleteJob(user.id)"
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
                <!-- /.tab-pane -->
                <div class="tab-pane" id="users">
                  <div class="card-body">
                    <table
                      id="table-users"
                      class="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th
                            v-if="
                              useRole === 'superadmin' || useRole === 'admin'
                            "
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(user, idx) in allUsers"
                          :key="user.id"
                          :user="user"
                        >
                          <td>{{ idx + 1 }}</td>
                          <td>{{ user.username }}</td>
                          <td>{{ user.email }}</td>
                          <td>{{ user.role }}</td>
                          <td
                            v-if="
                              useRole === 'superadmin' || useRole === 'admin'
                            "
                          >
                            <button
                              @click="() => deleteJob(user.id)"
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
                <!-- /.tab-pane -->
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /.card-body -->
          </div>
          <!-- ./card -->
        </div>
        <!-- /.col -->
      </div>
    </ContainerFluid>
  </Content>
</template>
