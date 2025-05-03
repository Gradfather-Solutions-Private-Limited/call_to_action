<template>
    <div>
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">E-Nach Form</h4>
                    </div>
                    <div class="col-md-2" v-if="formSubmitted">
                        <button @click="this.$router.go(-1)" class="btn btn-info">Back</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <div>
                <div class="col-md-12" style="background: #fff;padding: 10px;">
                    <div class="form-group row">
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Account Holder name</label>
                            <input type="text" class="form-control" v-model="form.accountHolderName" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Account Number</label>
                            <input type="text" class="form-control" v-model="form.accountNumber" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Account Type</label>
                            <!-- <input type="text" class="form-control" v-model="form.accountType" :disabled="formSubmitted"> -->
                             <select class="form-control" v-model="form.accountType" :disabled="formSubmitted">
                                <option value="">Select</option>
                                <option value="SAVINGS">SAVINGS</option>
                                <option value="CURRENT">CURRENT</option>
                                <option value="CC">CC</option>
                                <option value="OTHERS">OTHERS </option>
                             </select>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Auth Type</label>
                            <!-- <input type="text" class="form-control" v-model="form.authType" :disabled="formSubmitted"> -->
                            <select class="form-control" v-model="form.authType" :disabled="formSubmitted">
                                <option value="">Select</option>
                                <option value="NetBanking">Net Banking</option>
                                <option value="DebitCard">Debit Card</option>
                                <option value="EsignOtp">Esign Otp</option>
                             </select>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Bank Ifsc</label>
                            <input type="text" class="form-control" v-model="form.bankIfsc" :disabled="formSubmitted">
                        </div>
                        
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Category Code</label>
                            <!-- <input type="text" class="form-control" v-model="form.categoryCode" :disabled="formSubmitted"> -->
                            <select class="form-control" v-model="form.categoryCode" :disabled="formSubmitted">
                                <option value="">Select</option>
                                <option value="Loan Instalment Payment">Loan Instalment Payment</option>
                                <option value="Loan Amount Security">Debit Card</option>
                                <option value="Small Value Mandate">Small Value Mandate</option>
                             </select>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Collection Amount</label>
                            <input type="number" class="form-control" v-model="form.collectionAmount" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Principal Amount</label>
                            <input type="text" class="form-control" v-model="form.principalAmount" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Debit Type</label>
                            <!-- <input type="text" class="form-control" v-model="form.debitType" :disabled="formSubmitted"> -->
                            <select class="form-control" v-model="form.debitType" :disabled="formSubmitted">
                                <option value="">Select</option>
                                <option value="MAXIMUM_AMOUNT">MAXIMUM AMOUNT</option>
                                <option value="FIXED_AMOUNT">FIXED AMOUNT</option>
                             </select>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Customer Name</label>
                            <input type="text" class="form-control" v-model="form.customerName" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Customer Email</label>
                            <input type="text" class="form-control" v-model="form.customerEmail" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Customer Mobile</label>
                            <input type="text" class="form-control" v-model="form.customerMobile" :disabled="formSubmitted">
                        </div>
                        
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">First Collection Date</label>
                            <input type="text" class="form-control" v-model="form.firstCollectionDate" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Last Collection Date</label>
                            <input type="text" class="form-control" v-model="form.lastCollectionDate" :disabled="formSubmitted">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Frequency</label>
                            <!-- <input type="text" class="form-control" v-model="form.frequency" :disabled="formSubmitted"> -->
                            <select class="form-control" v-model="form.frequency" :disabled="formSubmitted">
                                <option value="">Select</option>
                                <option value="DAILY">DAILY</option>
                                <option value="WEEKLY">WEEKLY</option>
                                <option value="MNTH">Monthly</option>
                                <option value="QURT">Quertly</option>
                                <option value="YEAR">Yearly</option>
                             </select>
                        </div>
                        
                        <!-- <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Merchant Trxn Ref Id</label>
                            <input type="text" class="form-control" v-model="form.merchantTrxnRefId" :disabled="formSubmitted">
                        </div>
                        -->
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Utility Code</label>
                            <input type="text" class="form-control" v-model="form.utilityCode" disabled>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Optional</label>
                            <!-- <input type="text" class="form-control" v-model="form.optional" :disabled="formSubmitted"> -->
                             <select class="form-control" v-model="form.optional" :disabled="formSubmitted">
                                <option value="">Select</option>
                                <option v-for="item in this.BANKS" :value="item.instructedAgentCode" :key="item.instructedAgentCode">
                                    {{  item.bankName}}
                                </option>
                             </select>
                        </div>
                       
                    </div>
                    <div class="d-flex gap-2 justify-content-center py-2" v-if="!formSubmitted">
                        <button class="btn btn-success" @click="submitForm()">Submit</button>
                        <button class="btn btn-danger ml-5px" @click="this.$router.go(-1)">Cancel</button>
                    </div>

                </div>
            </div>
            
        </div>
    </div>

