<template>
<div>
    <div class="col-md-12 flex-between-row mb-20">
        <h3>Show related Products</h3>
        <div class="flex-row">
            <button class="btn btn-success refresh" @click="refresh()"><i class='bx bx-refresh bx-flip-horizontal' ></i></button>
            <button class="btn btn-success" style="margin-left:20px" @click="back()">Back</button>
        </div>
    </div>
    <div class="col-md-12 flex-between-row mb-20">
        
    </div>
    <div class="col-md-12 mb-20">
        <label for="">Product Name : <strong>{{edititem.name}}</strong></label>
        <button class="bt btn-success" @click="edit()">Edit</button>
    </div>
    <div class="col-md-12">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Related Product Name</th>
                        <th> MRP</th>
                        <th>SP</th>
                        <!-- <th>Feature Products</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in product" :key="item.id">
                        <td>{{(index+1)}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.mrp}}</td>
                        <td>{{item.sp}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="flex-row justify-content-end">
                <pagination v-model="currentPage" :records="rows" :per-page="perPage" @paginate="clickCallback"/>
            </div> -->
        </div>
    </div>
    <image-modal></image-modal>
</div>

</template>
<script>
import ImageModal from '../../components/utilities/ImageModal.vue';
import { mapGetters } from 'vuex';
// import Pagination from 'v-pagination-3';
export default {
    components:{ImageModal},
    data() {
        return {
            product:[],
            rows:0,
            currentPage:1,
            perPage:10,
            searchtxt:''
        }
    },
    computed:{
        ...mapGetters([
            'edititem'
        ]),
    },
    mounted() {
        this.refresh();
    },
    methods: {
       edit(){
            this.$router.push({name:'addcommonproducts'})
       },
        refresh(){
            let param={url:this.edititem.url}
            axios.post("api/common/product/fetch",param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(data){
            this.product=data
        },
        back(){
            this.$router.push({name:'products'})
            this.$store.commit("assignedititem",null)
        },
        
    },
}
</script>