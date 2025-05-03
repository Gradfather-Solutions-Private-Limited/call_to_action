<template>
    <div class="">
        <div>


            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">All ENach Request</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <!-- Add Filter here -->
            </div>
            <div>
                <div class="col-md-12 m-top-10 boxshow">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Lan No.</th>
                                    <th>A/c Holder</th>
                                    <th>Mobile no.</th>
                                    <th>Bank</th>
                                    <th>Account no.</th>
                                    <th>Status</th>
                                    <th>Check Status</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in allenach" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.loanaccount.generatedid }}</td>
                                    <td>{{ item.accountHolderName }}</td>
                                    <td>{{ item.customerMobile }}</td>
                                    <td>{{ this.BANKS.find(o=>o.instructedAgentCode == item.optional)?.bankName }}</td>
                                    <td>{{ item.accountNumber }}</td>
                                    <td>
                                        {{ item.status ?? 'N/A' }}
                                        
                                    </td>
                                    <td>
                                        <div v-if="item.status=='Pending' || item.status==null">
                                            <button class="btn-sm btn btn-primary" @click="checkStatus(item)">Check</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Constants from '../utilities/Constants.vue';
export default {
    mixins:[Constants],
    data() {
        return {
            allenach: [],
            page: 1,
        };
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh(){
            axios.post('api/finance/eNach/status/list')
                .then(response=>{
                    this.allenach = response.data.data
                }).catch(error=>console.log(error))
        },
        checkStatus(item){
            axios.post('api/finance/eNach/mandate',{id: item.id})
                .then(response=>{
                    console.log(response.data)
                    if(response.data.status=='Success'){
                        this.refresh()
                    }else {
                        alert(response.data.status)
                    }
                    
                })
        }

    }
}
</script>

