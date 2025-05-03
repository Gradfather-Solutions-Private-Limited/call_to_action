<template>
    <div class="container">
        <div>
            <div class="m30px">
                <h4><span class="dealer_head">Commision</span></h4>
            </div>
            <div class="col-md-12 mb-10 row p-10"  >
                <div class="col-md-3">
                    <label class="dealer_label">Dealer</label><br>
                    <select class="form-control form-cascade-control dealer" v-model="dealerid">
                        <option v-for="item in dealer" :key="item.id" :value="item.id">{{ item.name }}({{ item.generatedid }})</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="dealer_label">Sub Dealer</label><br/>
                    <select class="form-control form-cascade-control dealer" v-model="subdealerid">
                        <option v-for="item in subdealer" :key="item.id" :value="item.id">{{ item.name }} ({{ item.generatedid }})</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="dealer_label">Percentage</label>
                    <input class="dealer" v-model="percent" type="number"/>
                </div>
                <div class="col-md-2">
                    <label class="dealer_label" style="font-size: 17px;">Referral Percentage</label>
                    <input class="dealer" v-model="referralpercent" type="number"/>
                </div>
                <div class="col-md-2">
                    <div style="margin-top: 30px;display: flex;justify-content: space-around;">
                        <button class="btn btn-primary" @click="submit()" >Submit</button>
                        <button class="btn btn-danger" @click="initialize()" >Cancel</button>
                    </div>
                   
                </div>
            </div>
            <div class="filter_div mb-30">
                <div>
                    <h5><span>Filters</span></h5>
                </div>
                <div class="col-md-12 row">
                    <div class="col-md-3">
                        <label class="dealer_label">Dealer</label><br>
                        <select class="form-control form-cascade-control dealer" v-model="dealers">
                            <option value="">---Select----</option>
                            <option v-for="item in dealer" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="dealer_label">Sub Dealer</label><br/>
                        <select class="form-control form-cascade-control dealer" v-model="subdealers">
                            <option value="">---Select----</option>
                            <option v-for="item in subdealer" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-3 flex-around-row">
                        <button class="btn btn-success mt-30" @click="refresh()">Search</button>
                        <button class="btn btn-danger mt-30" @click="initialize()">Cancel</button>
                        
                    </div>
                </div>
            </div>
            <div>
                <div >
                    <div class="flex-row justify-content-end">
                        <pagination v-model="currentPage" :records="details" :per-page="perPage" @paginate="clickCallback"/>
                    </div>
                    <table class="table table-bordered table-font" >
                        <thead>
                            <th>S. No.</th>
                            <th>Dealer</th>
                            <th>Sub-Dealer</th>
                            <th>Percentage</th>
                            <th>Referral Percentage</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in details" :key="item.id" :value="item.id" :style="changeisdisable(item.isdisable)">
                                <td>{{ index+1 }}</td>
                                <td>{{ item.dealer!=null?item.dealer.name:'' }} ({{ item.dealer.generatedid }})</td>
                                <td>{{ item.subdealer!=null?item.subdealer.name:'' }} ({{ item.subdealer.generatedid }})</td>
                                <td>{{ item.commissionpercent }}</td>
                                <td>{{ item.referralpercent }}</td>
                                <td><button class="btn btn-success" @click="edit(item)">Edit</button></td>
                                <td>
                                    <button v-if="item.isdisable==0" class="btn btn-danger" @click="disable(item,1)">
                                    <div > Enable</div>
                                    </button>
                                    <button v-else class="btn btn-danger" @click="disable(item,0)">
                                        <div >Disable</div>
                                    </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
// import axios from 'axios';
import axios from 'axios';
import { mapGetters } from 'vuex';
// import Constants from '../utilities/Constants.vue';

export default {
    components:{},
    data(){
        return {
            id:0,
            dealerid:0,
            subdealerid:0,
            percent:0,
            perPage:10,
            currentPage:1,
            referralpercent:0,
            details:[],
        }
    },
    computed:{
        ...mapGetters([
                'dealer','subdealer','edititem'
        ])
    },
    mounted() {
        this.refresh();
        this.$store.dispatch('fetchdealer');
        this.$store.dispatch('fetchsubdealer');
        
    },
    methods: {
        refresh(){
            
            let param = { dealerid: this.dealers,subdealerid: this.subdealers }
            axios.post('api/poem/fetch/dealer/details',param)
                    .then((response)=> this.proccessDetailResponse(response.data))
                    .catch((error)=>console.log(error))
        },
        changeisdisable(flag){
            if(flag == 1){
                return 'background:gray';
            }
        },
        proccessDetailResponse(data){
            this.details = data;
            // this.initialize();
        },
        submit(){
            if(this.dealerid!=0 && this.subdealerid!=0 ){
                if(this.referralpercent!=0 || this.percent!=0){
                    let param = { id: this.id,dealerid: this.dealerid, referralpercent: this.referralpercent,
                    subdealerid: this.subdealerid, percent: this.percent  }
                    axios.post('api/poem/dealer/percent',param)
                        .then((response)=> this.proccessResponse(response.data))
                        .catch((error)=>console.log(error))
                }else{
                    alert('Percentage, Referral Percentage must be a value of one of');
                }
               
            }
        },
        proccessResponse(data){
            // this.refresh();
            this.id= 0;
            this.dealerid= 0;
            this.subdealerid= 0;
            this.percent= 0;
            this.referralpercent= 0;
            this.initialize();
        },
        initialize(){
            if(this.dealers!=0 || this.subdealers!=0){
               this.dealers=0
               this.subdealers=0
            }else{
                this.dealerid=0
                this.subdealerid=0
                this.percent=''
                this.referralpercent=''
            }
            this.refresh(); 
        },
        clickCallback (currentPage) {
			this.currentpage=currentPage
      	},
        edit(item){
            this.$store.commit('assignedititem',item);
            this.id = this.edititem.id
            this.dealerid = this.edititem.userid
            this.subdealerid = this.edititem.subuserid
            this.percent = this.edititem.commissionpercent
            this.referralpercent=this.edititem.referralpercent
        },
        disable(item,isdisable){
            let param = { detailid: item.id,'isdisable':isdisable }
            axios.post('api/poem/row/disable',param)
                    .then((response)=> this.proccessDisableResponse(response.data))
                    .catch((error)=>console.log(error))
        },
        proccessDisableResponse(data){
            this.initialize();
        }

    }

}
</script>
