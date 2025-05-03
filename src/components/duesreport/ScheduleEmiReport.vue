<template>
    <div>
        <div>
            <div class="">
                <div class="col-md-12 boxshow heading-box">
                    <div class="row">
                        <div class="col-md-10">
                            <h4 class="headding-font">Schedule Emis</h4>
                        </div>
                        <div class="col-md-2 text-right">
                            <button v-on="on" class="btn">
                                <i class='bx bx-refresh' style="font-size:30px"></i>
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
                                    <li class="page-item ">
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
                                    <td>Loan Account</td>
                                    <td>Customer Name</td>
                                    <td>Mobile no.</td>
                                    <td>Schedule Date</td>
                                    <td>Emi Date</td>
                                    <td>Emi Amount</td>
                                    <td>Action</td>

                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="item, index in emis" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.loanemi?.loanaccount?.generatedid ?? '' }}</td>
                                    <td>{{ item.loanemi.loanaccount.customer.name }}</td>
                                    <td>
                                        <div v-if="item.loanemi?.loanaccount?.customer?.mobiles?.length > 0">
                                            <div v-for="mobile in item.loanemi?.loanaccount?.customer?.mobiles">{{
                                                mobile.mobile }}</div>
                                        </div>
                                    </td>
                                    <td>{{ item.scheduleddate ?? '' }}</td>
                                    <td>{{ item.emidate ?? '' }}</td>
                                    <td>{{ item.loanemi?.emiamount ?? 0 }}</td>
                                    <td>
                                        <button class="btn btn-outline-success btn-sm"
                                            @click="openForm(item.loanemi)">Pay</button>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="payment">
            <emi-payment-form :emiitem="emiitem" @close="closeForm()" @refresh="refresh()"></emi-payment-form>
        </div>
    </div>
</template>
<script>
import EmiPaymentForm from '../payment/EmiPaymentForm.vue';

// import UserAutocomplete from '../../components/autocomplete/UserAutocomplete.vue';
export default {

    data() {
        return {
            myDate: new Date(),
            payment:false,
            emis: [],
            emiitem:null,
            total_no_of_records: 0,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
            page: 1,
        }
    },
    components: {EmiPaymentForm},
    mounted() {
        // this.accountno = this.$route.params.id
        this.refresh()
    },
    methods: {
        refresh() {
            let parm = { accountstatus: 0, page: this.page };
            axios.post('api/scheduled/emis/fetch', parm)
                .then(response => {
                    this.emis = response.data.emis.data;
                    this.total_no_of_records = response.data.emis.total;
                    this.pagination.last_page = response.data.emis.last_page;
                })
                .catch(error => console.error(error))
        },
        openForm(item){
            this.emiitem = item
            this.payment = true
        },
        closeForm(){
            this.payment = false
            this.refresh()
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

    }
}
</script>
<style scoped></style>
