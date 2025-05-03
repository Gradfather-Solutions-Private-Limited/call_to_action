<template>
	<div class="container">
    <div class="card mt-10">
            <div class="card-header">
                <h5 class="card-title">Add New Attributes</h5>
            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Name</span></div>
                                <input type="text" v-model="name"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Meta Deta</span></div>
                                <input type="text" v-model="metadata"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Title</span></div>
                                <input type="text" v-model="title"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Keywords</span></div>
                                <input type="text" v-model="keywords"  class="form-control">
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
</div>

</template>

<script>
export default {
	components: {
		
		},
	data(){
		return {
			category :null,
			id:0,name:'',title:'',keywords:'',metadata:'',title:'',
			issave:false
		}
	},
	computed:{
	},
	methods:{
		submit:function(){
			this.issave=true
			let param={
				id:0,name:this.name,title:this.title,keywords:this.keywords,metadata:this.metadata,title:this.title
			}
			axios.post('api/siteadmin/attribute/createupdate',param)
				.then(response=>this.onSuccess(response))
				.catch(error=>console.log(error));
		},
		onSuccess:function(data){
			this.issave=false
			this.$parent.attribute = data;
			this.$parent.editingcompleted();
			this.$parent.isedit = !this.$parent.isedit;
		},
		cancel(){
			this.$parent.isedit = !this.$parent.isedit;
			this.$router.push({name:'attributes'})
		},
	}
}
    	
</script>

