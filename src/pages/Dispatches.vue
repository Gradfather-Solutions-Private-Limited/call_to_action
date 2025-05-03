<template>
  <div class="dispatch-order">
    <!-- Filters Section -->
    <!-- <div class="filters">
      <input
        v-model="filters.salesOrderNo"
        placeholder="Search by Sales Order No"
      />
      <input
        v-model="filters.customerName"
        placeholder="Search by Customer Name"
      />
      <input v-model="filters.mobileNo" placeholder="Search by Mobile No" />
      <input v-model="filters.productName" placeholder="Search by Product Name" />
      <input
        v-model="filters.salesPersonName"
        placeholder="Search by Sales Person Name"
      />
      <button @click="applyFilters">Search</button>
      <button @click="resetFilters">Reset</button>
    </div> -->

    <!-- Sales Order Table -->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <!-- <th>Order No</th> -->
                <th>Customer Name</th>
                <th>Price</th>
                <th>Transaction Date</th>
                <th>Action</th>
                <!-- <th>Address</th>
          <th>Sales Person Name</th>
          <th>Status</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order,index) in dispatches" :key="order.id">
                <td>{{ index+1 }}</td>
                <!-- <td>{{ order.invoicesequence }}</td> -->
                <td>{{ order.customername ?? '' }}</td>
                <td>{{ order.amountwithtax }}</td>
                <td><span v-if="order.transactiondate">{{ order?.transactiondate }}</span></td>
                <td><button class="new-btn" @click="detail(order)">Detail</button></td>
                <!-- <td>{{ order.address }}</td>
          <td>{{ order.salesPersonName }}</td>
          <td>{{ order.status }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <!-- <div class="pagination">
      <button
        :disabled="pagination.currentPage === 1"
        @click="changePage(pagination.currentPage - 1)"
      >
        Previous
      </button>
      <span>Page {{ pagination.currentPage }} of {{ totalPages }}</span>
      <button
        :disabled="pagination.currentPage === totalPages"
        @click="changePage(pagination.currentPage + 1)"
      >
        Next
      </button>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DispatchOrder",
  
  computed: {
    ...mapState(["dispatches", "dispatchFilters", "dispatchPagination"]),
    filters() {
      return this.dispatchFilters;
    },
    pagination() {
      return this.dispatchPagination;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.perPage);
    },
  },
  methods: {
    ...mapActions(["fetchDispatches"]),
    applyFilters() {
      this.fetchDispatchOrders();
    },
    resetFilters() {
      this.$store.commit("SET_DISPATCH_ORDER_FILTERS", {
        salesOrderNo: "",
        customerName: "",
        mobileNo: "",
        productName: "",
        salesPersonName: "",
      });
      this.fetchDispatches();
    },
    changePage(page) {
      this.$store.commit("SET_DISPATCH_ORDER_PAGINATION", {
        ...this.pagination,
        currentPage: page,
      });
      this.fetchDispatches();
    },
    detail(item) {
      this.$router.push({ path: "/dispatch-detail/"+item.id });
    }
  },
  mounted() {
    this.fetchDispatches();
    this.$store.commit("assignaddpageheading", 'Dispatch Orders');
  },
};
</script>

<style>
.dispatch-order {
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
