<template>
    <div class="container mt-2">
        <hr>
        <div>
            <h4 class="text-center">Customer's Correspondence Address</h4>
        </div>
        <form>
            <div class="row">
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Address Line 1 </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter Address Line" v-model="add1.street">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Landmark </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter Landmark" v-model="add1.landmark">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">City / District </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter City / District" v-model="add1.city">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">State </label>
                    </div>
                    <div class="col-md-7">
                        <select class="form-control" required v-model="add1.state">
                            <option :value="0">Select</option>
                            <option v-for="(item) in getmastertype(MASTER_STATES)" :value="item.labelid" v-bind:key="item.labelid">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Pincode </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter Pincode" v-model="add1.zipcode">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Country </label>
                    </div>
                    <div class="col-md-7">
                        <select class="form-control" disabled v-model="add1.country">
                            <option value="India" selected>India</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
        
        <hr>
        <div class="form-check text-center">
            <input type="checkbox" class="form-check-input" id="sameAddress" v-model="sameAddress">
            <label class="form-check-label" for="sameAddress">Same as Correspondence Address</label>
        </div>
        
        <hr>
        <div>
            <h4 class="text-center">Customer's Permanent Address</h4>
        </div>
        <form>
            <div class="row">
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Address Line 1 </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter Address Line" v-model="add2.street" :disabled="sameAddress">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">City / District </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter City / District" v-model="add2.city" :disabled="sameAddress">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">State </label>
                    </div>
                    <div class="col-md-7">
                        <select class="form-control" required v-model="add2.state" :disabled="sameAddress">
                            <option :value="0">Select</option>
                            <option v-for="(item) in getmastertype(MASTER_STATES)" :value="item.labelid" v-bind:key="item.labelid">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Pincode </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" class="form-control" placeholder="Enter Pincode" v-model="add2.zipcode" :disabled="sameAddress">
                    </div>
                </div>
                <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Country </label>
                    </div>
                    <div class="col-md-7">
                        <select class="form-control" disabled v-model="add2.country">
                            <option value="India" selected>India</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
        
        <div class="col-md-12" v-if="submitbtn == 1">
            <div class="d-flex gap-2 justify-content-center py-5">
                <button @click="submitForm()" class="btn btn-primary">Submit</button>
                <button @click="$emit('backtopage', 0, 1)" class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Constants from '../utilities/Constants.vue'
export default {
    mixins: [Constants],
    props: ['userid','submitbtn','userformdata'],
   
    mounted() {
        this.$store.dispatch("fetchmaster")
        // this.initialize();
        // console.log("HEllo")
    },
    data() {
        return {
            add1: {
                id:0,
                street: '',
                landmark: '',
                city: '',
                state: 0,
                zipcode: '',
                country: 'India',
                addresstype: 1,
            },
            add2: {
                id:0,
                street: '',
                city: '',
                state: 0,
                zipcode: '',
                country: 'India',
                addresstype: 2,
            },
            sameAddress: false,
            submitbtn: 1,
        }
    },
    watch: {
        sameAddress(newValue) {
            if (newValue) {
                this.add2 = {
                    ...this.add1,
                    id: this.add2.id, // Preserve the ID
                    addresstype: this.add2.addresstype, // Preserve Address Type
                };
            } else {
                this.add2 = {
                    id: this.add2.id,
                    street: '',
                    city: '',
                    state: 0,
                    zipcode: '',
                    country: 'India',
                    addresstype: this.add2.addresstype,
                };
            }
        }
    },
    computed: {

        ...mapGetters([

        ]),
    },
    mounted(){
        
        if(this.userformdata && this.userformdata.addressess.length>0){
            this.add1 = this.userformdata.addressess[0]
            this.add2 = this.userformdata.addressess[1]
        }
    },
    methods: {
        
        async onSubmit1() {
            let param = {street : this.add1.street,landmark: this.add1.landmark,
                    city: this.add1.city, state: this.add1.state,zipcode: this.add1.zipcode, 
                    country: this.add1.country,addresstype:this.add1.addresstype,
                    userid: this.userid,id:this.add1.id}
            await axios.post('api/address/createupdate', param)
                .then(response =>{
                    this.$store.dispatch("triggerNotification", {
                    message: "Data saved successfully!",
                        type: "success",
                    });
                    this.cancel1()
                })
                .catch(error => console.log(error));
        },
        async onSubmit2() {
            let param = {street : this.add2.street, city: this.add2.city, 
                    state: this.add2.state,zipcode: this.add2.zipcode, 
                    country: this.add2.country,addresstype:  this.add2.addresstype,
                    userid: this.userid,id:this.add2.id}
            await axios.post('api/address/createupdate', param)
                .then(response =>{
                    this.$store.dispatch("triggerNotification", {
                        message: "Data saved successfully!",
                        type: "success",
                    });
                    this.cancel2()
                })
                .catch(error => console.log(error));
        },
        submitForm(){
            Promise.all([this.onSubmit1(), this.onSubmit2()])
            .then(() => {
                this.$emit('backtopage', 0);
            })
            .catch(error => {
                console.error("Error in submission:", error);
            });
        },
        cancel1(){
            this.add1 = {
                street: '',
                landmark: '',
                city: '',
                state: 0,
                zipcode: '',
                country: 'India',
                addresstype: 1,
            }
        },
        cancel2(){
            this.add2 = {
                street: '',
                city: '',
                state: 0,
                zipcode: '',
                country: 'India',
                addresstype: 2,
            }
        }
    }
}
</script>
<style scoped>
label {
    margin: 0px;
}
</style>