<template>
  <div class="container-fluid">
    <div class="card mt-10">
      <div class="card-body">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <div class="col-md-12">
                <div class="col-md-12"><span class="heading-border">Product Name</span></div>

                <!-- Filters -->
                <div class="filters">
                  <input v-model="leadFilters.productName" type="text" placeholder="Filter by Product Name"
                    @input="updateFilters" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12">
                <div class="col-md-12"><span class="heading-border">  UserName</span></div>

                <div class="filters">
                  <input v-model="leadFilters.username" type="text" placeholder="Filter by Username"
                    @input="updateFilters" class="form-control" />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12">
                <div class="col-md-12"><span class="heading-border"> Mobile</span></div>

                <div class="filters">
                  <input v-model="leadFilters.mobile" type="text" placeholder="Filter by Mobile" @input="updateFilters"
                    class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="card-body">
          <div class="col-md-12  ">
            <button class="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      <!-- Leads Table -->
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">

            <table class="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Username</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lead in leads" :key="lead.id">
                  <td>{{ lead.product?.name }}</td>
                  <td>{{ lead.customername }}</td>
                  <td>{{ lead.customermobile }}</td>
                  <td>{{ formatDate(lead.created_at) }}</td>
                  <td>
                    <span v-if="lead.status==0 || lead.status==null">Pending</span>
                    <span v-if="lead.status==1">Approved</span>
                    <span v-if="lead.status==2">Rejected</span>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <!-- <div class="pagination">
            <button @click="prevPage" :disabled="leadPagination.currentPage === 1" class="btn btn-primary btn-sm">Previous</button>
            <span>Page {{ leadPagination.currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="leadPagination.currentPage === totalPages" class="btn btn-primary btn-sm">Next</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["leads", "leadFilters", "leadPagination", "addpageheading"]),
    //   ...mapGetters(["leadPagination"]),
    totalPages() {
      return Math.ceil(this.leadPagination.total / this.leadPagination.limit);
    },
  },
  methods: {
    ...mapActions(["fetchLeads", "setLeadFilters", "setPage"]),
    updateFilters() {
      this.setLeadFilters(this.leadFilters);
      this.fetchLeads();
    },
    changePage(page) {
      this.setPage(page);
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
  },
  mounted() {
    this.$store.commit("assignaddpageheading", 'Leads');
    this.fetchLeads();
  },
};
</script>

<style scoped>

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.pagination button:disabled {

  cursor: not-allowed;
}

button {
  padding: 3px 3px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  margin:0 10px;
 
} 
</style>