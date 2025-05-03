<template>
    <div class="">
        <div>


            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">Loan Ledgers</h4>
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
                                    <th>Customer Name</th>
                                    <th>Accounts</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in userLoanAccounts" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td style="width: 70%;">
                                        <div class="row">
                                            <div class="mt-5px" v-for="account in item.loanaccounts" :key="account.id">
                                                <button class="btn btn-primary btn-sm" @click="fetchloan(account)">{{
                                                    account.generatedid }}</button>
                                            </div>
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
export default {
    data() {
        return {
            userLoanAccounts: [],
            noofrec: 10,
            currentpage: 1,
        };
    },
    mounted() {
        this.getLoanLedgers();
    },
    methods: {
        getLoanLedgers() {
            let param = { noofrec: this.noofrec, currentpage: this.currentpage }
            axios.post('api/users/loan/accounts', param)
                .then(response => {
                    this.userLoanAccounts = response.data.accounts;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchloan(item){
            console.log(item)
            this.$router.push({ path: '/loan-details/'+item.generatedid  })
        }

    }
}
</script>

