<template>
<div>
    <input type="file"  id="attach_file" name="files"  @change="processFile($event)" style="padding-top: 17px;padding-bottom: 29px;" >
</div>
</template>
<script>
import UploadIdProofMixin from './UploadIdProofMixin.vue'
export default {
    mixins:[UploadIdProofMixin]
}
</script>