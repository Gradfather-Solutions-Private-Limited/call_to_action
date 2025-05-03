<template>
    <div class="container">
    <div class="card mt-10">
            <div class="card-header">
                <h5 class="card-title">Add Blogs</h5>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Title</span></div>
                                <input type="text" v-model="form.title"  class="form-control">
                                <div id="error_select_ctype" style="color: red;">{{ msg }}</div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Blog Images</span></div>
                                <input type="file"  id="attach_file" name="files"  @change="processFile2($event)" style="padding-top: 17px;padding-bottom: 29px;" >
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Description</span></div>
                                <q-card flat bordered>
                                    <q-editor v-model="form.description" min-height="10rem" style="margin-left:20px;font-size:16px" />
                                </q-card>
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Active:</span></div>
                                <select v-model="form.disabled" class="form-control">
                                    <option value="0">Active</option>
                                    <option value="1">Disabled</option>
                                </select>
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Meta Deta</span></div>
                                <input type="text" v-model="form.metadata"  class="form-control">
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">URL</span></div>
                                <input type="text" v-model="form.url"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Keywords</span></div>
                                <input type="text" v-model="form.keywords"  class="form-control">
                            </div>
                        </div>

                    </div>
                    <div class="col-md-12 mt-20 " >
                        <button v-if="!issave" class="btn btn-success submit-btn" @click="submit()">
                            <i class='bx bx-save'></i> Save
                        </button>
                        <q-spinner-hourglass color="blue" v-if="issave" size="3em"/>
                        <button class="btn btn-danger cancel-btn" @click="cancel()">
                            <i class='bx bx-arrow-back' ></i>Cancel
                        </button>
                    </div>
            </div>
        </div>
    </div>
    <div class="card mt-10">
            <div class="card-header">
                <h5 class="card-title">Blogs List</h5>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="btn-group btn-group-vertical block">
                    <table class="table table-primary" width="100%" cellspacing="0" >
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>URL</th>
                                <th>Keywords</th>
                                <th>Meta Deta</th>
                                <!-- <th>Description</th> -->
                                <th>Active</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in this.blogslist">
                                <td>{{ item.article_title }}</td>
                                <td>{{ item.url }}</td>
                                <td>{{ item.keywords }}</td>
                                <td>{{ item.metadata }}</td>
                                <!-- <td>{{ item.post_content }}</td> -->
                                <td>{{ checkactive(item.status) }}</td>
                                <td>
                                    <a style="font-size: 20px;" class="glyphicons edit col-md-2" @click="editblogs(item)" href="javascript:void(0);"><i class='bx bxs-message-square-edit'></i></a>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>    

                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue'

export default {
    components: {},
    mixins:[UploadMixin2],
    data() {
        return {
            form : new Form({
             title: '',
             disabled: 0,
             metadata: '',
             url: '',
             keywords: '',
             description:'',
             fullurl: '',
             id: '',    
           }),
           description:'',
           blogslist:[],
           msg:'',
        }
    },
    mounted() {
        let obj = { 'type': 14, 'directorypath': 'blogpost','width':'No','height':'Size','counter': 0, 'typeid': 0, 'typeint': 14 }
        this.$store.commit('assignfilecomponents',obj);
        this.fetch_list();
    },
    computed:{
        ...mapGetters([
			'uploadedimage'
		]),
    },
    methods: {
        submit(){
            axios.post('api/blog/create',this.form)
            .then(response => {
                if(response.data.flag==1){
                    this.msg = response.data.msg;
                }else{
                    this.fetch_list();
                    this.msg = '';
                    this.reset();
                }
                
              
            }).catch(error => {
                this.issave = false;
                // this.$toast.error('Something went wrong');
            })
        },
        reset(){
            var self = this;
                Object.keys(this.form).forEach(function (key, index) {
                    self.form[key] = '';
                    if(key=='disabled'){
                        self.form[key] = 0;
                    }
                });
        },
        fetch_list(){
            axios.post('api/blog/fetch_blog_list')
            .then(response => {
               
               this.blogslist = response.data;
            }).catch(error => {
                
            })
        },
        editblogs(data){
            var self = this;
                Object.keys(this.form, data).forEach(function (key, index) {
                    self.form[key] = data[key];
                    
                });
                self.form['title'] = data['article_title'];
                self.form['disabled'] = data['status'];
                self.form['description'] = data['post_content'];
        },
        checkactive(data){
            if(!data){
                return 'Active';
            }else{
                return 'Disabled';
            }
        },
        cancel(){
            this.$router.go(-1);
        },
        uploaded(){
          let uploadedimage =  this.uploadedimage;
          
            if(uploadedimage!=null){
                this.form.fullurl = uploadedimage.fullurl;
            }else{
                this.form.fullurl = '';
            }
        },
        
    },
    
}
</script>
