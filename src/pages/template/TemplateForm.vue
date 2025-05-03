<template>
<div>
    Template Name<input type="text" v-model="templatename"/>
    No of Images<input type="number" v-model="productnoofimages"/>
    Sizes
    <button type="button" @click="addnew()">Add New Size</button>
    <div v-for="(size,index) in sizes" v-bind:key="index">
        <size-form :size="size" @removesize="removesize(index)"></size-form>            
    </div>
    <button type="button" @click="createupdate()">Submit</button>
</div>
</template>
<script>
import SizeForm from '../banners/SizeForm.vue';
export default {
    data(){
        return {
            sizes:[{w:0,h:0}],
            size:{w:0,h:0},
            templatename:'',
            productnoofimage:5,
            templateid:0
        }
    },
    mounted() {
        let templateid = this.$route.params.templateid;
        if (templateid) {
            let param = {templateid:templateid}
            axios.post("api/siteadmin/templates/fetch",param)
                .then(response => this.processDataResponse(response.data))
                .catch(error => console.log(error));
        }
    },
    components: { SizeForm },
    methods:{
        processDataResponse(data){
            if(data.length>0){
                this.setvalues(data[0]);
            }
        },
        setvalues(banner){
            this.templatename = banner.templatename
            this.templateid = banner.templateid
            this.productnoofimages = banner.productnoofimages;
            this.sizes = JSON.parse(banner.productimagesizes)
            if(!this.sizes){
                this.sizes = [];
            }
            console.log(this.sizes)
        },
        removesize(index){
            console.log(index)
            this.sizes.splice(index,1)
        },  
        addnew(){
            this.sizes.push({...this.size})
        },
        createupdate(){
            let jsonsize = JSON.stringify(this.sizes);
            let param={templatename:this.templatename,templateid:this.templateid,
                productnoofimages:this.productnoofimages,productimagesizes:jsonsize}
            axios.post("api/siteadmin/templates/createupdate",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(){
            alert("saved successfully")
        }
    }
}
</script>