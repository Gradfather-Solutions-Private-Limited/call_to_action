<template>
    <div>
        <div class="container-fluid" v-if="accessid(315)">
            <div class="card mt-10">
                <div class="card-header" >
                    <div class="col-md-12">
                            <div class="row justify-content-between">
                                    <div class="col-md-3">
                                    </div>
                                    <div class="col-md-5 user-top-navi">
                                        <button class="btn btn-success refresh" @click="refresh()"><i
                                                class='bx bx-refresh bx-flip-horizontal'></i></button>

                                        <label for="">No. of Records </label>
                                        <select style="width:30%" v-model="perPage" @change="refresh()" class="page-records">
                                            <option :value="10">10</option>
                                            <option :value="20">20</option>
                                            <option :value="50">50</option>
                                            <option :value="100">100</option>
                                        </select>
                                    </div>
                            </div>
                    </div>
                </div>
                <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="col-md-12" >
                        <span class="heading-border">
                        Search 
                        </span>
                    </div>
                        <div class="flex-row">
                            <input type="text" class="form-control"
                                v-model="searchtxt">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <multiple-categories :lable="categlist"></multiple-categories>
                    </div>
                    <div class="col-md-4">
            
          </div>
                    
                </div>
                <div class="row mt-30">
                    <div class="col-md-2">
                        <button class="btn btn-primary col-md-12" @click="refresh()"><i
                                    class='bx bx-search-alt-2'></i> Search <div  class="loader" v-show="Loading"></div></button>
                    </div>
                   <div class="col-md-2">
                        <button class="btn btn-success col-md-12" @click="addnew()">
                            <i class='bx bx-plus'></i>
                            Add New</button>
                   </div>
                </div>
                </div>

            </div>
        </div>

        <div class="container-fluid">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th></th>
                                <th v-if="accessid(295)">Name</th>
                                <th v-if="accessid(296)">MRP/SP/CP</th>
                                <!-- <th>Model Name</th> -->
                                <th v-if="accessid(316)" style="width:50px">Parent Category</th>
                                <th v-if="accessid(317)">Category</th>
                                <th v-if="accessid(318)">Filters</th>
                                <th v-if="accessid(319)" style="font-size: 12px;">Attributes tobe selectd by the user</th>
                                <th  v-if="accessid(320)" style="font-size: 12px;">Selected filter to be displayed</th>
                                <th v-if="accessid(321)">Image</th>
                                <!-- <th>Common Products</th> -->
                               
                                <!-- <th>Feature Products</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <products-row v-for="(item, index) in product" :key="item.id" :product="item"
                                :indx="index"></products-row>
                        </tbody>
                    </table>
                    <div class="flex-row justify-content-end">
                        <pagination v-model="currentPage" :records="rows" :per-page="perPage"
                            @paginate="clickCallback" />
                    </div>
                </div>
            </div>
        </div>
        <image-modal></image-modal>
    </div>

</template>
<script>
import ImageModal from '../../components/utilities/ImageModal.vue';
import MultipleCategories from "./../utility/MultipleCategories.vue";
import Constants from "./../../components/access/Constants.vue";
import ProductsRow from './ProductsRow.vue';
import { mapGetters } from 'vuex';
import Pagination from 'v-pagination-3';
import { Loading } from 'quasar';
export default {
    components: { ProductsRow, ImageModal, Pagination,MultipleCategories },
    mixins: [Constants],
    data() {
        return {
            product: [],
            rows: 0,
            currentPage: 1,
            perPage: 10,
            searchtxt: '',
            sku:'',
            listcategories: [],
            selectcategories: [],
            selectcategoriesitem: [],
            Loading:false,
        }
    },
    computed: {
        ...mapGetters([

        ]),
    },
    mounted() {
        this.refresh();
        this.$store.commit("assignaddpageheading", 'Products List');
    },
    methods: {
        vClosePopup(){

        },
        getallcategories(param) {


            axios.get('api/autocomplete/category/search?query=' + param)
                .then(response => {
                    this.autoVisibility1 = true;
                    this.listcategories = response.data;
                })
                .catch(error => console.log(error));
        },
        remove_data(data) {
            for (let i = 0; i < this.selectcategoriesitem.length; i++) {
                if (this.selectcategoriesitem[i] == data) {
                    this.selectcategoriesitem.splice(i, 1);
                    this.selectcategories.splice(i, 1);
                }
            }
        },
        selectedvalueurl(data) {
            this.autoVisibility1 = false;
            this.valuesearch = data.name;
            this.selectcategoriesitem.push(data)
            this.selectcategories.push(data.id)
        },
        clickCallback(currentPage) {
            this.currentpage = currentPage
            // this.$store.commit("assigncurrentpage",currentPage);
            // this.$store.commit("assigncurrentpage",currentpage);
            this.refresh();
        },
        refresh() {
            this.Loading = true;
            let param = { noofrec: this.perPage, categoryid: this.selectcategories, currentpage: this.currentPage, searchtxt: this.searchtxt }
            axios.post("api/products", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
            axios.post("api/products/fetch/count", param)
                .then(response => this.processResponseCount(response.data))
                .catch(error => console.log(error));
            axios.post('api/siteadmin/categories/withfilters')
                .then(response => this.processCategoryResponse(response.data))
                .catch(error => console.log(error));
            axios.post('api/siteadmin/attributes/getallattributes')
                .then(response => this.processAttributes(response.data))
                .catch(error => console.log(error));
        },
        processResponseCount(data) {
            this.rows = data
        },
        processResponse(data) {
            this.product = data
            this.Loading = false;
        },
        addnew() {
            this.$router.push({ name: 'addproducts' })
            this.$store.commit("assignedititem", null)
        },
        processCategoryResponse(data) {
            this.categories = data;
            this.$store.commit('assigncategories', data);
            this.categoryArray = data.reduce((acc, item) => {
                acc[item.id] = item.name;
                return acc;
            }, {});
            this.categoryArray[0] = 'All/None';
        },
        processAttributes(data) {
            this.$store.commit('assignattributes', data);
            this.originalattributes = data;
            this.attributes = data.reduce((acc, item) => {
                acc[item.id] = item;
                return acc;
            }, {});
            //this.createarrayofattributes();
        },
        categoryFilters(categoryid) {
            let filters = [];
            this.categories.forEach(function (item, index) {
                if (item.id == categoryid)
                    filters = item.filters;
            });
            return filters;
        },
    },
}
</script>
<style>
.loader {
    border: 4px solid #161515;
    border-top: 4px solid #0d6efd;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
