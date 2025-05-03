<template>
    <div>
        <div class="col-md-12">
            <h4>Pending Draw</h4>
        </div>
        <div class="col-md-12">
            <!-- <start-time></start-time> -->
        </div>
        <div class="col-md-12">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>QuizType</th>
                            <th>Time</th>
                            <th>Poemtext</th>
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
                            <!-- <th>Select Users</th> -->
                            <!-- <th>End Time</th> -->
                            <!-- <th>Quiz Type</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="poem in schedules">
                            <td>{{ poem.quiztype=="1"?'Satyam':poem.quiztype==2?'Shivam':'Sundaram'}}<br>
                                {{ poem.manualdraw==1?'Manual':'Automatic' }}
                                <button type="button" @click="toggledraw(poem)" v-if="poemexist(poem) && poemexist(poem).declared==0">Toggle</button>
                            </td>
                            <td><br>
                                {{ getQuizTime(poem.starttime) }}/
                                {{ getQuizTime(poem.endtime) }}<br>
                            </td>
                            <td>{{ poem.poemtext }}</td>
                            <!-- <td>
                                <div v-for="index in 10">
                                    <b>Option{{ index }}:</b><span>{{ poem['option'+index] }}</span>No of Responses :{{ getNoOfResponses(poem, index)
                                    }}
                                </div>
                            </td> -->
                            <td v-for="index in 10">
                                {{ poem['option'+index] }}
                                No of responses {{ getNoOfResponses(poem,index) }}
                                <button type="button" @click="setAnswer(index,poem)" v-if="checkDrawTiming(poem) && poem.declared==0">Draw</button>
                                <div v-if="index==poem.marked">Marked</div>
                            </td>
                            
                            <!-- <PoemScheduleRowVue v-if="poemexist(localschedule)"  :poem="poemexist(localschedule)"></PoemScheduleRowVue> -->
                            <!-- <td></td> -->
                            <!-- <td>{{ poem.endtime }}</td> -->
                            <!-- <td>{{ poem.quiztype }}</td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- <div class="col-md-12" v-for="poem in schedules">
            {{poem.poemtext}}<br>
            http://127.0.0.1:5173/
                <div v-for="index in 10">
                    <b>Option{{ index }}:</b><span>{{poem.option1}}</span>{{ getNoOfResponses(poem,index) }}
                </div>
            {{ poem.starttime }}
            {{ poem.endtime }}
            
            Quiz Type
            {{ poem.quiztype }}
            
            
        </div> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import axios from 'axios';
import StartTime from './components/StartTime.vue';
export default {
    props:['poem','poemschedule'],
    components:{StartTime},
    data() {
        return {
            schedules: [],
            users: [],
            responses: [],
            apiready:false,
            searchtext:'',
            selecteduserid:0,
            marked:0,
            poemscheduleid:0,
            starttime:0,
            now:Date.now(),
            responses: [],
            poems: []
        }
    },
    computed: {
        ...mapGetters([
            
        ]),
        
    },
    created(){
        var self = this
        if(((this.schedules.endtime*1000) <=this.now) && (this.now<=((this.schedules.endtime+901)*1000))){
        setInterval(function () {
            
            self.now = Date.now()
            console.log(self.now)
        }, 1000)}

    },
    mounted() {
        let starttime = this.$route.params.starttime
        this.starttime = this.$route.params.starttime
        if (starttime) {
            let param = { starttime: starttime }
            axios.post("api/poem/schedule/response", param)
                .then(response => this.setValuesOfPoem(response.data))
                .catch(error => console.log(error));
        } else {
            axios.post("api/poem/schedule/response")
                .then(response => this.setValuesOfPoem(response.data))
                .catch(error => console.log(error));
        }
    },
    methods: {
        toggledraw(schedule){
            
            let poem = this.poemexist(schedule)
            
            //call the api to calculate the right draw option
            let param = {poemscheduleid:poem.id}
            axios.post("api/poem/schedule/setmanualdraw",param)
                .then(response => this.processManualDrawResponse(response.data,poem))
                .catch(error => console.log(error));
        },
        checkDrawTiming(data){
            if(((data.endtime*1000) <=this.now) && (this.now<=((data.endtime+900)*1000)) && data.manualdraw==1){
                return true
            }
            return false
        //    return true
        },
        processManualDrawResponse(data,poem){
            if(data.status==1){
                poem.manualdraw=poem.manualdraw==1?0:1
            }
            
        },
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
        poemexist(poem){
            let found =  this.schedules.find((el)=>{
                return el.starttime==poem.starttime && el.quiztype==poem.quiztype
            })
            return found
        },
        getQuizTime(timeinmilli){
            return new Date(timeinmilli*1000)
        },
        setAnswer(index,data){
            let param = {marked:index,poemscheduleid:data.id }
            axios.post("api/poem/schedule/setanswer", param)
            .then(response=>this.processResponse(response.data))
            
        },  
        processResponse(data){
            console.log("Data"+data);
            if(data.status==1){
                //marked
                this.$parent.refresh();
            }
        },
        
        
        getNoOfResponses(schedule, optionindex) {
            console.log("Called the response")
            //console.log(this.responses)
            if (this.responses) {
                let responseRow = this.responses.find((el) => {
                    //console.log("comparing:"+el.poemscheduleid+":with:"+schedule.id+":result:"+el.poemscheduleid === schedule.id)
                    return el.poemscheduleid == schedule.id && el.marked == optionindex
                })
                if (responseRow) {
                    return responseRow.totalmarked
                }
            }
            return 'None'
        },
        setValuesOfPoem(data) {
            console.log("Got the response")
            console.log(data)
            this.schedules = data.schedules
            this.responses = data.answers
            console.log(this.responses)
            console.log(data.responses)
            this.apiready=true
        },
        submit() {
            this.issave = true
            let unixtime = moment(this.selecteddatetime)
            let endtime = Number(unixtime) + Number(3600)
            let param = { poemid: this.poem.id, starttime: unixtime.unix(), endtime: endtime, quiztype: this.quiztype }
            axios.post("api/poem/schedule/assign", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse() {
            this.issave = false
            this.$router.push({ path: '/poem/schedule' })
        },
    },
}
</script>
<style scoped>
.save-btn {
    width: 30%;
    font-size: 15px;
}
/* input{
    display: inline;
} */
.search{
    margin: 15px;
    width: 50%;
}
.search div{
    margin: auto;
}
button{
    background-color: aquamarine;
}
</style>