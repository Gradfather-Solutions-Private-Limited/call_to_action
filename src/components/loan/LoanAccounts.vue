<template>
    <div>
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">Loan Accounts</h4>
                    </div>
                    <!-- <div class="col-md-2 text-right">
                        <button v-on="on" class="btn" @click="backBtn()">
                            <i class='bx bx-refresh' style="font-size:30px"></i>
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="lable">Customer</label>
                            <UserAutocomplete
                                boxname="customerId"
                            />
                        </div>
                        <div class="col-md-3">
                            <label class="lable">Account No.</label>
                            <input type="text" class="form-control" v-model="loanaccountsnum">
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-info" @click="refresh()">Search</button>
                        </div>
                        <div class="col-md-5 text-right">
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
                        </div>
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
                                <th>Loan A/c</th>
                                <th>Cu. Name</th>
                                <!-- <th>D.P.</th> -->
                                <th>Tenure</th>
                                <th>EMI</th>
                                <th>Interest</th>
                                <th>Proces. fees</th>
                                <th>Amount</th>
                                <th>Outst. Amount</th>
                                <th>Rem. Amount</th>
                                <th>Disbur. date</th>
                                <th>Action</th>
                                <th>Loan App. Stutas </th>
                                <th>ENach Status</th>
                                <th></th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr  v-for="item,index in loanaccounts" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <span v-if="item.generatedid!=null" 
                                    style="color:#3b3bde;cursor: pointer;"
                                    class="loan-details" @click="fetchloan(item)" >{{ item.generatedid }}</span>
                                </td>
                                <td>{{ item.customer?.name ?? 'N/A' }}</td>
                                <!-- <td class="text-success">
                                    <b>{{ parseFloat(item.downpayment).toFixed(2) ?? 0}}</b>
                                </td> -->
                                <td>{{ parseFloat(item.numberofemi).toFixed(2) ?? 0 }}</td>
                                <td>{{ parseFloat(item.emi) ?? 0 }}</td>
                                <td> {{ parseFloat(item.interest).toFixed(2) ?? 0 }} </td>
                                <td> 
                                    <b>{{ parseFloat(item.filecharge).toFixed(2) ?? 0 }}</b>
                                </td>
                                <td>
                                    <div class="badge bg-success-subtle text-success-emphasis rounded-pill" style="font-size: 13px;">
                                        <b>{{ parseFloat(item.billedamount).toFixed(2)  ?? 0}}</b>
                                    </div>
                                </td>
                                <td>
                                   <b> <i class='bx bx-rupee text-success'></i>{{ parseFloat(item.totalloanamount).toFixed(2) ?? 0 }}
                                    </b>
                                </td>
                                <td>
                                    <span class="badge bg-danger-subtle text-danger-emphasis rounded-pill" style="font-size: 13px;">
                                        <i class='bx bx-rupee text-success'></i>{{ parseFloat(item.remainingamount).toFixed(2) ?? 0 }}
                                    </span>
                                </td>
                                <td>
                                   {{ item.disbursement_date }}
                                </td>
                                <td>
                                    <div>
                                        <span class="badge bg-success-subtle text-success-emphasis rounded-pill">
                                                Active
                                        </span>
                                        <button class="badge bg-success-subtle text-success-emphasis rounded-pill" @click="getLedger(item)">Ledger</button>
                                   </div>
                                   
                                </td>
                                <td>
                                    <span class="badge bg-danger-subtle text-danger-emphasis rounded-pill" v-if="item.process_status=='Pending'">{{ item.process_status }}</span>
                                    <span class="badge bg-success-subtle text-success-emphasis rounded-pill" v-if="item.process_status=='Approved'">{{ item.process_status }}</span>
                                </td>
                                <td>{{ getEnachRequestStatus(item) ?? 'N/A' }}</td>
                                <td>
                                   
                                    <div>
                                        <button class="badge bg-success-subtle text-success-emphasis rounded-pill" @click="eNachForm(item)">eNach Form</button>
                                    </div>
                                    <div v-if="item.process_status=='Pending'">
                                        <button @click="approvalLoan(item)" class="badge bg-danger-subtle text-danger-emphasis rounded-pill">Loan Approval</button>
                                    </div>
                                </td>
                                <td>
                                        <span class="ml-2" style="color: red; font-size: 20px;">
                                            <i class='bx bxs-file-pdf' @click="generatedpdf(item)"></i>
                                        </span>
                                        <span class="ml-10" style="color: red; font-size: 20px;">
                                            <i class='bx bxs-trash' @click="deleteTransaction(item)"></i>
                                        </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import UserAutocomplete from '../../components/autocomplete/UserAutocomplete.vue';
import ENachRequest from '../enach/ENachRequest.vue';
export default {
    
    data(){
        return {
            myDate: new Date(),
            accountno:'',
            customerId:'',
            loanaccountsnum:'',
            loanaccounts:[],
            total_no_of_records:0,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
            page:1,
            eNachRequests:[],
        }
    },
    components:{UserAutocomplete},
    mounted() {
        // this.accountno = this.$route.params.id
        this.refresh()
    },
    methods: {
        refresh(){
            let parm = {accountsnum:this.loanaccountsnum,customerId:this.customerId,
                page:this.page,
            };
            axios.post('api/loan/accounts/fetch',parm)
                .then(response=>{
                    let data = response.data.loanaccounts;
                    this.eNachRequests = response.data.eNachRequests
                    this.loanaccounts = data.data;
                    this.pagination.current_page = data.current_page;
                    this.pagination.last_page = data.last_page;
                    this.total_no_of_records = data.total;
                    
                })
                .catch(error=>console.error(error))
        },
        generatedpdf(item){
            const routeData = this.$router.resolve({ path: '/pdf-details/'+item?.customer?.id+'/'+item.generatedid });
            window.open(routeData.href, '_blank');
        },
        fetchloan(item){
            this.$router.push({ path: '/loan-details/'+item.id  })
        },
        getLedger(item){
            this.$router.push({ path: '/loan-transactions/'+item.id+'/'+item.customerid })
        },
        eNachForm(item){
            this.$router.push({ path: '/eNach-form/'+item.id+'/'+item.customerid })
        },
        postApplication(){
            axios.post('api/finance/transaction/post')
                .then((response)=>{
                    console.log(response.data)
                })
                .catch((error)=>console.log(error))
        },
        approvalLoan(item){
            if(confirm("Do you want to approved this loan ?")){
                axios.post('api/finance/submitLoanPos',{loanaccountid : item.id})
                    .then(response=>{
                        console.log(response.data)
                        this.refresh()
                    })
                    .catch(error=>console.log(error))

            }
        },
        getEnachRequestStatus(item){
            let found = this.eNachRequests?.find(o=>o.loanaccountid == item.id)
            return found?.status || 'N/A'
        },
        deleteTransaction(item){
            if(confirm("Do you want to delete.")){
                axios.post('api/finance/loan/account/delete',{id:item.id})
                    .then(response=>{
                        console.log(response.data)
                        this.refresh()
                    })
                    .catch(error=>console.log(error))
            }
        }

    }
}
</script>
<style scoped>

</style>
