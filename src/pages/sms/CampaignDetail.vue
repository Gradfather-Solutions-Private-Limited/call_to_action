<template>
    <div class="container">
        <div class="row mt-20">
            <div class="col-md-3">
                <div>
                    <select class="form-select"  v-model="stepid" @change="filterDetail()" >
                        <option v-for="step in flowstep" :key="step.id" :value="step.id"> {{ step.stepname }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <label class="form-control">No. of record : <span>{{ this.stepcount ?? 0 }}</span></label>
                
            </div>
        </div>
        <div class="col-md-12 mt-20">
            <div>
                <table class="table table-responsive text-center">
                    <thead>
                        <th>#</th>
                        <th>Mobile no.</th>
                        <th>Name</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in campaigndetail" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.individualflow?.mobileno }}</td>
                            <td>{{ item.individualflow?.mobilename }}</td>
                            <td>{{ getStatus(item) ??'' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            campaignid: 0,
            campaigndetail: [],
            flowstep:[],
            stepid:0,
            stepcount:0
        }
    },
    computed: {

    },
    mounted() {
        this.$store.commit('assignaddpageheading', 'Campaign Detail')
        this.campaignid = this.$route.params.campaignid
        if (this.campaignid > 0) {
            this.filterDetail()
        }
    },
    methods: {
        // fetchDetail(campaignid) {
        //     let param = { campaignid: campaignid }
        //     axios.post('api/campaign/detail/fetch', param)
        //         .then((response) => this.processDetailResponse(response.data))
        //         .catch((error) => console.log(error))
        // },
        // processDetailResponse(data) {
        //     this.campaigndetail = data.detail
        //     this.flowstep = data.flowstep
        //     this.stepcount = data.count
        // },
        filterDetail(){
            this.$store.commit('assignloadingstatus',1)
            let param = { campaignid:this.campaignid,flowstepid:this.stepid}
            axios.post('api/campaign/detail/filter',param)
                .then((response)=>this.processFilterResponse(response.data))
                .catch((error)=>console.log(error))
        },
        processFilterResponse(data){

            this.campaigndetail = data.detail
            this.flowstep = data.flowstep
            this.stepcount = data.count
            this.$store.commit('assignloadingstatus',0)

        },
        getStatus(item){
            let flowstep =  this.flowstep.find(o=>o.flowstepid==item?.flowstepid)
            
            return flowstep?.stepname ?? ''
            // let val = item?.inidividualflowstep
            // let lastflow = []
            // let laststep = []
            // if(this.stepid>0){
            //     val.forEach(element => {
            //         if(element.flowstepid==this.stepid ){
            //            lastflow = element.flowstepid
            //         }
            //     });
            // }
            // if(lastflow!=null){
            //     laststep = this.flowstep?.find(a=>a.id==lastflow)
            // }
            // return laststep?.stepname ??''
        }
    }
}
</script>
<style></style>