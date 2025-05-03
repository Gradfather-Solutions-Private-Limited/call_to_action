<template>
    <div>
        <div class="col-md-12 flex-between-row mt-20">
            <h4>Add New Type</h4>
            <button class="btn btn-secondary back-btn" @click="back()"><i class='bx bx-arrow-back'></i>  Back</button>
        </div>
        <div class="col-md-12">
            <div class="panel-body">
                <div class="col-md-12 flex-row">
                    <div class="col-md-4"><label for="">Banner Label: (New Id will be generated)</label></div>
                    <div class="col-md-4"><input type="text" class="form-control" v-model="label"></div>
                </div>
                <div class="col-md-12 mt-20 flex-row">
                    <div class="col-md-4"><label for=""> Max Images:</label></div>
                    <div class="col-md-4"><input type="number" class="form-control" v-model="maximages"></div>
                </div>         
                <div class="col-md-9 flex-column flex-around mt-20">
                    <div v-for="(size,index) in sizes" v-bind:key="index" class="flex-column mt-20">
                        <size-form :size="size" @removesize="removesize(index)"></size-form>
                    </div>              
                </div>
                <div class="col-md-3 flex-row flex-center">
                    <div class="mt-20">
                        <button type="button" class="btn btn-primary" @click="addnew()">Add New Size</button>
                    </div>
                </div>
                <div class="col-md-12 mt-30 text-center">
                    <button class="btn btn-success save-btn" @click="createupdate()">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SizeForm from './SizeForm.vue';
import { mapGetters } from 'vuex'
export default {
  components: { SizeForm },
    data() {
        return {
            label: "",
            bannerid: 0,
            maximages: "",
            sizes:[{w:0,h:0}],
            size:{w:0,h:0}
        }
    },
    computed:{
		...mapGetters([
		      'bannertypes','selectedbannertypeid','selectedbanner'
        ]),
	},
    mounted(){
        this.$store.dispatch('fetchbannertype')
        if(this.$route.params.bannertypeid){
            let bannertypeid = this.$route.params.bannertypeid
            if(bannertypeid){
                console.log("banner types "+this.bannertypes)
                if(this.bannertypes && this.bannertypes.length>0){
                    console.log("banner typeid :"+bannertypeid)
                    let banner = this.bannertypes.find(block=>block.id==bannertypeid)
                    if(typeof banner!= undefined){
                        this.setvalues(banner)
                    }
                } else {
                    this.$store.dispatch("fetchbannertype");
                }
            }
        }   
       
    },
    
    methods: {
        setvalues(banner){
            console.log(banner)
            this.label = banner.label
            this.bannerid = banner.bannerid
            this.maximages = banner.maximages;
            this.sizes = JSON.parse(banner.sizes)
            console.log(this.sizes)
        },
        removesize(index){
            console.log(index)
            this.sizes.splice(index,1)
        },  
        addnew(){
            this.sizes?.push({...this.size})
        },
        createupdate(){
            let jsonsize = JSON.stringify(this.sizes);
            let param={label:this.label,bannerid:this.bannerid,maximages:this.maximages,sizes:jsonsize}
            axios.post("api/siteadmin/bannertype/createupdate",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(){
            alert("saved successfully")
            this.$router.push({name:"banners"})
        },
        back(){
            this.$router.push({name:"banners"})
        }
    },
}
</script>
<style scoped>
.save-btn{
    width: 30%;
    font-size: 15px;
}
</style>