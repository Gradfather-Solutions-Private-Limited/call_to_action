<template>
<div class="flex-row flex-gap-10">
    Width <input type="number" v-model="size.w" class="form-control"/>
    Height <input type="number" v-model="size.h" class="form-control"/>
    <button type="button" class="btn btn-danger" style="margin-left:10px ;" @click="removesize()">Remove</button>
</div>
</template>
<script>
export default {
    props:['size'],
    methods:{
        removesize(){
            this.$emit('removesize')
        }
    }
}
</script>