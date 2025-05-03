<template>
<div>
    <!-- display all the product images and then display the left out images -->
    <div class="col-md-12">
        <div>
            <h3>Attribute Images</h3>
        </div>
        <div v-for="(index) in 2" v-bind:key="index">
            <div class="flex ">
                {{index}}
                <div class="flex" v-for="(size,sizeindex) in imagessizes" v-bind:key="sizeindex">
                    <div class="col-md-2">
                        <span class="imagesizetext">Size  :</span>
                        <span  class="imagesizetext red">{{size.width}}x{{size.height}}</span><br>
                        <input  type="file"  id="attach_file" name="files"  @change="processFile(size,$event,index)" style="padding-top: 17px;padding-bottom: 29px;">
                    </div>
                    <display-image :size="size" :sequence="index"></display-image>
                    <q-separator />
                </div>
            </div>
        </div>
        <div class="col-md-12 " style="margin-top:40px">
            <hr>
            <div class="flex-row flex-center" style="margin-top:40px" @click="goback()"><button class="btn btn-primary">Back</button></div>
        </div>
    </div>
    <image-modal></image-modal>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import ImageModal from "../../components/utilities/ImageModal.vue";
import DisplayImage from "../../components/utilities/DisplayImage.vue"
import Constants from "../../components/utilities/Constants.vue";
export default {
    mixins:[Constants],
    components:{ImageModal,DisplayImage},
    data() {
        return {
            imagetype:9,
            imagessizes:[{ width:90, height:90},{ width:120, height:120},{ width:270, height:360}],
            productimages:[],
            width:0,
            height:0,
            signedurlid:0,
            sizeindex:''
        }
    },
    computed:{
        ...mapGetters([
            'edititem'
        ]),
        
    },
    mounted() {
        this.refresh();
    },
    methods:{
        
        refresh(){
            this.categoryid = this.$route.params.categoryid
            let param={type:this.imagetype , typeid:this.categoryid}
            axios.post("api/siteadmin/images/fetch",param)
            .then((response) =>this.Processresponse(response.data))
            .catch(error=>console.log(error));
        },
        Processresponse(data){
            console.log("Stage2")
            this.productimages=data
            this.$store.commit('assignproductimages',data)
        },
        processFile(size,event,sizeindex){
            this.productid = this.$route.params.categoryid
            this.width=size.width
            this.height=size.height
            this.sizeindex=sizeindex
            console.log("sizeindex"+sizeindex)
            let directorypath='category/' + this.productid
            // let validateFlag = false
            var _URL = window.URL || window.webkitURL;
            let file, img;
            if ((file = event.target.files[0])) {
                img = new Image();
                var objectUrl = _URL.createObjectURL(file);
                img.onload = function () {
                    _URL.revokeObjectURL(objectUrl);
                };
                img.src = objectUrl;
            }
            // validateFlag = true
            file = event.target.files[0];
            let extention = file.name.split('.').pop();
            
            let param = {filetype:extention,size:file.size,directorypath:directorypath}
            axios.post('api/image/getpresignedurl', param)
                .then(response=> this.processFileResponse(file,response.data))
                .catch(error=>console.log(error));
        },
        processFileResponse(file,data){
            //if everything is fine then upload to the server
            if(!data.success){
                alert(data.message)
            } else {
                this.signedurlid = data.presignedid
                this.uploadImageToS3(file,data)
            }
        },
        uploadImageToS3(file,signedurlobject){
            //this.$modal.show('loadingmodal');
            
            let newfile = new File([file], signedurlobject.filename, { type: file.type });
            let instance = axios.create();
            delete instance.defaults.headers.common['Authorization'];

            
            instance.put(signedurlobject.uploadUrl, newfile, {
                headers: {
                'Content-Type': file.type,
                
                }
            }).then(response=>this.processUploadResponse(response))
                .catch(error=>console.log(error));
            
        },
        processUploadResponse(){
            //create a row in the image folder and save the reference in the signed url also
            let param ={signedid:this.signedurlid,imagetype:this.imagetype,id:this.productid,
            width:this.width,height:this.height,counter:this.sizeindex}
            axios.post('api/upload/savedtoamazon', param)
            .then((response) => {
                this.$store.commit('assignuploadedimage',response.data)
                console.log("uploaded image")
                console.log(this.uploadedimage)
                this.$parent.uploaded();
                //this.$modal.hide('loadingmodal');
                
            }).catch((err) => {
                console.log('Error in loading image to the server', err)
            });
           
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