<template>
    <div class="card mt-10">
      <div class="card-body" v-if="!showForm">
        <button class="btn btn-primary mb-3" @click="openForm()">Add New Patient</button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Country</th>
              <th>Courses</th>
              <th>Actions</th>
              <th></th>
          </tr>
          </thead>
            <tbody>
              <tr v-for="(patient, index) in patients" :key="index">
                <td>{{ patient.name }}</td>
                <td>{{ patient.mobile }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.country }}</td>
                <td>
                  <ul>
                    <li
                      v-for="(selected, course) in patient.courses"
                      v-if="selected"
                      :key="course"
                    >
                      {{ course }}
                    </li>
                  </ul>
                </td>
                <td>
                  <button class="btn btn-sm btn-warning" @click="editPatient(index)">Edit</button>
                  <button class="btn btn-sm btn-danger" @click="deletePatient(index)">Delete</button>
                </td>
                <td style="font-size: 24px;color: red;">
                    <i class='bx bxs-file-pdf' @click="generatePDF(index)"></i>
                </td>
              </tr>
            </tbody>
        </table>
        <div class="mt-3">
          <button
            class="btn btn-sm btn-secondary me-2"
            :disabled="pagination.current_page === 1"
            @click="changePage(pagination.current_page - 1)"
          >
            Previous
          </button>
          <span>Page {{ pagination.current_page }}</span>
          <button
            class="btn btn-sm btn-secondary ms-2"
            :disabled="pagination.current_page * pagination.per_page >= pagination.total"
            @click="changePage(pagination.current_page + 1)"
          >
            Next
          </button>
        </div>
      </div>
  
      <!-- Form to Add/Edit -->
      <div v-if="showForm == 1">
        <AddPatientForm
          :form-data="currentPatient"
          :is-editing="isEditing"
          @submit="handleSubmit"
          @cancel="cancelForm"
        />
      </div>
      <div v-if="showForm == 2">
            <PatientreportPdf  :details="currentPatient"  @backto="backtopages" />
      </div>
    </div>
  </template>
  
  <script>
import AddPatientForm from './AddPatientForm.vue';
import PatientreportPdf from '../pdf/PatientreportPdf.vue';
  export default {
    components: { AddPatientForm,PatientreportPdf },
    data() {
      return {
        patients: [],
        pagination: {
          current_page: 1,
          per_page: 5,
          total: 0
        },
        showForm: false,
        isEditing: false,
        editIndex: null,
        currentPatient: null
      };
    },
    mounted(){
      this.getptlists();
    },
    methods: {
      getptlists(page = 1) {
      axios
        .post(`api/patient/lists?page=${page}`)
        .then((response) => {
          const { data, current_page, per_page, total } = response.data;

          this.patients = data.map((item) => {
            let parsed = JSON.parse(item.jsontext);

            // Parse inner courses string if present
            try {
              parsed.courses = JSON.parse(parsed.courses);
            } catch (e) {
              parsed.courses = {};
            }

            return {
              id: item.id,
              ...parsed
            };
          });
          console.log(this.patients);
          this.pagination.current_page = current_page;
          this.pagination.per_page = per_page;
          this.pagination.total = total;
        })

        .catch((error) => {
          console.error('Failed to fetch patient list:', error);
        });
    },
    generatePDF(index){
        this.editIndex = index;
        this.isEditing = true;
        this.showForm = 2;
        this.currentPatient = { ...this.patients[index] }; // shallow copy
    },
      changePage(page) {
       
        this.getptlists(page);
      },
      openForm() {
        this.showForm = true;
        this.isEditing = 0;
        this.currentPatient = null;
      },
      editPatient(index) {
        this.editIndex = index;
        this.isEditing = true;
        this.showForm = true;
        this.currentPatient = { ...this.patients[index] }; // shallow copy
      },
      deletePatient(index) {
        if (confirm('Are you sure you want to delete this patient?')) {
          this.patients.splice(index, 1);
        }
      },
      backtopages(i){
        if(i == 1){
          this.showForm = false;
        }
      },
      // handleSubmit(event) {
      //   event.preventDefault(); // prevent actual submission if needed

      //   const submitter = event.submitter; // get the button that submitted the form
      //   const buttonValue = submitter?.value;

      //   console.log('Submit button value:', buttonValue);
      // },
      handleSubmit(form) {
        console.log('handleSubmit',form);
        const{ id, ...formWithoutId} = form;
        const jsonEncoded = JSON.stringify(formWithoutId);
        const payload={
          id:id,
          jsontext:jsonEncoded
        };
        console.log('payload',payload);
        if (this.isEditing) {
          console.log('undr if');
          this.patients.splice(this.editIndex, 1, form);
        } else {
          console.log('e;se');
          this.patients.push(form);
        }
        this.cancelForm();
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
        this.currentPatient = null;
      }
    }
  };
  </script>
  