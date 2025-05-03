<template>
  <div class="container-fluid">
    <div class="card mt-10">
    
      <div class="card-body">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <div class="col-md-12">
                <div class="col-md-12"><span class="heading-border">Select Date</span></div>


                <!-- Filters -->
                <div class="filters">
                  <input v-model="dsrFilters.taskDate" type="date" placeholder="Filter by Task Date"
                    @input="updateFilters" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12">
                <div class="col-md-12"><span class="heading-border">UserName</span></div>
                <div class="filters">
                <input v-model="dsrFilters.username" type="text" placeholder="Filter by Username" @input="updateFilters"
                  class="form-control" />

                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12">
                <div class="col-md-12"><span class="heading-border">Select Status</span></div>
                <div class="filters">
                  <select v-model="dsrFilters.status" @change="updateFilters" class="form-control">
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>


      <!-- Add New Task Button -->
      <div class="footer">
        <div class="card-body">
          <div class="col-md-12  d-flex">
            <button class="btn btn-primary">Search</button>

            <button @click="openTaskForm()" class="btn btn-success ms-auto">Add New Task</button>
          </div>
        </div>
      </div>
      <!-- Task List -->
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Salesmen</th>
                  <th>Address</th>
                  <th>Task Date</th>
                  <th>Status</th>
                  <th>Comments</th>
                  <th>Entry By</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dsrTask in dsrTasks" :key="dsrTask.id">
                  <td>{{ dsrTask.dsrtitle }}</td>
                  <td>{{ dsrTask.dsrdescription }}</td>
                  <td>{{ dsrTask.foruserinfo?.name }}</td>
                  <td>{{ dsrTask.address ?? '' }}</td>
                  <td>{{ formatUnixTime(dsrTask.taskdate)  }}</td>
                  <td>
                    <span v-if="dsrTask.status==0 || dsrTask.status==null">Pending</span>
                    <span v-if="dsrTask.status == 1">Approved</span>
                    <span v-if="dsrTask.status == 2"> Rejected</span>
                  </td>
                  <td>{{ dsrTask.comment }}</td>
                  <td>{{ dsrTask.createdbyuserinfo?.name }}</td>
                  <td>
                <div v-if="dsrTask.latitude != null && dsrTask.longitude != null">
                  <a :href='`https://www.google.com/maps/search/?api=1&query=${dsrTask.latitude},${dsrTask.longitude}`'
                    target="_blank">
                    <i class='bx bxs-map-pin location_pin'></i>
                  </a>
                </div>

              </td>
                  <td>
                    <!-- Edit Button -->
                    <button @click="openTaskForm(dsrTask)" class="btn btn-primary">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- DSR Form Modal -->
    <div v-if="isTaskFormVisible" class="modal">
      <div class="modal-content">
        <button @click="closeTaskForm" class="close-button">X</button>
        <DSRForm :editMode="!!currentTask" :taskToEdit="currentTask" @formSubmit="handleFormSubmit" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import DSRForm from "../components/DSRForm.vue";

export default {
  components: { DSRForm },
  data() {
    return {
      isTaskFormVisible: false,
      currentTask: null, // Holds the task being edited (if any)
    };
  },
  computed: {
    ...mapState(["dsrTasks", "dsrFilters", "addpageheading"]),
  },
  methods: {
    ...mapActions(["fetchDsrTasks", "setDsrFilters"]),
    updateFilters() {
      this.setDsrFilters(this.dsrFilters);
      this.fetchDsrTasks(); // Fetch the filtered DSR tasks from the API
    },
    openTaskForm(task = null) {
      console.log(task)
      this.currentTask = task; // Set the task to edit or null for new task
      
      this.isTaskFormVisible = true;
    },
    closeTaskForm() {
      this.isTaskFormVisible = false;
      this.currentTask = null;
    },
    handleFormSubmit() {
      this.fetchDsrTasks(); // Refresh the task list after submitting the form
      this.closeTaskForm();
    },
    formatUnixTime(unixTime) {
      const date = new Date(unixTime * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}` ?? '';
    },
  },
  mounted() {
    this.$store.commit("assignaddpageheading", 'DSR List');
    this.fetchDsrTasks(); // Fetch tasks when the component loads
  },
};
</script>

<style>
/* Basic styles for modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>