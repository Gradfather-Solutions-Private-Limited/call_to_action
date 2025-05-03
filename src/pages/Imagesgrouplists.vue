<template>
    <div class="container-fluid">
        <div class="card mt-10">
            <div class="card-header">
               
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Company name</span></div>
                                <select class="form-control" v-model="companyid" @change="getloadimageslist()">
                                    <option value="0">--- Select Options --- </option>
                                    <option  v-for="item in companys" :value="item?.user?.companyid">{{item?.user?.name ?? item?.user?.companyid}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 "><span class="heading-border">Images</span></div>
                            <input type="file"  id="attach_file" name="files"  @change="processFile2($event)" style="padding-top: 3px;padding-bottom: 29px;" >
                        </div>
                    </div>
                    <div class="row">
                         {{ uploadedimage }}
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="col-md-12 mt-20 " >
                        <button class="btn btn-success " @click="submit()">
                            <i class='bx bx-save'></i> New Image
                        </button>
                        <button class="btn btn-danger " @click="cancel()">
                            <i class='bx bx-arrow-back' ></i>Back
                        </button>
                </div>
            </div>
        </div>
        <div class="card mt-10">
            <div class="card-header">
               
            </div>
            <div class="card-body">

                <table class="table">
                        <tr>
                            <th>#</th>
                            <th>images</th>
                            <th>Action</th>
                        </tr>
                        <tr v-for="(item,index) in imageslists">
                            <td>{{index+1}}</td>
                            <td>
                                <a :href="item.downloadurl" target="_blank">
                                    <img :src="item.downloadurl" width="100" height="100" />
                                
                                </a>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deleteImage(item.id)">
                                    <i class='bx bx-trash'></i>
                                </button>
                            </td>
                        </tr>
                </table>
                {{ this.listofnumber }}
                <pagination v-model="currentPage" :records="listofnumber" :per-page="noofrec"
                            @paginate="clickCallback()" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from 'v-pagination-3';
import UploadMixin2 from '../components/utilities/UploadMixin2.vue'
    export default {
        mixins:[UploadMixin2],
        data() {
            return {
                name:'',
                id:'',
                companys:[],
                imageslists:[],
                listofnumber:0,
                companyid:0,
                noofrec:50,
                currentpage:1,
            }
        },
        computed: {
			...mapGetters([
				'loggedinuser','uploadedimage'
			]),Pagination
  		},
        mounted() {
            this.$store.commit("assignaddpageheading", 'Upload images Lists');
            this.loadcompanylist();
            
        },
        methods: {
            updatecompany(){

                let obj = {'companyid':this.companyid,'type':this.companyid,'width':1000,'height':1000,'directorypath':'images','counter':0,'typeid':''}
                this.$store.commit('assignfilecomponents',obj);
            },
            loadcompanylist() {
                axios.post('api/companymaster/fetchcompanies',{'flag':1}).then(res => {
                  this.companys = res.data;
                })
            },
            getloadimageslist() {
                let parm = {'companyid':this.companyid,'noofrec':this.noofrec,'currentpage':this.currentpage}
                axios.post('api/getimages/fetchbycompanies',parm).then(res => {
                    this.getcountimages();
                    this.imageslists = res.data;
                    this.updatecompany();
                })
            },
            updateLocale() {

            },
            getcountimages(){
                let parm = {'companyid':this.companyid,'noofrec':this.noofrec,'currentpage':this.currentpage}
                axios.post('api/getimages/getcountimages',parm).then(res => {
                        this.listofnumber=res.data;
                })
            },
            deleteImage() {
                axios.post('api/companymaster/deleteimage',{'id':this.id}).then(res => {
                    this.loadcompanylist();
                })
            },
            clickCallback(){

            },
            cancel(){
                this.$router.back(); 
            }
        }
    }
</script>