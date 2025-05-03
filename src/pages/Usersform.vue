<template>
    <div class="container">
        <div class="card mt-10">
            <div class="card-header">
                <h4 class="card-title"> Users Form</h4>
            </div>
            <div class="card-body">
                <div class="col-md-12 pb-10 ">

                    <!-- <div class="col-md-6 bdr"> -->
                    <div class="row">
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control  " placeholder="Name" v-model="form.name" required>
                            <div class="focus-input100" v-if="msg?.name">{{ msg.name }}</div>
                        </div>
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control  " placeholder="Email" v-model="form.email" required>
                            <div class="focus-input100" v-if="msg?.email">{{ msg.email[0] }}</div>
                        </div>
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Mobile</label>
                            <input type="number" class="form-control  " placeholder="Mobile Number" v-model="form.mobile" required>
                            <div class="focus-input100" v-if="msg?.username">{{ msg.mobile[0] }}</div>
                        </div>
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Password</label>
                            <input type="text" class="form-control" placeholder="password" v-model="form.password" readonly
                                required>
                            <div class="focus-input100" v-if="msg?.password">{{ msg.password[0] }}</div>
                        </div>
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Role</label>
                            <select class="form-control  " placeholder="Role" v-model="form.userrole" >
                                <option value="0">Select Role</option>
                                <option value="1">Admin</option>
                                <option value="2">Employee</option>
                            </select>
                            <div class="focus-input100" v-if="msg?.role">{{ msg.role }}</div>
                        </div>

                    </div>
                   
                    <div class="col-md-12 pb-10">
                        <!-- <id-proof></id-proof> -->
                    </div>
                    <div class="col-md-12 pb-10">
                        <button type="button" class="btn btn-primary" @click="postform()">Submit</button>
                        <router-link to="/users" >
                            <button type="button" class="btn btn-danger ml-10">Cancel</button>
                        </router-link>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import PoemRow from './poem/PoemRow.vue';
import IdProof from '../components/idproof/IdProof.vue'
export default {
    components: { PoemRow, Pagination,IdProof },
    data() {
        return {
            designation:'',
            form: new window.Form({
                id:0,
                name: '',
                username: '',
                password: 123456,
                userrole:0,
                is_dealer: 0,
                isemployee: 0,
                issubdealer:0,
                iscustomer:1
            })
        }
    },
    computed:{
        ...mapGetters([
		      'uploadedimage','edititem','idproofs','uploadids','mastervalidation'
		]),
        msg(){
            let validationlist =  this.$store.state.mastervalidation;
            return validationlist;
        }
        
    },
    refresh() {
            
    },
    mounted() {
        this.$store.dispatch("fetchmaster")
        let userid = this.$route.query.userid
        if (userid) {
            let param = { userid: userid }
            axios.post("api/user/fetchuserbyid", param)
                .then(response => this.setValuesOfuser(response.data))
                .catch(error => console.log(error));
        }
        // this.refresh();
    },
    methods: {
        setValuesOfuser(data) {
            this.form.name = data.user.name
            this.form.id = data.user.id
            this.form.username = data.user.username
            if(data.user.is_dealer == 1){
                this.designation= 1;
            }
            if(data.user.isemployee == 1){
                this.designation = 2;
            }
            if(data.user.issubdealer == 1){
                this.designation = 3;
            }
        },
        clickCallback(currentPage) {
            this.currentpage = currentPage
            this.refresh();
        },
        postform(){
            let form = this.form; 
            if(this.uploadids.length>0){
                form['idproofs']  = this.uploadids;
            }
            axios.post('api/profile/createupdate', form)
            .then(response => {
                    console.log(response.data.errors);
                    if(response.data.errors){
                        this.$store.commit('storemastervalidation', response.data.error);
                        return;
                    }
                    this.$router.go(-1)
                    
            })
            .catch(response => {
                if(response.response.data.errors){
                        this.$store.commit('storemastervalidation',response.response.data.errors);
                        return;
                }
            });
            
        },
        submitform() {
            let form = this.form; 
            if(this.uploadids.length>0){
                form['idproofs']  = this.uploadids;
            }
            var validationlist = ['name','username','password','isemployee'];
            this.checkvalidation(validationlist,this.form);
            
        },
        checkvalidation(validator,inputvalues){
            let secondarray = {};
            validator.map(function(value) {
                if(inputvalues[value] == ''){
                    secondarray[value] = 'The ' + value + ' field is required'; 
                }
            });
            this.$store.commit('storemastervalidation', secondarray);
        }
    },
}
</script>
<style scoped>
.focus-input100{
    color: red;
}
</style>