<template lang="">

       <div class="container" >
            <div class="card mt-10" v-if="this.flag==0">
                    <div class="card-header">
                        <div class="row justify-content-between">
                                <div class="col-md-3">
                                </div>
                                <div class="col-md-3">
                                        <button class="btn btn-primary" @click="chnagetab(1)" >Add navigations </button>
                                </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="col-md-12 row">
                            <div class="col-md-3 ">
                                <input type="text" v-model="searchtxt" placeholder="search..." class="form-control col-md-3">
                            </div>
                            <div class="col-md-2 ">
                                <button class="btn btn-primary" @click="getnavigationlogs()">Search</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="col-md-12 ">
                            <table class="table">
                                <tr>
                                    <th>#</th>
                                    <th>Edit</th>
                                    <th>Url</th>
                                    <th>Categories</th>
                                    <th>Meta Data</th>
                                </tr>
                                <tr v-for="(item,index) in listofitems">
                                     <td>{{index+1}}</td>
                                     <td>
                                        <i class="bx bx-edit" style="font-size: 24px;" @click="edititem(item)"></i>
                                    </td>
                                    <td>
                                        
                                        {{item.url}}
                                    </td>
                                    <td style="color: #055160;font-weight: 600;">
                                        
                                        {{getcategorynamebyid(item.categoryids,1)}}
                                    </td>
                                    <td>
                                        {{item.json.substring(0,8)+".." }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div style="float: right;">
                        <pagination v-model="currentPage" :records="rows" :per-page="perPage"
                            @paginate="clickCallback" />
                    </div>
            </div>
            <div class="card mt-10" v-if="this.flag==1">
                <create-navigation :editdata="editdata"></create-navigation>
            </div>

        </div>
</template>
<script>
import CreateNavigation from './CreateNavigation.vue'
import Constants from '../../components/utilities/Constants.vue'
import { mapGetters } from 'vuex'
import Pagination from 'v-pagination-3';
export default {
    mixins: [Constants],
    components: { CreateNavigation, Pagination },
    data() {
        return {
            flag: 0,
            listofitems: [],
            editdata: [],
            searchtxt: '',
            currentPage: 1,
            perPage: 10,
            rows: 0
        }
    },
    computed: {
        ...mapGetters([
            'categories'
        ]),
    },
    mounted() {
        this.$store.commit("assignaddpageheading", 'Lists of navigations');
        this.getnavigationlogs();
        this.$store.dispatch("getlistofcategory")
    },
    methods: {

        getnavigationlogs() {
            let param = { searchtxt: this.searchtxt, currentpage: this.currentPage }
            axios.post('api/seo/getnavigationlogs', param).then(response => {
                this.listofitems = response.data.seolist;
                this.rows = response.data.count_list;
            });
        },
        clickCallback(currentPage) {
            this.currentpage = currentPage
            this.getnavigationlogs();
        },
        chnagetab(n) {
            this.flag = n;
            console.log(this.flag);
        },

        edititem(item) {
            this.editdata = item;
            this.flag = 1;
        }
    },




}
</script>
<style lang="">

</style>