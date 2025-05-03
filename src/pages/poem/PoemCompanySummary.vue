<template>
<div>
    <div class="col-md-12 flex-between-row">
        <h3>Company  Summary</h3>
    </div>
    <div class="col-md-12 flex-between-row">
        <div class="col-md-4">
            <label for="">No. of Records   </label>
            <select style="width:15%" v-model="perPage" @change="refresh()" class="page-records">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>
        </div>
        <div v-if="accessid(237)">
            <label for="ap">Start time:</label>
            <input type="date" v-model="selected_start_time">
        </div>
        
        <div v-if="accessid(238)">
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
                        <th>Start Time</th>
                        <th>Quiz</th>
                        <th>Marked</th>
                        <!-- <th>Each Option</th> -->
                        <th>Received</th>
                        <th>Win</th>
                        <th>Dealer</th>
                        <th>Tax</th>
                        <th>Referred</th>
                        <th>Profit</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(schedule) in schedules">
                        <!-- <td></td> -->
                        <td>{{ schedule.starttimereadabale }}</td>
                        <td>{{ schedule.quizname }}</td>
                        <poem-company-summary-row v-if="poemexist(schedule)" :schedule="poemexist(schedule)"></poem-company-summary-row>
                    </tr>
                </tbody>
            </table>
            <div class="flex-row justify-content-end">
                <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback"/>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import moment, { months } from 'moment'
import PoemCompanySummaryRow from './PoemCompanySummaryRow.vue';
import AccessMixin from "../../components/access/AccessMixin.vue";
export default {
    mixins:[AccessMixin],
    components:{Pagination,PoemCompanySummaryRow},
    data() {
        return {
            schedules:[],
            rows:0,
			currentPage:1,
			perPage:10,
            starttime:moment(moment().format('YYYY-MM-DD') + ' 09:00'),
            
            selected_start_time:moment().format('YYYY-MM-DD'),
            
            start_time:9,
            responses:[],
            poems:[]
        }
    },
    computed:{
        ...mapGetters([
            
        ]),
    },
    mounted() {
        this.refresh();
    },
    methods: {
        convertToReadable(timestamp){
            return moment.unix(timestamp)
        },  
        clickCallback (currentPage) {
			this.currentpage=currentPage
			// this.$store.commit("assigncurrentpage",currentPage);
			// this.$store.commit("assigncurrentpage",currentpage);
			this.refresh();
      	},
        poemexist(poem){
            let found =  this.poems.find((el)=>{
                return el.starttime==poem.starttime && el.quiztype==poem.quiztype
            })
            return found
        },
        refresh(){
            this.schedules=[]
            let momentstarttime= moment(this.selected_start_time +" "+ this.start_time + ":00")
            let eachRow = {}
            let starttime = momentstarttime;
            let starttimeunix = momentstarttime.unix()
            for(let i =0;i<10;i++){
                eachRow['starttime']=starttime.unix();
                eachRow['starttimereadabale']=starttime.format("YYYY-MM-DD HH:mm:ss");
                eachRow['quiztype']=1;
                eachRow['quizname']="Satyam";
                this.schedules.push({...eachRow})
                eachRow['quiztype']=2;
                eachRow['quizname']="Shivam";
                this.schedules.push({...eachRow})
                eachRow['quiztype']=3;
                eachRow['quizname']="Sundaram";
                this.schedules.push({...eachRow})
                starttime = starttime.add(1, 'hours');
            }
            let param={starttime:starttimeunix,endtime:starttime.unix()}
            axios.post("api/poem/schedule/company",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
            
            
        },
        refreshResponses(){
            let momentstarttime= moment(this.selected_start_time +" "+ this.start_time + ":00")
            let unixstarttime=momentstarttime.unix()
            let param={starttime:unixstarttime}
            axios.post("api/poem/schedule/fetchresponsesbydealers",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponseCount(data){
            this.rows=data.poems
        },
        processResponse(data){
            this.responses=data.responses
            this.poems = data.schedules
        },
        processUserResponse(data){
            this.dealers=data.userlist
        },
        
    },
}
</script>