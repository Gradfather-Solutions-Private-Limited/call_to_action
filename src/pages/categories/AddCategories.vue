<template>
    <div class="container">
    <div class="card mt-10">
            <div class="card-header">
                <h5 class="card-title">Add New Category</h5>
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
                                <div class="col-md-12 "><span class="heading-border">Active:</span></div>
                                <select v-model="disabled" class="form-control">
                                    <option value="0">Active</option>
                                    <option value="1">Disabled</option>
                                </select>
                                
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
                                <div class="col-md-12 "><span class="heading-border">MRP:</span></div>
                                <input type="number" v-model="mrp"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">URL</span></div>
                                <input type="text" v-model="url"  class="form-control">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Parent ID:</span></div>
                                <select v-model="parent_id" class="form-control">
                                    <option value="0">Select Category</option>
                                    <option v-for="item in categories"  :key="item.id" :value="item.id">{{item.name}}</option>
                                </select>
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
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            issave:false,
            name:'',
            active:0,
            metadata:'0',
            url:'',
            parent_id:0,
            title:'',
            keywords:'',
            categories:[],
            id:0
        }
    },
    mounted() {
        this.refresh();    
    },
    computed:{
        ...mapGetters([
			'edititem'
		]),
    },
    methods: {
        initialize(){
            this.id=0
            this.name='',
            this.active=0,
            this.metadata='',
            this.url='',
            this.parent_id=0,
            this.title='',
            this.keywords=''
        },
        refresh(){
            axios.post("api/siteadmin/categories/withfilters")
            .then(response => this.processResponseCategrory(response.data))
            .catch(error => console.log(error));
            if(this.edititem!=null){
                this.id=this.edititem.id
                this.name=this.edititem.name,
                this.active=this.edititem.active,
                this.metadata=this.edititem.metadata,
                this.url=this.edititem.url,
                this.parent_id=this.edititem.parent_id,
                this.title=this.edititem.title,
                this.keywords=this.edititem.keywords
            }else{
                this.initialize();
            }
        },
        processResponseCategrory(data){
            this.categories=data
        },
        cancel(){
            this.$router.push({name:'categories'})
            this.initialize()
        },
        submit(){
            this.issave=true
            let param={
                id:this.id,
                name:this.name,
                active:this.active,
                metadata:this.metadata,
                url:this.url,
                parent_id:this.parent_id,
                title:this.title,
                keywords:this.keywords
            }
            axios.post("api/siteadmin/category/createupdate",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(){
            this.issave=false
            this.initialize()
            alert("saved successfully")
        },
    },
}
</script>
<style scoped>
.save-btn{
    width: 30%;
    font-size: 15px;
}
</style>