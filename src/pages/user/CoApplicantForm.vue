<template>
    <div>
      <div class="row">
        <div class="form-group  col-6">
          <label class="form-label">Co-Applicant Name:</label>
          <input type="text" class="form-control" v-model="coApplicant.name" required />
        </div>
        
        <div class="form-group  col-6">
          <label class="form-label">Co-Applicant Mobile No.:</label>
          <input type="text" class="form-control" v-model="coApplicant.mobile" required />
        </div>
  
        <div class="form-group  col-6">
          <label class="form-label">Co-Applicant Address:</label>
          <input type="text" class="form-control" v-model="coApplicant.address" required />
        </div>
  
        <div class="form-group  col-6">
          <label class="form-label">Co-Applicant Relation:</label>
          <input type="text" class="form-control" v-model="coApplicant.relation" required />
        </div>
  
        <div class="form-group  col-6">
          <label class="form-label">PAN Card Number:</label>
          <input type="text" class="form-control" v-model="coApplicant.pan_card" required />
        </div>
        <div class="form-group  col-6">
          <label class="form-label">Aadhar Card Number:</label>
          <input type="text" class="form-control" v-model="coApplicant.aadhar_card" required />
        </div>
        <div class="col-12" v-if="submitbtn==1">
          <div class="d-flex gap-2 justify-content-center py-5">
            <button  class="btn btn-primary"  @click="submitcobtn()">Submit</button>
            <button @click="this.$emit('backtopage', 0,1)" class="btn btn-danger">Cancel</button>
          </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  
  import axios from "axios";
import  FormMix from "../utility/UserFormMix.vue"
  
  export default {
    props:['submitbtn','userid','userformdata'],
    mixins: [FormMix],
    data() {
      return {
        coApplicant: {
          name: "",
          mobile: "",
          address: "",
          relation: "",
          pan_card: "",
          aadhar_card: "",
        },
        isEditing: false,
      };
    },
    mounted(){
          if(this.userformdata?.userinfo?.hasOwnProperty('jsonobj2')){
            if(this.userformdata.userinfo.jsonobj2 != null){
              this.coApplicant = JSON.parse(this.userformdata.userinfo.jsonobj2);
            }
          }
    },
    methods: {
      submitcobtn() {
        let param = {'column':'jsonobj2','userid':this.userid,'form':this.coApplicant};
        axios.post('api/finance/savedatacust',param)
        .then(response => {
          this.$store.dispatch("triggerNotification", {
            message: "Data saved successfully!",
            type: "success",
          });
          if(response){

          }
          this.$emit('backtopage', 1);
        })
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
  }
  </style>
  