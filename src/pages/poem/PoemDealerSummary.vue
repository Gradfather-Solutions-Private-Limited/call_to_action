<template>
    <div>
        <div class="col-md-12 flex-between-row">
            <h3>Dealers Summary</h3>
        </div>
        <div class="col-md-12">
            <div>
                <div>
                    Users
                    <input type="text" v-if="accessid(239)" v-model="searchtext"/>
                    <button type="button" @click="search()" v-if="accessid(240)">Search</button>
                    <select  v-model="selecteduserid" v-if="accessid(241)">
                        <option :value="item.id" v-for="item in users">{{ item.name }}</option>
                    </select>
                    <button type="button" @click="selectuser()" v-if="accessid(242)">Select User</button>
                    <button type="button" @click="removeuser()" v-if="accessid(243)">Remove User</button>
                </div>
            </div>
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
            <div v-if="accessid(244)">
                <label for="ap">Start time:</label>
                <input type="date" v-model="selected_start_time">
            </div>
            
            <div>
                <button type="button" @click="refresh()" v-if="accessid(245)">submit</button>
                <button type="button" @click="refreshResponses()" v-if="accessid(246)">Refresh Responses</button>
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
                            <th>Received</th>
                            <!-- <th>Options</th> -->
                            <th>Win</th>
                            <th>Commission</th>
                            <th>Referral</th>
                            <th>Sub Dealer Commission</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(schedule) in schedules">
                            <!-- <td></td> -->
                            <td>{{ schedule.starttimereadabale }}</td>
                            <td>{{ schedule.quizname }}</td>
                            <poem-dealer-summary-row :dealer="getDealer(schedule)" v-if="getDealer(schedule)"></poem-dealer-summary-row>
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
    import PoemDealerSummaryRow from './PoemDealerSummaryRow.vue';
    import AccessMixin from "../../components/access/AccessMixin.vue";
    export default {
        mixins:[AccessMixin],
        components:{Pagination,PoemDealerSummaryRow},
        data() {
            return {
                schedules:[],
                rows:0,
                currentPage:1,
                perPage:10,
//                starttime:moment(moment().format('YYYY-MM-DD') + ' 09:00'),
                
                selected_start_time:moment().format('YYYY-MM-DD'),
                
                start_time:9,
                responses:[],
                poems:[],
                selecteduserid:0,
                searchtext:'',
                users:[],
                dealerrows:[]
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
            selectuser(){
            //get the data by the selected user id
                let momentstarttime= moment(this.selected_start_time +" 09:00")
                let momentendtime= moment(this.selected_start_time +" 09:00").add(9, 'hours');
                let param = { starttime: momentstarttime.unix(),endtime:momentendtime.unix(), selecteduserid:this.selecteduserid }
                axios.post("api/poem/dealer/summary", param)
                    .then(response => this.setValuesOfPoem(response.data))
                    .catch(error => console.log(error));
                
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
            setValuesOfPoem(data){
                this.dealerrows = data.summary
                console.log(this.dealerrows)
            },
            search(){
                
                let param = {searchtext:this.searchtext}
                axios.post("api/siteadmin/user/searchbyname", param)
                    .then(response => this.processUserResponse(response.data))
                    .catch(error => console.log(error));
                
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
            getDealer(poem){
                let found =  this.dealerrows.find((el)=>{
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
                if(this.selecteduserid){
                    let param={starttime:starttimeunix,endtime:starttime.unix()}
                    axios.post("api/poem/schedule/company",param)
                        .then(response => this.processResponse(response.data))
                        .catch(error => console.log(error));
                }
                
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
                this.users=data.users
            },
            
        },
    }
    </script>