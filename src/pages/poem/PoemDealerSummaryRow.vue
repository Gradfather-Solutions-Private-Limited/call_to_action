<template>
    <td>{{ dealer.received }}</td>
    <!-- <td >
        <div v-for="index in 10">
            <div>{{index}} : {{ getTotalCount(1,index) }}</div>
        </div>
    </td> -->
    <td>{{ dealer.win }}</td>
    <td>{{ dealer.commission }}</td>
    <td>{{ dealer.referral }}</td>
    <td>{{ dealer.subdealercommission }}</td>
    <td>{{ dealer.total }}</td>
    
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props:['dealer','indx','starttime','quiztype'],
    
    data() {
        return {
            
        }
    },
    computed:{
        ...mapGetters([
            
        ]),
    },
    mounted() {
        
    },
    methods: {
        getTotalCount(quiztype, index){
            let found = this.$parent.responses?.find((el)=>{
                return el.quiztype==quiztype && index==el.marked
            })
            if(found){
                return found.total
            }
            return null
        },
        generateSummary(){
            console.log("Calling the generate summary")
            let param = {scheduleid:this.schedule.id}
            axios.post("api/poem/schedule/generatesummary",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(data){
            this.$parent.refresh()
        }
    },
}
</script>