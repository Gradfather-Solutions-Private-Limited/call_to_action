<template>
<div>
    <div v-if="!createproduct"><button class="btn btn-primary" @click="addproduct()">Add product</button>
    <div v-if="!pedit">
        <div class="topheading">Show all Products</div><br>
    <button class="btn btn-danger" @click="cancel">Cancel</button>

    <table class="table">
        <thead>
            <tr>              
            <td><h4><b>Product Name</b></h4></td>
            <td><h4><b>Sequence no</b></h4></td>
            <td><h4><b>Edit</b></h4></td>
            <td><h4><b>Delete</b></h4></td>

            </tr>
        </thead>
        <tr v-for="(item) in this.productstore" :key="item.id">
            <td><div v-if="item.product != null">{{item.product.name}} </div></td>
            <td>{{item.sequence}}</td>
            <td><button @click="productedit(item)" class="btn btn-primary">Edit</button></td>
            <td><button @click="productdelete(item)" class="btn btn-danger">Delete</button></td>

        </tr>
    </table>
    </div> 
    <div v-if="pedit">
        <edit-product></edit-product>
    </div> 
    </div>
    <div v-if="createproduct">
        <create-product></create-product>
    </div>
    
</div>
</template>
<script>
import CreateProduct from './CreateProduct.vue'
import EditProduct from './EditProduct.vue'
import Constants from '../../components/utilities/Constants.vue'
import { mapGetters } from 'vuex'

export default {
    mixins:[Constants],
    components: {
        EditProduct,CreateProduct
    },
    
    data(){
        return{
            pedit:false,
            createproduct:false,
            productlist:[]
        }
    },
    computed:{
        
    ...mapGetters([
            'categories','productstore','allproducts'
        ]), 
                   
    },   

    mounted(){
        
        if(this.$parent.product!=null){
            this.form = new Form(this.$parent.product);
        }
        
    },
    methods:{
        cancel(){
            this.$parent.isprod = !this.$parent.isprod;
        },
        
        productedit(item){
            this.pedit = !this.pedit;
            this.product = item;
        },
        productdelete(item){
            let param = {prodid:item.id};
            axios.post('api/homeprod/delete', param)

        },
        addproduct(){
            this.createproduct = !this.createproduct;
        },
        
    }
}
</script>