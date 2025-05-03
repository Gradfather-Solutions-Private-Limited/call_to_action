<template>
    <div>
        <div class="col-md-12"  v-if="!isedit && !isprod">
                <div class="col-md-12 flex-between-row">
                    <h3>All Categories List</h3>
                </div>
            <div class="rightsideprod"><br>

                <div class="col-md-12"> 
                    <label for="firstname" class="col-form-label text-md-right">Category Name</label>
                    <input type="text" name="name" v-model="name" placeholder="Enter category name" aria-label="Enter category name">
                    <label for="firstname" class="col-form-label text-md-right">Sequence no</label>
                    <input type="number" name="sequence" v-model="sequence" placeholder="Enter sequence" aria-label="Enter sequence">
                    <button class="btn btn-success btn-sm" type="submit">Add</button>
                </div>

            <table class="table">
                <thead>
                    <tr>                
                    <td><h4><b>Category Name</b></h4></td>
                    <!-- <td><h4><b>Sequence no</b></h4></td> -->
                    <td><h4><b>All Products</b></h4></td>
                    <td><h4><b>Edit</b></h4></td>
                    <td><h4><b>Delete</b></h4></td>
                    </tr>
                </thead>
                <tr v-for="(item) in categorieslist" :key="item.id">

                    <td>{{item.name}}</td>
                    <td><button class="btn btn-info" @click="getallproduct(item)">View</button></td>  
                    <td><button class="btn btn-primary" @click="cedit(item)">Edit</button></td> 
                    <td><button class="btn btn-danger" @click="deleteitem(item)">Delete</button></td>                           
                </tr>
            </table>     
            </div>          
        </div>
        <!-- <homepage-form v-if="viewno==2"></homepage-form> -->
        <div v-if="isedit">
            <edit-category></edit-category>
        </div>
        <div v-if="isprod">
            <home-product ></home-product>
        </div>
    </div>
</template>
<script>
import EditCategory from './EditCategory.vue'
import { mapGetters } from 'vuex'
import HomeProduct from './HomeProduct.vue'
export default {
    data(){
        return{
            alldata:[],
            categorieslist:[],           
            categoryadd:[],
            isedit:false,
            isprod:false,
            name:'',
            sequence:''        
        }
    },
    components: {
        EditCategory,HomeProduct
    },
    computed:{
		...mapGetters([
			'viewno','categories','editproduct'
		]),         	
	},
    mounted(){
      axios.post('api/siteadmin/homepage/categories/fetch')
      .then(response=>this.ProcessResonse(response.data))
      .catch(error=>console.log(error));
    },
    methods:{
        onSubmit(){
            let param={name:this.name,sequence:this.sequence}
            axios.post( 'api/addnew/category',param)
            .then(response=>this.processaddcategoryResponse(response))
            .catch(error=>console.log(error));
        },
        cedit(item){
            this.isedit = !this.isedit;
            this.category = item;
        },
        deleteitem(item){
            let param={cateid:item.id};
            axios.post('api/addnew/categorydelete',param)
        },
        ProcessResonse(data)
        {
            this.categorieslist = data
            
        },
        getallproduct(item){
            this.isprod = !this.isprod; 
            this.$store.commit('assigncategories',item);
            this.allprod();
        }
    }
}
</script>
