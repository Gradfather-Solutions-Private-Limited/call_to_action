<template>
<div class="container">
    <div class="card mt-10">
            <div class="card-header">
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4" v-if="accessid(295)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Name</span></div>
                                <input type="text" v-model="name"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(296)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">MRP:</span></div>
                                <input type="number" v-model="mrp"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(297)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Title</span></div>
                                <input type="text" v-model="title"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(298)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Keywords</span></div>
                                <input type="text" v-model="keywords"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(299)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Cost (C.P)</span></div>
                                <input type="text" v-model="cp"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(300)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Active:</span></div>
                                <select v-model="disabled" class="form-control">
                                    <option value="0">Active</option>
                                    <option value="1">Disabled</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(301)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">sp</span></div>
                                <input type="text" v-model="sp"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(358)" >
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Validitiy Inday</span></div>
                                <input type="number" v-model="validityindays"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(302)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Meta Deta</span></div>
                                <input type="text" v-model="metadata"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(303)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">URL</span></div>
                                <input type="text" v-model="url"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(304)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Model Name</span></div>
                                <input type="text" v-model="modelno"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(305)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Shipping Charges</span></div>
                                <input type="text" v-model="shippingcharges"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-4" v-if="accessid(306)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Exchange Price</span></div>
                                <input type="text" v-model="emi_cost"  class="form-control">
                                
                            </div>
                        </div>
                        <div class="col-md-12" v-if="accessid(307)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Manufacturer Info</span></div>
                                <select class="form-control" v-model="manufacturerid" >
                                    <option v-for="manufacturer in manufacturers"  :key="manufacturer.id" :value="manufacturer.id">{{manufacturer.name}}</option>
                                </select>
                                
                            </div>
                        </div>
                        <div class="col-md-12" v-if="accessid(308)">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Description</span></div>
                                 <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady" @input="onChange"></ckeditor>
                            </div>
                        </div>
                        <vue-editor v-model="content"></vue-editor>
                    </div>
                    <div class="col-md-12 mt-20 " >
                        <button v-if="!issave" class="btn btn-success submit-btn" @click="submit()">
                            <i class='bx bx-save'></i> Save
                        </button>
                        <q-spinner-hourglass color="blue" v-if="issave" size="3em"/>
                        <button class="btn btn-danger col-md-2" @click="cancel()">
                            <i class='bx bx-arrow-back' ></i>Cancel
                        </button>
                    </div>
            </div>
        </div>
    </div>
    <div class="card mt-10" v-if="this.edititem != null && accessid(329)">
            <div class="card-header">
                <div style="float: left;">
                     <h5 class="card-title">Common Products</h5>
                </div>
                <div style="float: right;" v-if="this.edititem.com_groupid != 0">
                        <button type="button" class="btn btn-primary" @click="addnewsubproduct()">New Common Products</button>
                </div>
                
                <div style="float: right;" v-else>
                        <button type="button" class="btn btn-primary" @click="assigncomgroupid()">Assign Common group</button>
                </div>
            </div>
            <div class="card-body">
                <!-- <div class="col-md-12" >
                   Price <input type="text"  v-model="mainvalue" @change="calculation()">
                   % <input type="text"  v-model="mainvalue1" @change="calculation()">
                   <div>
                        <b>18% GST Ke Sath</b>{{this.totalwith18}}<br/>
                        <b>500 GM</b>{{this.fivehundradgm}}<br/>
                        <b>100 GM</b>{{this.hundradgm}}<br/>
                        <b>25 GM</b>{{this.twentifive}}<br/>
                   </div>
                </div> -->
                <div class="col-md-12" v-for="(item,index) in commonProductslist">
                    <div class="row">
                        <div class="col-md-4">
                                <div class="col-md-12 "><span class="heading-border">Products Name {{index+1}}</span></div>
                                <input type="text" v-model="item.name"   class="form-control">
                        </div>
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="col-md-12 "><span class="heading-border">Products Price {{index+1}}</span></div>
                                    <input type="text" v-model="item.sp"   class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <div class="col-md-12 "><span class="heading-border">Products mrp {{index+1}}</span></div>
                                    <input type="text" v-model="item.mrp"   class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-4 pt-30">
                                    <button type="button" class="btn btn-primary" @click="savesubproduct(index,1,item.disabled)">Save</button>
                                    <div class="loader" v-show="showloader == index"></div>
                                </div>
                                <div class="col-md-6 pt-30">
                                    <button type="button" :class="item.disabled==0?'btn btn-primary':'btn btn-danger'" @click="savesubproduct(index,2,item.disabled)">{{item.disabled==0?'Active':'Disabled'}}</button>
                                    <div class="loader" v-show="showloader2 == index"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
       
    </div>

