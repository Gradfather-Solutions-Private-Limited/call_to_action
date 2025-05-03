<template>
    <td>{{ poem['poemtext'] }}</td>
    <td v-for="index in 10">
        {{ poem['option'+index] }}<br>
        <!-- No of Responses: {{ getNoOfResponses(poem,1) }} -->
        <!-- <button type="button" @click="setAnswer(index)" v-if="checkDrawTiming">Draw</button> -->
        <!-- <div v-if="index==poem.marked">Marked</div> -->
    </td>
</template>
<script>
import { mapGetters } from 'vuex';
import moment, { months } from 'moment'
export default {
    props:['poem','poemschedule'],
    //if the time is more than 10 mins by the end time then remove the draw button
    data() {
        return {
            now:Date.now(),
            responses: [],
            poems: []
        }
    },
    computed:{
        ...mapGetters([
            
        ]),
        // checkDrawTiming(){
        //     if(((this.poem.endtime*1000) <=this.now) && (this.now<=((this.poem.endtime+900)*1000))){
        //         return true
        //     }
        //     //get the current time
        //    else{
        //     return false
        //    }
        
        //    return true
           
        // }
    },
    // created(){
    //     var self = this
    //     if(((this.poem.endtime*1000) <=this.now) && (this.now<=((this.poem.endtime+901)*1000))){
    //     setInterval(function () {
            
    //         self.now = Date.now()
    //         //console.log(self.now)
    //     }, 1000)}

    // },
    mounted() {
        // console.log('start to')
        // console.log(this.poem.starttime*1000)
        // console.log((this.poem.endtime+900)*1000) 
        // console.log(this.now)
    },
    methods: {
        // getNoOfResponses(schedule, optionindex) {
        //     console.log("Called the response")
        //     console.log(this.responses)
        //     if (this.responses) {
        //         let responseRow = this.responses.find((el) => {
        //             console.log("comparing:"+el.poemscheduleid+":with:"+schedule.id+":result:"+el.poemscheduleid === schedule.id)
        //             return el.poemscheduleid == schedule.id && el.marked == optionindex
        //         })
        //         if (responseRow) {
        //             return responseRow.totalmarked
        //         }
        //     }
        //     return 'None'
        // },
        // setAnswer(index){
        //     let param = {marked:index,poemscheduleid:this.poem.id }
        //     axios.post("api/poem/schedule/setanswer", param)
        //     .then(response=>this.processResponse(response.data))
            
        // },
        // processResponse(data){
        //     if(data.status==1){
        //         //marked
        //         this.$parent.refresh();
        //     }
        // }
    },
}
</script>