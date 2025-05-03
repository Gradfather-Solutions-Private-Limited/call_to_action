<template>
<div>
<a class="fancythumb" rel="gallery" href="javascript:void(0);">
<figure class="productView-image m-b-20" data-image-gallery-main="" :data-zoom-image="getimageurl(selectedimage)" style="position: relative; overflow: hidden;">
        <img class="productView-image--default lazyautosizes lazyloaded" data-sizes="auto" :src="getimageurl(selectedimage,250)" :data-src="getimageurl(selectedimage,250)" :alt="producturl" :title="producturl" data-main-image="" sizes="436px">
</figure>
</a>

<ul class="productView-thumbnails " data-main-zoom-image="getimageurl(selectedimage)">
	<div v-for="(item,index) in this.images">
		<div v-if="index==0">
			<li class="" data-thumb-zoom-image="getimageurl(item)">
				<a rel="gallery" data-fancybox="gallery" :data-fancybox-href="getimageurl(item)" class="productView-thumbnail-link is-active is-main" :href="getimageurl(item)" data-image-gallery-item="" :data-image-gallery-new-image-url="getimageurl(item)" :data-image-gallery-zoom-image-url="getimageurl(item)" :data-caption="producturl">
				<img class="lazyautosizes lazyloaded" data-sizes="auto" :src="getimageurl(item)" :data-src="getimageurl(item)" :alt="producturl" sizes="35px">
				</a>
			</li>
       
		</div>
		<div v-if="index!=0">
			<li><a href="#"><img src="getimageurl(item)" width="50" alt="" /></a></li>
		</div>
	</div>
</ul>


</div>



</template>
<script>
export default {
	props:['producturl','productid'],
	data(){
		return {
			images:[],
			selectedimage:{},
			timer:null,
			thumbsize:''
		}
	},
	mounted(){
		console.log('Mounted the Product Image Tile');
		//get the list of images from the Image table
		let param = {productid:this.productid}
		axios.post('api/products/images',param)
			.then(response=>this.processProductImages(response.data))
			.catch(error=>console.log(error));
	},
	methods:{
		processProductImages(data){
			this.images = data;
			if(this.images.length>0)
				this.selectedimage = this.images[0];
		},
		getimageurl(imageitem,thumbsize=50){
			if(imageitem!=null && imageitem.id){
				return window.axios.defaults.baseURL+"/products/"+imageitem.id+'/'+thumbsize+'x'+thumbsize+'/'+this.producturl+"-"+imageitem.id+".jpg";
			} else {
				return "img/noImage.jpg";
			}
		},
		updateSelectedImage(imageitem){
			this.timer = setTimeout(()=>{
				this.selecteditem = imageitem;
			},2000);
			
		},
		clearTimer(){
			clearTimeout(this.timer);
		}
	}
}
</script>