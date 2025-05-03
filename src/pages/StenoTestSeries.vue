<template>
  <div class="mt-10 ">
    <div v-if="viewno==0">
      <!-- Filter by Product -->
      <div class="col-md-12 d-flex p-10">
        <div class="col-md-6 d-flex">
          <div class="col-md-4">
            <label for="product-filter">Filter by Product:</label>
          </div>
          <div class="col-md-8">
            <select class="form-control" id="product-filter" v-model="filterProduct" @change="filterTestSeries">
              <option value="0">All</option>
              <option v-for="product in $store.state.allproducts" :key="product.id" :value="product.id">
                {{ product.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6 text-end">
          <button class="new-btn" @click="addNewTestSeries()"> + Add New</button>
        </div>
      </div>
      <div class="card mt-10">
        <div class="card-body">

          <!-- List of Test Series -->
          <div class="col-md-12">
            <ul>
              <li v-for="series in filteredSeries" :key="series.id">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-11">
                      <h5>{{ series.name }}</h5>
                    </div>                    
                    <div class="col-md-1 text-right">
                      <button class="new-btn" @click="editTestSeries(series)"><i class='bx bx-edit'></i></button>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 row">
                <!-- <div class="col-md-4 ">
                    <span> Font: {{ series.font }}</span>
                  </div> -->
                <div class="col-md-4 ">
                  <span>Duration : {{ (series.timer/60) }} min. </span>
                </div>
                <!-- <div class="col-md-4 ">
                    <span>Linked Products: </span>
                    <span v-for="productId in series.linkedProducts" :key="productId">
                      {{ getProductById(productId)?.name || 'Unknown' }}
                      <span v-if="productId !== series.linkedProducts[series.linkedProducts.length - 1]">, </span>
                    </span>
                  </div> -->
                  <div class="col-md-4 ">
                  <audio class="" style="height: 35px" controls>
                    <source :src="series.fileurl" type="audio/mpeg">
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div class="col-md-4 ">
                  <input type="file" class="form-control" id="attach_file" name="files"
                            @change="processLocal($event, series)">
                  </div>
                
                </div>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Form -->
    <TestSeriesForm v-if="viewno==1" :initialData="editingSeries" @formSubmit="fetchTestSeries" @cancel="cancelFun" />
  </div>
</template>

<script>
import TestSeriesMixin from '../mixins/TestSeriesMixin.js';
import TestSeriesForm from '../components/TestSeriesForm.vue';
import UploadMixin2 from '../components/utilities/UploadMixin2.vue'
export default {
  mixins: [TestSeriesMixin, UploadMixin2],
  components: {
    TestSeriesForm,
  },
  data() {
    return {
      editingSeries: null, // Holds the series being edited
      viewno: 0, // 0: List, 1: Add/Edit Form
    };
  },
  methods: {
    uploaded() { },
    processLocal(event, series) {
      let obj = { 'directorypath': '', 'typeid': series.id, 'typeint': 20 }
      this.$store.commit('assignfilecomponents', obj);
      this.processFile2(event)
    },
    editTestSeries(series) {
      this.viewno = 1
      this.editingSeries = { ...series }; // Pass the series data to the form
    },
    addNewTestSeries(){
      this.viewno = 1
      this.editingSeries = null;
    },
    cancelFun() {
      this.viewno = 0
      this.editingSeries = null
    }
  },
  mounted() {
    this.$store.commit('assignaddpageheading', 'Test Series Management')
    this.fetchTestSeries();
    this.$store.commit("SET_PRODUCT_COLUMNS", ['id', 'name'])
    this.$store.commit("SET_PRODUCT_WITH_TABLES", [])
    this.$store.dispatch("fetchproducts")
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  /* margin-bottom: 1em; */
  border: 1px solid silver;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 10px;

}
.col-md-12 .col-md-4 {
  margin-bottom: 1rem;
}
ul li:hover {
  background: #f1fafd;
}
audio {
  width: 100%; /* Adjust width */
  height: 50px; /* Adjust height (only works in some browsers) */
  border-radius: 10px; /* Rounded corners */
  background-color: #f1f1f1; /* Change background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow */
}
.audio_box {
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  padding: 10px;
}
</style>