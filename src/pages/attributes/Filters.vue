<template>
	<div>
		<div v-for="(item,index) in this.filters">
			<div>{{ item.name }}:{{item.id}}</div>
			<div v-if="item.predefinedvalues.length>0">
			<div v-for="(predefineditem,index1) in item.predefinedvalues">
				<div><input :id="predefineditem.id" :value="predefineditem.id" type="checkbox" v-model="checkedProducts" @change="filterchanged()">{{ predefineditem.value }}:{{predefineditem.id}}</div>
				<div>Total:{{attributeproductcount[predefineditem.id]}}</div>
			</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:['categoryurl'],
	data(){
		return{
			checkedProducts:[]
		}
	},
	mounted(){
		//get the list of filters for the specified category
		//get the product count for each predefined filter value
		let params = {categoryurl:this.categoryurl};
		axios.post('api/filters/forcategory',params)
			.then(response=>this.processCategoryFilters(response.data))
			.catch(error=>console.log(error));
	},
	computed:{
		filters(){
			return this.$store.state.filters;
		},
		attributeproductcount(){
			return this.$store.state.attributeproductcount;
		}
	},
	methods:{
		processCategoryFilters(data){
			this.$store.commit("assignfilters",data);
		},
		filterchanged(){
			let self = this;
			let newfilteredlist = [];
			if(self.checkedProducts.length>0){
			this.$store.state.storeproducts.forEach(function(product,index){
				//if this product has this attribute
				product.attribute.forEach(function(attribute){
					//get all the selected predefined values
						if(attribute.attribute_value_ids!=null){
							let ids = attribute.attribute_value_ids.split(",").map( Number );
							ids.forEach(function(iditem){
							if(self.checkedProducts.indexOf(iditem)!==-1){
								var index = newfilteredlist.findIndex(x => x.id==product.id);
								if (index === -1)
									newfilteredlist.push(product);
							}
							});
						}
				});
			});
			} else {
				newfilteredlist = this.$store.state.storeproducts;
			}
			this.$store.commit("assignfilteredproducts",newfilteredlist);
		}
	}
}
</script>