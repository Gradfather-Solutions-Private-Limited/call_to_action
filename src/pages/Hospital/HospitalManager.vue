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
      </div>
  
      <div v-if="showForm">
        <AddHospitalForm
          :form-data="currentHospital"
          :is-editing="isEditing"
          @submit="handleSubmit"
          @cancel="cancelForm"
        />
      </div>
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
        currentHospital: null
      };
    },
    methods: {
      openForm() {
        this.showForm = false;
        this.isEditing = false;
        this.currentHospital = null;
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