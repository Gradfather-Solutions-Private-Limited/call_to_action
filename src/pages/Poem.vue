<template>
<div>
    <div class="col-md-12 flex-between-row">
        <h3>Poems</h3>
        <div class="flex-row">
            <button class="btn btn-success refresh" @click="refresh()"><i class='bx bx-refresh bx-flip-horizontal' ></i></button>
            <button class="btn btn-success" @click="addnew()" v-if="accessid(225)">Add New</button>
        </div>
    </div>
    <div class="col-md-12 flex-between-row">
        <div class="col-md-4">
            <label for="">No. of Records   </label>
            <select style="width:15%" v-model="perPage" @change="refresh()" class="page-records">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>
        </div>
        <div class="col-md-8 flex-row">
            <label for="">Used Times  </label>
            <input type="text" class="form-control" style="width:50% ;" v-model="usedtimes">
            <button class="btn btn-success" @click="refresh()"><i class='bx bx-search-alt-2'></i></button>
        </div>
    </div>
    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Poem</th>
                        <th>Options</th>
                        <th>Used Times</th>
                        <th></th>
                        <!-- <th>Feature Products</th> -->
                    </tr>
                </thead>
                <tbody>
                    <poem-row v-for="(item,index) in poems" :key="item.id" :poem="item" :indx="index" :starttime="starttime" :quiztype="quiztype"></poem-row>
                    <!-- <products-row v-for="(item,index) in product" :key="item.id" :product="item" :indx="index"></products-row> -->
                </tbody>
            </table>
            <div class="flex-row justify-content-end">
                <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback"/>
            </div>
        </div>
    </div>
    <image-modal></image-modal>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import PoemRow from './poem/PoemRow.vue';
import AccessMixin from "../components/access/AccessMixin.vue";
export default {
    mixins:[AccessMixin],
    components:{PoemRow,Pagination},
    data() {
        return {
            poems:[],
            rows:0,
			currentPage:1,
			perPage:10,
            usedtimes:null,
            starttime:0,
            quiztype:1
        }
    },
    computed:{
        ...mapGetters([
            
        ]),
    },
    mounted() {
        this.refresh();
        this.starttime = this.$route.params.starttime
        this.quiztype = this.$route.params.quiztype

    },
    methods: {
        clickCallback (currentPage) {
			this.currentpage=currentPage
			// this.$store.commit("assigncurrentpage",currentPage);
			// this.$store.commit("assigncurrentpage",currentpage);
			this.refresh();
      	},
        refresh(){
            let param={noofrec:this.perPage,currentpage:this.currentPage,usedtimes:this.usedtimes}
            axios.post("api/poem/fetchall",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
            axios.post("api/poems/fetch/count",param)
                .then(response => this.processResponseCount(response.data))
                .catch(error => console.log(error));
            // axios.post('api/siteadmin/categories/withfilters')
			// 	.then(response=>this.processCategoryResponse(response.data))
			// 	.catch(error=>console.log(error));
			// axios.post('api/siteadmin/attributes/getallattributes')
			// 	.then(response=>this.processAttributes(response.data))
			// 	.catch(error=>console.log(error));
        },
        processResponseCount(data){
            this.rows=data.poems
        },
        processResponse(data){
            this.poems=data.poems
        },
        addnew(){
            this.$router.push({name:'createpoem'})
        },
        processCategoryResponse(data){
        		this.categories = data;
        		this.$store.commit('assigncategories',data);
        		this.categoryArray = data.reduce((acc, item) => {
                    acc[item.id] = item.name;
                    return acc;
                }, {});
        		this.categoryArray[0]='All/None';
        },
        processAttributes(data){
            this.$store.commit('assignattributes',data);
            this.originalattributes = data;
            this.attributes = data.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});
            //this.createarrayofattributes();
        },
        categoryFilters(categoryid){
            let filters = [];
            this.categories.forEach(function(item,index){
                if(item.id == categoryid)
                    filters = item.filters;
            });
            return filters;
        },
    },
}
</script>