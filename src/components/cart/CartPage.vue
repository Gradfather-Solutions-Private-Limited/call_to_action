<template>
    <div class="col-md-12">
        <div class="col-md-12 row ">
            <div class="col-md-4 mt-10">
                <label class="col-form-label text-md-right">Customer</label>
                <UserAutocomplete
                    boxname="customer"
                />
                <input type="hidden" v-model="customer">
                <div class="focus-input100 text-danger" v-if="msg?.customerid">{{ msg.customerid }}</div>
            </div>
            <div class="col-md-4 mt-10">
                <label class="col-form-label text-md-right">Loan Amount </label>
                <input type="number" class="form-control" v-model="sp" @input="setValue($event)" 
                        
                />
                <div class="focus-input100 text-danger" v-if="msg?.amountwithtax">{{ msg.amountwithtax }}</div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Constants from '../../components/access/Constants.vue';
import UserAutocomplete from '../../components/autocomplete/UserAutocomplete.vue';
import moment from'moment';
export default {
    mixins: [Constants],
    components: {UserAutocomplete},
    data() {
        return {
            product: null,
            sp: 0,
            moment:moment,
            customer:'',
        }
    },
    mounted() {
        this.$store.dispatch('fetchallproducts')
        this.$store.dispatch('fetchallcustomers')
    },
    computed: {
        ...mapGetters(['productlist', 'customerlist','mastervalidation']),
        msg(){
            let validationlist =  this.mastervalidation;
            return validationlist;
        },
    },
    watch: {
        customer(newVal) {
            this.selectuser(newVal);
        },
        
    },
    methods: {
        productclicked() {
            // console.log(this.product);
            let item = this.product
            this.$store.commit('addcartitem', item);
        },
        selectuser() {
            let item = this.customer
            console.log(item);
            this.$store.commit('assignselectedcustomer', item);
            if (item.addressess != null) {
                let address = item.addressess.find(block => block.addresstype == 1)
                this.$store.commit('assigncompleteaddress', item.addressess[0])
                if (typeof address != 'undefined') {
                    this.$store.commit('assignselectedcustomeraddressid', address.id);
                } else {
                    address = item.addressess[0];
                    if (typeof address != 'undefined')
                        this.$store.commit('assignselectedcustomeraddressid', address.id);
                }
            }
            this.findapplicabletaxes();
        },
        setValue(event){
            let value = event.target.value;
            if(value=='' || value==null){
                this.sp = 0;
                this.$store.commit('assigntotalnetprice', 0)
            } else if(isNaN(value)){
                this.sp = 0;
                this.$store.commit('assigntotalnetprice', 0)
            } else{
                this.sp = parseFloat(value);
                this.$store.commit('assigntotalnetprice', parseFloat(value))
            }
        }
       
    }

}
</script>
<style></style>