<template>
    <div class="container">
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">Loan Form</h4>
                    </div>
                    <!-- <div class="col-md-2 text-right">
                        <button v-on="on" class="btn" @click="backBtn()">
                            <i class='bx bx-refresh' style="font-size:30px"></i>
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="" style="background-color:white">
            <cart-page></cart-page>
            <div>
                <div class="col-md-12">
                    <div class="form-group row">
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Emi Type</label>
                            <select v-model="recurringtype" class="form-control ">
                                <option v-for="option in getmastertype(MASTER_RECURRING_TYPES)"
                                    v-bind:key="option.labelid" v-bind:value="option.labelid" v-text="option.label" />
                            </select>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Start Emi Date</label>
                            <input type="date" class="form-control" v-model="startdate">
                            <div class="focus-input100 text-danger" v-if="msg?.emidate">{{ msg.emidate }}</div>
                        </div>
                        <!-- <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Downpayment</label>
                            <input type="number" class="form-control" v-model="downpayment">
                        </div> -->
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Loan Amount</label>
                            <div class="form-control"><span>{{ getbalance }}</span></div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Tenure/No. of Emi</label>
                            <input type="number" class="form-control" v-model="numberofemi">
                            <div class="focus-input100 text-danger " v-if="msg?.numberofemi">{{ msg.numberofemi }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Interest</label>
                            <input type="number" class="form-control" v-model="interest">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Processing fees </label>
                            <input type="number" class="form-control" v-model="filecharge">
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Processing fee Type</label>
                            <div class="form-control">
                                <div class="row ">
                                    <div class="col-md-4">
                                        <input type="radio" id="cash" :value="1" v-model="modetype"
                                            name="file_charge" @click="updateLoanAmount()" />
                                        <label for="cash" class="ml-5">Cash</label>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="radio" id="deduct_from_paid_amount" :value="2"
                                            v-model="modetype" name="file_charge" />
                                        <label for="deduct_from_paid_amount" class="ml-5">Deduct From Paid Amount</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Total EMI Charges</label>
                            <div class="form-control">
                                <span v-if="numberofemi > 0">{{ !isNaN(totalemicharges) ? totalemicharges : 0 }}</span>
                                <span v-else>0</span>
                            </div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Mode of Payment</label>
                            <select v-model="mode" class="form-control">
                                <option v-for="(option) in registers" v-bind:value="option.id" v-text="option.name"
                                    :key="option.id">
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">EMI Amount </label>
                            <div class="form-control"> <span>{{ emiamt }}</span> </div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Outstanding Amount</label>
                            <div class="form-control"> <span>{{ totalloanamount }}</span> </div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Paid Amount</label>
                            <div class="form-control"> <span>{{ !isNaN(this.paid_amount) ?
                                    paid_amount : 0 }}</span> </div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Disbursement date</label>
                            <div>
                                <input type="date" class="form-control" v-model="disbursement_date">

                            </div>
                        </div>

                        <div class="col-md-4 mt-10">
                            <label for="city" class="col-form-label text-md-right">Purpose of Loan</label>
                            <div class="form-control"> <span>
                                    <select v-model="purpose">
                                        <option disabled value="">-- Select Purpose --</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Travel Expenses">Travel Expenses</option>
                                        <option value="Medical Expenses">Medical Expenses</option>
                                        <option value="Education">Education</option>
                                        <option value="Repay other Loan">Repay other Loan</option>
                                        <option value="Marriage Expenses">Marriage Expenses</option>
                                        <option value="Home Renovation">Home Renovation</option>
                                        <option value="Home Purchase">Home Purchase</option>
                                        <option value="Business Expansion">Business Expansion</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </span> </div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label  class="col-form-label text-md-right">Loan type</label>
                            <div >
                                <select v-model="purpose_type" class="form-control">
                                    <option disabled value="">-- Select Purpose --</option>
                                    <option value="Personal loan">Personal loan</option>
                                    <option value="Business loan">Business loan</option>
                                    <option value="Other">Other</option>
                                </select>
                           </div>
                        </div>
                        <div class="col-md-4 mt-10">
                                <lable class="col-from-lable">Rate of interest</lable>
                                <input type="text" class="from-control" v-model="interest_rate_text" > 
                        </div>
                        <div class="col-md-4 mt-10">
                                <lable class="col-from-lable">Interest Type</lable>
                               <select class="from-control" v-model="interest_type" @change="interestType()">
                                    <option :value="1">Fixed</option>
                                    <option :value="2">Floating</option>
                               </select>
                        </div>
                        <div class="col-md-4 mt-10">
                                <lable class="col-from-lable">Refund Security Deposit:-</lable>
                                <input type="text" class="from-control" v-model="ref_Deposit"> 
                        </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-center py-2">
                        <button class="btn btn-success" @click="updatefinance()" :disabled="issubmit">Submit</button>
                        <button class="btn btn-danger ml-5px" @click="cancel()">Cancel</button>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
import Constants from '../../components/access/Constants.vue';
import CartPage from '../../components/cart/CartPage.vue';


import moment from 'moment';
export default {
    mixins: [Constants],
    components: { CartPage },
    data() {
        return {
            recurringtype: 2,
            downpayment: 0,
            numberofemi: 0,
            interest: 0,
            filecharge: 0,
            startdate: '',
            mode: 0,
            moment: moment,
            disbursement_date: '',
            formVisible: false,
            id:0,
            purpose_type:'',
            purpose:'',
            currentdate: new Date().toISOString().substring(0, 10),
            issubmit: false,
            modetype: 1,
            purpose: '',
            interest_rate_text:'',
            interest_type:1,
            ref_Deposit:'',


        };
    },
    mounted() {

        if (this.registers.length == 0) {
            this.$store.dispatch('fetchregisters')
        }
    },
    // watch:{
    //     totalnetprice: {
    //     handler(newValue, oldValue) {
    //             this.downpayment = newValue;
    //         },
    //         immediate: true 
    //     }
    // },
    computed: {
        // ...mapGetters(['finance', 'totalnetchargeable', 'totalnetprice']),
        ...mapGetters(['registers', 'cartitems', 'totalnetprice', 'selectedcustomer', 'amountwithouttax', 'amountafterdiscount',
            'taxableamount', 'finance', 'mastervalidation'
        ]),
        msg() {
            let validationlist = this.mastervalidation;
            return validationlist;
        },
        gettotal() {
            let discountedvalue = 0;
            if (this.totalnetprice != 0) {
                if (this.totalnetchargeable != null && typeof this.totalnetchargeable != undefined && this.totalnetchargeable != 0) {
                    discountedvalue = parseFloat(this.totalnetprice) + parseFloat(this.totalnetchargeable ?? 0)
                } else {
                    discountedvalue = this.totalnetprice
                }
            }
            return discountedvalue
        },
        getbalance() {
            return this.totalnetprice;
            // if (parseFloat(this.downpayment) > 0) {
            //     return parseFloat(this.downpayment).toFixed(2) ?? 0;
            // } else {
            //     return 0;
            // }
        },
        totalemicharges() {
            if (parseFloat(this.numberofemi) > 0) {
                // return parseFloat(parseFloat(this.interest) + parseFloat(this.filecharge)).toFixed(2) ?? 0
                return parseFloat(parseFloat(this.interest)) ?? 0
            } else {
                return 0;
            }
        },
        emiamt() {
            console.log('total net price ', this.totalnetprice);
            if (parseFloat(this.numberofemi) > 0) {
                return parseFloat((parseFloat(this.getbalance) + parseFloat(this.totalemicharges)) / parseFloat(this.numberofemi)).toFixed(2) ?? 0
            } else {
                return 0;
            }
        },
        totalloanamount() {
            let totalamount = 0;
            if (parseFloat(this.numberofemi) > 0) {
                if(this.interest_type==1){
                    totalamount = (parseFloat(this.emiamt) * parseFloat(this.numberofemi))
                }else {
                    totalamount = this.gettotal
                }
            }
            return Math.round(totalamount) ?? 0;
        },
        paid_amount(){
            if(parseFloat(this.numberofemi) > 0){
                if(this.modetype == 1){
                    return parseFloat(this.getbalance);
                }else{
                    return parseFloat(this.getbalance) - parseFloat(this.filecharge ?? 0);
                }
            }
            return 0;
        },

        // amountwithoutfilecharges() {
        //     let paidamount = 0;
        //     if (parseFloat(this.numberofemi) > 0 || parseFloat(this.filecharge) > 0) {
        //         paidamount = parseFloat(this.totalnetprice)
        //     }
        //     this.paid_amount = paidamount;
        //     return paidamount;
        // },

    },
    methods: {
        // submit() {
        //     this.updatefinance()
        //     this.$emit('close')
        // },

        updatefinance() {
            let param = {
                numberofemi: this.numberofemi,
                emi: this.emiamt,
                interest: this.interest,
                filecharge: this.filecharge,
                downpayment: this.downpayment ?? 0,
                startdate: this.startdate,
                totalloanamount: this.totalloanamount,
                amountwithtax: this.getbalance,
                recurringtype: this.recurringtype,
                mode: this.mode,
                isfinance: 1,
                purpose:this.purpose,
                paid_amount:this.paid_amount,
                disbursement_date:this.disbursement_date,
                purpose_type:this.purpose_type,
                customerid: this.selectedcustomer ?? 0,
                transactiondate: this.currentdate,
                id: this.id,
                modetype:this.modetype,
                interest_rate_text:this.interest_rate_text,
                interest_type:this.interest_type,
                ref_Deposit:this.ref_Deposit,
            }
            console.log('param', param);
          
            if (this.check_Validation(param)) {
                this.issubmit = true
                axios.post('api/finance/submitPos', param)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.status) {
                            this.issubmit = false
                            this.clearpage()
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                this.$store.commit('assignfinance', null)
            }
        },
        submitpos() {
            // current date
            let date = new Date()
            let currentdate = moment(date).format('YYYY-MM-DD');
            this.updatefinance();
            this.$store.commit('assignloadingstatus',1)

            let param = {
                items: this.cartitems, amountwithtax: this.totalnetprice,
                customerid: this.selectedcustomer ?? 0,
                transactiondate: currentdate,
                transactionid: 0, trantype: 2,
                amountwithouttax: this.amountwithouttax,
                isinvoice: 1, fy: 2024,
                amtafterdiscount: 0, oldtrantype: 2,
                taxableamount: 0,
                totaltax: 0, billingstatecode: '09',
                finance: this.finance,
            }
            if (this.check_Validation(param)) {
                axios.post('api/submittransaction2', param)
                    .then(response => {
                        console.log(response.data);
                        if (response.data) {
                            this.clearpage()
                        }
                    })
                    .catch(error => this.submiterror(error));
            }
        },
        clearpage() {
            this.$store.dispatch("triggerNotification", {
                message: "Data saved successfully!",
                type: "success",
            });
            // this.$store.commit('clearcart')
            this.$router.push({ name: 'loan-accounts' });
            this.$store.commit('assignloadingstatus', 0)
        },
        cancel() {
            this.$emit('close')
        },
        check_Validation(param) {
            if (param.amountwithtax === 0 || param.amountwithtax === '') {
                this.mastervalidation['amountwithtax'] = "You must have a with tax amount";
            } else if (typeof param.amountwithtax !== "number" || param.amountwithtax < 0) {
                this.mastervalidation['amountwithtax'] = "Selling Price must be a non-negative number.";
            }

            if (param.customerid === 0 || !param.customerid) {
                this.mastervalidation['customerid'] = "You must have a customer";
            }
      
            if (this.startdate == '') {
                this.mastervalidation['emidate'] = "You must have a Emi Date";
            }

            if (this.numberofemi == '' || this.numberofemi == 0) {
                this.mastervalidation['numberofemi'] = "You must have a Tenure/No. of Emi";
            }

            console.log(this.mastervalidation);
            console.log(Object.keys(this.mastervalidation).length);

            if (Object.keys(this.mastervalidation).length > 0) {
                return false;
            } else {
                return true;
            }
        },
        toggleForm() {
            this.formVisible = !this.formVisible
        },
        updateLoanAmount() {
            if (this.modetype == 1) {
                this.paid_amount = this.totalloanamount;
            } else {
                this.paid_amount = parseFloat(this.totalloanamount) - parseFloat(this.filecharge);
            }
            console.log(this.paid_amount)

        },
        
    }
}
</script>
<style scoped>
.cancel-btn {
    padding: 5px 10px;
    background: red;
    color: #fff;
    border-radius: 5px;
    font-weight: 700;
}
</style>