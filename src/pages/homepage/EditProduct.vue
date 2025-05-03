<template>
    <div>
        <div class="topheading">Edit Product</div><br>
        <form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="p-8 lg:w-1/2 md:mx-auto">
        <div class="col-md-6">
				<div class="form-group row">
					<div class="col-md-6">
					<label for="firstname" class="col-form-label text-md-right">Product Name</label>
						<input type="number" class="form-control" name="product_id" v-model="form.product_id" required/>
							<span class="invalid-feedback" role="alert">
								<strong></strong>
							</span>
                        <br>
					<label for="firstname" class="col-form-label text-md-right">Sequence no</label>

                        <input type="text" class="form-control" name="sequence" v-model="form.sequence" required/>
							<span class="invalid-feedback" role="alert">
								<strong></strong>
							</span>
                            <br>
                        <button type="submit" class="btn btn-success">Update</button>
					</div>
				</div>
			</div>
        </form>
		<button class="btn btn-danger" @click="cancel">Cancel</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            form: new Form({
                product_id:'',sequence:''
            })
        }
    },
    computed:{
        ...mapGetters([
		      'editcategory'
		    ]),
    },
    
    mounted(){
        axios.get('api/getproduct')
        .then(response=>this.proccessGetproductresponse(response.data))
        .catch(error=>console.log(error));

        if(this.$parent.product!=null){
            this.form = new Form(this.$parent.product);
        }
    },
    methods:{
        onSubmit(){
            // this.form.submit('post', 'api/updateproduct/post')
            this.form.submit('post', 'api/createproduct/post')            
            .then(response=>this.onSuccess(response))
            .catch(error=>console.log(error))

        },
        onSuccess()
        {
            this.$parent.pedit = !this.$parent.pedit;
        },
        cancel(){
            this.$parent.pedit = !this.$parent.pedit;
        },
    }
}
</script>