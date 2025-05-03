<template>
<div>
    <div class="col-md-12 flex-between-row">
        <h3>Schedule Poems</h3>
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
        <div v-if="accessid(247)">
            <label for="ap">Start time:</label>
            <input type="date" v-model="selected_start_time">
            <select v-model="start_time">
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">1</option>
                <option value="14">2</option>
                <option value="15">3</option>
                <option value="16">4</option>
                <option value="17">5</option>
                <option value="18">6</option>
            </select>
        </div>
        <div v-if="accessid(247)">
            <label for="ap">End time:</label>
             <input type="date" v-model="selected_end_time">
             <select v-model="end_time">
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">1</option>
                <option value="14">2</option>
                <option value="15">3</option>
                <option value="16">4</option>
                <option value="17">5</option>
                <option value="18">6</option>

            </select>
        </div>
        
        <div v-if="accessid(248)">
            <button type="button" @click="refresh()">submit</button>
        </div>
    </div>
    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>QuizType</th>
                        <th>Start Time/End Time</th>
                        
                        <th>Poem</th>
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
                        <!-- <th>Feature Products</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(localschedule) in schedulerows">
                            <td>{{ localschedule.quiztype=="1"?'Satyam':localschedule.quiztype==2?'Shivam':'Sundaram' }}
                            <!-- <button type="button" @click="automaticdraw(localschedule)" v-if="poemexist(localschedule)">Automatic Draw</button> -->
                            </td>
                            <td>{{ localschedule.starttimereadable }}/{{ localschedule.endtimereadable }}</td>
                            <PoemScheduleRowVue v-if="poemexist(localschedule)"  :poem="poemexist(localschedule)"></PoemScheduleRowVue>
                            <td v-else>
                                <button type="button" @click="redirectToAssignPoem(localschedule.starttime,localschedule.quiztype)" v-if="accessid(249)">Assign</button>
                            </td>
                        
                    </tr>
                </tbody>
            </table>
            <div class="flex-row justify-content-end">
                <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback"/>
            </div>
        </div>
    </div>
    <image-modal></image-modal>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import moment, { months } from 'moment';
import PoemScheduleRowVue from './PoemScheduleRow.vue';
import AccessMixin from "../../components/access/AccessMixin.vue";
export default {
    mixins:[AccessMixin],
    components:{Pagination,PoemScheduleRowVue},
    data() {
        return {
            poems:[],
            rows:0,
			currentPage:1,
			perPage:10,
            starttime:moment(moment().format('YYYY-MM-DD') + ' 09:00'),
            endtime:moment(moment().format('YYYY-MM-DD') + ' 18:00'),
            selected_start_time:moment().format('YYYY-MM-DD'),
            selected_end_time:moment().format('YYYY-MM-DD'),
            start_time:9,
            end_time:18,
            schedulerows:[],
            quiztypepoem:1,
            assignpoemurl:"/poem/schedule/assignpoem/schedule/assignbystarttime/"
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
        automaticdraw(schedule){
            let poem = this.poemexist(schedule)
            //call the api to calculate the right draw option
            let param = {scheduleid:poem.id}
            axios.post("api/poem/schedule/automatedraw",param)
                .then(response => this.processDrawResponse(response.data))
                .catch(error => console.log(error));
        },
        processDrawResponse(data){
            console.log("Got the response of the draw")
            console.log(data)
        },
        redirectToAssignPoem(starttime,quiztype){
            
            this.$router.push({path:'/poem/schedule/assignbystarttime/'+starttime+'/'+quiztype})
        },
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
            console.log("Checking the values")
            this.schedulerows=[]
            console.log(this.starttime.unix())

            console.log("end time")
            console.log(this.endtime)

            console.log("current date")
            console.log(moment().format('YYYY-MM-DD'))

            let momentstarttime= moment(this.selected_start_time +" "+ this.start_time + ":00")
            console.log(momentstarttime)
            let unixstarttime=momentstarttime.unix()
            let momentendtime= moment(this.selected_end_time +" "+ this.end_time + ":00")
            console.log(momentendtime)
            console.log("hello")
            let unixendtime=momentendtime.unix()
            console.log(unixstarttime)
            console.log(unixendtime)
            let schedulerow = {}
            let param={starttime:unixstarttime,endtime:unixendtime}
            console.log(param)
            axios.post("api/poem/schedule/fetchbytime",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
            while(momentstarttime <= momentendtime){
                schedulerow = {}
                schedulerow['starttime']=momentstarttime.unix()
                schedulerow['starttimereadable']=momentstarttime.toString()
                schedulerow['endtime']=momentendtime.add(1,'hours').unix()
                schedulerow['endtimereadable']=momentstarttime.add(1,'hours').toString()
                console.log(momentendtime.toString())
                schedulerow['quiztype']=1
                this.schedulerows.push({...schedulerow})
                schedulerow['quiztype']=2
                this.schedulerows.push({...schedulerow})
                schedulerow['quiztype']=3
                this.schedulerows.push({...schedulerow})
                if(momentstarttime.hour()>20){
                    
                    momentstarttime.add(13, 'hours');    
                    
                }
                else{
                    console.log(momentstarttime.toString())
                    console.log(momentstarttime.unix())
                }
                // momentstarttime.add(1, 'hours'); 
            }
            
        },
        processResponseCount(data){
            this.rows=data.poems
        },
        processResponse(data){
            this.poems=data.poems
        },
        
    },
}
</script>