<template>
    <div v-if="showpdfdev == 1">
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-8">
                        <h4 class="headding-font">Loan Details</h4>
                    </div>
                    <div class="col-md-4 text-right">
                        <a href="#">
                            <span  @click="generatedPDF()"  style="font-size: 29px;color: red;">
                                <i class='bx bxs-file-pdf'></i>
                            </span>
                        </a>
                        <button v-on="on" class="btn" @click="backBtn()">
                            <i class='bx bx-left-arrow-alt' style="font-size:30px"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="col-md-12 d-flex p-10 boxshow heading-box">
                    <div class="col-md-4 ">
                        <label class="lable">Customer name : </label>
                        <span class="ml-5px text-info">   {{ this.loanaccount?.customer?.name }}</span>
                    </div>
                    <div class="col-md-4 ">
                        <label class="lable">Loan Account : </label>
                        <span class="ml-5px"> {{ this.loanaccount?.generatedid }}</span>
                    </div>
                    <div class="col-md-4 ">
                        <label class="lable">Rem. Account : </label>
                        <span class="ml-5px text-danger"><b>{{ this.loanaccount?.remainingamount }}</b></span>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- <div class="col-md-12 text-end">
            <button class="btn btn-primary" @click="eNachList()">ENach List</button>
        </div> -->
    
        <ENachList :details="this.enachList"></ENachList>

        <div >
            <div class="col-md-12 mt-20 boxshow">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <!-- <th>#</th> -->
                                <th>EMI No.</th>
                                <th>Principal Amount</th>
                                <th>Interest</th>
                                <th>EMI Amount</th>
                                <th>EMI Date</th>
                                <th>Received Amount</th>
                                <th>Received Date</th>
                                <th>Receipt No.</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in this.details" :key="item.id">
                                <!-- <td>{{ index + 1 }}</td> -->
                                <td>
                                   <span class="badge bg-success-subtle text-success-emphasis rounded-pill">
                                    {{ index+1 }}
                                    </span> 
                                </td>
                                <td>{{item.principalamount ?? 0}}</td>                                
                                <td>{{ item.interest ?? 0 }}</td>
                                <td><b>{{ item.tobepaid ?? 0 }}</b></td>
                                <td>{{ item.emidate ?? 'N/A' }}</td>
                                <td>
                                    <span class="text-success" v-if="item.receviedamount >= item.tobepaid">
                                        <b>
                                            <i class='bx bx-up-arrow-alt '></i>
                                            {{ item.receviedamount ?? 0 }}
                                        </b>
                                    </span>
                                    <span  class="text-danger" v-else>
                                        <b>
                                            <i class='bx bx-down-arrow-alt text-danger'></i>
                                            {{ item.receviedamount ?? 0 }}
                                        </b>
                                    </span>
                                </td>
                                <td>{{ item.receiveddate ?? 'N/A' }}</td>
                                <td>{{ item.receiptno ?? '' }}</td>
                                <td>
                                    <div v-if="item.paymenttransactionid == 0">
                                        <div v-if="item.isactive==1">
                                            <button class="btn btn-outline-success btn-sm" @click="openform(item)">Pay</button>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-outline-info btn-sm" @click="reverseEmi(item)">Reverse</button>
                                    </div>
                                </td>
                                <td>
                                    <a href="#">
                                        <span  @click="generatedPDF2(item)"  style="font-size: 29px;color: red;">
                                            <i class='bx bxs-file-pdf'></i>
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    
        <div v-if="payment">
            <emi-payment-form :emiitem="emiitem" @close="closeForm()" @refresh="refresh()"></emi-payment-form>
        </div>
    </div>
    <div v-else-if="showpdfdev == 2">
        <EmiCardPdf  :loanaccount="loanaccount" :loanemi="details"  />
    </div>
    <div v-else-if="showpdfdev == 3">
        <ReceiptPDF   :details="receiptdetails" :loanaccount="loanaccount" :loanemi="details"  />
    </div>

    
</template>
<script>
import EmiPaymentForm from '../payment/EmiPaymentForm.vue';
import EmiCardPdf from '../pdf/EmiCardPdf.vue';
import ENachList from '../enach/ENachList.vue'
import ReceiptPDF from '../pdf/ReceiptPDF.vue';


export default {
    components: { EmiPaymentForm,EmiCardPdf,ReceiptPDF},
    data() {
        return {
            accountno: '',
            details: [],
            receiptdetails:[],
            payment: false,
            emiitem: null,
            loanaccount:null,
            showpdfdev:1,
            loanaccountid:0,
            enachList:[]
        }
    },
    mounted() {
        this.$store.dispatch('fetchregisters')
        // this.accountno = this.$route.params.id
        this.loanaccountid = this.$route.params.id
        this.refresh();

        this.fetchenach()
    },
    methods: {
        refresh() {
            let param = { generatedid: this.accountno,id: this.loanaccountid }
            axios.post('api/users/loan/emis', param)
                .then(response => {
                    this.details = response.data?.loanemi
                    this.loanaccount = response.data.loanaccount
                })
                .catch(error => console.error(error))
        },
        generatedPDF(){
            this.showpdfdev = 2;
        },
        generatedPDF2(item){
            this.receiptdetails = item;
            this.showpdfdev = 3;
        },
        openform(item) {
            console.log(item)
            this.emiitem = item
            this.payment = true
        },
        closeForm(){
            this.payment = false
            this.refresh()
        },
        backBtn() {
            this.$router.go(-1)
        },
        reverseEmi(emiid){
            this.$store.commit('assignloadingstatus',1)
            if(confirm("Do you really want to delete ?")){
                let param={emiid:emiid,isloanledger:1}
                axios.post('api/loan/loanemidelete',param)
                    .then(response=>{
                        if(response.data){
                            this.$store.commit('assignloadingstatus',0)
                            this.refresh()
                        }
                    })
                    .catch(error=>console.log(error));
            }
            
        },
        fetchenach() {
            let params = {
                loanaccountid: this.loanaccountid,
            }
            axios.post('api/finance/enach/form/list', params)
                .then(response => {
                    console.log(response.data)
                    this.enachList = response.data.enach
                   
                })
                .catch(error => {
                    console.error(error);
                });
        },
        // eNachList(){
        //     let loanaccountid = this.loanaccount.id
        //     let customerid = this.loanaccount.customerid
        //     this.$router.push({ path: '/eNach-list/'+loanaccountid+'/'+customerid })
        // }
    }
}
</script>
<style scoped>
.table>tbody>tr>td {
    font-size: 13px;
}
</style>
