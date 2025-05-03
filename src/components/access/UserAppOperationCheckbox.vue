<template>
    <input type="checkbox" :checked="getuseraccess" @change="updatecheckbox($event)">
    </template>
    <script>
    import axios from 'axios';
import { mapGetters } from 'vuex'
    export default {
        props:['operationid'],
        computed:{
            ...mapGetters([
                  'selecteduserid','selectedadvisor'
            ]),
            getuseraccess(){
                let found = this.selectedadvisor
                //console.log("UserAccess")
               // console.log(found)
                if(typeof found!=='undefined'){
                    //console.log("stage1")
                    if(found.accessids!=null){
                        let intarray = found.accessids.split(',').map( Number );
                        if(intarray.indexOf(this.operationid) > -1 ) {
                            return true
                        }
                    }
                }
                return false
            }
        },
        methods:{
            updatecheckbox(event){
                let found = this.selectedadvisor
                let newarray = [];
                
                if(typeof found!=='undefined'){
                    if(event.target.checked){
                        //add the access
                        
                        if(found.accessids!=null){
                            newarray = found.accessids.split(',')
                        }
                        newarray.push(this.operationid)
    
                    } else {
                        //remove the accesss
                        if(found.accessids!=null){
                            newarray = found.accessids.split(',')
                        }
                        //console.log(this.operationid)
                        let index = newarray.indexOf(this.operationid.toString());
                        //console.log("Stage1")
                        if (index > -1) {
                            //console.log("Stage2")
                            newarray.splice(index, 1);
                        }
                    }
                    //update the server
                    let param = {id:this.selecteduserid,accessids:newarray.join()}
                    axios.post('api/user/updateaccessids',param)
                        .then(response=>this.processResponse(response.data))
                        .catch(error=>console.log(error));
                }
            },
            processResponse(data){
                // this.$store.dispatch('fetchselectedadvisor')
    
                // this.$store.commit('assignselectedadvisor',)
                console.log(data)
            }
        }
    }
    </script>