<template>
<div>
    <div class="col-md-12 flex-between-row">
        <h3>Vendors List</h3>
        <div class="flex-row">
            <button class="btn btn-success" @click="addnew()">Add New</button>
        </div>
    </div>
    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Gst</th>
                        <th>Adhar</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <VendorListRow v-for="(item,index) in users" v-bind:key="item.id" :item="item" :index="index"></VendorListRow>
            </table>
        </div>
    </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'
import VendorListRow from './VendorListRow.vue';
export default {
    components: {
        VendorListRow
    },
    data(){
        return {
            users:[]
        }
    },
    computed:{
        ...mapGetters([
            'loggedinuser','viewno','edititem'
        ]),
    },
    mounted() {
        this.refresh()
    },
    methods:{
        refresh(){
            let param={is_dealer:1,isdisabled:0}
            axios.post('api/users/fetch',param)
    			.then(response=>this.processUserResponse(response.data))
    			.catch(error=>console.log(error));
            axios.post('api/users/fetch/count',param)
    			.then(response=>this.processCountResponse(response.data))
    			.catch(error=>console.log(error));
        },
      
        processUserResponse(data){
            this.users=data
            this.$store.commit('assignedititem',data)
            
        },
        addnew(){
            this.$router.push({name:'vendorform'})
            this.$store.commit("assignedititem",null)
        }
    }
        
}
</script>
