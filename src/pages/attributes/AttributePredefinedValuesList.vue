<template>
<div>
	<div v-for="(item) in valueslist" :key="item.id">
		<div @click="attributeclicked(item)">{{ item.value }}</div>
	</div>
</div>
</template>
<script>
export default {
	props:['attributeurl'],
	data(){
		return {
			valueslist:[]
		}
	},
	mounted(){
		let param = {attributeurl:this.attributeurl}
		axios.post('api/attribute/predefinedvalues',param)
			.then(response=>this.processResponse(response.data))
			.catch(error=>console.log(error));
	},
	methods:{
		processResponse(data){
			this.valueslist = data;
		},
		attributeclicked(item){
			window.location.href=this.attributeurl+"/"+item.url;
		}
	}
}
</script>