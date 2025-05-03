<template>

  <div class="card mt-10">
    <div class="card-body">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-11">
            <h4 class="text-center">{{ form.id ? 'Edit Test Series' : 'Add New Test Series' }}</h4>
          </div>
          <div class="col-md-1">
            <button class="new-btn" @click="$emit('cancel')">Back</button>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="">

          <div class="col-md-12 d-flex">
            <div class="col-md-3">
              <label for="name">Name :</label>
              <input id="name" class="form-control" v-model="form.name" required />
            </div>
            <div class="col-md-3">
              <label>Select Font : </label>
              <select id="font" class="form-control" v-model="form.fonttype">
                <option :value="0">--Select--</option>
                <option v-for="item in this.FONT_TYPES" :key="item.id" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>Select Text Type : </label>
              <select id="font" class="form-control" v-model="form.texttype">
                <option :value="0">--Select--</option>
                <option v-for="item in this.TEXT_TYPES" :key="item.id" :value="item.id">{{ item.name }}</option>
                
              </select>
            </div>
            <div class="col-md-3">
              <label for="name">Test Series Time :</label>
              <input id="name" class="form-control" type="number" v-model="timeinminute" placeholder="In Minutes"
                @input="setTimerValue($event)" required />
            </div>
            <!-- <div class="col-md-6">
                  <label for="font">Select Font:</label>
                  <select id="font" class="form-control" v-model="form.font">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div> -->
          </div>
          <!-- <div class="col-md-12 d-flex">
            <div class="col-md-6">
              <label for="name">Type : </label>
              <div class="row">
                <div class="col-md-6">
                  <label id="steno">
                    <input type="radio" for="steno"> Steno
                  </label>
                </div>
                <div class="col-md-6">
                  <label id="typing">
                    <input type="radio" for="typing"> Typing
                  </label>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="col-md-12" style="padding: 0px 10px ;">
                <label for="hindianswer">Text (in hindi) :</label>
                <textarea id="hindianswer" class="form-control" rows="12" v-model="form.answerinhindi" required></textarea>
              </div> -->
          <div class="col-md-12" style="padding: 0px 10px ;">
            <label for="englishanswer">Text :</label>
            <textarea id="englishanswer" class="form-control" rows="12" v-model="form.answer" required></textarea>
          </div>

          <div class="col-md-12 mt-10" style="padding: 0px 10px">
            <h5>Link Products : </h5>
            <!-- <ul>
                <li v-for="product in $store.state.allproducts" :key="product.id">
                  <div class=""></div>
                  <label> <input :for="product.name" type="checkbox" :value="product.id" v-model="form.products" /> {{
                    product.name }} </label>
                </li>
              </ul> -->
            <div class="col-md-12 row">
              <div class="col-md-4 link_product" v-for="product in $store.state.allproducts" :key="product.id">
                <label>
                  <input type="checkbox" :value="product.id" v-model="form.products" />
                  {{ product.name }}
                </label>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="new-btn">Save</button>
            <button type="button" class="new-btn" @click="$emit('cancel')">Cancel</button>
          </div>
        </div>

      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Constants from './utilities/Constants.vue';
export default {
  mixins: [Constants],
  props: {
    initialData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      timeinminute: '',
      form: {
        id: null,
        name: '',
        font: 'Arial',
        products: [],
        answer: '',
        timer: '',
        fonttype: 0,
        texttype:0,
      },
    };
  },
  watch: {
    initialData: {
      immediate: true,
      handler(newData) {
        console.log("Checking the new Data")
        console.log(newData)
        if (newData) {
          let productArray = newData?.productids ?? ""
          this.form = { ...newData, products: productArray.split(",") };
          this.timeinminute = (newData?.timer / 60)
          console.log(this.form)
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    async handleSubmit() {
      let productString = this.form.products.join(",")
      if (this.form?.name == '') {
        alert('Enter name.')
      } else if (this.form?.fonttype == 0 || this.form?.fonttype == '0') {
        alert('Select font.')
      }else if (this.form?.texttype == 0 || this.form?.texttype == '0') {
        alert('Select text type.')
      } else {
        let submitForm = {
          ...this.form, productids: productString.replace(/^,|,$/g, '')
        }
        console.log("submit form ", submitForm)
        try {
          if (submitForm.id) {
            await axios.post(`/api/single-question-exam/update/${submitForm.id}`, submitForm);
          } else {
            await axios.post('/api/single-question-exam/create', submitForm);
          }
          this.$emit('formSubmit');
          this.resetForm();
        } catch (error) {
          console.error('Error saving test series:', error);
        }
      }

    },
    resetForm() {
      this.timeinminute = ''
      this.form = {
        id: null,
        name: '',
        font: 'Arial',
        answer: '',
        products: [],
        timer: '',
        fonttype: 0,
        texttype:0

      };
    },
    setTimerValue(event) {
      this.form.timer = parseInt(event.target.value * 60);
    }

  },
};
</script>

<style scoped>
/* form div {
  margin-bottom: 1em;
} */
ul {
  list-style-type: none;
  padding: 0;
}

.col-md-4 {
  margin-bottom: 1rem;
  padding: 0px 10px;
}

.col-md-2 {
  margin-bottom: 1rem;
  padding: 0px 10px;
}
.col-md-3 {
  margin-bottom: 1rem;
  padding: 0px 10px;
}

.col-md-6 {
  margin-bottom: 0.5rem;
  padding: 0px 10px;
}

.link_product {
  border: 1px solid silver;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 0.5rem;
}
</style>