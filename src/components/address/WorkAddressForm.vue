<template>
<div>
    <div class="form-group row">
        <label class="col-lg-4 col-md-3 control-label">Name Of Work Place</label>
        <div class="col-lg-6 col-md-9">
            <input class="form-control form-cascade-control input-small" v-model="name1" type="text">
        </div>
    </div>
    
    <div class="form-group row Authority" style="">
        <label class="col-lg-4 col-md-3 control-label">Address of Work Place</label>
        <div class="col-lg-8 col-md-9">
            <textarea class="form-control form-cascade-control input-small" v-model="street1" cols="20"  rows="2" style="height:125px;" required></textarea>
        </div>
    </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'
import Constants from '../utilities/Constants.vue'
export default {
    mixins:[Constants],
    data(){
        return {
            name:'',
            street:'',
        }
    },
    mounted(){
        if(this.selectedwaddress!=null){
            this.street = this.selectedwaddress.street
            this.name = this.selectedwaddress.name
        }
    },
    computed:{
        name1:{
            set(value){
                this.name = value
            },
            get(){
                if(this.selectedwaddress!=null)
                    return this.selectedwaddress.name
                return ''
            }
        },
        street1:{
            set(value){
                this.street = value
            },
            get(){
                
                if(this.selectedwaddress!=null)
                    return this.selectedwaddress.street
                return ''
            }
        },
       ...mapGetters([
		      'selectedwaddress'
		]),
    },
    watch:{
        
        street:function(){ 
            this.updateselectedaddress();
        },
        name:function(){
            this.updateselectedaddress();
        },
    },
    methods:{
        updateselectedaddress(){
            
            if(this.selectedwaddress!=null){
                let localaddress = {...this.selectedwaddress}
                localaddress.name = this.name
                localaddress.street = this.street
                
                this.$store.commit('assignselectedwaddress',localaddress)
                
                this.$store.commit('updateappendaddressess',this.selectedwaddress)
            } else {
                let localaddress = {}
                localaddress.id = 0
                localaddress.addresstype = 1
                localaddress.name = this.name
                localaddress.street = this.street
                
                this.$store.commit('assignselectedwaddress',localaddress)
                this.$store.commit('updateappendaddressess',this.selectedwaddress)
            }
        }
    }
}
</script>