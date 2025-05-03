<template>
<div>
<div v-for="(item,index) in this.relatedProducts" >	
	<product-card-view :product="item"></product-card-view>
</div>
</div>
</template>
<script>
import ProductCardView from '../product/ProductCardView';
export default {
	components:{
		ProductCardView
	},
	props:['productid','categoryid'],
	data(){
		return {
			relatedProducts:[],
			size:250
		}
	},
	mounted(){
		let param = {productid:this.productid,categoryid:this.categoryid}
		axios.post('api/products/related',param)
			.then(response=>this.processRelatedProduct(response.data))
			.catch(error=>console.log(error));
	},
	methods:{
		processRelatedProduct(data){
			this.relatedProducts = data;
		},
		getimageurl(item){
			if(item.primaryimage!=null)
				return window.axios.defaults.baseURL+"/products/"+item.primaryimage.id+'/'+this.size+'x'+this.size+'/'+item.url+".jpg";
			else
				return "img/noImage.jpg";
		},
		imageLoadError(item){
			if(item.imageid!=0){
				let param = {type:1,id:item.id,size:this.size};
				//item.imageid = 0;
				axios.post('api/image/getcreateurl', param)
    			.then((response) => {
    				item.imageid = response.data.id;
				}).catch((err) => {
		            console.log('', err)
    		    });
			}
		},
	}
}
</script>