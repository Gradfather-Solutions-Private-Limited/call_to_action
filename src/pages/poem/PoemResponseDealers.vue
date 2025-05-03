<template>
    <div>
        <div class="col-md-12 flex-between-row">
            <h3>Dealers</h3>
        </div>
        <div class="col-md-12 flex-between-row">
            <div class="col-md-4">
                <label for="">No. of Records </label>
                <select style="width:15%" v-model="perPage" @change="refresh()" class="page-records">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div v-if="accessid(234)">
                <label for="ap">Start time:</label>
                <input type="date" v-model="selected_start_time">
                <select v-model="start_time">
                    <option value="9">9-10</option>
                    <option value="10">10-11</option>
                    <option value="11">11-12</option>
                    <option value="12">12-1</option>
                    <option value="13">1-2</option>
                    <option value="14">2-3</option>
                    <option value="15">3-4</option>
                    <option value="16">4-5</option>
                    <option value="17">5-6</option>
                    <option value="18">6-7</option>
                </select>
            </div>

            <div v-if="accessid(235)">
                <button type="button" @click="refresh()">submit</button>
                <button type="button" @click="refreshResponses()">Refresh Responses</button>
            </div>
        </div>
        <div class="col-md-12">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <!-- <th>S.no</th> -->


                            <th>Dealer</th>
                            <th>Quiz</th>
                            <th>option1</th>
                            <th>option2</th>
                            <th>option3</th>
                            <th>option4</th>
                            <th>option5</th>
                            <th>option6</th>
                            <th>option7</th>
                            <th>option8</th>
                            <th>option9</th>
                            <th>Option10</th>
                            <th>Bet Action</th>
                            <!-- <th>Feature Products</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user) in dealers">
                            <!-- <td></td> -->
                            <td>{{ user.name }}</td>
                            <td>
                                <table>
                                    <tr>
                                        <td>Satyam</td>
                                    </tr>
                                    <tr>
                                        <td>Shivam</td>
                                    </tr>
                                    <tr>
                                        <td>Sundaram</td>
                                    </tr>
                                </table>
                            </td>
                            <td v-for="index in 10">
                                <table>
                                    <tr>
                                        <td>{{ index }} : {{ getTotalCount(1, index, user) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ index }} : {{ getTotalCount(2, index, user) }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ index }} : {{ getTotalCount(3, index, user) }}</td>
                                    </tr>
                                </table>
                            </td>
                            <td>
                                <table v-if="checktime()">
                                    <tr><td><button type="button" ><a :href="'/poem/dealer/offlinebet?dealerid='+user.id+'&scheduleid=' +satyam">Bet2</a></button></td></tr>
                                    <tr><td><button type="button" ><a :href="'/poem/dealer/offlinebet?dealerid='+user.id+'&scheduleid=' +Shivam">Bet2</a></button></td></tr>
                                    <tr><td><button type="button"><a :href="'/poem/dealer/offlinebet?dealerid='+user.id+'&scheduleid=' +Sundaram">Bet2</a></button></td></tr>
                                </table>
                            </td>



                        </tr>
                    </tbody>
                </table>
                <div class="flex-row justify-content-end">
                    <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import moment, { months } from 'moment'
