<template>
  <div class="customers" v-if="dispalyExam==0">
    <div class="col-md-12">

      <div class="container">
        <div class="col-md-12 text-right">
          <button class="new-btn" @click="redirecttoBack()">Go Back</button>
        </div>
        <div class="col-md-12 row">
          <div class="col-md-4 mt-10" v-for="item in serieslist" :key="item.id">
            <div class="card">
              <div class="card-body">
                <h6 class="">{{ item.name }}</h6> 
                <p>
                  Duration : <span v-if="item.timer > 0">{{ (item.timer/60) ?? 0}} minutes</span><span v-else>N/A</span>
                </p>
                <button class="new-btn m-0 w-100 h-35" @click="startExam(item)">Start</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ExamPage  v-if="dispalyExam == 1" @backToProductPage="redirecttoBack"></ExamPage>
</template>
<script>
// import { mapState, mapActions } from "vuex";
import ExamPage from './ExamPage.vue';
export default {
  name: "Series List",
  components: { ExamPage },
  props: ["serieslist","singleProductMapping"],
  data() {
    return {
      dispalyExam: 0,
      examcontent: null,
    }
  },

  computed: {
    // ...mapState(["purchaseCourses", "purchaseCoursesPagination","purchaseCoursesFilters"]),
    // pagination() {
    //   return this.purchaseCoursesPagination;
    // },
    // totalPages() {
    //   return Math.ceil(this.pagination.total / this.pagination.perPage);
    // },
  },
  methods: {
    startExam(item) {
      this.$store.commit('SET_EXAM_DETAILS', {
        examContent : item,
        singleProductMapping : this.singleProductMapping
      })
      this.examcontent = item
      this.dispalyExam = 1;
    },
    redirecttoBack() {
      this.dispalyExam = 0;
      // this.$parent.viewno=0
      this.$store.commit('assignviewno', 1)
      this.examcontent = null;
    },
    

  },
  mounted() {
    this.$store.commit("assignaddpageheading", 'Series List');
  },
};
</script>

<style>
.customers {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin-right: 5px;
}
</style>