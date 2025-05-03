<template>
    Hello trying to upload media
    <input type="file" @change="processupload($event)">
</template>
<script>
export default {
    data(){
        return {
            width:0,
            height:0
        }
    },
    methods:{
        processupload(event){
            let self = this
            // let validateFlag = false
            var _URL = window.URL || window.webkitURL;
            let file, img;
            // if ((file = event.target.files[0])) {
            //     img = new Image();
            //     var objectUrl = _URL.createObjectURL(file);
            //     img.onload = function () {
            //         console.log(this.width+":"+this.height)
            //         self.width=this.width
            //         self.height=this.height
            //         if(self.size.width==this.width && self.size.height==this.height){
            //             // validateFlag = true;
            //         }
            //         _URL.revokeObjectURL(objectUrl);
            //     };
            //     img.src = objectUrl;
            // }
            // validateFlag = true
            file = event.target.files[0];
            console.log(file)
            let size = file.size
            let extention = file.name.split('.').pop();

            console.log("Uploaded")
            let param = {file_length:size,file_type:extention,file_name:file.name}
            let sessionid = "upload:MTphdHRhY2htZW50OjE0NzRmNDJiLTg1OTgtNDE4OS1iMzkyLWNhNGUyOTFmOWExNT9maWxlX2xlbmd0aD0zMzg3JmZpbGVfdHlwZT1qcGVn?sig=ARbDqLNlQGgg1Z995M8"
            let url = "https://graph.facebook.com/v18.0/upload:MTphdHRhY2htZW50OjE0NzRmNDJiLTg1OTgtNDE4OS1iMzkyLWNhNGUyOTFmOWExNT9maWxlX2xlbmd0aD0zMzg3JmZpbGVfdHlwZT1qcGVn?sig=ARbDqLNlQGgg1Z995M8";//+sessionid'
            // axios.post(url, file, {
            //     headers: {
            //         'Authorization': 'OAuth EAANh3RDnUSgBAEkkFZAIQ8Xbgqu53msDu1aKd911ZBpNTJu1gIwUclOb5uPQCWknTrr5kLCnJZB39Iii1Hk9GLEpZAvO1ZC7ZCHMonDomr94lvxdOCzmeQ6LDEHnXwfjJIZBNJXWdB60D1zkBgV24phvh9ZCCxZASkUDTcOQAPau5ZCPQZAWIgm7wPZC',
            //         'file_offset':'0'
            //     }
            // }).then(response=>console.log(response))
            // .catch(error=>console.log(error))



            // const formData = new FormData();
            // formData.append('file', file);
            // fetch(url, {
            // method: 'POST',
            // headers: {
            //     'Authorization': 'OAuth EAANh3RDnUSgBAEkkFZAIQ8Xbgqu53msDu1aKd911ZBpNTJu1gIwUclOb5uPQCWknTrr5kLCnJZB39Iii1Hk9GLEpZAvO1ZC7ZCHMonDomr94lvxdOCzmeQ6LDEHnXwfjJIZBNJXWdB60D1zkBgV24phvh9ZCCxZASkUDTcOQAPau5ZCPQZAWIgm7wPZC',
            //     'file_offset': '0'
            // },
            // body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            // console.log(data);
            // alert('File uploaded successfully!');
            // })
            // .catch(error => {
            // console.error(error);
            // alert('Error uploading file');
            // });




            axios.post('api/threads/uploadmedia/resumable', param)
                .then(response=> this.processFileResponse(file,response.data))
                .catch(error=>console.log(error));
            // axios.post('https://graph.facebook.com/{api-version}/{app-id}/uploads', param)
            //     .then(response=> this.processFileResponse(file,response.data))
            //     .catch(error=>console.log(error));
            /*
                upload:MTphdHRhY2htZW50OjE0NzRmNDJiLTg1OTgtNDE4OS1iMzkyLWNhNGUyOTFmOWExNT9maWxlX2xlbmd0aD0zMzg3JmZpbGVfdHlwZT1qcGVn?sig=ARbDqLNlQGgg1Z995M8
            */



            /*
                POST 
  &file_length={file-length}
  &file_type={file-type}
  &access_token={access-token}
            */
        }

    }
}
</script>