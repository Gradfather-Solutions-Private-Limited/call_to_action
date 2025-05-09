<template>
  <div class="card mt-10">
    <div class="card-body">
      <div v-if="!showForm">
        <button class="btn btn-primary mb-3" @click="openForm">Add New Hospital</button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Website</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hospital, index) in hospitals" :key="index">
              <td>{{ hospital.name }}</td>
              <td>{{ hospital.contact }}</td>
              <td>{{ hospital.website }}</td>
              <td>{{ hospital.country }}</td>
              <td>{{ hospital.state }}</td>
              <td>{{ hospital.city }}</td>
              <td>
                <button class="btn btn-sm btn-warning" @click="editHospital(index)">Edit</button>
                <button class="btn btn-sm btn-danger" @click="deleteHospital(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-3">
          <button class="btn btn-sm btn-secondary me-2" :disabled="pagination.current_page === 1"
            @click="changePage(pagination.current_page - 1)">
            Previous
          </button>
          <span>Page {{ pagination.current_page }}</span>
          <button class="btn btn-sm btn-secondary ms-2"
            :disabled="pagination.current_page * pagination.per_page >= pagination.total"
            @click="changePage(pagination.current_page + 1)">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-if="showForm">
      <AddHospitalForm :form-data="currentHospital" :is-editing="isEditing" @submit="handleSubmit"
        @cancel="cancelForm" />
    </div>

  </div>
</template>

<script>
import AddHospitalForm from './AddHospitalForm.vue';

export default {
  components: { AddHospitalForm },
  data() {
    return {
      hospitals: [],
      showForm: false,
      isEditing: false,
      editIndex: null,
      currentHospital: null,
      pagination: {
        current_page: 1,
        per_page: 5,
        total: 0
      },
    };
  },
  mounted() {
    this.gethplist();
  },
  methods: {
    gethplist(page = 1) {
      axios.post(`api/university/lists?page=${page}`).then(response => {
        console.log('hospital', response.data);
        const { data, current_page, per_page, total } = response.data;
        this.hospitals = data.map((item) => {
          let parsed = JSON.parse(item.jsontext);
          try {
            parsed.courses = JSON.parse(parsed.courses);
          } catch (e) {
            parsed.courses = {};
          }
          return {
            id: item.id,
            ...parsed
          };
          
        })
        this.pagination.current_page = current_page;
        this.pagination.per_page = per_page;
        this.pagination.total = total;
      })
        .catch((error) => {
          console.error('Failed to fetch hospital list:', error);
        });
    },
    openForm() {
      this.showForm = true;
      this.isEditing = 0;
      this.currentHospital = null;
    },
    changePage(page) {

      this.gethplist(page);
    },
    editHospital(index) {
      this.editIndex = index;
      this.isEditing = true;
      this.showForm = true;
      this.currentHospital = { ...this.hospitals[index] };
    },
    deleteHospital(index) {
      if (confirm('Are you sure you want to delete this hospital?')) {
        this.hospitals.splice(index, 1);
      }
    },
    handleSubmit(form) {
     
      const { id, ...formWithoutId } = form;
      const jsonEncoded = JSON.stringify(formWithoutId);
      const payload = {
        id: id,
        jsontext: jsonEncoded
      };
      if (this.isEditing) {
       
        this.hospitals.splice(this.editIndex, 1, form);
      } else {
        
        this.hospitals.push(form);
      }
      this.cancelForm();
    },

    cancelForm() {
      this.showForm = false;
      this.isEditing = false;
      this.currentHospital = null;
    }
  }
};
</script>