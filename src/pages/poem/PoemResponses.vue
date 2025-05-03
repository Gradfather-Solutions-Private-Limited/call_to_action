<template>
    <div>
        <div class="col-md-12">
            <h4>Poem Response</h4>
        </div>
        <div class="col-md-12">
            <div>
                <div>
                    Users
                    <input type="text" v-model="searchtext"/>
                    <button type="button" @click="search()">Search</button>
                    <select  v-model="selecteduserid">
                        <option :value="item.id" v-for="item in users">{{ item.name }}</option>
                    </select>
                    <button type="button" @click="selectuser()">Select User</button>
                    <button type="button" @click="removeuser()">Remove User</button>
                </div>
            </div>
        </div>
        <div class="col-md-12" v-if="apiready">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>QuizType</th>
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
                            <td>{{ poem.quiztype }}<br></td>
                            <td>{{ poem.poemtext }}<br>
                                {{ getQuizTime(poem.starttime) }}
                                {{ poem.starttime }}<br>
                                <select v-model="marked">
                                    <option value="1">{{ poem.option1 }}</option>
                                    <option value="2">{{ poem.option2 }}</option>
                                    <option value="3">{{ poem.option3 }}</option>
                                    <option value="4">{{ poem.option4 }}</option>
                                    <option value="5">{{ poem.option5 }}</option>
                                    <option value="6">{{ poem.option6 }}</option>
                                    <option value="7">{{ poem.option7 }}</option>
                                    <option value="8">{{ poem.option8 }}</option>
                                    <option value="9">{{ poem.option9 }}</option>
                                    <option value="10">{{ poem.option10 }}</option>
                                </select><br>
                                <button type="button" @click="submitresult(poem.id)">Submit</button>
                            </td>

                            <!-- <td>
                                <div v-for="index in 10">
                                    <b>Option{{ index }}:</b><span>{{ poem['option'+index] }}</span>No of Responses :{{ getNoOfResponses(poem, index)
                                    }}
                                </div>
                            </td> -->
                            <td>{{ poem.option1 }}<br>No of Responses: {{ getNoOfResponses(poem,1) }}</td>
                            <td>{{ poem.option2 }}<br>No of Responses: {{ getNoOfResponses(poem,2) }}</td>
                            <td>{{ poem.option3 }}<br>No of Responses: {{ getNoOfResponses(poem,3) }}</td>
                            <td>{{ poem.option4 }}<br>No of Responses: {{ getNoOfResponses(poem,4) }}</td>
                            <td>{{ poem.option5 }}<br>No of Responses: {{ getNoOfResponses(poem,5) }}</td>
                            <td>{{ poem.option6 }}<br>No of Responses: {{ getNoOfResponses(poem,6) }}</td>
                            <td>{{ poem.option7 }}<br>No of Responses: {{ getNoOfResponses(poem,7) }}</td>
                            <td>{{ poem.option8 }}<br>No of Responses: {{ getNoOfResponses(poem,8) }}</td>
                            <td>{{ poem.option9 }}<br>No of Responses: {{ getNoOfResponses(poem,9) }}</td>
                            <td>{{ poem.option10 }}<br>No of Responses: {{ getNoOfResponses(poem,10) }}</td>
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
export default {
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
            starttime:0
        }
    },
    computed: {

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
        getQuizTime(timeinmilli){
            return new Date(timeinmilli*1000)
        },
        removeuser(){
            if (this.starttime) {
                let param = { starttime: this.starttime }
                axios.post("api/poem/schedule/response", param)
                    .then(response => this.setValuesOfPoem(response.data))
                    .catch(error => console.log(error));
            } else {
                axios.post("api/poem/schedule/response")
                    .then(response => this.setValuesOfPoem(response.data))
                    .catch(error => console.log(error));
            }
        },
        submitresult(poemscheduleid){
            let param = {marked:this.marked,poemscheduleid:poemscheduleid }
            console.log(param)
            axios.post("api/poem/schedule/setanswer", param)
        },
        selectuser(){
            //get the data by the selected user id
            if (this.starttime) {
                let param = { starttime: this.starttime, selecteduserid:this.selecteduserid }
                axios.post("api/poem/schedule/response", param)
                    .then(response => this.setValuesOfPoem(response.data))
                    .catch(error => console.log(error));
            } else {
                let param = { selecteduserid:this.selecteduserid }
                axios.post("api/poem/schedule/response", param)
                    .then(response => this.setValuesOfPoem(response.data))
                    .catch(error => console.log(error));
            }
        },
        search(){
            let param = {searchtext:this.searchtext}
            axios.post("api/siteadmin/user/searchbyname", param)
                .then(response => this.processUserResponse(response.data))
                .catch(error => console.log(error));
        },
        processUserResponse(data){
            console.log(data)
            this.users = data.users;
        },
        refresh() {
            axios.get("api/customers")

                .then(response => this.process(response.data))
                .catch(error => console.log(error));
        },
        process(data) {
            console.log(data)
            this.userdata = data;
        },
        getNoOfResponses(schedule, optionindex) {
            console.log("Called the response")
            console.log(this.responses)
            if (this.responses) {
                let responseRow = this.responses.find((el) => {
                    console.log("comparing:"+el.poemscheduleid+":with:"+schedule.id+":result:"+el.poemscheduleid === schedule.id)
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
        cancel() {
            this.$router.push({ path: '/poem/schedule' })
        }
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