import PoemScheduleRowVue from './PoemScheduleRow.vue';
import axios from 'axios';
import AccessMixin from "../../components/access/AccessMixin.vue";
export default {
    mixins:[AccessMixin],
    components: { Pagination, PoemScheduleRowVue },
    data() {
        return {
            dealers: [],
            rows: 0,
            currentPage: 1,
            perPage: 10,
            starttime: moment(moment().format('YYYY-MM-DD') + ' 09:00'),
            scheduleid:0,
            selected_start_time: moment().format('YYYY-MM-DD'),
            satyam:0,
            Shivam:0,
            Sundaram:0,
            start_time: 9,
            responses: [],
            now:Date.now(),
            momentstarttimenow:0,
            unixstarttimenow:0,
            momentendtimenow:0,
            unixendtimenow:0
            // quiz1number: 1,
            // quiz2number: 1,
            // quiz3number: 1,
            // quiz1quantity: 1,
            // quiz2quantity: 1,
            // quiz3quantity: 1
        }
    },
    computed: {
        ...mapGetters([

        ]),
       
},
created(){
        var self = this
        // if(((this.schedules.endtime*1000) <=this.now) && (this.now<=((this.schedules.endtime+901)*1000))){
        setInterval(function () {
            
            self.now = Date.now()
            
            // console.log(self.now)
        }, 1000)
    },
    mounted() {
        this.refresh();
        let param = { is_dealer: 1 }
        axios.post("api/siteadmin/user/fetchonlyname", param)
            .then(response => this.processUserResponse(response.data))
            .catch(error => console.log(error));
        //     let momentstarttime = moment(this.selected_start_time + " " + this.start_time + ":00")
        //     let unixstarttime = momentstarttime.unix()
        //     let time = { starttime: unixstarttime }
        // axios.post('api/poem/schedule/fetchidsbystarttime',time)
        // .then(response => this.processpoemscheduleResponse(response.data))
        //     .catch(error => console.log(error));
        let hour = moment().hour();
        console.log(hour)
        if(hour<=19 && hour>=9){
            this.start_time=hour
        }
        this.refresh();
    },
    methods: {
        getTotalCount(quiztype, index, user) {
            let found = this.responses.find((el) => {
                return el.quiztype == quiztype && index == el.marked && el.userid == user.id
            })
            if (found) {
                return found.total
               
            }
            return null
        },
        convertToReadable(timestamp) {
            return moment.unix(timestamp)
        },
        clickCallback(currentPage) {
            this.currentpage = currentPage
            // this.$store.commit("assigncurrentpage",currentPage);
            // this.$store.commit("assigncurrentpage",currentpage);
            this.refresh();
        },
        checktime(){
            
            // console.log(unixstarttime)
            // console.log(unixendtime)
            // console.log(this.now)
            if(((this.unixstarttimenow*1000) <=this.now) && (this.now<=((this.unixendtimenow+900)*1000))){
                return true
            }
            //get the current time
           
            return false
           
        },
        processpoemscheduleResponse(data){
            let self=this
            data.scheduleids.forEach((new1)=>{
                console.log(new1)
                if(new1.quiztype==1){
                    self.satyam=new1.id
                }
                if(new1.quiztype==2){
                    self.Shivam=new1.id
                }
                if(new1.quiztype==3){
                    self.Sundaram=new1.id
                }
                console.log(this.satyam)
            })
            console.log(data)
            console.log('timeid')
        },
        refresh() {
            let momentstarttime = moment(this.selected_start_time + " " + this.start_time + ":00")
            let unixstarttime = momentstarttime.unix()
            let param = { starttime: unixstarttime }
            console.log(param)
            axios.post("api/poem/schedule/fetchresponsesbydealers", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
                axios.post('api/poem/schedule/fetchidsbystarttime',param)
                .then(response => this.processpoemscheduleResponse(response.data))
                    .catch(error => console.log(error));
                    this.momentstarttimenow = moment(this.selected_start_time + " " + this.start_time + ":00")
                    this.unixstarttimenow = this.momentstarttimenow.unix()
                    this.momentendtimenow = moment(this.selected_start_time + " " + this.start_time + ":00").add(1,'hours')
                    this.unixendtimenow = this.momentendtimenow.unix()

        },
        refreshResponses() {
            let momentstarttime = moment(this.selected_start_time + " " + this.start_time + ":00")
            let unixstarttime = momentstarttime.unix()
            let param = { starttime: unixstarttime }
            axios.post("api/poem/schedule/fetchresponsesbydealers", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponseCount(data) {
            this.rows = data.poems
        },
        processResponse(data) {
            this.responses = data.responses
            console.log(this.responses)
            console.log('time')
            

        },
        processUserResponse(data) {
            this.dealers = data.userlist
            console.log(this.dealers)
            console.log("dealer data")
        },

    },
}
</script>