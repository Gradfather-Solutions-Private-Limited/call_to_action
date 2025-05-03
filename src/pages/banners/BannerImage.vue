<template>
<div>
    <div>
        <button v-if="showupload()" class="btn btn-primary btn-sm" @click="triggerimagemodal2(this.banner.id,'banner',4,this.counter,this.size)"> <i class="fas fa-pencil"></i>Add Image</button>
    </div>
    {{errormsg}}
</div>
</template>
<script>
import { mapGetters } from 'vuex'
 import Upload from '../../components/upload/Upload.vue'
import api from '../../lib/utils/Axios'
import Constants from '../../components/utilities/Constants.vue'
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue'

export default {
    mixins:[Constants,UploadMixin2],
    components:{Upload},
    props:['banner','size','counter'],
    data(){
        return {
            errormsg:'',
            imagefound:false
        }
    },
    mounted(){
    
    },
   
    computed:{
        ...mapGetters([
			'imagetype'
		]),
      
        getimage(){
            let self = this
            if(this.banner.images){
                let image = this.banner.images.find(function(block){
                    if(block.width==self.size.w && block.height==self.size.h){
                        return true
                    }
                    return false
                })
                if(typeof image!=='undefined'){
                    return image.fullurl
                }
            }
            return null;
        },
       
    },
    methods:{
       
        updateimage(imageitem){
            let imageIndex = this.banner.images.findIndex(function(block)
            {
                if(block.width==self.size.w && block.height==self.size.h){
                    return true
                }
                return false
            })
            if(imageIndex>-1){
                this.banner.images.splice(imageIndex,1,imageitem)
            } else {
                this.banner.images.push(imageitem)
            }
        },
       
        showupload(){
            let  selectrow = this.size;
            let listimg = this.banner.images.filter(obj => obj.width === selectrow.w && obj.height === selectrow.h);
            
            if(listimg.length>0){
                return false
            }else{
                return true
            }
        }
        
    }
}
</script>