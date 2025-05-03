<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            signedurlid:0,
            width:0,
            height:0
        }
    },
    computed:{
        ...mapGetters([
		      'uploadedimage','directorypath','imagetype','imageid'
		]),
    },
    methods:{
        processFile(event){
            let self = this
            // let validateFlag = false
            var _URL = window.URL || window.webkitURL;
            let file, img;
            if ((file = event.target.files[0])) {
                img = new Image();
                var objectUrl = _URL.createObjectURL(file);
                img.onload = function () {
                    console.log(this.width+":"+this.height)
                    self.width=this.width
                    self.height=this.height
                    if(self.size.width==this.width && self.size.height==this.height){
                        // validateFlag = true;
                    }
                    _URL.revokeObjectURL(objectUrl);
                };
                img.src = objectUrl;
            }
            // validateFlag = true
            file = event.target.files[0];
            let extention = file.name.split('.').pop();
            
            let param = {filetype:extention,size:file.size,directorypath:this.directorypath}
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
            let param ={signedid:this.signedurlid,imagetype:this.imagetype,id:this.imageid,
            width:this.width,height:this.height}
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
        uploadImageToLocalServer(event){
            //this.$modal.show('loadingmodal');

            var options = {	headers: { 'Content-Type': 'multipart/form-data'} };
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            console.log("size", event.target.files[0].size )
            const size = event.target.files[0].size;
            const file = Math.round((size / 1024));
            if (file >= 1024) {
            alert( "please select a file less than 1mb");
                this.$modal.hide('loadingmodal');
                return false;
            } 
            axios.post('api/upload/image', formData,options)
            .then((response) => {
                this.imageuploaded = response.data;
                this.$modal.hide('loadingmodal');
                alert("Photo Uploaded")
            }).catch((err) => {
                console.log('Error in loading image to the server', err)
            });
        }
    }
}
</script>