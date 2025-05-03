<template>
    <div class="col-md-12">
        <div class="topheading">Update Category</div>
        <br>
		<button class="btn btn-danger" @click="cancel">Cancel</button>
        <div class="form-group row">				
            <div class="col-md-4">                        
            <label for="firstname" class="col-form-label text-md-right"><h3>Category Name</h3></label>				
                <input type="text" class="form-control" name="name" v-model="name" required/>
                    <span class="invalid-feedback" role="alert">
                        <strong></strong>
                    </span>
                    <br>
                <button type="submit" class="btn btn-success">Update</button>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
                name:''
        }
    },
    mounted(){
        axios.get('api/getcategory')
        .then(response=>this.proccessGetcategoryresponse(response.data))
        .catch(error=>console.log(error));

        if(this.$parent.category!=null){
            this.form = new Form(this.$parent.category);
        }
    },
    methods:{
        onSubmit(){
            let param={name:this.name}
            axios.post('api/updatecategory/post',param)
            .then(response=>this.onSuccess(response))
            .catch(error=>console.log(error))

        },

    cancel(){
            this.$parent.isedit = !this.$parent.isedit;
        },
    }
}
</script>