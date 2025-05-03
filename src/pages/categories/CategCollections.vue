<template>

    <div class="container-fluid ">
        <div class="card mt-10">
                <div class="card-header">
                </div>
                <div class="card-body">
                    <div class="col-md-12 maincontainer">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="col-md-12 "><span class="heading-border">Title</span></div>
                                <input type="text" v-model="title"  class="form-control">
                            </div>
                            <div class="col-md-3">
                                    <multiple-categories :lable="categlist"></multiple-categories>
                            </div>
                            <div class="col-md-2">
                                <label class="heading-border">Home Page:</label>
                                <input type="checkbox" v-model="homepage">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="col-md-12 mt-20 " >
                            <button class="btn btn-success " @click="submit()">
                                <i class='bx bx-save'></i> Save
                            </button>
                            <button class="btn btn-danger " @click="cancel()">
                                <i class='bx bx-arrow-back' ></i>Back
                            </button>
                    </div>
                </div>
                <div class="card mt-10">
                    <div class="card-header">
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <tr>
                                <th>Title</th>
                                <th>Selectcategories</th>
                            </tr>
                            <tr v-for="item  in categoriescollectionlist">
                                <td>{{ item.name }}</td>
                                <td>
                                    <div class="col-md-12 example" style="height: 150px; overflow: auto;">
                                        <div class="row">
                                            <div style="margin-right: 10px;"  v-for="(categoryitem) in categories" :key="categoryitem.id">
                                                <div class="col-md-12 card_1">
                                                    <div class="col-md-12 " >
                                                        <input type="checkbox" style=" margin-right:5px;" :value="categoryitem.id" v-model="selectedcategories" @change="updatecategory(item)">
                                                            {{ categoryitem.name }}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </td>
                                {{ updatecategoryid(item) }}
                            </tr>
                        </table>
                    </div>
                </div>

        </div>
    </div>
</template>
<script type="text/javascript">
    import MultipleCategories from "./../utility/MultipleCategories.vue";
    import { mapGetters } from 'vuex'

    export default {
        components: {
			MultipleCategories
  	  	},
        
        data() {
            return {
                categlist:'',
                selectcategories:[],
                selectedcategories:[],
                title:'',
                homepage:false,
                categoriescollectionlist:[],
                categoryArray:'',
            }
        },
        computed:{
            ...mapGetters([
			'categories'
		    ]),
        },
        mounted(){
           this.getCategorylogs();
           this.getCategorycollections();
        },
        methods: {
            getCategorycollections(){
                axios.get('/api/getCategorycollections')
                   .then(response => {
                        this.categoriescollectionlist = response.data;

                    });
            },
            updatecategoryid(item){
                if(item.categoryids !=null)
					this.selectedcategories = item.categoryids.split(",")
                
                    console.log(this.selectedcategories)
            },
            updatecategory(){
			let param = {productid:this.product.id,categoryids:this.selectedcategories.join()};
				axios.post('api/siteadmin/categories/withfilters',param)
	    			.then(response=>{

                    })
	    			.catch(error=>console.log(error));
		},
            getCategorylogs(){
                axios.post('api/siteadmin/categories/withfilters')
                .then(response => {
                    this.categories = response.data;
                    this.$store.commit('assigncategories', response.data);
                    this.categoryArray = data.reduce((acc, item) => {
                        acc[item.id] = item.name;
                        return acc;
                    }, {});
                    this.categoryArray[0] = 'All/None';
                })
                .catch(error => console.log(error));
            },
            submit(){
                var param = {categoryids:this.selectcategories,title:this.title,homepage:this.homepage};
                
                axios.post('api/collections/createupdate', param)
				.then((response) => this.processAttributeallListResponse(response.data))
                        .catch((err) => {
                            console.log('', err)
                    });
            }
        }
    }
</script>