</template>
<script>
import { mapGetters } from 'vuex';
import CommonProducts from '../commonproducts/CommonProducts.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from "@ckeditor/ckeditor5-vue"
import Constants from "./../../components/access/Constants.vue";

export default {
    mixins: [Constants],
    data() {
        return {
            
            category_id: 0,
            cp: "",
            description: "",
            disabled: 0,
            id: 0,
            keywords: "",
            metadata: "",
            modelno: "",
            mrp: "",
            name: "",
            sp: "",
            validityindays:'',
            title: "",
            url:'',
            emi_cost:'',
            selectedstoreid:0,
            issave:false,
            shippingcharges: 0.00,
            commonProductsname:[],
            commonattributeid:'',
            commonProductsprice:[],
            commonProductslist:[{name:'',id:'',sp:'',url:''}],
            showloader:'no',  
            showloader2:'no',  
            mainvalue:0,
            mainvalue1:0,
            totalwith18:0,
            fivehundradgm:0,
            hundradgm:0,
            twentifive:0,
            editor: ClassicEditor,
            editorData: "<p>No Description found</p>",
            manufacturers:'',
            manufacturerid:0,
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
                    }
            }

        }
    },
    components: {
        ckeditor: CKEditor.component
    },
    computed:{
        ...mapGetters(['edititem','attributes']),
       
       
    },  
    mounted() {
        this.refresh();
        this.getcommonProducts();
        this.getmanufacturerinfos();    
        this.$store.commit("assignaddpageheading", 'Add New Products');
    },
    methods: {
        getmanufacturerinfos(){
            axios.post('/api/getmanufacturerinfos')
           .then(response => {  
                this.manufacturers = response.data;
            })
        },
        calculation(){
           let percentage = (this.mainvalue * this.mainvalue1) / 100;
           this.totalwith18 =  parseFloat(this.mainvalue) + parseFloat(percentage);
           let onegmvalue = parseFloat(this.totalwith18)/1000;
           let sumof = onegmvalue*500;
           let lesspers = ((10/ 100) * sumof).toFixed(2);
           this.fivehundradgm = parseFloat(sumof)+parseFloat(lesspers);

           let sumof1 = onegmvalue*100;
           let lesspers1 = ((20/ 100) * sumof1).toFixed(2);
           this.hundradgm = parseFloat(sumof1)+parseFloat(lesspers1);

           let sumof2 = onegmvalue*25;
           let lesspers2 = ((30/ 100) * sumof2).toFixed(2);
           this.twentifive = parseFloat(sumof2)+parseFloat(lesspers2);


        },
        refresh(){
            console.log(this.edititem);
            if(this.edititem != null){
                if(this.edititem.length > 0){
                    let found = this.attributes.find(block=>block.id==this.edititem.attribute[0]?.attribute_id);
                    this.commonattributeid = found.id;
                }
            }
            
            if(this.edititem!=null){
                this.category_id= this.edititem.category_id,
                this.cp= this.cp,
                this.editorData= this.edititem.description,
                this.disabled= this.edititem.disabled,
                this.id= this.edititem.id,
                this.url=this.edititem.url,
                this.keywords= this.edititem.keywords,
                this.metadata=this.edititem.metadata,
                this.modelno= this.edititem.modelno,
                this.mrp= this.edititem.mrp,
                this.name= this.edititem.name,
                this.sp= this.edititem.sp,
                this.validityindays=this.edititem.validityindays,
                this.selectedstoreid=this.edititem.selectedstoreid,
                this.title=this.edititem.title,
                this.emi_cost=this.edititem.emi_cost,
                this.shippingcharges=this.edititem.shippingcharges
                this.manufacturerid = this.edititem.manufid
            }
        },
        getcommonProducts(){
            let products = {'url':this.edititem?.url}
            
                if(this.edititem?.url){
                    axios.post('api/common/product/fetch',products).then(response => {
                    this.commonProductslist = response.data;
                })
            }
           
        },
        
        submit(){
            this.issave=true
            let param={category_id: this.category_id,
            cp: this.cp,description: this.editorData,disabled: this.disabled,
            id: this.id,url:this.url,
            keywords: this.keywords,
            metadata:this.metadata,
            modelno: this.modelno,
            mrp: this.mrp,
            name: this.name,selectedfy:0,
            sp: this.sp,selectedstoreid:this.selectedstoreid,
            validityindays: this.validityindays,
            title: this.title,
            emi_cost:this.emi_cost,
            manufid: this.manufacturerid,
            shippingcharges: this.shippingcharges}
            console.log("param",param);
            axios.post("api/product/createupdate",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },  
        processResponse(){
            alert("saved successfully")
            console.log("valid:",this.validityindays);
                this.category_id= 0;
                this.cp= '';
                this.description= '';
                this.disabled= 0;
                this.id= 0;
                this.url='';
                this.keywords= '';;
                this.metadata='';
                this.modelno= '';
                this.mrp= '';
                this.name= '';
                this.sp= '';
                this.validityindays='',
                this.selectedstoreid=0;
                this.title=0;
                this.emi_cost='';
                this.shippingcharges=0.00;
            this.issave=false
            this.$router.push({path:'/products'})
        },
        cancel(){
            this.$router.push({path:'/products'})
        },
        addnewsubproduct(){
            this.commonProductslist.push({name:'',id:'',sp:'',url:''})
        },
        assigncomgroupid (){
            let parm = {'productid':this.edititem.id,'productids':'','commonattributeid':this.commonattributeid}
            axios.post('api/common/product/create',parm)
            .then(response => {
                this.edititem.com_groupid = response.data;
            }).catch()
        },
        savesubproduct(i,key,item){
            let disableddata = this.disabled;
            if(key==1){
                this.showloader = i;
            }else{
                this.showloader2 = i;
                disableddata = item==0?1:0;
            }
            let product =this.commonProductslist[i];
            let param={category_id: this.category_id,
            cp: product.cp,description: this.description,disabled:disableddata,
            id: product.id,mrp: product.mrp,
            url:product.url,com_groupid:this.edititem.com_groupid,
            categoryids: this.edititem.categoryids,
            tobeselectedbyuser: this.edititem.tobeselectedbyuser,
            attributestobedisplayed: this.edititem.attributestobedisplayed,
            keywords: this.keywords,
            metadata:this.metadata,
            modelno: this.modelno,
            name: product.name,selectedfy:0,
            sp: product.sp,selectedstoreid:this.selectedstoreid,
            title: this.title,
            emi_cost:this.emi_cost,
            
            shippingcharges: this.shippingcharges}

            console.log(param);
            axios.post("api/product/createupdate",param)
            .then(response => {
                this.showloader = 'no';
                this.showloader2 = 'no';
                this.getcommonProducts();
            })
            .catch(error => console.log(error));
        }
    },
}
</script>
<style scoped>
.save-btn{
    width: 30%;
    font-size: 15px;
}
</style>