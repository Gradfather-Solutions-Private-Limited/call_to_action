<template>
    <div>
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">E-Nach Detail</h4>
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-info" @click="backBtn()">Back</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <div>
                <div class=" flex-align-center" >
                    <div class="table-responsive col-md-6" style="background: #fff;padding: 15px;">
                        <table class="table">
                            
                            <tbody>
                                <tr>
                                    <td><strong>Account Holder</strong></td>
                                    <td>{{ this.e_nach?.accountHolderName ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Account Number</strong></td>
                                    <td>{{ this.e_nach?.accountNumber ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Account Type</strong></td>
                                    <td>{{ this.e_nach?.accountType ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Auth Type</strong></td>
                                    <td>{{ this.e_nach?.authType ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bank Ifsc</strong></td>
                                    <td>{{ this.e_nach?.bankIfsc ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Category Code</strong></td>
                                    <td>{{ this.e_nach?.categoryCode ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Collection Amount</strong></td>
                                    <td>{{ this.e_nach?.collectionAmount ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Customer Name</strong></td>
                                    <td>{{ this.e_nach?.customerName ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Customer Mobile</strong></td>
                                    <td>{{ this.e_nach?.customerMobile ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Customer Email</strong></td>
                                    <td>{{ this.e_nach?.customerEmail ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Debit Type</strong></td>
                                    <td>{{ this.e_nach?.debitType ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>First Collection Date</strong></td>
                                    <td>{{ this.e_nach?.firstCollectionDate ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Last Collection Date</strong></td>
                                    <td>{{ this.e_nach?.lastCollectionDate ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Frequency</strong></td>
                                    <td>{{ this.e_nach?.frequency ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Merchant Trxn Ref Id</strong></td>
                                    <td>{{ this.e_nach?.merchantTrxnRefId ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Principal Amount</strong></td>
                                    <td>{{ this.e_nach?.principalAmount ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Utility Code</strong></td>
                                    <td>{{ this.e_nach?.utilityCode ?? 'N/A' }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Optional</strong></td>
                                    <td>{{ this.e_nach?.optional ?? 'N/A' }}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <!-- <div class="col-md-6" >
                        <div class="row">
                            <div class="col-md-5"><label>Account Holder</label></div>
                            <div class="col-md-7">{{ this.e_nach?.accountHolderName ?? 'N/A' }}</div>
                        </div>
                   </div> -->
                    <!-- <div class="form-group row">
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Account Holder name</label>
                            <div class="form-control">{{ this.e_nach?.accountHolderName ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Account Number</label>
                            <div class="form-control">{{ this.e_nach?.accountNumber ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Account Type</label>
                            <div class="form-control">{{ this.e_nach?.accountType ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Auth Type</label>
                            <div class="form-control">{{ this.e_nach?.authType ?? 'N/A' }}</ div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Bank Ifsc</label>
                            <div class="form-control">{{ this.e_nach?.bankIfsc ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Category Code</label>
                            <div class="form-control">{{ this.e_nach?.categoryCode ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Collection Amount</label>
                            <div class="form-control">{{ this.e_nach?.collectionAmount ?? 'N/A' }}</div>
                        </div>
                        
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Customer Name</label>
                            <div class="form-control">{{ this.e_nach?.customerName ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Customer Mobile</label>
                            <div class="form-control">{{ this.e_nach?.customerMobile ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Customer Email</label>
                            <div class="form-control">{{ this.e_nach?.customerEmail ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Debit Type</label>
                            <div class="form-control">{{ this.e_nach?.debitType ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">First Collection Date</label>
                            <div class="form-control">{{ this.e_nach?.firstCollectionDate ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Frequency</label>
                            <div class="form-control">{{ this.e_nach?.frequency ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Merchant Trxn Ref Id</label>
                            <div class="form-control"> {{ this.e_nach?.merchantTrxnRefId ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Principal Amount</label>
                            <div class="form-control">{{ this.e_nach?.principalAmount ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Utility Code</label>
                            <div class="form-control">{{ this.e_nach?.utilityCode ?? 'N/A' }}</div>
                        </div>
                        <div class="col-md-4 mt-10">
                            <label class="col-form-label text-md-right">Optional</label>
                            <div class="form-control">{{ this.e_nach?.optional ?? 'N/A' }}</div>
                        </div>
                        

                    </div> -->



                </div>
                <div class="d-flex gap-2 justify-content-center py-2">
                    <button class="btn btn-success" @click="submitrecord()" :disabled="isSubmitted">Submit</button>
                    <button class="btn btn-danger ml-5px" @click="this.$router.go(-1)">Cancel</button>
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
            enachid: 0,
            e_nach: null,
            isSubmitted: false
        };
    },
    mounted() {
        this.enachid = this.$route.params.id;
        this.getENachDetails();
    },
    methods: {
        getENachDetails() {
            axios.post('api/finance/enach/form/detail', { id: this.enachid })
                .then(response => {
                    this.e_nach = response.data.enach;
                })
                .catch(error => console.error(error));
        },
        submitrecord() {
            if (confirm('Do you want to submit this data ?')) {
                this.isSubmitted = true
                axios.post('api/finance/transaction/post', { id: this.enachid })
                    .then((response) => {
                        console.log(response.data)
                        alert(response.data.message)
                        // this.$router.go(-1)
                    })
            }
        },
        backBtn() {
            this.$router.go(-1)
        }
    }
};
</script>
<style scoped>
table tr th, table tr td {
    padding: 7px;
    font-size: 14px !important;
    border-bottom: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;
    border-right: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
}
</style>