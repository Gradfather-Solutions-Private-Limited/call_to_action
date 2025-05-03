<template>
	<Modal style="z-index:1000">
		<div class="popup">
			<div class="col-md-12" style="border-bottom: 1px solid grey;background-color:white;">
				<div class="d-flex " style="margin:10px;">
					<div class="col-md-6">
						<div class="headding-font" >Emi Payment Form</div>
                    </div>
					<div class="col-md-6 text-right">
						<a href="#" class="cancel-btn" @click="cancel()">X</a>
					</div>
				</div>
			</div>
            <div class="col-md-12 pt-15" style="background-color:white;">
                <div class="form-group" >
                    <div class="d-flex mt-20">
                        <div class="col-md-5">
                            <label>Enter Receipt No.</label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" v-model="form.receiptno" class="form-control" placeholder="Enter Receipt No.">
                        </div>
                    </div>
                    <div class="d-flex mt-20">
                        <div class="col-md-5">
                            <label>Enter Receive Amount</label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" v-model="form.amount" class="form-control" placeholder="Enter Receipt No.">
                        </div>
                    </div>
                    <div class="d-flex mt-20">
                        <div class="col-md-5">
                            <label>Pay Date</label>
                        </div>
                        <div class="col-md-7">
                            <input type="date" v-model="form.receiveddate" class="form-control" placeholder="Enter Receipt No.">
                        </div>
                    </div>
                    <div class="d-flex mt-20">
                        <div class="col-md-5">
                            <label>Mode of Payment</label>
                        </div>
                        <div class="col-md-7">
                            <select v-model="form.mode" class="form-control">
                                <option v-for="(option) in registers" v-bind:value="option.id" v-text="option.name"
                                    :key="option.id">
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex mt-20">
                        <div class="col-md-5">
                            <input type="checkbox" id="late_fees" v-model="is_late_fee" @change="toggleLateFee">
                            <label for="late_fees" class="ml-5">Late Fee</label>
                        </div>
                        <div class="col-md-7" v-if="is_late_fee">
                            <input type="number" v-model="form.late_fee" class="form-control" />
                        </div>
                    </div>
                    <div class="d-flex mt-20">
                        <div class="col-md-5">
                            <label>Remark</label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" v-model="form.remark" class="form-control" placeholder="Enter Remark">
                        </div>
                    </div>
                </div>
                <div class="col-md-12 text-center mb-10">
                    <button class="btn btn-success" @click="submit()">Submit</button>
                    <button class="btn btn-danger ml-10" @click="cancel()">Cancel</button>
                </div>
                
            </div>
			
		</div>
	</Modal>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ['emiitem'],
	data() {
		return {
            form:new window.Form({
                id:0,
                receiptno:'',
                collectedbyid:'',
                amount:'',
                receiveddate:'',
                mode:'',
                refno:'',
                remark:'',
                loanemiid:0,
                fy:"",
                paymenttype:1,
                late_fee : 0
            }),
            is_late_fee: false,
            
		};
	},
    mounted(){
       if(this.emiitem !=null){
         this.form.amount = this.emiitem.tobepaid;
       }
    },
    
    computed: {
        ...mapGetters(['registers','selectedfy'])
    },
   
    methods: {
        submit(){
            this.$store.commit("assignloadingstatus",1);
            this.form.loanemiid = this.emiitem.id;
            this.form.fy = this.selectedfy;
            this.form.isloanledger = 1
            axios.post('api/loan/emi/receivepayment',this.form)
                .then(response=>{
                    this.$emit('refresh')
                   this.cancel()
                })
                .catch(error=>console.log(error));
        },
        cancel(){
            this.form = new window.Form({
                id:0, receiptno:'', collectedbyid:'',
                amount:'', receiveddate:'', mode:'',
                refno:'', remark:'',loanemiid:0,
                fy:"",paymenttype:1
            });
            this.$store.commit("assignloadingstatus",0)
            this.$emit('close')
        },
        toggleLateFee() {
            if (!this.is_late_fee) {
                this.form.late_fee = 0;
            }
        }
    }
}

</script>
<style scoped>
.row {
	display: block !important;
}

.popup{
    width: 40%;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
.cancel-btn {
	padding: 5px 10px;
	background: red;
	color: #fff;
	border-radius: 5px;
	font-weight: 700;
}
</style>
