<template>
    <div>
        <div class="col-md-12">
            <h4>Add Vendor </h4>
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-12 mt-10  display-flow-root">
                        <div class="col-md-6"><label for=""> Name</label></div>
                        <div class="col-md-6"><input type="text" class="form-control" v-model="name"></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label for=""> Email</label></div>
                        <div class="col-md-6"><input type="email" class="form-control" v-model="email"></div>
                    </div>
                    <div class="col-md-12 mt-10  display-flow-root">
                        <div class="col-md-6"><label for="">Mobile</label></div>
                       <Mobiles></Mobiles>
                    </div>
                    <div class="col-md-12 mt-10  display-flow-root">
                        <div class="col-md-6"><label for="">GST No.</label></div>
                        <div class="col-md-6"><input type="text" class="form-control" v-model="gst"></div>
                    </div>
                    <div class="col-md-12 mt-10  display-flow-root">
                        <div class="col-md-6"><label for="">Aadhar no</label></div>
                        <div class="col-md-6"><input type="text" class="form-control" v-model="adhar"></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label for=""> Pan no</label></div>
                        <div class="col-md-6"><input type="text" class="form-control" v-model="pan"></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label>House No.</label></div>
                        <div class="col-md-6"><input type="text"   class="form-control" v-model="houseno" ></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label>Address Lane</label></div>
                        <div class="col-md-6"><input type="text"  class="form-control" v-model="street" ></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label>City</label></div>
                        <div class="col-md-6"> <input type="text"  class="form-control" v-model="city"  required></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label>State</label></div>
                        <div class="col-md-6"> <select  class="form-control" v-model="state" required>
                            <option v-for="(item) in getmastertype(MASTER_STATES)" :value="item.labelid" v-bind:key="item.labelid">{{ item.label }}</option>
                        </select></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label>Country</label></div>
                        <div class="col-md-6"><select  class="form-control" v-model="country" >
                            <option value="India">India</option>
                        </select></div>
                    </div>
                    <div class="col-md-12 mt-20 display-flow-root">
                        <div class="col-md-6"><label>Zip Code</label></div>
                        <div class="col-md-6"><input type="text"  class="form-control" v-model="zipcode" ></div>
                    </div>
                </div>
                
            </div>
            
            <div class="col-md-8 mt-30 text-center flex-around-row" style="wrap:no-wrap">
                <button v-if="!issave" class="btn btn-success submit-btn" @click="submit()">Save</button>
                <q-spinner-hourglass color="blue" v-if="issave" size="3em"/>
                <button class="btn btn-danger cancel-btn" @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Mobiles from '../mobile/Mobiles.vue'
// import AddressForm from '../../components/address/AddressForm.vue'
import Constants from '../../components/utilities/Constants.vue';
export default {
    mixins:[Constants],
    data() {
        return {
            id:0,
            name:'',
            email:'', 
            gst:'',
            adhar:'',
            pan:'',
            issave: false,
            is_dealer:1,
            addressid:0,
            addressess:{},
            zipcode:'',
			street:'',
			locality:'',
			state:'',
            city:'',
			country:'',
            houseno:''
        };
    },
    computed: {
        ...mapGetters(['edititem','mobiles','selectedaddress'])
    },
    mounted() {
        this.initialize();
    },
    methods: {
        initialize(){
            if (this.edititem!=null){
                console.log("Setting the edit item")
                this.id=this.edititem.id
                this.name = this.edititem.name;
                this.email= this.edititem.email;
                this.mobile= this.edititem.mobiles;
                this.gst= this.edititem.gst;
                this.adhar= this.edititem.adhar;
                this.pan= this.edititem.pan;
                this.is_dealer=1
                this.zipcode=this.edititem.addressess[0].zipcode
                this.street=this.edititem.addressess[0].street
                this.locality=this.edititem.addressess[0].locality
                this.state=this.edititem.addressess[0].idstate
                this.city=this.edititem.addressess[0].city
                this.addressid=this.edititem.addressess[0].id
                this.country=this.edititem.addressess[0].country
                this.houseno=this.edititem.addressess[0].houseno
                this.$store.commit('assignmobiles',this.edititem.mobiles==null?[]:this.edititem.mobiles)
            } else {
                this.id=0,
                this.name='',
                this.email='', 
                this.gst='',
                this.adhar='',
                this.pan='',
                this.is_dealer=1
                this.zipcode=''
                this.street=''
                this.locality=''
                this.state=''
                this.city=''
                this.id=''
                this.country='',
                this.houseno=''
                this.$store.commit('assignmobiles',[])
            }
        },
        submit(){
            if(this.adhar==null ||  this.adhar==''){
                this.adhar=0;
            }
            this.addressess=[{id:this.addressid,zipcode:this.zipcode,street:this.street,locality:this.locality,
                    country:this.country,houseno:this.houseno,
                    state:this.state,city:this.city}]
            let param={
                id:this.id,
                name:this.name,
                email:this.email, 
                gst:this.gst,
                adhar:this.adhar,
                pan:this.pan,
                is_dealer:1,
                mobiles:this.mobiles,
                addressess:this.addressess
            }
            axios.post('api/profile/createupdate',param)
            .then(response=>this.processDetailResponse(response.data))
            .catch(error=>console.log(error));
        },  
        processDetailResponse(data){
            // this.$store.commit("appendupdatecustomer",data.user)
            this.initialize();
            this.$store.commit('assignmobiles',[])
            this.$store.commit('assignaddressess',[])
            this.$store.commit('assignselectedaddress',null)

        },
        cancel() {
            this.$router.push({ path: "/vendorlist" });
        }
    },
    components: { Mobiles }
}
</script>
<style scoped>
.save-btn{
    width: 30%;
    font-size: 15px;
}
</style>