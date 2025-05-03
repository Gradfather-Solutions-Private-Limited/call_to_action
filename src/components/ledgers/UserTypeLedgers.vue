<template>
    <div>
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">Ledgers</h4>
                    </div>
                    <div class="col-md-2 text-right">
                        <!-- <button v-on="on" class="btn" @click="backBtn()">
                            <i class='bx bx-refresh' style="font-size:30px"></i>
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="lable">Ledgers</label>
                            <select class="form-control" v-model="customerid">
                                <option v-for="item in usertypes" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="lable">From Date</label>
                            <input type="date" class="form-control" v-model="fromdate">
                        </div>
                        <div class="col-md-3">
                            <label class="lable">From To</label>
                            <input type="date" class="form-control" v-model="todate">
                        </div>
                    </div>
                    <div class="flex-between-row mt-20">
                        <div class="col-md-1">
                            <button class="btn btn-info" @click="refresh()">Search</button>
                        </div>
                        <!-- <div class="col-md-5 text-right">
                            <label class="">Total Records {{ total_no_of_records }}</label>
                                <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end pagina-extra" style="">
                                    <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1"
                                    @click="goToPage(pagination.current_page - 1)" :disabled="pagination.current_page === 1"
                                    >Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">{{ pagination.current_page }}</a></li>
                                    <li class="page-item"><a class="page-link" href="#">...</a></li>
                                    <li class="page-item"><a class="page-link" href="#">{{ pagination.last_page }}</a></li>
                                    <li class="page-item">
                                    <a class="page-link" href="#"
                                    @click="goToPage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page"
                                    >Next</a>
                                    </li>
                                </ul>
                                </nav>
                        </div> -->
                    </div>
                </div>

        </div>
        <div class="mt-10">
            
            <div class="col-md-12 m-top-10 boxshow">
				<div class="table-responsive">
					<table class="table">
						<thead>
                            <tr>
                                <th>#</th>
                                <th>Loan Account</th>
                                <th>Ledger name</th>
                                <th>Last Transaction Date</th>
                                <th>In/Out</th>
                                <th>Amount</th>
                                <th>Balance</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr  v-for="item,index in ledgers" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.loanaccount!=null ? item.loanaccount?.generatedid : 'N/A' }}</td>
                                <td>{{ getledgername(item) ?? 'N/A' }}</td>
                                <td>{{ item.transactiondate  ?? 'N/A'}}</td>
                                <td>{{ item.inout==1? 'In' : 'Out'  }}</td>
                                <td>{{ item.amount ?? 0 }}</td>
                                <td>{{ item.balance ?? 0 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
    data(){
        return {
            fromdate:'',
            todate:'',
            customerid:0,
            usertypes:[],
            ledgers:[],
            total_no_of_records:0,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
            page:1,
        }
    },
    mounted() {
        // this.accountno = this.$route.params.id
        this.refresh()
    },
    methods: {
        refresh(){
            let parm = {
                customerid:this.customerid,
                fromdate:this.fromdate,
                todate:this.todate,
                page:this.page,
            };
            axios.post('api/usertype/latest/ledger',parm)
                .then(response=>{
                    // let data = response.data;
                    this.ledgers = response.data.ledger;
                    this.usertypes = response.data.usertype;
                    // this.pagination.current_page = data.current_page;
                    // this.pagination.last_page = data.last_page;
                    // this.total_no_of_records = data.total;
                })
                .catch(error=>console.error(error))
        },
        getledgername(item){
            return this.usertypes.find(user => user.id === item.customerid)?.name || 'N/A';
        }
       
       
    }
}
</script>
<style scoped>

</style>
