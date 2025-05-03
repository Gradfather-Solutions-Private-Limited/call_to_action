<template>
    <div class="container">
    <div class="card mt-10">
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Start Date</span></div>
                                <input type="date" v-model="startdate"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">End Date</span></div>
                                <input type="date" v-model="enddate"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Order No.</span></div>
                                <input type="text" v-model="searchorderno"  class="form-control">
                            </div>
                        </div>
                        <!-- <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Product Id</span></div>
                                <input type="text" v-model="searchproductid"  class="form-control">
                            </div>
                        </div> -->
                        <!-- <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Role</span></div>
                                <select v-model="searchrole" class="form-control">
                                    <option value="">---Select---</option>
                                    <option :value="0">Any</option>
                                    <option :value="1">Admin</option>
                                </select>
                            </div>
                        </div> -->
                        <div class="col-md-3">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Status</span></div>
                                <select v-model="searchstatus" class="form-control">
                                    <option value="">---Select---</option>
                                    <option :value="1">Delivered</option>
                                    <option :value="0">Not Delevired</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Title</span></div>
                                <input type="text" v-model="title"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Keywords</span></div>
                                <input type="text" v-model="keywords"  class="form-control">
                            </div>
                        </div> -->
                    </div>
                    <div class="col-md-12 mt-20 " >
                        <button class="btn btn-success" @click="searchorder()">
                            <i class='bx bx-save'></i> Search
                        </button>
                    </div>
            </div>
        </div>
    </div>
        <div class="col-md-12 mt-10">
            <div class="table-responsive">
                <table class="table custu-table">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Cust. Name/ 
                                Cust. Id</th>
                            <th>Address</th>
                            <th>Mobile No.</th>
                            <th>Order No</th>
                            <th>Payment</th>
                            <th>Paid Status</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <order-list-row v-for="(item,index) in ordertransaction" :key="item.id" :item="item" :index="index"></order-list-row>
                </table>
                <div class="flex-row justify-content-end">
                    <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback"/>
                </div>
            </div>
        </div>
        
</div>
    
</template>
<script>
import OrderListRow from './OrderListRow.vue';
import Pagination from 'v-pagination-3';
export default {
    components:{OrderListRow,Pagination},
    data() {
        return {
            ordertransaction:[],
            searchorderno:'',
            startdate:'',
            enddate:'',
            searchstatus:0,
            searchproductid:'',
            searchrole:'',
            rows:0,
			currentPage:1,
			perPage:10,
        }
    },
    mounted() {
        this.refresh();
        this.$store.commit('assignaddpageheading','Order List')
    },
    methods: {
        clickCallback (currentPage) {
			this.currentpage=currentPage
			this.refresh();
      	},
        searchorder(){
			let param = {searchstatus:this.searchstatus, ordertransactionid:this.searchorderno,searchproductid:this.searchproductid,
                searchrole:this.searchrole,startdate:this.startdate,enddate:this.enddate}
			axios.post('api/order/transaction/fetch',param)
	    	.then((response) => this.processdata(response.data))
	    	.catch((err) => {
			   	console.log('', err)
	    	});
		},
        refresh(){
            axios.post('api/order/transaction/fetch')
            .then(response=>this.processdata(response.data))
            .catch(error=>console.log(error));
        },
        processdata(data){
		    this.ordertransaction = data;
	    },
        processResponseCount(data){
            this.rows=data
        },
    },
}
</script>