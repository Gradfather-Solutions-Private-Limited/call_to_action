<template>
  <div class="container">
    <h2 class="mb-4">Bank Account Details</h2>
      <div class="row">
        <!-- Account Name -->
        <div class="col-md-6">
          <label class="form-label">Account Name</label>
          <input v-model="formData.accountname" type="text" class="form-control" placeholder="Enter Account Name" required />
        </div>

        <!-- Account Number -->
        <div class="col-md-6">
          <label class="form-label">Account Number</label>
          <input v-model="formData.accountno" type="text" class="form-control" placeholder="Enter Account Number" required />
        </div>
      </div>

      <div class="row mt-3">
        <!-- UPI ID -->
        <div class="col-md-6">
          <label class="form-label">UPI ID</label>
          <input v-model="formData.upiid" type="text" class="form-control" placeholder="Enter UPI ID" />
        </div>

        <!-- Bank Name -->
        <div class="col-md-6">
          <label class="form-label">Bank Name</label>
          <input v-model="formData.bankname" type="text" class="form-control" placeholder="Enter Bank Name" required />
        </div>
      </div>

      <div class="row mt-3">
        <!-- IFSC Code -->
        <div class="col-md-6">
          <label class="form-label">IFSC Code</label>
          <input v-model="formData.ifsccode" type="text" class="form-control" placeholder="Enter IFSC Code" required />
        </div>

        <!-- Branch -->
        <div class="col-md-6">
          <label class="form-label">Branch</label>
          <input v-model="formData.branch" type="text" class="form-control" placeholder="Enter Branch Name" />
        </div>
      </div>

      <div class="row mt-3">
        <!-- City -->
        <div class="col-md-6">
          <label class="form-label">City</label>
          <input v-model="formData.city" type="text" class="form-control" placeholder="Enter City Name" />
        </div>

        <!-- State -->
        <div class="col-md-6">
          <label class="form-label">State</label>
          <input v-model="formData.state" type="text" class="form-control" placeholder="Enter State Name" />
        </div>
      </div>
      <div class="row mt-3">
        <!-- PhonePay -->
        <div class="col-md-6">
          <label class="form-label">PhonePay</label>
          <input v-model="formData.phonepay" type="text" class="form-control" placeholder="Enter PhonePay Number" />
        </div>

        <!-- GPay -->
        <div class="col-md-6">
          <label class="form-label">GPay</label>
          <input v-model="formData.gpay" type="text" class="form-control" placeholder="Enter GPay Number" />
        </div>
      </div>

      <div class="row mt-3">
        <!-- Paytm -->
        <div class="col-md-6">
          <label class="form-label">Paytm</label>
          <input v-model="formData.paytm" type="text" class="form-control" placeholder="Enter Paytm Number" />
        </div>

        <!-- Display in Invoice -->
       
      </div>

      <div class="col-12" v-if="submitbtn==1">
          <div class="d-flex gap-2 justify-content-center py-5">
            <button  class="btn btn-primary"  @click="saveBankDetails()">Submit</button>
            <button @click="this.$emit('backtopage', 0,1)" class="btn btn-danger">Cancel</button>
          </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props:['submitbtn','userid','userformdata'],
  data() {
    return {
      formData: {
        accountname: "",
        accountno: "",
        upiid: "",
        bankname: "",
        banktype: "",
        banklabelid: "",
        ifsccode: "",
        branch: "",
        city: "",
        cityid: "",
        state: "",
        stateid: "",
        phonepay: "",
        gpay: "",
        paytm: "",
        displayininvoice: "1",
      },
    };
  },
  mounted(){
      this.setFormValues(this?.userformdata?.banks[0]);
  },
  methods: {
    setFormValues(data) {
      if (data !== undefined) {
          Object.keys(data).forEach(key => {
            if (this.formData.hasOwnProperty(key)) {
              this.formData[key] = data[key];
            }
         });
      }
     
    },
    async saveBankDetails() {
        let data=  this.formData;
        data['userid']= this.userid;
        axios.post('api/finance/saveBankDetails',this.formData)
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