</template>
<script>
import Constants from '../utilities/Constants.vue'


export default {
    mixins:[Constants],
    data(){
        return {
            form : {
                accountHolderName:'',
                accountNumber:'',
                accountType:'',
                authType:'',
                bankIfsc:'',
                categoryCode:'',
                collectionAmount:'',
                customerEmail:'',
                customerMobile:'',
                customerName:'',
                debitType:'',
                firstCollectionDate:'',
                lastCollectionDate:'',
                frequency:'',
                lastCollectionDate:'',
                // merchantTrxnRefId:'',
                principalAmount:0,
                utilityCode:'NA',
                optional:'',
            },
            clientid:0,
            loanaccountid:0,
            fetchcolumns : 'id,name,email,firstname,lastname,adhar,pan,dob,created_at,gender,religion,m_status,payscale,iscustomer',
            formSubmitted: false,
        }
    },
    mounted(){
        this.loanaccountid = this.$route.params.loanaccountid
        this.clientid = this.$route.params.customerid
        console.log(this.clientid)
        this.initialize()
    },
    methods: {
        // initializeTest(){
        //     this.form = {
        //         accountHolderName:'Arvind Chauhan',
        //         accountNumber:'1020304050',
        //         accountType:'SAVING',
        //         authType:'NetBanking',
        //         bankIfsc:'KKBKH123456',
        //         categoryCode:'Loan Installment Payment',
        //         collectionAmount:'10000',
        //         customerEmail:'aravchauhan123@gmail.com',
        //         customerMobile:'6070809010',
        //         customerName:'Arvind Chauhan',
        //         debitType:'FIXED_AMOUNT',
        //         firstCollectionDate:'2025-04-28',
        //         frequency:'MONTHLY',
        //         lastCollectionDate:'2025-10-28',
        //         merchantTrxnRefId:'7458963214',
        //         principalAmount:9000,
        //         utilityCode:'NA',
        //         optional:'KOTAK MAHINDRA BANK',
        //     }
        // },
        initialize(){
            let param = {  noofrec: 10, currentpage: 1,
                fetchcolumns: this.fetchcolumns,userid: this.clientid,
				fetchtables: 'mobiles,addressess,userinfo,banks',
              };
            // axios.post("api/users/fetch", param) loan/accounts/fetch
            axios.post("api/finance/users/fetch", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
            let param1 = {loanaccountid: parseInt(this.loanaccountid)} 
            axios.post("api/loan/accounts/fetch", param1)
                .then(response => this.processLoanAccountResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(data){
            if(data.banks.length > 0){
                let bank = data.banks[0]
                this.form.accountNumber = bank?.accountno
                this.form.bankIfsc = bank?.ifsccode
            }
            if (data.mobiles.length > 0) {
                let mobile = data.mobiles[0]?.mobile;
                if (mobile && mobile.startsWith('+91')) {
                    this.form.customerMobile = mobile.slice(3);
                } else if (mobile && mobile.length === 10) {
                    this.form.customerMobile = mobile;
                } else {
                    this.form.customerMobile = ''; // Invalid mobile
                }
            }
            this.form.accountHolderName = data?.name
            this.form.customerName = data?.name
            this.form.customerEmail = data?.email
        },
        processLoanAccountResponse(data) {
            let loanaccounts = data.loanaccounts.data;
            if (loanaccounts.length > 0) {
                let loan = loanaccounts[0]
                this.form.collectionAmount = loan?.emi;
                this.form.principalAmount = loan?.totalloanamount;
                this.form.firstCollectionDate = loan?.startdate;
                this.form.lastCollectionDate = loan?.enddate

                // Calculate the date 5 months after firstCollectionDate
                // const firstDate = new Date(this.form.firstCollectionDate);
                // const futureDate = new Date(firstDate.setMonth(firstDate.getMonth() + loanaccounts[0].numberofemi));
                // this.form.lastCollectionDate = futureDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            }
        },
        submitForm(){
            console.log(this.form)
            // if(this.form.accountHolderName && this.form.accountNumber && this.form.accountType && this.form.bankIfsc && this.form.customerEmail && this.form.customerMobile  && this.form.merchantTrxnRefId && this.form.transactionCode && this.form.mandateId){
                console.log("Form Submitted") 
                this.form.customerid = this.clientid
                this.form.loanaccountid = this.loanaccountid
                axios.post("api/finance/enach/form/create",this.form)
                    .then(response => {
                        console.log(response.data)
                        // if(response.data.status == 200){
                            alert("E-Nach Form Submitted Successfully")
                            this.formSubmitted = true
                            // this.$router.go(-1)
                        // }
                    })
                    .catch(error => console.log(error));
            // }else{
            //     alert("Please fill all the fields")
            // }
        }
    }
}
</script>