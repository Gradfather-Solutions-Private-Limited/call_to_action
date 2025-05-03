<template>
    <div class="container-fluid" v-if="flag == 0">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <label for="title">Job Title:</label>
              <!-- Search input to filter by job title -->
              <input type="text" v-model="title" id="title" class="form-control">
            </div>
            <div class="col-md-6">
              <button class="btn btn-primary mt-30" @click="open(1)">Add Jobs</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Job Title</th>
                <th>Job Description</th>
                <th>City</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop through filtered lists -->
              <tr v-for="(item, index) in filteredLists" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <i class="bx bx-edit" style="font-size: 24px;" @click="edititem(item)"></i>
                </td>
                <td>
                  <i class="bx bx-trash" style="font-size: 24px;" @click="deletejob(item)"></i>
                </td>
                <td>{{ item.title }}</td>
                <td>
                  <div style="height: 150px; overflow: scroll;">
                    <p v-html="item.description"></p>
                  </div>
                </td>
                <td>{{ item.cityname }}</td>
                <td>{{ item.salary }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
    <div v-if="flag == 1">
      <create-form :edititem="edititem"></create-form>
    </div>
  </template>
  
  <script>
  import CreateForm from './CreateForm.vue';
  
  export default {
    components: { CreateForm },
    data() {
      return {
        flag: 0,
        lists: [],
        editdata: [],
        title: '', // Search query for job title
      };
    },
  
    mounted() {
      this.$store.commit('assignaddpageheading', 'Lists of Jobs');
      this.getlist();
    },
  
    computed: {
      // Filtered lists based on the title input
      filteredLists() {
        return this.lists.filter(item => 
          item.title.toLowerCase().includes(this.title.toLowerCase())
        );
      },
    },
  
    methods: {
      getlist() {
        axios.post('api/hayat/getalljobs').then(response => {
          this.lists = response.data;
        });
      },
      open(n) {
        this.flag = n;
        console.log('form page');
      },
      edititem(item) {
        this.editdata = item;
        this.flag = 1;
      },
      deletejob(item) {
        axios.post('api/hayat/deletejob', item).then(response => {
          // Handle successful delete (optional, like refreshing list)
        });
      },
    },
  };
  </script>
  