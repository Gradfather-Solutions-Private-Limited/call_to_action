<template>
<div>
    <button class="badge btn-success btn-xs" type="button">
        <a style="color:white" :href="idproofurl()" target="_blank" v-if="idproofurl()!=null">View</a></button> 
    <!-- <upload></upload> -->
    <input type="file"  id="attach_file" name="files"  @change="processFile($event)" style="padding-top: 17px;padding-bottom: 29px;" >
</div>
</template>
<script>
// import Upload from './UploadId.vue'

import { mapGetters } from 'vuex'
import UploadIdProofMixin from './UploadIdProofMixin.vue'
export default {
    // mixins:[IdProofMixin],
    mixins:[UploadIdProofMixin],
    // components: { Upload },
    props:['labelid','frontorback'],
    computed:{
        ...mapGetters([
		      'uploadedimage','edititem','idproofs','uploadids'
		]),
        
        item(){
            let found = null
            if(this.idproofs!=null){
                found = this.idproofs.find(block=>block.labelid==this.labelid)
            }
            return found
        }
    },
    methods: {
        idproofurl(){
            let found=null

            if(this.uploadids.length>0){
                // if(this.frontorback==1){
                    this.uploadids?.forEach(i=>{
                        if(this.labelid==i.labelid){
                            found=this.frontorback==1? i.fronturl:i.backurl
                        }
                    })
                // }
            }
            return found
        },
    },
}
</script>