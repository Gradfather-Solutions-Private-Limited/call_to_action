<script>
import { exportFile } from 'quasar';
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            signedurlid: 0
        }
    },
    computed: {
        ...mapGetters([
            'uploadedimage', 'directorypath', 'filecomponents','fieldjson'
        ]),
    },
    methods: {
        processFile2(event) {
            this.$store.commit('assignloadingstatus', 1)
            
            let file = event.target.files[0];
            console.log("File", file)
            let obj = this.filecomponents;
            console.log("Obj", obj)
            let extention = file.name.split('.').pop();
            let self = this;
            if (extention == 'jpg' || extention == 'jpeg' || extention == 'png') {
                var _URL = window.URL || window.webkitURL;
                let img = new Image();
                var objectUrl = _URL.createObjectURL(file);
                img.onload = function () {
                    let width = this.width;
                    let height = this.height;
                    let uploadimgsize = this.width + "*" + this.height
                    console.log('check',width,height)
                    if(obj.width=='1000' && obj.height=='1000'){
                        let size = file.size;
                        let filesize = Math.round((size / 1024));
                        if (filesize <= 1024) {
                            obj.width = 1000;
                            obj.height = 1000;
                            self.processFiletouplad(file, obj);
                        } else {
                            self.errortext = "please select a file less than 1mb";
                            alert(self.errortext);
                        }
                    }else{
                        if (width == obj.width && height == obj.height) {
                            self.processFiletouplad(file, obj);
                        } else {
                            self.errortext = 'Size not Valid your image size ' + uploadimgsize;
                            alert(self.errortext);
                        }
                    }
                    
                    _URL.revokeObjectURL(objectUrl);
                };
                img.src = objectUrl;
            } else {
                self.processFiletouplad(file, obj);
            }
            this.$store.commit('assignloadingstatus', 0)
        },
        processFiletouplad(file, obj) {
            let extention = file.name.split('.').pop();
            let param = {
                width: obj.width, height: obj.height, filetype: extention, size: file.size, counter: obj.counter,filename:file.name,
                type: obj.type, imagetype: obj.type, typeid: obj.typeid, directorypath: obj.directorypath, typeint: obj.typeint
                ,companyid: obj.companyid,fieldjson:JSON.stringify(this.fieldjson)
            }
            console.log(param);
            axios.post('api/image/getpresignedurl', param)
                .then(response => this.processFileResponse(file, response.data))
                .catch(error => console.log(error));
        },
        processFileResponse(file, data) {
            //if everything is fine then upload to the server
            if (!data.success) {
                alert(data.message)
            } else {
                this.signedurlid = data.presignedid
                // console.log("file",file)
                this.$store.commit('assignuplaodeddocument',data)
                console.log("seignedurlid", this.signedurlid)
                this.uploadImageToS3(file, data)
            }
        },
        uploadImageToS3(file, signedurlobject) {
            let newfile = new File([file], signedurlobject.filename, { type: file.type });
            let instance = axios.create();
            delete instance.defaults.headers.common['Authorization'];
            instance.put(signedurlobject.uploadUrl, newfile, {
                headers: {
                    'Content-Type': file.type,
                }
            }).then(response => this.processUploadResponse(response))
                .catch(error => console.log(error));

        },
        processUploadResponse() {
            //create a row in the image folder and save the reference in the signed url also
            let param = { signedid: this.signedurlid }
            axios.post('api/upload/savedtoamazon', param)
                .then((response) => {
                    this.$store.commit('assignuploadedimage', response.data)
                    this.uploaded();
                }).catch((err) => {
                    console.log('Error in loading image to the server', err)
                });
        },
        documentUpload(event) {
            this.$store.commit('assignloadingstatus', 1)
            let file = event.target.files[0];
            let obj = this.filecomponents;
            let extention = file.name.split('.').pop();
            let self = this;
            if (extention == 'jpg' || extention == 'jpeg' || extention == 'png') {
                var _URL = window.URL || window.webkitURL;
                let img = new Image();
                var objectUrl = _URL.createObjectURL(file);
                img.onload = function () {
                    let width = this.width;
                    let height = this.height;
                    let uploadimgsize = this.width + "*" + this.height
                    if(obj.width=='1000' && obj.height=='1000'){
                        let size = file.size;
                        let filesize = Math.round((size / 1024));
                        if (filesize <= 1024) {
                            obj.width = 1000;
                            obj.height = 1000;
                            self.processDocumentUpload(file, obj);
                        } else {
                            self.errortext = "please select a file less than 1mb";
                            alert(self.errortext);
                        }
                    }else{
                        if (width == obj.width && height == obj.height) {
                            self.processDocumentUpload(file, obj);
                        } else {
                            self.errortext = 'Size not Valid your image size ' + uploadimgsize;
                            alert(self.errortext);
                        }
                    }
                    _URL.revokeObjectURL(objectUrl);
                };
                img.src = objectUrl;
            } else {
                self.processDocumentUpload(file, obj);
            }
            this.$store.commit('assignloadingstatus', 0)
        },
        processDocumentUpload(file, obj) {
            let extention = file.name.split('.').pop();
            let param = {
                width: obj.width, height: obj.height, filetype: extention, size: file.size, counter: obj.counter,filename:file.name,
                type: obj.type, imagetype: obj.type, typeid: obj.typeid, directorypath: obj.directorypath, typeint: obj.typeint,
                fieldjson:JSON.stringify(this.fieldjson)
            }
            console.log("processDocumentUpload here ");
            console.log(param);
            axios.post('api/image/getpresignedurl', param)
                .then(response => this.processDocumentResponse(file, response.data))
                .catch(error => console.log(error));
        },
        processDocumentResponse(file, data) {
            console.log("processDocumentResponse here ");
            console.log(data);
            if (!data.success) {
                alert(data.message)
            } else {
                this.signedurlid = data.presignedid
                this.$store.commit('assignuplaodeddocument',data)
                console.log("seignedurlid", this.signedurlid)
                this.uploadDocumentToS3(file, data)
            }
        },
        uploadDocumentToS3(file, signedurlobject) {
            //this.$modal.show('loadingmodal');
            let newfile = new File([file], signedurlobject.filename, { type: file.type });
            let instance = axios.create();
            delete instance.defaults.headers.common['Authorization'];
            instance.put(signedurlobject.uploadUrl, newfile, {
                headers: {
                    'Content-Type': file.type,
                }
            }).then(response => this.processUploadDocResponse(response))
                .catch(error => console.log(error));

        },
        processUploadDocResponse() {
            let param = { signedid: this.signedurlid }
            axios.post('api/supporting/document/save', param)
                .then((response) => {
                    this.$store.commit('assignuploadedimage', response.data)
                    this.uploaded();
                }).catch((err) => {
                    console.log('Error in loading image to the server', err)
                });
        },
        uploadImageToLocalServer(event) {
            //this.$modal.show('loadingmodal');

            var options = { headers: { 'Content-Type': 'multipart/form-data' } };
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            const size = event.target.files[0].size;
            const file = Math.round((size / 1024));
            if (file >= 1024) {
                alert("please select a file less than 1mb");
                this.$modal.hide('loadingmodal');
                return false;
            }
            axios.post('api/upload/image', formData, options)
                .then((response) => {
                    this.imageuploaded = response.data;
                    this.$modal.hide('loadingmodal');
                    alert("Photo Uploaded")
                })
                .catch((err) => {
                    console.log('Error in loading image to the server', err)
                });
        }
    }
}
</script>