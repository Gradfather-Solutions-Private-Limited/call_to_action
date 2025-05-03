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
                                <tr v-for="(item,index) in servicemen" :key="item.id">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ item.name ?? '' }}</td>
                                    <td>{{ item.mobiles?.length>0?item.mobiles[0].mobile : '' }}</td>
                                    <td>
                                        <input type="checkbox" @click="removeServicemen($event,item.id)" :id="'customer'+item.id"/>
                                        <label :for="'customer'+item.id" class="ml-5">Customer</label>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "Servicemen",
  
  computed: {

    ...mapState(["servicemen", "servicemenPagination","servicemenFilters"]),

    pagination() {
      return this.customersPagination;
    },
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.perPage);
    },
  },
  methods: {
    ...mapActions(["fetchServiceMen","updateUsersColumn"]),
    applyFilters() {
      this.fetchServiceMen();
    },
    backBtn(){
      this.$router.go(-1)
    },
    // resetFilters() {
    //   this.$store.commit("SET_CUSTOMER_FILTERS", {
    //         customerName: '',
    //         customerMobile: '',
    //         customerEmail: '',
    //   });
    //   this.fetchSalesMen();
    // },
    // changePage(page) {
    //   this.$store.commit("SET_SALES_ORDER_PAGINATION", {
    //     ...this.pagination,
    //     currentPage: page,
    //   });
    //   this.fetchSalesMen();
    // },
    removeServicemen(event,id){
        console.log("servicemen ",event.target.checked)
        if(event.target.checked){
            this.$store.commit("UPDATE_USERS", {
                id: id,
                column: 'isservicemen',
                value: 0,
            });
            this.updateUsersColumn()
            this.againFetchServicemen()
        }
    },
    againFetchServicemen(){
      this.$store.commit('assignloadingstatus',1)
        setTimeout(() => {
          this.fetchServiceMen();
          this.$store.commit('assignloadingstatus',0)
        }, 500);
    }
    
  },
  mounted() {
    this.fetchServiceMen();
    this.$store.commit("assignaddpageheading", 'Servicemen');
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