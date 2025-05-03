<template>
    <div>
        <div>
           
            <div class="mt-10"> 
                <div  class="col-md-12">
                    <h5>E-Nach List</h5>
                </div>
                <div class="col-md-12 m-top-10 boxshow">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Account Holder</th>
                                    <th>Mobile no.</th>
                                    <th>Email</th>
                                    <th>Account no. (IFSC)</th>
                                    <th>Account Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody v-if="details?.length>0">
                                <tr v-for="item, index in details" :key="item.id" @click="openDetails(item)" style="cursor: pointer;">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.accountHolderName }}</td>
                                    <td>{{ item.customerMobile }}</td>
                                    <td>{{ item.customerEmail }}</td>
                                    <td>{{ item.accountNumber }} ({{ item.bankIfsc }})</td>
                                    <td>{{ item.accountType }}</td>
                                    <td>
                                        <span v-if="item.status==null || item.status=='Pending' ">Pending</span>
                                        <span v-if="item.status=='Approved' ">Approved</span>

                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td  colspan="6" style="text-align: center;">No Result Found</td>
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

export default {
     props:['details'],

    data() {
        return {
            // details: [],
            // loanaccountid:0,

        }
    },
    mounted() {
        // this.loanaccountid = this.$route.params.loanaccountid
        // this.customerid = this.$route.params.customerid
        
        // this.refresh()

    },
    methods: {
       
        openDetails(item) {
            this.$router.push({ path: '/enach-details/' + item.id })
        },
        

    },

}
</script>
<style scoped></style>
