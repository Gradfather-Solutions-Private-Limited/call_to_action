<template>
    <input type="checkbox" :checked="getuseraccess" @change="updatecheckbox($event)">
    </template>
    <script>
    import { mapGetters } from 'vuex'
    export default {
        props:['operationid','type'],
        computed:{
            ...mapGetters([
                  'selecteduserid','employees','company','loggedinuser'
            ]),
            getuseraccess(){
                let found = 'undefined'
                
                if(this.type==1){
                    found = this.company.find(block=>block.id==this.selecteduserid)
                    if(typeof found=='undefined'){
                        found = this.employees.find(block=>block.id==this.selecteduserid)
                    }
                } else {
                    found = this.employees.find(block=>block.id==this.selecteduserid)
                }
                if(typeof found!=='undefined'){
    
                    if(found.accessids!=null){
                        let intarray = found.accessids.split(',').map( Number );
                        if(intarray.indexOf(this.operationid) > -1 ) {
                            return true
                        }
                    }
                }else {
                    return false
                }
            }
        },
        methods:{
            updatecheckbox(event){
                console.log("Checked/Unchecked")
                this.$store.commit('assignloadingstatus',1)
                let found = 'undefined'
                found = this.employees.find(block=>block.id==this.selecteduserid)
                let newarray = [];
                if(typeof found!=='undefined'){
                    if(event.target.checked){
                        if(found.accessids!=null){
                            newarray = found.accessids.split(',')
                        }
                        newarray.push(this.operationid)
    
                    } else {
                        if(found.accessids!=null){
                            newarray = found.accessids.split(',')
                        }
                        let index = newarray.indexOf(this.operationid.toString());
                        while(index>-1){
                            if (index > -1) {
                                newarray.splice(index, 1);
                                index = newarray.indexOf(this.operationid.toString());
                            }
                            
                        }
                    }
                    this.$store.commit('updateemployeeaccessids',newarray.join())
                    
                    let param = {id:this.selecteduserid,accessids:newarray.join()}
                    axios.post('api/user/updateaccessids',param)
                    .then(response=>this.processResponse(newarray.join()))
                    .catch(error=>this.showError(error));
                    
                }
            },
            processResponse(accessids){
               this.$store.commit('assignloadingstatus',0)
            },
            showError(){
                this.$store.commit('assignloadingstatus',0)
                alert("Something went wrong, please try again")
            }
        }
           
    }
    </script>