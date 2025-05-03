<template>
    <div>
        <div v-if="viewno==1">
        <div class="col-md-12">
            <div class="row" style="margin-top:20px">
                <div class="col-md-6">
                    <h3 class="page-header">
                    <i class="fa fa-user-md animated bounceInDown show-info"></i>
                    User Access
                    </h3>
                </div>
                <div class="col-md-6 ">
                <div class="row">
                    <div class="col-md-10" >
                        <div class="row" style="padding-top:18px;justify-content:flex-end;">
                           <div  class="col-md-2" style="margin-right:25px;">
                                <button @click="add()" class="btn btn-primary" ><i class="fa fa fa-user"></i>  Add New</button>  
                            </div>
                            <div  class="col-md-2" style="margin-right:25px;">             
                                <button @click="refresh()" class="btn btn-primary" ><i class="fa fa-refresh"></i>  Refresh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class=" memberdivtable_1">
            <div class="card-body" style="border:1px solid rgb(181 173 173);padding:0;margin-bottom:30px;background-color: #ebe5d2;">
                <div class="form-group mb-2 ">
                    <div class="co-md-12">
                        <div class="row" style="padding-left:40px;margin-top:8px;">
                            <div class="col-md-3 row"></div>
                            <div class="col-md-6 row">
                                <label><b>Select Employee&nbsp;</b></label>
                                 <select class=" form-cascade-control input-small" style="width:50%" v-model="employeeid" @change="selecteduserchanged()">
                                    <option v-for="(item) in employees" v-bind:key="item.id" :value="item.id">{{ item.name }}</option>
                                </select>
                            </div>
                            <button type="button" @click="searchName()" style="margin-top:0;margin-bottom:auto;" class="btn btn-success btn-sm btnsearch" > Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row" style="margin-top:20px">
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th style="text-align:center;width:30%;">Module</th>
                            <th style="text-align:center;">Operations</th>
                        </tr>
                    </thead>
                    <tr v-for="(item,index) in accessmodules2" v-bind:key="item.id">
                        <td style="text-align:center;">{{ index+1 }}</td>
                        <td style="text-align:center;">{{ item.module }}
                        </td>
                        <td><module-operations :moduleid="item.id" :appid="0"></module-operations></td>
                    </tr>
                </table>
            </div>
        </div> 
        </div>
        <module-form v-if="viewno==2"></module-form>
        <module-operation-form v-if="viewno==3"></module-operation-form>
    </div>
    </template>
    <script>
    import { mapGetters } from 'vuex'
    import Constants from '../components/access/Constants.vue'
    import ModuleForm from './ModuleForm.vue'
    import ModuleOperations from '../components/access/ModuleOperations.vue'
    import ModuleOperationForm from '../components/access/ModuleOperationForm.vue'
    import Pagination from 'v-pagination-3'
    import PoemRow from './poem/PoemRow.vue'
    export default {
      components: { ModuleForm,ModuleOperations, ModuleOperationForm,PoemRow,Pagination },
         mixins:[Constants],
         data(){
             return {
                employeeid:0
             }
         },
         computed:{
            ...mapGetters([
                  'accessmodules','viewno','loggedinuser','accessmodules2'
            ])
        },
        mounted(){
            this.refresh();
        },
        methods:{
            selecteduserchanged(){
                this.$store.commit('assignselecteduserid',this.employeeid)
            },
            refresh(){
                this.$store.dispatch('fetchemployees')
                let param={projectid:32}
                axios.post('api/access/modules/fetchbyprojectid')
                .then((response) => this.processNewAccessResponse(response.data))
                .catch((err) => {
                    console.log('', err)
                });
                
            },
            processNewAccessResponse(data){
                this.$store.commit('assignloadingstatus',0)
                this.$store.commit('assignaccessmodules2',data.modules)
                this.$store.commit('assignaccessoperations',data.operations)
            },
            add(){
                this.$store.commit('assignedititem',null)
                this.$store.commit('assignviewno',2)
            },
            editmodule(item){
                this.$store.commit('assignedititem',item)
                this.$store.commit('assignviewno',2)
            }
        }
    }
    </script>