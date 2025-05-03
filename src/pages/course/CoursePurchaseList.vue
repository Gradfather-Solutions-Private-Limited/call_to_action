<template>
  <div class="customers" v-if="viewno == 1">
    <div class="col-md-12">

      <div class="container">
        <div class="col-md-12 row">
          <div class="col-md-4" v-for="item in purchaseCourses.products" :key="item.id">
            <div style="text-align: center;background: #fff;">
              <img :src="item.images[0]?.fullurl" class="card-img-top" alt="..." style="width: 50%;">
            </div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ item?.name }}</h5>
                <!-- <p class="card-text">This is a simple card with some text content and an optional image. Bootstrap makes it easy to style and customize.</p> -->
                <!-- <p>{{ purchaseCourses }}</p> -->
                <button class="new-btn m-0 w-100 h-35" @click="getSeries(item.id)">Start</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <series-list v-if="viewno == 2" :serieslist="seriesList" :singleProductMapping="singleProductMapping"></series-list>

</template>
<script>
import { mapState, mapActions } from "vuex";
import SeriesList from "./SeriesList.vue";

export default {
  name: "Course List",
  components: { SeriesList },
  data() {
    return {

      seriesList: [],
      singleProductMapping: {},
    }
  },

  computed: {
    ...mapState(["purchaseCourses", "purchaseCoursesPagination", "purchaseCoursesFilters", 'viewno']),
    pagination() {
      return this.purchaseCoursesPagination;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.perPage);
    },
  },
  methods: {
    ...mapActions(["fetchPurchaseCourses"]),
    applyFilters() {
      this.fetchPurchaseCourses();
    },
    backBtn() {
      this.$router.go(-1)
    },
    resetFilters() {
      this.$store.commit("SET_CUSTOMER_FILTERS", {
        customerName: '',
        customerMobile: '',
        customerEmail: '',
      });
      this.fetchPurchaseCourses();
    },
    changePage(page) {
      this.$store.commit("SET_SALES_ORDER_PAGINATION", {
        ...this.pagination,
        currentPage: page,
      });
      this.fetchPurchaseCourses();
    },
    getSeries(id) {
      this.singleProductMapping = this.purchaseCourses?.allexams.find(o => o.productid == id)
      // console.log("singleProductMapping ",this.singleProductMapping)
      if (this.singleProductMapping != null) {
        let examids = this.singleProductMapping.examids.split(',')
        this.seriesList = examids.map(id => this.purchaseCourses?.series.find(o => o.id == id))
      }
      this.$store.commit('assignviewno', 2)
    }

  },
  mounted() {
    this.fetchPurchaseCourses();
    this.$store.commit("assignaddpageheading", 'Course Purchase List');
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