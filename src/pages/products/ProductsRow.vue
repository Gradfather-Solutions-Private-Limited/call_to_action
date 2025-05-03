<template>
<tr>
	<td >{{indx+1 }}</td>
		<td>
			<i class='bx bx-edit' @click="triggeredit(product)" style="font-size: 24px;"></i>
		</td>
		<td><a href="#" class="prod-name" >{{product.name}}</a> <br>
			<div class="prod-disab" v-if="accessid(322)">
			<input type="checkbox" v-model="disabled" @change="disabledevent()"> Disabled 
			</div>
			<div class="prod-sale" v-if="accessid(323)">
				<input type="checkbox" v-model="onsale" @click="onsaledevent()"> On Sale
			</div>
			<div class="prod-stock" v-if="accessid(324)">
				<input type="checkbox" v-model="outofstock" @click="outofstockevent()"> Out of Stock 
			</div>
			<div class="prod-buy" v-if="accessid(325)">
			<input type="checkbox" v-model="trynbuy" @click="trynbuyevent()"> Try n buy 
			</div>
			<div class="prod-product" v-if="accessid(326)">
				<input type="checkbox" v-model="ishide" @click="hideProduct()"> Hide Product
			</div>
			<div class="prod-homepage" v-if="accessid(327)">
			<input type="checkbox" v-model="onhomepage" @click="onhomepageevent()"> On Home Page
			</div>
		</td>
		<td v-if="accessid(296)"> <i class='bx bx-rupee'></i>{{ product.mrp }} / <br> 
			<i class='bx bx-rupee'></i>{{ product.sp }}  / <br>
			<i class='bx bx-rupee'></i> {{ product.cp }}</td>
		
		<!-- <td><span >{{product.modelname}}</span></td> -->
		<td style="width:50px" v-if="accessid(316)">

						<select v-model="parentcategories" @change="updateParentCategory()" style="width: 100px;" class="select-box">
							<option :value="0">Select</option>
							<option  v-for="(categoryitem) in categories" :key="categoryitem.id" :value="categoryitem.id">{{ categoryitem.name }}</option>
						</select>
				
		</td>
		<td v-if="accessid(317)">
			<input type="search" @input="searchcat($event,categories)" >
			<div class="col-md-12 example" style="height: 150px; overflow: auto;" v-if="tempsearchcategory.length > 0">
				<div class="row card_1">
					<div v-for="(categoryitem) in tempsearchcategory" :key="categoryitem.id">
						<input type="checkbox" style=" margin-right:5px;" :value="categoryitem.id" v-model="selectedcategories" @change="updatecategory()">
						<label >{{ categoryitem.name }}</label>
					</div>
				</div>
			</div>

			<div class="col-md-12 example" style="height: 150px; overflow: auto;" v-if="tempsearchcategory.length == 0">
				<div class="row">
					<div style="margin-right: 10px;"  v-for="(categoryitem) in categories" :key="categoryitem.id">
						<div class="col-md-12 card_1">
							<div class="col-md-12 " >
								<input type="checkbox" style=" margin-right:5px;" :value="categoryitem.id" v-model="selectedcategories" @change="updatecategory()">
									{{ categoryitem.name }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</td>
		<td v-if="accessid(318)">
			<div style="overflow:auto; height:150px">
			<tr v-for="(item1) in selectedcategories" :key="item1.id">
				<display-check-box-for-filter-of-categories :category="getcategoryobject(item1)" :product="product"></display-check-box-for-filter-of-categories>
			</tr>
			</div>
		</td>
		<td v-if="accessid(319)"> 
			<div style="overflow:auto; height:150px">
			<tr v-for="(item1) in selectedcategories"  :key="item1.id">
				<select-filters-to-be-selected-by-user :category="getcategoryobject(item1)" :product="product"></select-filters-to-be-selected-by-user>
			</tr>
			</div>
		</td>
		<td v-if="accessid(320)">
			<div style="overflow:auto; height:150px">
			<tr v-for="(item1) in selectedcategories"  :key="item1.id">
				<select-filters-to-be-displayed :category="getcategoryobject(item1)" :product="product"></select-filters-to-be-displayed>
			</tr>
			</div>
		</td>
		<td v-if="accessid(321)">
			<i class="fa fa-pencil "></i> 
			<!-- <button class=" btn-primary btn-sm" style="margin-right: -4px;" @click="triggerimagemodal(product, 'product/' + product.id,2)">Add </button> -->
			<div class="card_1" style="width: 120px;" >
				<ul  v-for="(imageitem) in product.images" :key="imageitem.id">
					<div v-if="imageitem.width==90 && imageitem.height==90">
						<img v-bind:src="imageitem.fullurl" width="50" @error="imageLoadError(imageitem,product)">
					</div>
					<!-- <button class="btn btn-danger" @click="removeimages(product)"><span class="">x</span></button> -->
				</ul>
				<!-- <button class=" btn-danger btn-sm" @click="removeimagesall(product)"><i class="fa fa-xmark"></i>Delete</button> -->
			</div>
			<button type="button" @click="configimages(product)" class="btn btn-primary">Images</button>
		</td>
		<!-- <td><button class="btn btn-primary btn-sm" @click="triggeattributes(product)"> <i class="fas fa-pencil"></i>Show</button> </td>
		 -->
		<!-- <td>
			<div class="col-md-12 example" style="height: 150px; overflow: auto;">
				<div class="row">
					<div style="margin-right: 10px;"  v-for="(featureprd) in feature" :key="featureprd.id">
						<div class="col-md-12 card_1">
							<div class="col-md-12 " >
								<input type="checkbox" style=" margin-right:5px;" :value="featureprd.id" v-model="featureprod"  @change="updatefeature()" >
									{{ featureprd.name }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</td> -->
</tr>
</template>
<script>
import DisplayCheckBoxForFilterOfCategories from './DisplayCheckBoxForFilterOfCategories.vue'
import SelectFiltersToBeSelectedByUser from './SelectFiltersToBeSelectedByUser.vue'
import SelectFiltersToBeDisplayed from './SelectFiltersToBeDisplayed.vue'
import { mapGetters } from 'vuex'
import Constants from '../../components/utilities/Constants.vue'
export default {
	mixins:[Constants],
	components: {
		DisplayCheckBoxForFilterOfCategories,SelectFiltersToBeSelectedByUser,SelectFiltersToBeDisplayed
  	},
	props:['product','indx'],
	data(){
		return {
			featureprod:[],
			selectedcategories:[],
			ready:false,
			disabled:false,
			onsale:false,
			outofstock:false,
			trynbuy:false,
			parentcategories:0,
			tempsearchcategory:[],
			ishide:false,
			onhomepage:false,
		}
	},
	mounted(){
		// this.$store.dispatch("fetchfeature")
		this.initialize();
		this.ready = true;
	},
	watch:{
		product:function(value){
			this.initialize();
		},
		feature:function(value){
			this.featurespilit();
		}
	},
	computed:{
		// getproducturl(){
		// 	return window.axios.defaults.baseURL+"/"+this.product.url;
		// },
		...mapGetters([
			'categories','feature','perpagerecord','currentpage',
		]),
	},
	methods:{
		searchcat(event,tempcategories){
				let searchvalue =  event.target.value.toLowerCase();;
				let newvalue = tempcategories.filter((item)=>{
  		    	  return (item.name.toLowerCase().includes(event.target.value.toLowerCase()))
				})
				this.tempsearchcategory = newvalue;
		},
		triggeattributes(product){
			this.$store.commit('assignedititem',product)
			this.$router.push({path:'/commonproducts'})
		},
		configimages(product){
			// this.$store.commit('assignviewno',3)
			this.$router.push({path:'/product/images/'+product.id})
			this.$store.commit('assignedititem',this.product)
		},
		initialize(){
			if(this.product!=null){
				if(this.product.categoryids!=null)
					this.selectedcategories = this.product.categoryids.split(",")
				
				this.disabled=this.product.disabled==0?false:true
				this.onsale=this.product.onsale==0?false:true
				this.outofstock=this.product.outofstock==0?false:true
				this.trynbuy=this.product.trynbuy==0?false:true
				this.parentcategories=this.product.category_id

			}
		},
		featurespilit(){
			if(this.product!=null){
			if(this.product.featureid !=0)
				this.featureprod = this.product.featureid.split(",");
				
			}
		},
		getsalelabel(product){
			if(product.status==0){
				return "Sale"
			}
		},
		updatefeature(){
			let param = {productid:this.product.id,featureids:this.featureprod.join()};
			axios.post('feature/updatefeature',param)
				.then(response=>this.processProductCategoryResponse(response.data))
				.catch(error=>console.log(error));
		},
		imageLoadError(imageitem,item){
			let param = {type:2,id:item.id,imageid:imageitem.id,size:this.size};
			//item.imageid = 0;
			/*axios.post('api/image/getcreateurl', param)
			.then((response) => {
				item.imageid = response.data.id;
			}).catch((err) => {
				console.log('', err)
			});*/
		},
		trynbuyevent(event){
			let param = {productid:this.product.id,trynbuy:this.trynbuy?0:1};
			axios.post('api/siteadmin/product/updatetrynbuy',param)
	    	.then(responsese=>this.processProductCategoryResponse(response.data))
	    	.catch(error=>console.log(error));
		},
		hideProduct(event){
			let param = {id:this.product.id,column:"ishide",value:this.ishide?0:1};
			axios.post('api/product/updatefield',param)
				.then(response=>this.processProductCategoryResponse(response.data))
				.catch(error=>console.log(error));
		},
		onhomepageevent(event){
			let param = {id:this.product.id,column:"onhomepage",value:this.onhomepage?0:1};
			axios.post('api/product/updatefield',param)
				.then(response=>this.processProductCategoryResponse(response.data))
				.catch(error=>console.log(error));
		},
		outofstockevent(event){
			let param = {productid:this.product.id,outofstock:this.outofstock?0:1};
			axios.post('api/siteadmin/product/updateoutofstockstatus',param)
	    	.then(response=>this.processProductCategoryResponse(response.data))
	    	.catch(error=>console.log(error));
		},
		onsaledevent(event){
			let param = {productid:this.product.id,onsale:this.onsale?0:1};
			axios.post('api/siteadmin/product/updateonsalestatus',param)
	    	.then(response=>this.processProductCategoryResponse(response.data))
	    	.catch(error=>console.log(error));
		},
		disabledevent(){
			let param = {productid:this.product.id,disabled:this.disabled?1:0};
			axios.post('api/siteadmin/product/updatedisablestatus',param)
	    	.then(response=>this.processProductCategoryResponse(response.data))
	    	.catch(error=>console.log(error));
		},
		updatecategory(){
			let param = {productid:this.product.id,categoryids:this.selectedcategories.join()};
				axios.post('api/siteadmin/product/updatecategory',param)
	    			.then(response=>this.processProductCategoryResponse(response.data))
	    			.catch(error=>console.log(error));
		},
		updateParentCategory(){
			let param = {productid:this.product.id,category_id:this.parentcategories};
				axios.post('api/siteadmin/product/update/parentcategory',param)
	    			.then(response=>this.processProductCategoryResponse(response.data))
	    			.catch(error=>console.log(error));
		},
		getcategoryobject(item){
			let found = this.categories.find(block=>block.id==item)
			if(typeof found !=='undefined'){
				return found
			}
			return null;
		},
		processProductCategoryResponse(data){
			if(!data){
				alert("Could not update")
			}
		},
		triggeredit(product){
			this.$store.commit('assignedititem',product)
			this.$router.push({name:'addproducts'})
		}
	}
}
</script>