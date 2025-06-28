<template>
    <div>
        <div  v-if="viewno == 1">
            <div>
                <div class="col-md-12">
                    <div class="row" style="margin-top:20px">
                        <div class="col-md-8">
                            <h3 class="page-header"> Manage Access </h3>
                        </div>
                        <div class="col-md-4 text-end" v-if="loggedinuser?.role==3">
                            <button @click="add()" class="btn btn-primary btn-sm"><i class="fa fa fa-user"></i> Add
                                New</button>
                            <button @click="refresh()" class="btn btn-secondary btn-sm ml-10">
                                Refresh</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card ">
                <div class="card-body">
                    <div class="col-md-12 d-flex justify-content-center">
                        <div class="col-md-4">
                            <select class="form-control" v-model="employeeid" @change="selecteduserchanged()">
                                <option :value="0" >Select Employee</option>
                                <option v-for="(item, index) in employees" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-10">
                <div class=" card-body">
                    <div class="col-md-12">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th style="width: 10%;">#</th>
                                    <th style="text-align:center;width:20%;">Module</th>
                                    <th style="text-align:center;">Operations</th>
                                </tr>
                            </thead>
                            <tr v-for="(item, index) in accessmodules" v-bind:key="item.id">
                                <td style="width: 10%;">{{ index + 1 }}</td>
                                <td style="text-align:center;width: 20%;">{{ item.module }}
                                    <div v-if="loggedinuser?.role==3"><button type="button" class="edit-btn" @click="editmodule(item)"><i
                                                class="fa fa-pencil-square-o"></i> Edit</button></div>
                                </td>
                                <td><module-operations :moduleid="item.id" :appid="0"></module-operations></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <module-form v-if="viewno == 2" ></module-form>
        <module-operation-form v-if="viewno == 3"></module-operation-form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ModuleForm from './ModuleForm.vue'
import ModuleOperations from './ModuleOperations.vue'
import ModuleOperationForm from './ModuleOperationForm.vue'
import Constants from '../../components/utilities/Constants.vue'
import axios from 'axios'
export default {
    components: {
        ModuleForm, ModuleOperations,ModuleOperationForm
    },
     mixins:[Constants],
    data() {
        return {
            employeeid: 0,
            projectid: 5
        }
    },
    computed: {
        ...mapGetters([
            'accessmodules', 'viewno', 'loggedinuser','employees'
        ])
    },
    mounted() {
        this.getEmployee()
        this.refresh();
    },
    methods: {
        selecteduserchanged() {
            this.$store.commit('assignselecteduserid', this.employeeid)
        },
        getEmployee(){
             let payload = {fetchcolumns: 'id,name,email,username,mobile' }
            this.getEmployeeList(payload)
        },
        async refresh() {
            // this.$store.dispatch('fetchemployees')
           
            let param = { projectid: this.projectid }
            await axios.post('api/access/modules/fetch', param)
                .then((response) => this.processResponse(response.data))
                .catch((err) => {
                    console.log('', err)
                });
        },
        processResponse(data) {

            this.$store.commit('assignaccessmodules', data)
        },
        add() {
            this.$store.commit('assignedititem', null)
            this.$store.commit('assignviewno', 2)
        },
        editmodule(item) {
            this.$store.commit('assignedititem', item)
            this.$store.commit('assignviewno', 2)
        }
    }
}
</script>
<style scoped>
.edit-btn {
    padding: 0px 6px;
    border: 1px solid green;
    background: #bfffbf;
    color: green;
    /* border-radius: 5px; */
    font-size: 11px;
}
</style>