<template>
    <div class="card mt-10">
      <div class="card-body" v-if="!showForm">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Country</th>
              <th>Courses</th>
              <th>Admit/Not-Admit</th>
              <th>Actions</th>
              <th></th>
          </tr>
          </thead>
            <tbody>
              <tr v-for="(patient, index) in patients" :key="index">
                <td>{{ getSerialNo(index) }}</td>
                <td>{{ patient.name }}</td>
                <td>{{ patient.mobile }}</td>
                <td>{{ patient.age }}</td>
                <td>{{ patient.country }}</td>
                <td>
                  <ul>
                    <li
                      v-for="(selected, course) in patient.courses" :key="course" > {{ course }}</li>
                  </ul>
                </td>
                <td>
                  {{ patient.is_admit == 0 ? 'Not-Admit' : 'Admit' }}
                </td>
                <td>
                  <button class="btn btn-sm btn-warning" @click="editPatient(index)">Edit</button>
                  <button class="btn btn-sm btn-danger ml-5" @click="deletePatient(patient)">Delete</button>
                  <button class="btn btn-sm btn-info ml-5" @click="admitPatient(patient)" v-if="patient.is_admit==0">Admit</button>
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
import { mapGetters } from 'vuex'
import PatientreportPdf from '../pdf/PatientreportPdf.vue';
import axios from 'axios';
import { is } from 'quasar';
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
        currentPatient: null,
        companyid:109
      };
    },
    mounted(){
      this.getptlists();
    },
    computed: {
        ...mapGetters(['loggedinuser']),
    },
    methods: {
      getptlists(page = 1) {
        let param = {companyid: this.companyid}
      axios
        .post(`api/patient/lists?page=${page}`,param)
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
              is_admit: item.is_admit,
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
    getSerialNo(index){
            return (this.pagination.current_page - 1) * this.pagination.per_page + index + 1;
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
      deletePatient(data) {
        if (confirm('Are you sure you want to delete this patient?')) {
        axios.post('api/patient/delete',{'id':data.id}).then(response =>{
          console.log('response',response.data);
          this.getptlists();
        })
      }
      },
      backtopages(i){
        if(i == 1){
          this.showForm = false;
        }
      },
      handleSubmit(form) {
        const{ id, ...formWithoutId} = form;
        const jsonEncoded = JSON.stringify(formWithoutId);
        const payload={
          id:id,
          jsontext:jsonEncoded,
          companyid:this.loggedinuser.companyid,
        };
        axios.post('api/patient/form/create',payload)
        .then(response=>{
          if(response.data){
            this.showForm = false;
            this.getptlists(this.pagination.current_page);
          }
           
        })
      },
      cancelForm() {
        this.showForm = false;
        this.isEditing = false;
        this.currentPatient = null;
      },
      admitPatient(item){
        if (confirm('Are you sure you want to admit this patient?')) {
          axios.post('api/patient/admit',{'id':item.id}).then(response =>{
            console.log('response',response.data);
            this.getptlists();
          })
        }
      }
    }
  };
  </script>
  