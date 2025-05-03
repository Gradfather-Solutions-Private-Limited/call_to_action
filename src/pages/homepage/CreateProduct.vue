<template>
    <div>
        <h2>Create a product home page</h2>
		<button class="btn btn-danger" @click="cancel">Cancel</button>
        <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="p-8 lg:w-1/2 md:mx-auto">
        <div class="col-md-6">
				<div class="form-group row">
			
					<div class="col-md-6">
					<label for="firstname" class="col-form-label text-md-right">Product Name</label>
                        <!-- <autocomplete
							ref="autocomplete"
							:source="distributionGroupsEndpoint"
							input-class="form-control"
							results-property="data"
							:results-display="formattedDisplay"
							:request-headers="authHeaders"
							v-model="form.product_id"
							@selected="addDistributionGroup">
						</autocomplete> -->
						<input type="hidden" class="form-control" name="product_id" v-model="form.product_id"  required/>
							<span class="invalid-feedback" role="alert">
								<strong></strong>
							</span>
                        <br>
					<label for="firstname" class="col-form-label text-md-right">Sequence no</label>
                  
                        <input type="text" class="form-control"  name="sequence" v-model="form.sequence" required/>
							<span class="invalid-feedback" role="alert">
								<strong></strong>
							</span>
                            <br>
					<label for="firstname" class="col-form-label text-md-right">Category id</label>
                            <input type="hidden" class="form-control" name="category_id" v-model="getsequence" required/>
							<span class="invalid-feedback" role="alert">
								<strong></strong>
							</span>
                            <br>
                        <button type="submit" class="btn btn-success">Add Product</button>
					</div>
				</div>
			</div>
        </form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Constants from '../../components/utilities/Constants.vue'
export default {
    mixins:[Constants],
    data(){
        return{
            product_id:'',
            form: new Form({
                product_id:'',sequence:'',category_id:''
            })
        }
    },
    components: {
			
  	  	},
    computed:{
        ...mapGetters([
		      'categories','allproducts','editproduct'
		    ]),
    getsequence(){
        return this.form.category_id=this.categories.id;        
    },
    authHeaders () {
		    return {
		      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1Ni....'
		    }
         }
    },
    mounted(){
       
    },
    methods:{
        onSubmit(){
            this.form.submit('post', 'api/createproduct/post')
            .then(response=>this.onSuccess(response))
            .catch(error=>console.log(error))

        },
        distributionGroupsEndpoint (input) {
			return  window.axios.defaults.baseURL+ '/autocomplete/products/search?query='+input;
        },
        formattedDisplay (result) {
            return result.name;
        },
        addDistributionGroup (group) {
				 this.form.product_id=group.value;
			},
        onSuccess(data){
            this.$parent.createproduct = !this.$parent.createproduct;
            this.allprod();
        },
        cancel(){
            this.$parent.createproduct = !this.$parent.createproduct;
        },
        
    }
}
</script>