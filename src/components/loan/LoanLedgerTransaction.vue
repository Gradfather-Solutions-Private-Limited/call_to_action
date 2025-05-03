<template>
    <div>
        <div>
            <div class="">
                <div class="col-md-12 boxshow heading-box">
                    <div class="row">
                        <div class="col-md-10">
                            <h4 class="headding-font">Loan Ledger Transaction</h4>
                        </div>
                        <div class="col-md-2 text-right">
                            <!-- <button v-on="on" class="btn">
                                <i class='bx bx-refresh' style="font-size:30px"></i>
                            </button> -->
                            <button class="btn" @click="$router.go(-1)">
                                <i class='bx bx-left-arrow-alt' style="font-size:30px"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="">
                    <div class="row">
                        <div class=" text-right">
                            <label class="">Total Records {{ total_no_of_records }}</label>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end pagina-extra" style="">
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1"
                                            @click="goToPage(pagination.current_page - 1)"
                                            :disabled="pagination.current_page === 1">Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">{{ pagination.current_page
                                            }}</a></li>
                                    <li class="page-item"><a class="page-link" href="#">...</a></li>
                                    <li class="page-item"><a class="page-link" href="#">{{ pagination.last_page }}</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#" @click="goToPage(pagination.current_page + 1)"
                                            :disabled="pagination.current_page === pagination.last_page">Next</a>
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
                                    <th>Transaction Date</th>
                                    <th>Billed Amount</th>
                                    <th>In/Out</th>
                                    <th>Amount</th>
                                    <!-- <th>Balance</th> -->
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="item, index in ledgers" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.transactiondate ?? '' }}</td>
                                    <td> <i class='bx bx-rupee text-success'></i> {{ item.billedamount ?? 0 }}</td>
                                    <td>{{ item.inout==1? 'In' : 'Out'}}</td>
                                    <td><i class='bx bx-rupee text-success'></i> {{ (item.inout==2 ? -1 : 1) * (item.amount) ?? 0 }}</td>
                                    <!-- <td><i class='bx bx-rupee text-success'></i> {{ item.balance ?? 0 }}</td> -->
                                </tr>
                                <!-- <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                       <strong>Total : </strong> {{getTotalamount()}}
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import EmiPaymentForm from '../payment/EmiPaymentForm.vue';

// import UserAutocomplete from '../../components/autocomplete/UserAutocomplete.vue';
export default {

    data() {
        return {
            myDate: new Date(),
            total_no_of_records: 0,
            ledgers:[],
            loanaccountid: 0,
            customerid: 0,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
            page: 1,
        }
    },
    components: {},
    mounted() {
        this.loanaccountid = this.$route.params.loanaccountid
        this.customerid = this.$route.params.customerid
        this.refresh()
    },
    methods: {
        refresh() {
            let param = {loanaccountid : this.loanaccountid,customerid:this.customerid,
                page:this.page,
            };
            axios.post('api/loan/ledger/detail',param)
                .then(response=>{
                    this.ledgers = response.data.ledger;
                    console.log(this.ledgers)
                    
                })
                .catch(error=>console.error(error))
        },
        goToPage(page) {
            if(this.pagination.current_page == page){
                return;
            }

            if (page < 1 || page > this.pagination.last_page) {
                return;
            }
            this.pagination.current_page = page;
            this.page = page;
            this.refresh();
        },
        // getTotalamount(){
        //     let total = 0;
        //     this.ledgers.forEach((item) => {
        //         if(item.inout==1){
        //             total += parseFloat(item.amount);
        //         }else {
        //             total -= parseFloat(item.amount);
        //         }
        //     });
        //     return parseFloat(total).toFixed(2);
        // }

    }
}
</script>
<style scoped></style>
