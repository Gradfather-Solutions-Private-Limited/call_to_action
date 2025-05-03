<template>
  <div class="customers">
    <div class="col-md-12">
      <div class="card mt-10">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in customers" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name ?? '' }}</td>
                  <td>{{ item.mobiles?.length > 0 ? item.mobiles[0].mobile : '' }}</td>
                  <td>
                    <div class="col-md-12 row">
                      <div class="col-md-6">
                        <input type="checkbox" @click="makeSalesmen($event, item.id)" :id="'salesmen'+item.id" />
                        <label :for="'salesmen'+item.id" class="ml-5">Salesmen</label>
                      </div>
                      <div class="col-md-6">
                        <input type="checkbox" @click="makeServicemen($event, item.id)" :id="'servicemen'+item.id" />
                        <label :for="'servicemen'+item.id" class="ml-5">Service Men</label>
                      </div>
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Customers",

  computed: {
    ...mapState(["customers", "customersPagination", "customersFilters"]),

    pagination() {
      return this.customersPagination;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.perPage);
    },
  },
  methods: {
    ...mapActions(["fetchCustomers", "updateUsersColumn"]),
    applyFilters() {
      this.fetchCustomers();
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
      this.fetchSalesOrders();
    },
    changePage(page) {
      this.$store.commit("SET_SALES_ORDER_PAGINATION", {
        ...this.pagination,
        currentPage: page,
      });
      this.fetchSalesOrderDetails();
    },
    makeSalesmen(event, id) {
      if (event.target.checked!='') {
        this.$store.commit("UPDATE_USERS", {
          id: id,
          column: 'issalesmen',
          value: 1,
        });
        this.updateUsersColumn()
        this.againFetchUser()
      }
    },
    makeServicemen(event, id) {
      if (event.target.checked) {
        this.$store.commit("UPDATE_USERS", {
          id: id,
          column: 'isservicemen',
          value: 1,
        });
        this.updateUsersColumn()
        this.againFetchUser()
      }
    },
    againFetchUser(){
      this.$store.commit('assignloadingstatus',1)
        setTimeout(() => {
          this.fetchCustomers();
          this.$store.commit('assignloadingstatus',0)
        }, 500);
    }

  },
  mounted() {
    this.fetchCustomers();
    this.$store.commit("assignaddpageheading", 'Customers');
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