<template>
<tbody>
    <tr v-if="item!=null">
        <td>{{index+1}}</td>
        <td>
            {{item.name}}
        </td>
        <td><DisplayMobiles :mobiles="item.mobiles"></DisplayMobiles></td>
        <td><DisplayFirstAddress :addresses="item.addressess"></DisplayFirstAddress></td>
        <td >{{item.gst}}</td>	
        <td>{{item.adhar}}</td>
        <td>
            <i class="fa fa-pencil btn"> </i> <button class="btn btn-primary btn-sm" @click="edit(item)">Edit</button>
        </td>
    </tr>
</tbody>
</template>
<script>
import { mapGetters } from 'vuex'
import DisplayMobiles from '../mobile/DisplayMobiles.vue'
import DisplayFirstAddress from '../../components/address/DisplayFirstAddress.vue'
export default {
    components:{ DisplayMobiles, DisplayFirstAddress },
    props:['item','index'],
    data(){
        return {
        }
    },
    computed:{
        ...mapGetters([
        ]),
    },
    mounted(){
    },
    methods:{
        edit(item){
            this.$store.commit('assignedititem',item)
            this.$router.push({name:'vendorform'})
        }
    }
}
</script>