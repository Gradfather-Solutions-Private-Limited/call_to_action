<template>
    <tbody v-if="item!=null">
        <tr>
            <td>{{index+1}}</td>
            <td>{{item.user.firstname}} {{item.user.lastname}}</td>
            <td>{{item.shippingname}}, {{item.shippinghouseno}},<br>{{item.shippingstreet}},{{item.shippingcity}}
                <br>{{item.shippingstate}}, {{item.shippingzipcode}}</td>
            <td>
                {{item.shippingmobile}}
            </td>
            <td>{{item.ordertranid}}</td>
            <td>
				<table class="bordered">
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr v-for="(paymentitem,index) in item?.payments" v-bind:key="item.id">
						<td>{{ index+1 }}</td>
						<td>{{ paymentitem.modeuser.name }}</td>
						<td>{{ paymentitem.amount }}</td>
					</tr>
				</table>
            </td>
            <td >
                <template @dblclick="paymentfield=!paymentfield">
                    <select v-if="paymentfield" v-model="paidstatus" @change="updatestatus(item)" class="">  
                        <option :value="0">Pending</option>
                        <option :value="1">Confirm</option>
                    </select>
                    <div v-if="!paymentfield">
                        <span v-if="item.paidstatus==0" style="color:red">Pending</span>
                        <span v-if="item.paidstatus==1" style="color:green">Paid</span>
                    </div>
                </template>
            </td>
            <td>
                <div class="conf" v-if="item.status==1">Confirm</div>
                <div class="onway" v-else-if="item.status==2">On Way</div>
                <div class="delivered" v-else-if="item.status==3">Delivered</div>
                <div class="Canceloder" v-else-if="item.status==0">Cancel</div>
                <div>
                        <select v-model="paidstatus" @change="updatestatus2(item,$event)" class="">  
                            <option :value="1">Confirm</option>
                            <option :value="2">On Way</option>
                            <option :value="3">Delivered</option>
                        </select>
                </div>
            </td>
            <td><button class="btn btn-success btnformet" @click="shoedetails()">Details</button></td>
        </tr>
        <tr  v-if="itemshow" class="table-responsive">
            <td colspan="8">
                <table class="table">
                    <thead >
                        <th>S.no</th>
                        <th>Order No.</th>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        <tr v-for="(items,index) in item.items">
                            <td>{{index+1}}</td>
                            <td>{{item.ordertranid}}</td>
                            <td>{{items.product.name}}</td>
                            <td>{{items.quantity}}</td>
                            <td style="text-align: right;">{{items.sp}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style="text-align: right;"><b>Total {{item.amountwithtax}}</b></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</template>
<script>
export default {
    props:['item','index'],
    data() {
        return {
            paymentfield:false,
            paidstatus:'',
            itemshow:false,

        }
    },
    methods:{
        updatestatus(item){
            if(confirm("Do you really to change the status")==true){
                let param = {paidstatus:this.paidstatus, id:item.id}
                axios.post('api/order/update/status',param)
                .then(response=>this.processTypeResponse(response.data))
                .catch(error=>console.log(error));
            }
        },
        
        updatestatus2(item2,event){
            let statusnumber = event.target.value;
            let orderid = item2.id;
            //let parm = {''} 
            if(confirm("Do you really to change the status")==true){
                let param = {orderid:orderid, statuchange:statusnumber}
                axios.post('api/orderupdate/status',param)
                .then(response=>this.processTypeResponse(response.data))
                .catch(error=>console.log(error));
            }
        },
        processTypeResponse(){
            alert("Payment Status Updated")
            this.paymentfield=false
            this.$parent.refresh();
        },
        shoedetails(){
            this.itemshow=!this.itemshow
        },
        sumofoders(item){
                console.log(item);
        }

    }
}
</script>