<template>
    <div style="background-color:white">
      <div class="info-box  bg-seagreen  text-white">
              <div class="info-icon bg-danger-dark">
                <i class="fa fa fa-user fa-2x"></i>
              </div>
              <div class="info-details">
                <h4>Add Operation</h4>
              </div>
            </div>
              
        <form class="col-md-12" @submit.prevent="onSubmit" @keydown="keydownform($event)">
            
                
          <div class="panel panel-cascade">
              <div class="panel-body" >
                    <div class="form-horizontal cascde-forms">
                        <div class="form-group row CHK" >
                                <label class=" col-lg-4 col-md-3 control-label">
                                Operation<span style="color: rgba(255, 0, 0, 0.67)">*</span>
                                </label>
                                <div class="col-lg-6 col-md-9">
                                     <input class="form-control form-cascade-control input-small"  v-model="form.operation" data-val="true" data-val-required="Required" id="NAME" name="NAME" type="text" required>
                                </div>
                        </div>
                        
                    </div>
                </div>
          </div>
                 <div class="col-md-12">   
                    <div class="row" style="text-align:center;">
                        <input type="button" style="background-color:#495b79!important;margin-top:23px;margin-left:35px;" value="Submit" @click="submit()" class="btn bg-primary text-white btn-lg chkcondition">
                        <input type="button" style="background-color:#495b79!important;margin-top:23px;margin-left:35px;" value="Cancel" @click="cancel()" class="btn bg-primary text-white btn-lg chkcondition">
                    </div>
                  </div>
             </form>
    </div>
    </template>
    <script>
    import { mapGetters } from 'vuex'
    import Constants from '../../components/utilities/Constants.vue'
    export default {
        mixins:[Constants],
        
        data(){
            return {
                form: new window.Form({
                id:0,
                moduleid:0,
                operation:''
            }),
            }
        },
         computed:{
           ...mapGetters([
                 'viewno','edititem',
                ]),
        },
        mounted(){
              this.initializedata();
        },
        watch:{
            edititem:function(){ 
              this.initializedata();
            }
        },
        methods:{
            initializedata(){
                if (this.edititem!=null){
                    console.log("edititem")
                    this.form.id=this.edititem.id;
                    this.form.moduleid=this.edititem.moduleid;
                    this.form.operation=this.edititem.operation;
                }
            },
            keydownform(event){
                this.form.errors.clear(event.target.name);
                this.errormessage = '';
            },
            submit(){
                
                this.form.submit(this,'post','api/access/modules/operation/createupdate')
                .then(response=>this.processResponse(response))
                .catch(error=> {
                    console.log(error)
                });
            },
            processResponse(data){
                this.$store.commit('updateappendaccessmodules',data)
                this.$store.commit('assignviewno',1)
            }, 
            cancel(){
                this.reset();
                this.$store.commit('assignviewno',1)
            },
            
        }
    }
    </script>