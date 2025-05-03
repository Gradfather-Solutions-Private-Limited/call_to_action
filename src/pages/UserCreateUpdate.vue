<template>
    <div class="container">
        <div class="card mt-10 pb-20">
            <div class="card-body">
                <div class="col-md-12 pb-10 ">
                    <div class="row justify-content-md-center">
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Email
                                <span class="text-danger">*</span>
                            </label>
                            <input type="email" class="form-control" placeholder="Email" v-model="form.email"
                                :class="{ 'is-invalid': msg?.email }" required>
                            <div class="focus-input100" v-if="msg?.email">{{ msg.email[0] }}</div>
                        </div>
                        <div class="col-md-4 pb-10">
                            <label class="form-label">Mobile
                                <span class="text-danger">*</span>
                            </label>
                            <input type="number" class="form-control" placeholder="Mobile Number" v-model="form.mobile"
                                @input="mobilenoValid()" :class="{ 'is-invalid': msg?.mobile }" required>
                            <div class="focus-input100" v-if="msg?.mobile">{{ msg.mobile[0] }}</div>
                        </div>
                    </div>
                    <div class="row justify-content-md-center"  v-if="this.userid == 0">
                        <div class="col-md-3 mt-3">
                            <button type="button" class="btn btn-primary" @click="postform()" :disabled="issubmitted">
                                <span class="button-icon">
                                    <i class='bx bx-save'></i>
                                </span>
                                Submit
                            </button>
                            <button type="button" class="btn btn-danger ml-10" @click="cancel()">
                                <span class="button-icon">
                                    <i class='bx bx-log-out-circle'></i>
                                </span>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="this.userid > 0">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" @click="changetab(1)" aria-current="page" href="#">Users info</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="changetab(2)" href="#">Address info</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="changetab(3)" href="#">Customer Document</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="changetab(4)" href="#">Co-Applicant</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="changetab(5)" href="#">Job Income</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="changetab(6)" href="#">Bank Details</a>
                    </li>
                </ul>
                <div v-if="showform == 1">
                      <user-info-form   @backtopage="showformfun2" :userid="this.userid" submitbtn="1" ref="userFormRef"></user-info-form>
                </div>
                <div v-if="showform == 2">
                    <div class="card">
                        <div class="card-body">
                            <address-form   @backtopage="showformfun2" submitbtn="1" :userid="this.userid" ref="addressFormRef"></address-form>
                        </div>
                    </div>
                </div>
                <div v-if="showform == 3">
                    <div class="card">
                        <div class="card-body">
                            <customer-document  @backtopage="showformfun2" submitbtn="1" :userid="this.userid"></customer-document>
                        </div>
                    </div>
                </div>
                <div v-if="showform == 4">
                    <div class="card">
                        <div class="card-body">
                            <co-applicant-form :userid="this.userid" :userformdata="userformdata"
                                @backtopage="showformfun2" submitbtn="1" ref="coApplicantFormRef"></co-applicant-form>
                        </div>
                    </div>
                </div>
                <div v-if="showform == 5">
                    <div class="card">
                        <div class="card-body">
                            <job-income-form :userid="this.userid" :userformdata="userformdata"
                                @backtopage="showformfun2" submitbtn="1" ref="coSignatoryFormRef"></job-income-form>
                        </div>
                    </div>
                </div>
                <div v-if="showform == 6">
                    <div class="card">
                        <div class="card-body">
                            <bank-details-form :userid="this.userid" :userformdata="userformdata"
                                @backtopage="showformfun2" submitbtn="1" ref="coSignatoryFormRef"></bank-details-form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import Constants from '../components/utilities/Constants.vue';
import UserInfoForm from '../components/user/UserInfoForm.vue'
import AddressForm from '../components/address/AddressForm.vue'
import CoApplicantForm from '../pages/user/CoApplicantForm.vue'
import CustomerDocument from '../components/user/CustomerDocument.vue'
import JobIncomeForm from '../pages/user/JobIncomeForm.vue'
import BankDetailsForm from '../pages/user/BankDetailsForm.vue'

export default {
    mixins: [Constants],
    components: {
        Pagination, UserInfoForm, AddressForm, CustomerDocument, CoApplicantForm,
        JobIncomeForm, BankDetailsForm
    },
    props: ['edituser'],
    data() {
        return {
            designation: '',
            form: new window.Form({
                id: 0,
                name: '',
                email: '',
                password: 123456,
                mobile: '',
                userrole: 0,
                iscustomer:1,

            }),
            newmobile: [],
            msg: {},
            userid: 0,
            showform: 1,
            issubmitted: true,
        }
    },
    computed: {
        ...mapGetters([
            'mastervalidation', 'mobiles'
        ]),
    },
    mounted() {
        this.initialize();
        // this.userid = 22942;
    },
    methods: {
        changetab(n) {
            this.showform = n;
            console.log(this.showform);
        },
        initialize() {
            if (this.edituser != null) {
                let editdate = this.edituser;
                Object.keys(this.form).forEach(key => {
                    if (key !== undefined && key != 'password') {
                        this.form[key] = editdate[key];
                        console.log(editdate[key]);
                        console.log(key);
                    }
                });
            }
        },
        mobilenoValid() {
            this.form.mobile = this.form.mobile.toString().replace(/\D/g, '');
            
            if (this.form.mobile.length >= 10) {
                this.issubmitted = false
                this.form.mobile = this.form.mobile.slice(0, 10)
                this.newmobile[0] = { id: 0, mobile: this.form.mobile }
                this.$store.commit('assignmobiles', this.newmobile)
                console.log(this.issubmitted)
            }else {
                this.issubmitted = true
                console.log("step0")

            }
            
        },
        validateForm() {
            this.msg = {}; // Reset messages
            let isValid = true;

            // Name validation
            // if (this.form.mobile != '' || this.form.mobile != null) {
            //     this.msg.mobile = ['Mobile is required'];
            //     isValid = false;
            // }
            // Email validation
            // if (!this.form.email) {
            //     this.msg.email = ['Email is required'];
            //     isValid = false;
            // } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
            //     this.msg.email = ['Email format is invalid'];
            //     isValid = false;
            // }
            return isValid;
        },
        saveAllRecord() {
            this.$refs.userFormRef.submitForm();

        },

        postform() {
            this.issubmitted = false
            // Perform validation before submission
            if (!this.validateForm()) {
                return; // If validation fails, stop further processing
            }
            this.form.mobiles = this.mobiles
            let form = this.form;
            axios.post('api/profile/createupdate', form)
                .then(response => {
                    this.userid = response.data.user.id
                    this.issubmitted = true
                })
                .catch(response => {
                    if (response.response.data.errors) {
                        this.msg = response.response.data.errors
                        return;
                    }
                });
        },
        showformfun2(n,m) {
            if(!m){
                if (confirm("Do you want to go to next step?")) {
                    this.showform = this.showform +1;
                } 
                if(this.showform == 7){
                    if (confirm("Do you want to go user page?")) {
                        window.location.href = '/users';
                    } 
                }
            }else{
                window.location.href = '/users';
            }
           // this.$emit('backtopage', 0);
        },

        cancel() {
            this.form = new Form();
            this.$parent.edituser = null;
            this.$parent.isEdit = false;
        }
    }
}
</script>

<style scoped>
.focus-input100 {
    color: red;
}
</style>
