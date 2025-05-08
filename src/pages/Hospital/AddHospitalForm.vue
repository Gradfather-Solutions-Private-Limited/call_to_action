<template>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Name of the Hospital/Nursing Home" v-model="form.name" required />
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Official Contact Number of Hospital / Nursing Home" v-model="form.contact" required />
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" placeholder="Hospital/Nursing Home Official Website" v-model="form.website" />
      </div>
      <div class="mb-3">
        <select class="form-control" v-model="form.country">
          <option value="India">🇮🇳 India</option>
        </select>
      </div>
      <div class="mb-3">
        <select class="form-control" v-model="form.state">
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
        </select>
      </div>
      <div class="mb-3">
        <select class="form-control" v-model="form.city">
          <option disabled selected>City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Vijayawada">Vijayawada</option>
          <option value="Visakhapatnam">Visakhapatnam</option>
        </select>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" v-model="form.declaration" id="declaration" />
        <label class="form-check-label" for="declaration">
          I, hereby declare that all the information provided above is true, accurate, and complete to the best of my knowledge.
          I understand that any false information may result in rejection or removal of the patient's record.
        </label>
      </div>
      <button type="submit" class="btn btn-success w-100">Submit Data</button>
      <button class="btn btn-secondary w-100 mt-2" @click.prevent="$emit('cancel')">Cancel</button>
    </form>
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
          name: '',
          contact: '',
          website: '',
          country: 'India',
          state: '',
          city: '',
          declaration: false
        }
      };
    },
    created() {
      if (this.formData) {
        this.form = { ...this.formData };
      }
    },
    methods: {
      submitForm() {
        if (!this.form.declaration) {
          alert('Please accept the declaration to submit');
          return;
        }
        this.$emit('submit', this.form);
      }
    }
  };
  </script>
  
  <style scoped>
  form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  </style>
  