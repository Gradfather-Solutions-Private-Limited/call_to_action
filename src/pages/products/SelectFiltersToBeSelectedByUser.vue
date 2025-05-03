<template>
<div v-if="category!=null">
	<div class="txt-decr1">
		<b>{{ category.name }}</b>
	</div>
	<td >
		<div v-for="(filteritem,index1) in category.filters">
			<input type="checkbox" v-model="tobeselectedbyuser" :value="filteritem.attribute_id" @change="changed()"><template v-if="attributeobj(filteritem.attribute_id)!=null">{{ attributeobj(filteritem.attribute_id).name }}</template>
		</div>
	</td>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	props:['category','product'],
	data(){
		return {
			tobeselectedbyuser:[]
		}
	},
	computed:{
		...mapGetters([
			'attributes'
		]),
	},
	mounted(){

		if(this.product!=null && this.product.tobeselectedbyuser!=null){
			this.tobeselectedbyuser = this.product.tobeselectedbyuser.split(",")
		}
	},
	methods:{
		attributeobj(attributeid){
			let found = this.attributes.find(block=>block.id==attributeid)
			if(typeof found!=='undefined'){
				return found;
			}
			return null;
		},
		changed(){
			console.log(this.tobeselectedbyuser.join());
			let param = {productid:this.product.id,attributestobeselectedbyuser:this.tobeselectedbyuser.join()}
			axios.post('api/siteadmin/product/updateattributetobeselectedbyuser',param)
	    		.then(response=>this.processProductCategoryResponse(response.data))
	    		.catch(error=>console.log(error));
		},
		processProductCategoryResponse(data){
			
		}
	}
}
</script>