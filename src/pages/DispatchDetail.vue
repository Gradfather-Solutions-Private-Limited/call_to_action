<template>
  <div class="sales-order">
    <!-- Sales Order Table -->
     <div class="text-end">
        <button type="button" class="new-btn" @click="backBtn()">Back</button>
     </div>
    <div class="card mt-10">
      <div class="card-body">
        <div class="col-md-12 row">
          <div class="col-md-5">
            <label><strong>Customer Name : </strong></label>
            <span class="ml-10"> {{ dispatchTransaction?.customername }}</span>
          </div>
          <div class="col-md-3"> 
            <label><strong>Date : </strong></label>
            <span class="ml-10"> {{ dispatchTransaction?.transactiondate }}</span></div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Net Price</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="order in dispatchDetails" :key="order.id">
                <td>{{ order.product?.name }}</td>
                <td>{{ order.quantity }}</td>
                <td><i class='bx bx-rupee'></i> {{ order.price }}</td>
                <td>{{ order.finalamount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DispatchDetails",
  data() {
    return {
      transactionid:0,
    }
  },
  computed: {
    ...mapState(["dispatchDetails", "dispatchDetailPagination","dispatchDetailFilters","dispatchTransaction"]),

    pagination() {
      return this.dispatchDetailPagination;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.perPage);
    },
  },
  methods: {
    ...mapActions(["fetchDispatchDetails"]),
    applyFilters() {
      this.fetchDispatchDetails();
    },
    backBtn(){
      this.$router.go(-1)
    }
    // resetFilters() {
    //   this.$store.commit("salesOrder/SET_SALES_ORDER_FILTERS", {
    //     salesOrderNo: "",
    //     customerName: "",
    //     mobileNo: "",
    //     productName: "",
    //     salesPersonName: "",
    //   });
    //   this.fetchSalesOrders();
    // },
    // changePage(page) {
    //   this.$store.commit("salesOrder/SET_SALES_ORDER_PAGINATION", {
    //     ...this.pagination,
    //     currentPage: page,
    //   });
    //   this.fetchSalesOrderDetails();
    // },
    
  },
  mounted() {
    this.dispatchDetailFilters.transactionid = this.$route.params.id 
    this.fetchDispatchDetails();
    this.$store.commit("assignaddpageheading", 'Dispatch Details');

  },
};
</script>

<style>
.sales-order {
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