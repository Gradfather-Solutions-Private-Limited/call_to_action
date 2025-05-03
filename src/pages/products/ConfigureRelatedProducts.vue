<template>
<div>
    <div v-if="viewno==1">
    <button @click="add()">Add New</button>
    <table>
    <tr>
        <th>S.No.</th>
        <th>Products</th>
        <th>Related Products</th>
        <th></th>
    </tr>
    <tr v-for="(item) in filteredproducts" v-bind:key="item.id">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    </table>
    </div>
    <div v-if="viewno==2">
        <configure-related-products-form></configure-related-products-form>
    </div>
</div>
</template>
<script>
import ConfigureRelatedProductsForm from './ConfigureRelatedProductsForm'
import { mapGetters } from 'vuex'
export default {
    components:{ConfigureRelatedProductsForm},
    mounted(){
        this.$store.dispatch("fetchproducts")
        axios.post('api/product/relatedproducts/fetch')
	    	.then(response=>this.processRelatedProductResponse(response.data))
	    	.catch(error=>console.log(error));
    },
    computed:{
        ...mapGetters([
			'allproducts','viewno','filteredproducts'
		]),
    },
    methods:{
        add(){
            this.$store.commit('assignviewno',2)
        },
        processRelatedProductResponse(data){
            this.$store.commit('assignfilteredproducts',data)
        }
    }
}
</script>