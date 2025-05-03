<script>
export default {
    data(){
        return {
            width:0,
            height:0,
            signedurlid:0,
            imageindex:'',
            id:0,
            imagetype:0
        }
    },
    methods:{
        processFile(size,event,imageindex,id,path,imagetype){
            this.imagetype=imagetype
            this.id = id
            this.width=size.width
            this.height=size.height
            this.imageindex=imageindex
            let directorypath=path + "/" + id
            let validateFlag = false
            var _URL = window.URL || window.webkitURL;
            let file, img;
            if ((file = event.target.files[0])) {
                //console.log("entered in condition file event")
                img = new Image();
                var objectUrl = _URL.createObjectURL(file);
                img.onload = function () {
                    //console.log(this.width+":"+this.height)
                    self.width=this.width
                    self.height=this.height
                    //console.log(size)
                    if(self.width===size.width && self.height===size.height){
                        //console.log("entered")
                        validateFlag = true;
                    }
                    _URL.revokeObjectURL(objectUrl);
                };
                img.src = objectUrl;
            }
            //console.log("validate:"+validateFlag )
           
            file = event.target.files[0];
            let extention = file.name.split('.').pop();
            validateFlag=true;
            setTimeout(() => {
                if(validateFlag==true){
                    let param = {filetype:extention,size:file.size,directorypath:directorypath}
                    axios.post('api/image/getpresignedurl', param)
                        .then(response=> this.processFileResponse(file,response.data))
                        .catch(error=>console.log(error));
                }else{
                    alert("Input Valid Size")
                }
            }, 3000);
            
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
            let param ={signedid:this.signedurlid,imagetype:this.imagetype,id:this.id,
            width:this.width,height:this.height,counter:this.imageindex}
            axios.post('api/upload/savedtoamazon', param)
            .then((response) => {
                this.$store.commit('assignuploadedimage',response.data)
                console.log("uploaded image")
                console.log(this.uploadedimage)
                this.$parent.uploaded();
                this.refresh()
                //this.$modal.hide('loadingmodal');
                
            }).catch((err) => {
                console.log('Error in loading image to the server', err)
            });
           
        },
    }
}
</script>