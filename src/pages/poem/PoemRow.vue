<template>
    <tr>
        <td >{{indx+1 }}</td>
            <td style="width: 50%;">{{poem.poemtext}}<br>
            </td>
            <td class="row">
                <div class="col-md-6 p-10"><b>Option1 :</b><span>{{poem.option1}}</span></div>
                <div class="col-md-6 p-10"><b>Option2 :</b><span>{{poem.option2}}</span></div>
                <div class="col-md-6 p-10"><b>Option3 :</b><span>{{poem.option3}}</span></div>
                <div class="col-md-6 p-10"><b>Option4 :</b><span>{{poem.option4}}</span></div>
                <div class="col-md-6 p-10"><b>Option5 :</b><span>{{poem.option5}}</span></div>
                <div class="col-md-6 p-10"><b>Option6 :</b><span>{{poem.option6}}</span></div>
                <div class="col-md-6 p-10"><b>Option7 :</b><span>{{poem.option7}}</span></div>
                <div class="col-md-6 p-10"><b>Option8 :</b><span>{{poem.option8}}</span></div>
                <div class="col-md-6 p-10"><b>Option9 :</b><span>{{poem.option9}}</span></div>
                <div class="col-md-6 p-10"><b>Option10 :</b><span>{{poem.option10}}</span></div>
            </td>
            <td>{{ poem.usedtimes }}</td>
            <div v-if="!starttime || starttime==0">
                <td><button type="button" @click="triggeredit()">Edit</button></td>
                <td><button type="button"><a :href="'/poem/schedule/assign/'+poem.id">Add</a></button></td>
            </div>
            <div v-else>
                <td><button type="button" @click="assignToSchedule()">Assign</button></td>
            </div>
    </tr>
    </template>
    <script>
    import { mapGetters } from 'vuex'
    import Constants from '../../components/utilities/Constants.vue'
    export default {
        mixins:[Constants],
        components: {
            
          },
        props:['poem','indx','starttime','quiztype'],
        data(){
            return {
                
            }
        },
        mounted(){
            // this.$store.dispatch("fetchfeature")
            console.log("Printing the start time")
            console.log(this.starttime)
            
        },
        
        methods:{
            triggeredit(){
                this.$store.commit('assignedititem',this.poem)
                this.$router.push({path:'poem/edit/'+this.poem.id})
            },
            assignToSchedule(){
                
                let endtime = Number(this.starttime) + Number(3600)
                let param={poemid:this.poem.id,starttime:this.starttime,endtime:endtime,quiztype:this.quiztype}
                axios.post("api/poem/schedule/assign",param)
                    .then(response => this.processResponse(response.data))
                    .catch(error => console.log(error));
                
            },
            processResponse(data){
                this.$router.push({path:'/poem/schedule'})
            }
        }
    }
    </script>