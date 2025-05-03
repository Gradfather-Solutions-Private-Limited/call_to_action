<template>
    <div>
        <input type="text" class="form-control" placeholder="images Link" v-model="imageslink" @input="onchnageimages" />
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady" @input="onChange"></ckeditor>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from "@ckeditor/ckeditor5-vue"

export default {
    components: {ckeditor: CKEditor.component},

    data() {
        return {
            editor: ClassicEditor,
            editorData: "<p>No Description found</p>",
            imageslink:'',
            editorConfig: {
                 toolbar: {
                        items: [    
                        'undo', 'redo',
                        '|', 'heading',
                        '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                        '-', // break point
                        'bulletedList', 'numberedList', 'indent', 'outdent',
                        '|', 'ckboxImageEdit', 'imageInsert', 
                        '|', 'blockQuote', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells',
                        'link', 'blockQuote',
                        '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageTextAlternative',

                            'imageStyle:center',
                    ]
                },
            }
        }
    },
    computed:{
    ...mapGetters([
            'Ckeditortext'
    ]),
    
    },
    watch: {
        '$store.state.Ckeditortext': function() {
            this.editorData =  this.Ckeditortext;
        }
    },
    methods: {
        onChange(){
            console.log(this.editorData);
            this.$parent.form.description2 = this.editorData;
        },
        onchnageimages(){
            let images = "<img src='"+this.imageslink+"'>";
            let newdata = images + this.Ckeditortext;
            this.$store.commit('assignCkeditortext', newdata)
        },
    }
}
</script>