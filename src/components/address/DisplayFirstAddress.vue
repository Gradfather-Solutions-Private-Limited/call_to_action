<template>
<div v-if="address!=null">
    <span v-if="address.houseno!=null">{{ address.houseno}},<br></span>
    <span v-if="address.street!=null">{{ address.street }},<br></span>
    <!-- {{ address.landmark }} -->
    {{getMasterLabelByType(address.city,MASTER_CITIES)}}<br>
    {{ address.country }} {{address.zipcode}}
</div>
</template>
<script>
import Constants from '../utilities/Constants.vue'
export default {
    mixins:[Constants],
    props:{
        addresses:{},
        type:{
        
        type: Number,
            // Object or array defaults must be returned from
            // a factory function
            default: 0
      
        }
    },
    computed:{
        address(){
            if(this.addresses!=null){
                if(this.addresses.length>0){
                    let address1 = this.addresses.filter(block=>block.addresstype==this.type)
                    if(typeof address1!=='undefined' && address1.length>0)
                        return address1[0]
                }
            }
            return null
        }
    }
}
</script>