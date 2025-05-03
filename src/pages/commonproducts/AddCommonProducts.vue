<template>
    <div class="container">

        <div class="card mt-10">
            <div class="card-header">
                <h5 class="card-title">Set Related Products</h5>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Products</span></div>
                                <product-autocomplete boxname="product_id" changeevent="1" ></product-autocomplete>
                                <input type="hidden" v-model="product_id" v-on:change="event => checkExist(event)" >
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12">
                                <div class="col-md-12"><span class="heading-border">Select Relatable Products</span></div>
                                <product-autocomplete boxname="select_product_id" changeevent="1"></product-autocomplete>
                                <input type="hidden" v-model="select_product_id" >
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="row">
                                
                                <div class="col-md-6">
                                    <div class="col-md-12"><span class="heading-border">Select Attribute</span></div>
                                    <select v-model="commonattributeid" class="form-control">
                                        <option v-for="(item) in attributes" :value="item.attribute.id"  >{{item.attribute.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-control col-md-12 mt-20" style="  overflow: scroll; overflow-x: hidden;">
                                    <div v-for="option in select_drop_data" style="display: inline;margin-right: 10px;padding: 4px;">
								        {{ option.name }}<i class='bx bxs-message-square-x'  @click="remove_data(option)"></i>,
							        </div>
                                </div>
                        </div>
                    <div class="col-md-12 mt-20 " >
                        <div class="row">
                                <button v-if="!issave" class="btn btn-success submit-btn" @click="submit()">
                                    <i class='bx bx-save'></i> Save
                                </button>
                                <button class="btn btn-danger cancel-btn" @click="cancel()">
                                    <i class='bx bx-arrow-back' ></i>Cancel
                                </button>
                                <div class="col-md-3">
                                    <span>Display By Product</span>
                                    <select v-model="type"  @change="displaybyproduct()" class="form-control">
                                            <option value="0" >Select</option>
                                            <option value="1" >Color</option>
                                            <option  value="2" >Images</option>
                                            <option  value="3" >Size</option>
                                    </select>
                            </div>
                        </div>
                    </div>
        </div>
            </div>
        </div>
        <div class="col-md-12">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Related Product Name</th>
                        <th> MRP</th>
                        <th>SP</th>
                        <th>Delete</th>
                        <!-- <th>Feature Products</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in productlist" :key="item.id">
                        <td>{{(index+1)}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.mrp}}</td>
                        <td>{{item.sp}}</td>
                        <td style="font-size: 20px;"><a href="#" @click="remove_single_data(item)"><i class='bx bx-message-alt-x'></i></a></td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>
        <div class="col-md-12">
            <h4></h4>
        </div>
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Constants from '../../components/utilities/Constants.vue';
import ProductAutocomplete from '../../components/autocomplete/ProductAutocomplete.vue';
export default {
    components:{
        ProductAutocomplete
    },
    
    mixins:[Constants],
    data() {
        return {
            id:0,
            modelSingle: '',
            url:'',
            modelMultiple: [],
            select_drop_data:[],
            select_drop_data_id:[],
            options:[],
            productmain:'',
            issave:false,
            searchstring:'',
            product:'',
            product_id:0,
            attributes:[],
            firstproduct:'',
            productlist:[],
            autoVisibility:false, 
            commonattributeid:'',
            listproduct:[],
            select_product_id:0,
            type:0,

        };
    },
    computed: {
        ...mapGetters(['edititem','mobiles','selectedaddress'])
    },
    mounted() {
        this.refresh();
    },
    methods: {
        displaybyproduct(){
            let param={'type':this.type,'groupid':this.firstproduct.com_groupid}
            if(this.product_id != null && this.type != 0){
                axios.post("api/attributes/displaybyproduct",param)
                    .then(response => {
                        
                })
                .catch(error => console.log(error));
            }
                
        },
        initialize(){
            if(this.edititem!=null){
                this.options.forEach(element => {
                    if(this.edititem.id==element.id){
                        this.modelSingle=element
                    }
                });
                console.log('edititem',this.edititem.commonproductids)
                // let related=JSON.parse(this.edititem.commonproductids)
            }
        },
        remove_single_data(item){
                let param={id:item.id}
                axios.post("api/common/product/delete",param)
                    .then(response => {
                            this.selectproductlist();
                    })
                    .catch(error => console.log(error));
        },
        selectproductlist(data){
            this.firstproduct = data;
            let param={url:data.url}
            axios.post("api/common/product/fetch",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(data){
            this.productlist=data
            this.select_drop_data = data;
            let self = this;
            data.forEach(function (key, index) {
                self.select_drop_data_id.push(key.id)
			});
        },
        changeeventproduct(item){
            if(this.attributes.length == 0){
                this.attributes = item.attribute;
                this.$store.commit('assignedititem',{url:item.url})
            }
            if(this.select_product_id!=''){
                let exitsnamecheck = this.select_drop_data.find(block => block == item.name)
				if (!exitsnamecheck) {
					this.select_drop_data.push(item)
                    this.select_drop_data_id.push(item.id)
				}
                
            }
        },
        remove_data(data){
            for (let i = 0; i < this.select_drop_data.length; i++) {
				if (this.select_drop_data[i] == data) {
					this.select_drop_data.splice(i, 1);
					this.select_drop_data_id.splice(i, 1);
				}
			}
        },
        submit(){
                if(this.product_id == '' && this.product_id == 0){
                    alert('Product should not be empty.');
                    return false;
                }
                if(this.select_product_id == 0 && this.select_drop_data.length < 0){
                    alert('Select Relatable Products should not empty.');
                    return false;
                }
                if(this.commonattributeid == ''){
                    alert('Attribute should not be empty.');
                    return false;
                }
                if(this.product_id == this.select_product_id){
                    alert('Product should not same.');
                    return false;
                }
               let productiddata='';
               let self = this;
               this.select_drop_data_id.forEach(function (key, index) {
                    if(self.product_id != key){
                        productiddata = productiddata + ','+ key;
                    }
			    });
                let param={productid:this.product_id,productids:productiddata,commonattributeid:this.commonattributeid}
                axios.post('api/common/product/create',param)
                    .then(response=>this.processDetailSavedResponse(response.data))
                    .catch(error=>console.log(error));
        },
        processDetailSavedResponse(data){
            if(data==true){
                this.modelMultiple=[]
                this.product=''
                alert("Product saved successfully");
            }else{
                alert("Product not saved, try again");
            }
        },
        refresh(){
            let param={searchtext:this.searchstring}
            axios.post('api/siteadmin/product/withattributes/search',param)
                .then(response=>this.processDetailResponse(response.data))
                .catch(error=>console.log(error));
            this.initialize()
        },  
        processDetailResponse(data){
            this.options=data.products
        },
        cancel() {
            this.$router.go(-1);
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