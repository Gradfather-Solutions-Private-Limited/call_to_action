<template>
<div v-if="filter!=null && attributeobj!=null">
<div class="">
	{{attributeobj.name}}
</div>
		<div  v-if="attributeobj.predefined==1">
			<template v-if="attributeobj.multiple==1">
				<div v-for="(filtervalue,index2) in attributeobj.predefinedvalues">
					<div>
					<input type="checkbox" v-model="selectedvalues" :value="filtervalue.id" @change="filtervalueschanged()">
					{{ filtervalue.value }}
					</div>
				</div>
			</template>
			<template v-else>
				<select v-model="selectedvalue" @change="filtervaluechanged()">
					<option v-for="(filtervalue,index2) in attributeobj.predefinedvalues" :value="filtervalue.id">{{ filtervalue.value }}</option>
				</select>
			</template>
		</div>
	<div v-else>
		<input type="text" v-model="filtertext">
	</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	props:['filter','product'],
	data(){
		return {
			selectedvalues:[],
			filtertext:'',
			selectedvalue:0
		}
	},
	mounted(){
		this.afterattributeschanged();
		
	},
	watch:{
		filtertext:function(v){
			let param = {productid:this.product.id,attributeid:this.filter.attribute_id,filtertext:this.filtertext}
			axios.post('api/product/updatetextattribute',param)
	    			.then(response=>this.processProductCategoryResponse(response.data))
	    			.catch(error=>console.log(error));
		},
		attributes:function(v){
			this.afterattributeschanged();

		}
	},
	computed:{
		attributeobj(){
			let found = this.attributes.find(block=>block.id==this.filter.attribute_id)
			if(typeof found!=='undefined'){
				return found;
			}
			return null;
		},
		...mapGetters([
			'attributes'
		]),
	},
	methods:{
		afterattributeschanged(){
			if(this.product!=null && this.product.attribute!=null){
				let found = this.product.attribute.find(block=>block.attribute_id==this.filter.attribute_id)
				if(this.attributeobj!=null){
					if(this.attributeobj.predefined==1){
						if(this.attributeobj.multiple==1){
							if(typeof found!=='undefined' && found.attribute_value_ids!=null){
								this.selectedvalues = found.attribute_value_ids.split(',');
							}
						} else {
							if(typeof found!=='undefined' && found.attribute_value_ids!=null){
								this.selectedvalue = found.attribute_value_ids
							}
						}
					} else {
						if(typeof found!=='undefined')
							this.filtertext = found.value
					}
				}
			}
		},
		filtervaluechanged(){
			let param = {productid:this.product.id,attributeid:this.filter.attribute_id,attribute_value_ids:this.selectedvalue}
			axios.post('api/product/updateattribute',param)
	    			.then(response=>this.processProductCategoryResponse(response.data))
	    			.catch(error=>console.log(error));
		},
		filtervalueschanged(){
			let param = {productid:this.product.id,attributeid:this.filter.attribute_id,attribute_value_ids:this.selectedvalues.join()}
			axios.post('api/product/updateattribute',param)
	    			.then(response=>this.processProductCategoryResponse(response.data))
	    			.catch(error=>console.log(error));
		},
		processProductCategoryResponse(data){
			if(!data){
				alert("Could not update")
			}
		}
	}
}
</script>