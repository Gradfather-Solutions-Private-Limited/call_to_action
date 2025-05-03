<template>
    <div>
        <div class="col-md-12">
            <h4>Assign Poem</h4>
        </div>
        <div class="col-md-12" v-if="poem">
            {{poem.poemtext}}<br>
            
            
                <b>Option1:</b><span>{{poem.option1}}</span>
                <b>Option2:</b><span>{{poem.option2}}</span>
                <b>Option3:</b><span>{{poem.option3}}</span>
                <b>Option4:</b><span>{{poem.option4}}</span>
                <b>Option5:</b><span>{{poem.option5}}</span>
                <b>Option6:</b><span>{{poem.option6}}</span>
                <b>Option7:</b><span>{{poem.option7}}</span>
                <b>Option8:</b><span>{{poem.option8}}</span>
                <b>Option9:</b><span>{{poem.option9}}</span>
                <b>Option10:</b><span>{{poem.option10}}</span>
            
            Used Times{{ poem.usedtimes }}

            <!-- <input type="datetime-local" v-model="selecteddatetime"> -->
            <input type="date" v-model="selecteddatetime">
            <select v-model="selectdatetime">
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">1</option>
                <option value="14">2</option>
                <option value="15">3</option>
                <option value="16">4</option>
                <option value="17">5</option>


            </select>
            Quiz Type
            <select v-model="quiztype">
                <option value="1">Satyam</option><option value="2">Shivam</option><option value="3">Sundaram</option>
            </select>
            
            <div class="col-md-8 mt-30 text-center flex-around-row" style="wrap:no-wrap">
                <button v-if="!issave" class="btn btn-success submit-btn" @click="submit()">Save</button>
                <q-spinner-hourglass color="blue" v-if="issave" size="3em"/>
                <button class="btn btn-danger cancel-btn" @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
    </template>
    <script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';
    export default {
        data() {
            return {
                poem:null,
                selecteddatetime:null,
                selectdatetime:null,
                quiztype:1
            }
        },
        computed:{
            
        },  
        mounted() {
            let poemid = this.$route.params.poemid
            if(poemid){
                let param = {poemid:poemid}
                axios.post("api/poem/fetchbyid",param)
                    .then(response => this.setValuesOfPoem(response.data))
                    .catch(error => console.log(error));
            }
        },
        methods: {
            setValuesOfPoem(data){
                this.poem = data.poem
                
            },
            submit(){
                this.issave=true
                let unixtime = moment(this.selecteddatetime + " " + this.selectdatetime + ":00")
                let endtime = Number(unixtime) + Number(3600)
                let param={poemid:this.poem.id,starttime:unixtime.unix(),endtime:endtime,quiztype:this.quiztype}
                axios.post("api/poem/schedule/assign",param)
                    .then(response => this.processResponse(response.data))
                    .catch(error => console.log(error));
            },
            processResponse(){
                this.issave=false
                this.$router.push({path:'/poem/schedule'})
            },
            cancel(){
                this.$router.push({path:'/poem/schedule'})
            }
        },
    }
    </script>
    <style scoped>
    .save-btn{
        width: 30%;
        font-size: 15px;
    }
    </style>