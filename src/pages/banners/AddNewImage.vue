<template>
<div>
    <div class="col-md-12">
        <h4>Add New Images</h4>
    </div>
    <div class="col-md-12">
        <div class="panel-body">
            <div class="col-md-12 mt-20 flex-row">
                <div class="col-md-4"><label for="">Title:</label></div>
                <div class="col-md-4"><input type="text" class="form-control" v-model="title"></div>
            </div>
            <div class="col-md-12 mt-20 flex-row">
                <div class="col-md-4"><label for="">Href:</label></div>
                <div class="col-md-4"><input type="text" class="form-control" v-model="hyperlink"></div>
            </div>
            <div class="col-md-12 mt-20 flex-row">
                <div class="col-md-4"><label for="">Description:</label></div>
                <div class="col-md-4"><input type="text" class="form-control" v-model="description"></div>
            </div>
            <div class="col-md-12 mt-20 flex-row">
                <div class="col-md-4"><label for="">Sequence:</label></div>
                <div class="col-md-4"><input type="number" class="form-control" v-model="sequence"></div>
            </div>
            <div class="col-md-12 mt-20 flex-row">
                <div class="col-md-4"><label for="">Status:</label></div>
                <div class="col-md-4">
                    <select class="form-control" v-model="disabled">
                        <option value="0">Enabled</option>
                        <option value="1">Disabled</option>
                    </select>
                </div>
            </div>
            <div class="col-md-12 mt-30 flex-around-row text-center">
                <button class="btn btn-danger cancel-btn" @click="cancel()">Cancel</button>
                <button class="btn btn-success save-btn" @click="submit()">Save</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    
    data(){
        return {
            bannerid:0,title:'',hyperlink:'',description:'',sequence:0,disabled:0,
            bannertypeid:0,title:''
        }
    },
    computed:{
		...mapGetters([
		      'bannertypes','selectedbannertypeid','selectedbanner'
		    ]),
	},
    mounted(){
        this.setvalues()
        if(this.$route.params!=null){
            this.bannertypeid=this.$route.params.bannertypeid
            console.log("Banner Id :"+this.bannertypeid)
        }
    },
    methods:{
        setvalues(){
            if(this.selectedbanner!=null){
                this.bannerid=this.selectedbanner.bannerid??0
                this.title=this.selectedbanner.title
                this.hyperlink=this.selectedbanner.hyperlink
                this.description=this.selectedbanner.description
                this.sequence=this.selectedbanner.sequence
                this.disabled=this.selectedbanner.disabled
                this.title=this.selectedbanner.title
            }
        },
        submit(){
            let param = {bannerid:this.bannerid,title:this.title,hyperlink:this.hyperlink,bannertypeid:this.bannertypeid,
                description:this.description,sequence:this.sequence,disabled:this.disabled,title:this.title}
			axios.post('api/siteadmin/banner/createupdate',param)
                .then(response=>this.processResponse(response.data))
                .catch(error=>console.log(error));
        },
        processResponse(){
            alert("saved Successfully")
            // let bannertype = this.bannertypes.find(block=>block.labelid==this.selectedbannertypeid)
            // if(typeof bannertype!=='undefined'){
            //     let bannerIndex = bannertype.banners.findIndex(block=>block.bannerid==data.bannerid)
            //     console.log(bannerIndex)
            //     if(bannerIndex>-1){
            //         bannertype.banners.splice(bannerIndex,1,data)
            //     } else {
            //         bannertype.banners.push(data)
            //     }
            // }
            this.$router.push({name:'banners'})
        },
        cancel(){
            this.$router.push({name:'banners'})
        }
    }
}
</script>