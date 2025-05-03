<template>
<div class="productCarousel-slide">
	<article class="card clearfix">
	<div class="card-inner">
		<figure class="card-figure">
			<div class="sale-flag-side" v-if="product.onsale==1">
				<span >Sale</span>
			</div>
			<a :href="product.url">
				<div class="card-img-container">
					 <img class="card-image item-0 lazyload" data-sizes="auto"  :src="getImageURL" :alt="product.url" @error="imageLoadError" title="">
					 <img class="card-image item-1 lazyload" data-sizes="auto"  :src="getImageURL" alt="product.name" title="">
				</div>
			</a>
			<figcaption class="card-figcaption">
				<div class="card-figcaption-body">
							 <a :href="product.url" class="button button--small card-figcaption-button quickview" >Quick view</a>

				   <div>
				   </div>
			 </div>
		   </figcaption>
		</figure>
		<div class="card-body clearfix">
		 <div class="brandName">
		 </div>
		   <h4 class="card-title">
				   <a :href="product.url">{{product.name}}</a>
		   </h4>

			 <p class="card-rate" data-test-info-type="productRating">
			   <span class="rating--small">
				   <i class="fa fa-star" aria-hidden="true"></i>
				   <i class="fa fa-star" aria-hidden="true"></i>
				   <i class="fa fa-star" aria-hidden="true"></i>
				   <i class="fa fa-star" aria-hidden="true"></i>
				   <i class="fa fa-star" aria-hidden="true"></i>
			   </span>
			 </p>

		   <p class="card-summary">
			 Type a description for this product here... &nbsp;
		   </p>

		   <div class="card-price" data-test-info-type="price">
			  <div class="price-section price-section--withTax" >
				 <span class="price-label" style="display: none;">
				 </span>
				 <span class="price-now-label" >
					 Now
				 </span>
				 <span data-product-price-with-tax class="price">{{product.sp}}</span>
			 </div>
			 <div class="price-section price-section--withTax rrp-price--withTax" >
				 <span class="price-now-label rrp-price--withTax-cus" >MSRP</span>
				 <span data-product-rrp-with-tax class="price price--rrp">
					 {{product.mrp}}
				 </span>
			  </div>
		   </div>

		   <div class="card-btn">
			  <a href="" class="button button--small card-figcaption-button">Add to Cart</a>
		   </div>
		</div>
		   
		</div>
	</article>
</div>
</template>
<script>
export default {
	props:['product'],
	data(){
		return {
			size:143
		}
	},
	mounted(){
		
	},
	computed:{
		getImageURL(){
			if(this.product.primaryimage!=null){
				let url = window.axios.defaults.baseURL+"/products/"+this.product.primaryimage.id+'/'+this.size+'x'+this.size+'/'+this.product.url+"-"+this.product.primaryimage.id+".jpg"
				    var http = new XMLHttpRequest();
				    http.open('HEAD', url, false);
				    http.send();
				    if(http.status != 404){
				    	return url;
				    } else {
				    	let param = {type:2,imageid:this.product.primaryimage.id,id:this.product.id,size:this.size};
						//item.imageid = 0;
						axios.post('api/image/getcreateurl', param)
		    			.then((response) => {
		    				//item.imageid = response.data.id;
						}).catch((err) => {
				            //console.log('', err)
		    		    });
				    }
				return "images/noImage.jpg";
			} else {
				return "images/noImage.jpg";
			}
		},
		
	},
	methods:{
		imageLoadError(){
			if(this.product.primaryimage!=null){
			let param = {type:2,id:this.product.id,imageid:this.product.primaryimage.id,size:this.size};
			//item.imageid = 0;
			axios.post('api/image/getcreateurl', param)
			.then((response) => {
				//check if success or false
				//need to delete the row if not found
				
				this.product.primaryimage = response.data;
			}).catch((err) => {
	            console.log('', err)
		    });
			}
		},
	}
}
</script>