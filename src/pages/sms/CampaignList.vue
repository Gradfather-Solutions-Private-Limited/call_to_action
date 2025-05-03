<template>
    <div class="container">
        <div class="col-md-12 mt-20">
            <div>
                <table class="table table-hover bg-white table-sm text-center" >
                    <thead>
                        <th>#</th>
                        <th >Campaign Name</th>
                        <th >Content</th>
                        <th>Created</th>
                        <th>Detail</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in campaignlist" :key="item.id">
                            <td>{{ index+1 }}</td>
                            <td >{{ item.campaign??'N/A' }}</td>
                            <td >
                                <div class="set_td">
                                    {{ JSON.parse(item.jsontext)?.longurl ?? JSON.parse(item.jsontext)?.templatename  }}
                                </div>
                            </td>
                            <td>{{ item.created_at!=null ? moment(item.created_at).format('DD/MM/YYYY'): 'N/A' }}</td>
                            <td>
                                <button class="action_btn"  @click="detail(item)">Details</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data() {
        return {
            campaignlist:[],
            moment: moment,
        }
    },
    computed: {

    },
    mounted() {
        this.$store.commit('assignaddpageheading', 'Campaign List')
        this.refresh()
    },
    methods: {
        refresh(){
            axios.post('api/campaign/fetch')
                .then((response)=>this.processCampaignResponse(response.data))
                .catch((error)=>console.log(error))
        },
        processCampaignResponse(data){
            this.campaignlist = data.campaign
        },
        detail(item){
            this.$router.push({path:'/message/campaign/detail/'+ item.id})
        }

    }
}
</script>
<style>
.set_td {
    white-space: nowrap; 
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis; 
}
</style>