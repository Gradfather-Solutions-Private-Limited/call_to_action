<template>
    <div>
        <div class="col-md-12" v-if="stage == 0">
            <div class="card mt-10">
                <div class="card-header">
                    <div class="row justify-content-between">
                        <div class="col-md-2">
                            <h4 class="card-title"> Users Search</h4>

                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-primary me-2" @click="change_stage(null,1)">New User</button>
                            <span @click="toggleForm" class="float-end" style="cursor: pointer;">
                                <i style="font-size: 20px;padding-top: 10px;" 
                                    :class="formVisible ? 'bx bx-minus' : 'bx bx-plus'"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-body" v-if="formVisible">
                    <div class="row">
                        <div class="col-md-3 mt-2">
                            <label class="small">Branch:</label>
                            <select class="form-control form-control-new" v-model="search.branch">
                                <option value="ALL">ALL</option>
                                <option value="Branch 1">Branch 1</option>
                                <option value="Branch 2">Branch 2</option>
                            </select>
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Associate:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.associate"
                                placeholder="Search associate code or name">
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Collection Center:</label>
                            <select class="form-control" v-model="search.collectionCenter">
                                <option value="">Select Center</option>
                                <option value="Center 1">Center 1</option>
                                <option value="Center 2">Center 2</option>
                            </select>
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Group:</label>
                            <select class="form-control" v-model="search.group">
                                <option value="">Select Group</option>
                                <option value="Group 1">Group 1</option>
                                <option value="Group 2">Group 2</option>
                            </select>
                        </div>
                   
                        <div class="col-md-3 mt-2">
                            <label class="small">Enrollment Date From:</label>
                            <input type="date" class="form-control form-control-new" v-model="search.enrollmentFrom">
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Enrollment Date To:</label>
                            <input type="date" class="form-control form-control-new" v-model="search.enrollmentTo">
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Customer First Name:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.firstName"
                                placeholder="Search First Name">
                        </div>
                        <!-- <div class="col-md-3">
                            <label class="small">Customer Middle Name:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.middleName"
                                placeholder="Search Middle Name">
                        </div> -->
                   
                        <div class="col-md-3 mt-2">
                            <label class="small">Customer Last Name:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.lastName"
                                placeholder="Search Last Name">
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Customer No:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.customerNo"
                                placeholder="Search Customer No">
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Mobile No:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.mobileNo"
                                placeholder="Search Mobile No">
                        </div>
                        <div class="col-md-3 mt-2">
                            <label class="small">Aadhaar No:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.aadhaarNo"
                                placeholder="Search Aadhaar No">
                        </div>
                    
                        <div class="col-md-3 mt-2">
                            <label class="small">PAN No:</label>
                            <input type="text" class="form-control form-control-new" v-model="search.panNo"
                                placeholder="Search Pan No">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-success me-2" @click="refresh">🔍 SEARCH</button>
                            <button class="btn btn-warning" @click="clearForm">CLEAR FORM</button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="card mt-10">
                <div class="col-md-12">

                    <div class="table-responsive">
                        <table class="table tablestyle">
                            <thead>
                                <tr>
                                <th>GROUP</th>
                                <th>CUSTOMER NO.</th>
                                <th>BRANCH</th>
                                <th>NAME</th>
                                <th>F/H NAME</th>
                                <th>SENIOR CTZ.</th>
                                <th>ENROLL DATE</th>
                                <th>AADHAR NO</th>
                                <th>PAN NO</th>
                                <th>KYC STATUS</th>
                                <th>MOBILE NO</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in users">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.customerNo ?? "N/A" }}</td>
                                    <td>{{ item.branch ?? "N/A" }}</td>
                                    <td>{{ item.name  ?? "N/A"}}</td>
                                    <td>
                                        <span v-if="item.userinfo !=null">{{ getJsonValue(item,'fatherName') }}</span>
                                        <span v-else>N/A</span>
                                    </td>
                                    <td>{{ item.seniorCitizenship ?? "N/A" }}</td>
                                    <td>
                                        <span v-if="item.created_at!=null">{{ moment(item.created_at).format('YYYY-MM-DD') }}</span>
                                        <span v-else>N/A</span>
                                    </td>
                                    <td>{{ item.adhar ?? "N/A" }}</td>
                                    <td>{{ item.pan ?? "N/A" }}</td>
                                    <td>{{ item.kycStatus ?? "N/A" }}</td>
                                    <td>
                                        <span v-if="item.mobiles.length > 0">{{ item.mobiles[0].mobile }} </span>
                                        <span v-else>N/A</span>
                                    </td>
                                    <td>{{ item.status ?? "N/A" }}</td>
                                    <!-- <td>{{ item.name }}</td>
                                    <td>{{ item.email }}</td>
                                    <td class="num_color">
                                        {{ item.mobile }}
                                    </td> -->
                                    <td>
                                        <button type="button" class="btn btn-outline-success btn-sm"
                                            @click="change_stage(item,2)">
                                            <i class='bx bx-right-indent'></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- <div class="flex-row justify-content-end">
                <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback"/>
            </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div v-if="stage == 1">
            <div class="card mt-2">
                    <div class="card-header d-flex justify-content-between">

                        <h3 class="card-title">User Details</h3>
                        <div >
                            <button type="button" class="btn btn-primary btn-sm" @click="stage = 0">Back</button>
                        </div>
                    </div>
            </div>
            <user-create-update v-if="stage == 1" @backtopage="showformfun2"  ></user-create-update>
        </div>
        

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import AccessMixin from "../components/access/AccessMixin.vue";
import UserCreateUpdate from './UserCreateUpdate.vue';
import UserSummary from './user/UserSummary.vue';
import moment from 'moment';
export default {
    mixins: [AccessMixin],
    components: { Pagination, UserCreateUpdate,UserSummary },
    data() {
        return {
            moment: moment,
            formVisible: false,
            users: [],
            mobile: '',
            totaluser: '',
            name: '',
            entrydate: '',
            select_lable: '',
            edituser: null,
            isEdit: false,
            stage:0,
            userdata:'',
            currentpage: 1,
            perPage: 50,
            fetchcolumns : 'id,name,email,firstname,lastname,adhar,pan,dob,created_at,gender,religion,m_status,payscale,iscustomer',
            search: {
                branch: "ALL",
                associate: "",
                collectionCenter: "",
                group: "",
                enrollmentFrom: "",
                enrollmentTo: "",
                firstName: "",
                // middleName: "",
                lastName: "",
                customerNo: "",
                mobileNo: "",
                aadhaarNo: "",
                panNo: "",
                iscustomer:1
            }
        }
    },
    computed: {
        ...mapGetters([

        ]),
        

    },
    mounted() {
        this.refresh();
    },
    methods: {
        clickCallback(currentPage) {
            this.currentpage = currentPage
            this.refresh();
        },
       
        refresh() {
            let param = {  noofrec: 50, currentpage: 1,iscustomer: 1,isregister:0,ischargeable: 0,
                searchcolumn: this.search,
                fetchcolumns: this.fetchcolumns,
				fetchtables: 'mobiles,addressess,userinfo,banks',
              };
            // axios.post("api/users/fetch", param)
            axios.post("api/finance/users/fetch", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        performSearch() {
            axios.post("api/finance/fetchuserinfo", this.search)
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => console.log(error));
        },
        processResponse(data) {
            this.users = data.userlist;
            // this.getalluserlog()
        },
        addEdit(item) {
            this.edituser = item;
            this.isEdit = true;
        },
        change_stage(item,n){
            if(n==1){
                this.stage = 1;
                return;
            }
            let id = 0;
            if(item != null){
                id = item?.id;
            }
            const routeData = this.$router?.resolve({ name: 'userdetails', params: { id: id } });
            window.open(routeData.href, '_blank');
        },

        getJsonValue(item,columnname) {
            let value =  JSON.parse(item.userinfo?.jsonobj)
            if(value?.hasOwnProperty(columnname)) 
                return value[columnname];
            else 
                return "N/A";
        },
        toggleForm() {
            this.formVisible = !this.formVisible;
        },
        showformfun() {
            this.showform = 0;
        },
        showformfun2(){
            this.stage = 0;
        }

    },
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>