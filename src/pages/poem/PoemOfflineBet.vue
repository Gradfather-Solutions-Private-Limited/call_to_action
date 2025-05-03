<template>
    <div class="dealerbet">
        <table>
            <tr>
                <td>Dealer Name: </td>
                <td v-if="dealer">{{ dealer.name }}</td>
            </tr>
            <tr>
                <td>Quantity:</td>
                <td><input type="number" v-model="quantity" style="width: 50px;"/></td>
            </tr>
            <tr>
                <td>Scheme: </td>
                <td v-if="schedule">{{ schedule.quiztype=="1"?'Satyam':schedule.quiztype==2?'Shivam':'Sundaram' }}</td>
            </tr>
            <tr>
                <td>Start Time: </td>
                <td v-if="schedule">{{ time(schedule.starttime) }}</td>
            </tr>
            <tr>
                <td>Select Option: </td>
                <td><select v-model="marked">
        <option v-for="index in 10" :value="index">{{ index }}</option>
    </select></td>
            </tr>
            <tr>
                <td colspan="2"><button type="button" @click="submitBid()" v-if="enabled">Submit</button></td>
            </tr>
        </table>
    </div>
<!-- <div>
    
    Dealer: <div v-if="dealer">{{ dealer.name }}</div>
    Quantity: <input type="number" v-model="quantity"/>
    Scheme: <div v-if="schedule">{{ schedule.quiztype }}</div>
    Start Time: <div v-if="schedule">{{ schedule.starttime }}</div>
    Select Option: <select v-model="marked">
        <option v-for="index in 10" :value="index">{{ index }}</option>
    </select>
    <button type="button" @click="submitBid()" v-if="enabled">Submit</button>

</div> -->

</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment'
export default {
    
    data() {
        return {
            dealer:null,
            schedule:null,
            enabled:false,
            betResponse:null,
            quantity:1,
            marked:null,
        }
    },
    computed:{
        ...mapGetters([
            
        ]),
    },
    mounted() {
        if(this.$route.query.dealerid && this.$route.query.scheduleid){
            this.checkDealerName();
            this.checkForOfflineBind();
        }
    },
    methods: {
        checkForOfflineBind(){
            let scheduleid = this.$route.query.scheduleid;
            let param = {scheduleid:scheduleid}
            axios.post("api/poem/schedule/checkofflinebid",param)
                .then(response => this.processScheduleResponse(response.data))
                .catch(error => console.log(error));
        },
        checkDealerName(){
            //fetch the dealer information from the backend
            let dealerid = this.$route.query.dealerid;
            let param = {userid:dealerid}
            axios.post("api/user/fetchdealernameforadmin",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        submitBid(){
            this.dealer.id=this.$route.query.dealerid;
            let param = {dealerid:this.dealer.id,quantity:this.quantity,poemscheduleid:this.schedule.id,marked:this.marked}
            axios.post("api/poem/dealer/submitofflinebet",param)
                .then(response => this.processBetResponse(response.data))
                .catch(error => console.log(error));
                
        },
        processResponse(data){
            this.dealer=data.user
        },
        processScheduleResponse(data){
            this.schedule = data.schedule
            if(this.schedule){
                this.enabled=true
                //also start the timer and keep on checking the end time + 15 mins and disable the submit
            }
        },
        processBetResponse(data){
            this.betResponse = data;
            this.$router.back()
        },
        time(starttime){
            return moment(starttime * 1000).format('MMMM Do YYYY, h:mm a')
        }
        
    },
}
</script>