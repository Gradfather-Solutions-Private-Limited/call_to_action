<template>
    <div>
        <table style="width:80%" class="table-sm">
        <tr  v-for="(item) in operations" v-bind:key="item.id" style="float:left;background-color: antiquewhite;margin-left:5px;margin-right:5px;width:30%;" >
            <td><user-operation-checkbox :operationid="item.id" :type="type"></user-operation-checkbox>
                {{ item.operation }}({{ item.id }})
            </td>
        </tr>
            
        </table>
    </div>
    </template>
    <script>
    import { mapGetters } from 'vuex'
    
    import UserOperationCheckbox from './UserOperationCheckbox.vue'
// import Constants from './Constants.vue';
    export default {
        mixins:[Constants],
        components:{UserOperationCheckbox},
        props:['moduleid','type'],
        computed:{
            ...mapGetters([
                  'accessmodules','loggedinuser','accessoperations'
            ]),
            operations(){
                console.log(this.accessoperations)
                console.log(this.moduleid)
                console.log(this.accessoperations.filter(block=>block.moduleid==this.moduleid))
                return this.accessoperations.filter(block=>block.moduleid==this.moduleid)
            }
        },
        methods:{
            deleteoperation(item){
                this.$store.commit('assignloadingstatus',1)
                let param = {id:item.id}
                axios.post('api/access/modules/operation/delete',param)
                .then(response=>this.processResponse(response.data))
                .catch(error=>this.showError(error));
            },
            processResponse(data){
                this.$store.commit('assignloadingstatus',0)
                this.$store.commit('updateappendaccessmodules',data)
            },
            add(){
                let obj ={id:0,moduleid:this.moduleid,operation:''}
                this.$store.commit('assignedititem',obj)
                this.$router.push({name:'moduleoperation'})
            },
            showError(){
                this.$store.commit('assignloadingstatus',0)
                alert("Something went wrong, please try again")
            }
        }
    }
    </script>