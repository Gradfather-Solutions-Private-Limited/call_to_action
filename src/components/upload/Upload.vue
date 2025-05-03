<template>
<div>
    <input type="file"  id="attach_file" name="files"  @change="processFile2($event)" style="padding-top: 17px;padding-bottom: 29px;" >
</div>
</template>
<script>
import UploadMixin2 from '../utilities/UploadMixin2.vue'
export default {
    mixins:[UploadMixin2],

    methods:{
        uploaded(){
            this.$router.back();  
        },
    }
}

</script>