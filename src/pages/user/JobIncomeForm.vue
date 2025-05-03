<template>
    <div class="container">
      <h2 class="mb-4">{{ isEditing ? "Edit" : "Add" }} Job & Income Details</h2>
      <form @submit.prevent="saveDetails">
        <div class="row">
          <!-- Job Type -->
          <div class="col-md-6">
            <label class="form-label">Job Type</label>
            <select v-model="jobDetails.jobType" class="form-select">
              <option value="">Select Job Type</option>
              <option value="Salaried">Salaried</option>
              <option value="Business">Business</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>
  
          <!-- Income Type -->
          <div class="col-md-6">
            <label class="form-label">Income Type</label>
            <select v-model="jobDetails.incomeType" class="form-select">
              <option value="">Select Income Type</option>
              <option value="Fixed">Fixed</option>
              <option value="Variable">Variable</option>
            </select>
          </div>
        </div>
  
        <div class="row mt-3">
          <!-- Income Amount -->
          <div class="col-md-6">
            <label class="form-label">Income Amount</label>
            <input type="number" v-model="jobDetails.incomeAmount" class="form-control" placeholder="Enter Income Amount" required />
          </div>
  
          <!-- Income Time -->
          <div class="col-md-6">
            <label class="form-label">Income Time</label>
            <select v-model="jobDetails.incomeTime" class="form-select">
              <option value="">Select Income Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>
  
        <div class="row mt-3">
          <!-- Min Amount -->
          <div class="col-md-6">
            <label class="form-label">Min Amount</label>
            <input type="number" v-model="jobDetails.minAmount" class="form-control" placeholder="Enter Minimum Amount" />
          </div>
  
          <!-- Max Amount -->
          <div class="col-md-6">
            <label class="form-label">Max Amount</label>
            <input type="number" v-model="jobDetails.maxAmount" class="form-control" placeholder="Enter Maximum Amount" />
          </div>
        </div>
  
        <div class="row mt-3">
          <!-- Business Name -->
          <div class="col-md-6">
            <label class="form-label">Business Name</label>
            <input type="text" v-model="jobDetails.businessName" class="form-control" placeholder="Enter Business Name" />
          </div>
  
          <!-- Business Address -->
          <div class="col-md-6">
            <label class="form-label">Business Address</label>
            <textarea v-model="jobDetails.businessAddress" class="form-control" placeholder="Enter Business Address"></textarea>
          </div>
        </div>
  
        <div class="row mt-3">
          <!-- Office Phone -->
          <div class="col-md-6">
            <label class="form-label">Office Phone</label>
            <input type="text" v-model="jobDetails.officePhone" class="form-control" placeholder="Enter Office Phone" />
          </div>
  
          <!-- Family Monthly Expenses -->
          <div class="col-md-6">
            <label class="form-label">Family Monthly Expenses</label>
            <input type="number" v-model="jobDetails.familyExpenses" class="form-control" placeholder="Enter Expenses" />
          </div>
        </div>
        <div class="col-12" v-if="submitbtn==1">
          <div class="d-flex gap-2 justify-content-center py-5">
            <button  class="btn btn-primary"  @click="savejobDetails()">Submit</button>
            <button @click="this.$emit('backtopage', 0,1)" class="btn btn-danger">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props:['submitbtn','userid','userformdata'],
    data() {
      return {
        jobDetails: {
          jobType: "",
          incomeType: "",
          incomeAmount: "",
          incomeTime: "",
          minAmount: "",
          maxAmount: "",
          businessName: "",
          businessAddress: "",
          officePhone: "",
          familyExpenses: "",
        },
        isEditing: false,
      };
    },
    mounted(){
      if(this.userformdata?.userinfo?.hasOwnProperty('jsonobj3')){
        if(this.userformdata?.userinfo?.jsonobj3 != null){
          this.jobDetails = JSON.parse(this.userformdata?.userinfo?.jsonobj3);
        }
      }
    },
    methods: {
      async savejobDetails() {
        let param = {'column':'jsonobj3','userid':this.userid,'form':this.jobDetails};
        axios.post('api/finance/savedatacust',param)
        .then(response => {
          this.$store.dispatch("triggerNotification", {
            message: "Data saved successfully!",
            type: "success",
          });
          this.$emit('backtopage', 1);
        })
        
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  