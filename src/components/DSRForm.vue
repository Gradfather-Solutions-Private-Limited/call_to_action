<template>
  <div>



    <form @submit.prevent="handleSubmit">
      <h2 class="form-title">{{ editMode ? "Edit DSR Task" : "Create DSR Task" }}</h2>
      <div class="form-group-horizontal">
        <label for="title">Username :</label>
        <input class="form-control" v-model="dsrTask.dsrtitle" type="text" placeholder="Title" required />
      </div>
      <div class="form-group-horizontal">
        <label for="description">Description : </label>
        <textarea class="form-control" v-model="dsrTask.dsrdescription" placeholder="Description" required></textarea>
      </div>
      <div class="form-group-horizontal">
        <label for="salesmen">Salesmen :</label>
        <!-- <input class="form-control" v-model="dsrTask.username" type="text" placeholder="Username" required /> -->
        <select class="form-control" v-model="dsrTask.foruserid" >
          <option v-for="user in salesmen" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="form-group-horizontal">
        <label for="taskDate">Task Date :</label>
        <input class="form-control" v-model="formattedDate" type="date" required @change="onDateChange()" />
      </div>
      <div class="form-group-horizontal">
        <label for="status">Status :</label>
        <select class="form-control" v-model="dsrTask.status" required>
          <option value="0">Pending</option>
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
        </select>
      </div>
      <div class="form-group-horizontal">
        <label for="comments">Comments :</label>
        <textarea class="form-control" v-model="dsrTask.comment" placeholder="Comments"></textarea>
      </div>
      <button type="submit">{{ editMode ? "Update" : "Create" }}</button>

    </form>
  </div>


</template>

<script>
import {mapState, mapMutations,mapActions } from "vuex";

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    taskToEdit: {
      type: Object,
      default: () => null,
    },
  },
  created() {
    // Initialize the formatted date
    this.formattedDate = this.formatUnixTime(this.dsrTask.taskdate);
  },
  data() {
    return {
      // dsrTask: this.taskToEdit ? { ...this.taskToEdit } : { dsrtitle: "", description: "", username: "",foruserinfo :{ id: 0, name: ''} , taskDate: "", status: "Pending", comments: "" },
      dsrTask: this.taskToEdit ? {
      ...this.taskToEdit,
      dsrid: this.taskToEdit.id,
      username: this.taskToEdit.foruserinfo ? this.taskToEdit.foruserinfo.name : '',
      foruserid: this.taskToEdit.foruser
    } : {
      dsrtitle: "",
      description: "",
      username: "",
      foruserinfo: { id: 0, name: '' },
      taskDate: "",
      status: "0",
      comments: "",
    },
      formattedDate: ''
    };
  },
  computed: {
    ...mapState(["salesmen"]),
  },
  mounted(){
    this.fetchSalesMen();
  },  
  methods: {
    ...mapActions(['addDsrTask','updateDsrTask','fetchSalesMen','fetchDsrTasks']),
    // ...mapMutations([ "updateDsrTask"]),
    handleSubmit() {
      this.$store.commit('assignnewtask', this.dsrTask);
      if (this.editMode) {
        // this.updateDsrTask(this.dsrTask);
        this.updateDsrTask()
      } else {
        // this.addDsrTask({ ...this.dsrTask, id: Date.now() });
        this.addDsrTask()
      }
      this.resetForm();
    },
    resetForm() {
      this.dsrTask = {
        dsrtitle: "",
        description: "",
        username: "",
        taskDate: "",
        status: "Pending",
        comments: "",
      };
      this.fetchDsrTasks()
    },
    formatUnixTime(unixTime) {
      const date = new Date(unixTime * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    onDateChange() {
      const [year, month, day] = this.formattedDate.split('-');
      this.dsrTask.taskDate = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
      this.dsrTask.taskdate = this.formattedDate
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}


.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: black;
}


label {
  display: inline;
  font-weight: bold;
  color: black;
  margin-bottom: 2px;
}


input,
select,
textarea {
  width: 50%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #050505;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 50px;
}

button {
  margin-left: 35%;
  width: 30%;
  padding: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.inputstyle {
  margin-left: 35px;
}

button:hover {
  background-color: #0056b3;
}


.form-group-horizontal {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-group-horizontal label {
  width: 150px;
  margin-right: 20px;
  font-weight: bold;
  color: #555;
}

.form-group-horizontal input,
.form-group-horizontal select,
.form-group-horizontal textarea {
  width: 80%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>