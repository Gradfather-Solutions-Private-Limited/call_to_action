<template>
<div class="col-md-12">
    <!-- display all the product images and then display the left out images -->
    <div class="row">
    <div class="col-md-8">
        <div class="col-md-12 img-first img-uploadright">
            <div class="row justify-content-between">
                <div class="col-md-4">
                    <h4>Category Images</h4>
                </div>
                <div class="col-md-3">
                    <div class="pull-right" @click="goback()">
                        <button class="btn btn-primary">Back</button>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6" v-for="(size,sizeindex) in imagessizes" v-bind:key="index">
                        <h6>Image lists {{size.width}}x{{size.height}}</h6>
                        <display-image :size="size" :sequence="index"></display-image>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 img-uploadright">
        <div>
            <h4>Upload Images</h4>
        </div>
        <div class="size-images">
            <label><b>Select Size</b></label>
            <select class="form-control" v-model="sizeindexrow" @change="chnagesize">
                <option v-for="(size,sizeindex) in imagessizes" :value="sizeindex">{{size.width}}x{{size.height}}</option>
            </select>
            <span class="imagesizetext red" >{{ errortext }}</span>
        </div>
        <div class="col-md-12 upladbox-cat">
            <input type="file"  id="attach_file" name="files"  @change="processFile2($event)" style="padding-top: 17px;padding-bottom: 29px;" >
        </div>
    </div>
    </div>
    <div>

    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import DisplayImage from "../../components/utilities/DisplayImage.vue"
import Constants from "../../components/utilities/Constants.vue";
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue'
export default {
    mixins:[Constants,UploadMixin2],
    components:{DisplayImage},
    data() {
        return {
            imagetype:1,
            imagessizes:[{width:90,height:90},{ width:300, height:250}],
            productimages:[],
            width:0,
            height:0,
            errortext:'',
            signedurlid:0,
            sizeindex:'',
            sizeindexrow:'',
            productid:0
        }
    },
    computed:{
        ...mapGetters([
            'edititem'
        ]),
        
    },
    mounted() {
        this.refresh();
        this.sizeindexrow = 0;
        this.chnagesize()
        this.categoryid = this.$route.params.categoryid
    },
    methods:{
        
        refresh(){
            this.categoryid = this.$route.params.categoryid
            let param={type:this.imagetype , typeid:this.categoryid}
            axios.post("api/siteadmin/images/fetch",param)
            .then((response) =>this.Processresponse(response.data))
            .catch(error=>console.log(error));
        },
        chnagesize(n){
            var selectrow = [];
            selectrow =  this.imagessizes[this.sizeindexrow];
            let obj = {'type':this.imagetype,'width':selectrow.width,'height':selectrow.height,'directorypath':'category/'+this.categoryid,'counter':1,'typeid':this.categoryid}
            this.errortext = "Image size should be "+selectrow.width+"*"+selectrow.height;
             this.$store.commit('assignfilecomponents',obj);

            // let obj = {'type':2,'width':item.width,'height':item.height,'directorypath':'product/'+this.$route.params.productid,'counter':1,'typeid':this.productid}
            // console.log(obj);
            // this.$store.commit('assignfilecomponents',obj);
        },
        Processresponse(data){
            console.log("Stage2")
            this.productimages=data
            this.$store.commit('assignproductimages',data)
        },
        uploaded (){
            this.refresh();
            alert('upload');
        },
        goback(){
            this.$router.back();
        },
    }
}
</script>
<style scoped>
.imagesizetext{
    font-size: 20px;
    font-weight: 700;
}
.red{
    color:red;
}
</style>