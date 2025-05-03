<template>
    <div style="background-color:white;">
        <div>
        <div class="col-md-12">
            <div class="col-md-6">
                <h3 class="page-header">
                    <i class="bx bxs-face-mask animated bounceInDown show-info"></i>
                    Master Access Company
                </h3>
            </div>
            <div class="col-md-6" style="float:right">
                <div class="row" style="padding-top:18px">
                    <div class="col-md-2" style="margin-right:25px;">
                        <button @click="add()" class="btn btn-primary" ><i class="fa fa fa-user"></i>  Add New</button>  
                    </div>
                    <div  class="col-md-2" style="margin-right:25px;">             
                        <button @click="refresh()" class="btn btn-primary" ><i class="fa fa-refresh"></i>  Refresh</button>
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
                                <label><b>Select Company &nbsp;</b></label>
                                 <select class=" form-cascade-control input-small" style="width:50%" v-model="employeeid" @change="selecteduserchanged()">
                                    <option v-for="(item) in company" v-bind:key="item.id" :value="item.id">{{ item.name }}</option>
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
                            <th>#</th>
                            <th style="text-align:center;width:30%;">Module</th>
                            <th style="text-align:center;">Operations</th>
                        </tr>
                    </thead>
                    <tr v-for="(item,index) in accessmodules" v-bind:key="item.id">
                        <td>{{ index+1 }}</td>
                        <td style="text-align:center;">{{ item.module }}{{ item.id }}
                            <div><button type="button" class="badge1 btn-view" @click="editmodule(item)"><i class="fa fa-pencil-square-o"></i>  Edit</button></div>
                        </td>
                        <td><module-operations :moduleid="item.id" :type="1"></module-operations></td>
                    </tr>
                </table>
            </div>
        </div> 
        </div>
        <module-operation-form v-if="viewno==3"></module-operation-form>
    </div>
    </template>
    <script>
    import { mapGetters } from 'vuex'
    import Constants from '../../components/utilities/Constants.vue'
    import ModuleOperations from '../../components/access/ModuleOperations.vue'
    import ModuleOperationForm from '../../components/access/ModuleOperationForm.vue'
    export default {
      components: { ModuleOperations, ModuleOperationForm },
         mixins:[Constants],
         data(){
             return {
                employeeid:0
             }
         },
         computed:{
            ...mapGetters([
                  'accessmodules','viewno','loggedinuser','company'
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
                this.$store.commit('assignloadingstatus',1)
                this.$store.dispatch('fetchcompany')
                let param={projectid:2}
                axios.post('api/access/modules/fetch',param)
                .then((response) => this.processResponse(response.data))
                .catch((err) => {
                    console.log('', err)
                });
            },
            processResponse(data){
                this.$store.commit('assignloadingstatus',0)
                this.$store.commit('assignaccessmodules',data)
            },
            add(){
                this.$store.commit('assignedititem',null)
                this.$router.push({name:'moduleform'})
            },
            editmodule(item){
                this.$store.commit('assignedititem',item)
                this.$router.push({name:'moduleform'})
            }
        }
    }
    </script>