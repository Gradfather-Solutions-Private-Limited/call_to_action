<template>
    <div class="row">
      <div class="col-md-3 mb-3">
        <label>Patient Type</label>
        <select class="form-control" v-model="form.patient_type">
          <option value="New">New</option>
          <option value="Existing">Existing</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label>Date of Consult</label>
        <input type="date" class="form-control" v-model="form.consult_data" />
      </div>
      <div class="col-md-3 mb-3">
        <label>Name of the Patient</label>
        <input type="text" class="form-control" v-model="form.name" />
      </div>
      <div class="col-md-3 mb-3">
        <label>Contact No.</label>
        <input type="text" class="form-control" v-model="form.mobile" />
      </div>
      <div class="col-md-3 mb-3">
        <label>Aadhaar Number</label>
        <input type="text" class="form-control" v-model="form.adhar" />
      </div>
      <div class="col-md-3 mb-3">
        <label>Select Institute</label>
        <input type="text" class="form-control" v-model="form.name_of_student" />
      </div>
      <div class="col-md-3 mb-3">
        <label>Gender</label>
        <select class="form-control" v-model="form.gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label>Age</label>
        <input type="number" class="form-control" v-model="form.age" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Chief Complaint</label>
        <input type="text" class="form-control" v-model="form.chiefComplaint_of_Patient" />
      </div>

      <div class="col-md-12">
        <div class="row">
          <h5>Mobilizer / Counselor / Adviser</h5>
          <div class="col-md-3 mb-3">
            <label>Mobilizer Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="form.name_of_mobilizer" />
          </div>
          <div class="col-md-3 mb-3">
            <label>Occupation</label>
            <input type="text" class="form-control" placeholder="Occupation" v-model="form.occupation_of_mobilizer" />
          </div>
          <div class="col-md-3 mb-3">
            <label>Contact</label>
            <input type="text" class="form-control" placeholder="Contact" v-model="form.contact_of_mobilizer" />
          </div>
          <div class="col-md-3 mb-3">
            <label>Media Handle</label>
            <input type="text" class="form-control" placeholder="Media Handle" v-model="form.media_link" />
          </div>
        </br>
          <h5>Bank Account details of the Mobilizer / Counselor / Adviser</h5>
       
          <div class="col-md-3 mb-3">
            <label>Account Holder Name</label>
            <input type="text" class="form-control" placeholder="Account Holder Name" v-model="form.account_name" />
          </div>
          <div class="col-md-3 mb-3">
            <label>Account Number</label>
            <input type="text" class="form-control" placeholder="Account Number" v-model="form.account_number" />
          </div>
          <div class="col-md-3 mb-3">
            <label>IFSC Code</label>
            <input type="text" class="form-control" placeholder="IFSC Code" v-model="form.ifsc" />
          </div>
          <div class="col-md-3 mb-3">
            <label>Country</label>
            <select class="form-control mb-2" v-model="form.country">
              <option value="India">India</option>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <label>State</label>
            <input type="text" class="form-control mb-2" placeholder="State" v-model="form.state" />
          </div>
          <div class="col-md-3 mb-3">
            <label>City</label>
            <input type="text" class="form-control mb-2" placeholder="City" v-model="form.city" />
          </div>
        </div>
        <div class="form-check mt-2">
          <input class="form-check-input" type="checkbox" v-model="form.declaration" id="declaration" />
          <label class="form-check-label" for="declaration">
            I hereby declare that all information provided is true and accurate.
          </label>
        </div>


        <div class="col-md-12">
          <button @click="submitForm" class="btn btn-success w-100">Submit Data</button>
          <button class="btn btn-secondary w-100 mt-2" @click.prevent="$emit('cancel')">Cancel</button>
        </div>
      </div>
      </div>
</template>

<script>
export default {
  props: {
    formData: Object,
    isEditing: Boolean
  },
  data() {
    return {
      form: {
        account_name: '',
        account_number: '',
        adhar: '',
        age: '',
        chiefComplaint_of_Patient: '',
        city: '',
        consult_data: '',
        contact_of_student: '',
        contact_of_mobilizer:'',
        country: 'India',
        courses: {},
        description: '',
        email: '',
        id:'',
        fees: '',
        gender: '',
        ifsc: '',
        media_link: '',
        name_of_mobilizer:'',
        mobile: '',
        my_occupation: '',
        name: '',
        name_of_student: '',
        patient_type: '',
        state: '',
        video_link: '',
        website_url: '',
        declaration: false
      }
    };
  },
  watch: {
    formData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
        
          this.form = {
            id : newVal.id || '',
            account_name: newVal.account_name || '',
            account_number: newVal.account_number || '',
            adhar: newVal.adhar || '',
            age: newVal.age || '',
            chiefComplaint_of_Patient: newVal.chiefComplaint_of_Patient || '',
            city: newVal.city !== 'null' ? newVal.city : '',
            consult_data: newVal.consult_data || '',
            contact_of_student: newVal.contact_of_student || '',
            country: newVal.country || 'India',
            courses: newVal.courses || {},
            description: newVal.description || '',
            email: newVal.email || '',
            fees: newVal.fees || '',
            gender: newVal.gender !== 'null' ? newVal.gender : '',
            ifsc: newVal.ifsc || '',
            media_link: newVal.media_link || '',
            mobile: newVal.mobile || '',
            name_of_mobilizer: newVal.name_of_mobilizer || '',
            contact_of_mobilizer: newVal.contact_of_mobilizer || '',
            occupation_of_mobilizer: newVal.occupation_of_mobilizer || '',
            my_occupation: newVal.my_occupation !== 'null' ? newVal.my_occupation : '',
            name: newVal.name || '',
            name_of_student: newVal.name_of_student || '',
            patient_type: newVal.patient_type || '',
            state: newVal.state !== 'null' ? newVal.state : '',
            video_link: newVal.video_link || '',
            website_url: newVal.website_url || '',
            declaration: false
          };
        }
      }
    }
  },
  methods: {

    submitForm() {
      
      if (!this.form.declaration) {
        alert('Please accept the declaration to submit');
        return;
      }
      this.$emit('submit',this.form);
    }
  }
};
</script>

<style scoped>
form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
