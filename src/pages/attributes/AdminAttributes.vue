<template>
<div>
	<div class="col-md-12 flex-between-row">
		<h3>Attributes</h3>
		<div class="flex-row">
			<button class="btn btn-success" @click="addnew()">Add New</button>
		</div>
	</div>	
	<div class="col-md-12">
		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th> S.No </th>
						<th>Name</th>
						<th>Configure</th>
						<th>PreDefined Values</th>
						<th>Categories</th>
						<th>Images</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in this.attributes" :key="item.id">
						<td>{{index+1}}</td>
						<td>{{item.name}}</td>
						<td>
							<div><input type="checkbox" v-model="item.display" @click="checkboxevent(1,item,$event)">Display</div>
							<div><input type="checkbox" v-model="item.multiple" @click="checkboxevent(2,item,$event)">Multiple</div>
							<div><input type="checkbox" v-model="item.predefined" @click="checkboxevent(3,item,$event)">Predefined</div>
						</td>
						<td>
							<div style="overflow:auto; height:200px">
								<template v-if="item.predefined==1">
									<template v-for="(attribvalue) in item.predefinedvalues" :key="attribvalue.id">
										<div v-if="attribvalue.id!=attribedit"><span>{{ attribvalue.value }}</span><span><i class="fa fa-pencil btn" @click="attribedit = attribvalue.id">Edit</i></span></div>
										<div v-if="attribvalue.id==attribedit"><span><input type="text" v-model="attribvalue.value"></span><span><button type="button" @click="updateattribvalue(attribvalue)">Save</button><button type="button" @click="attribedit=0">Cancel</button></span></div>
									</template>
									<div v-if="item.id==newattribid"><input type="text" v-model="newattribvalue"><button type="button" @click="addattribvalue(item)">Save</button><button type="button" @click="newattribid=0">Cancel</button></div>
									<button type="button" class="btn btn-primary" @click="addnewattribvalue(item)">Add New</button>
								</template>
							</div>	
						</td>
						<td>
							<div style="overflow:auto; height:200px">
								<template v-for="(categoryitem) in categories" :key="categoryitem.id">	
									<div><input type="checkbox" @click="categorycheckboxevent(categoryitem,item,$event)" v-model="attribcategorymap[categoryitem.id][item.id]">{{categoryitem.name}}</div>
								</template>
							</div>
						</td>
						
						<!-- <td>
					<div v-if="item.images!=null">
					<ul v-for="(imageitem) in item.images" :key="imageitem.id">
						<li><img v-bind:src="getimageurl(imageitem,item)" width="50" @error="imageLoadError(imageitem,item)"></li>
					</ul>
					</div>
					<i class="fa fa-pencil btn"></i><button type="button" class="btn btn-primary" @click=" @click="triggerimagemodal(item, 'product/' + item.id,1)">Add/Edit</button>
					</td> -->
					<td>
						<button
							class="btn bg-primary text-white btn-xs btnsearch"
							style="margin-right: -4px"
							@click="triggerimagemodal(item, 'product/' + item.id,9)"
							>
							<i class="fa fa-file-image-o"></i> Add Img
							</button>
							<div class="card_1">
							<ul style="margin-bottom:1px;padding:0;" v-for="(imageitem, index) in item.images"
								v-bind:key="index">
								<img v-bind:src="imageitem.fullurl" width="50" />
								<button
								type="button"
								class="btn btn-outline-danger btn-xs"
								style="border: none"
								@click="removeimages(imageitem)"
								>
								<i class="fa fa-times"></i>
								</button>
							</ul>
							</div>
						</td>
						<td><button type="button" class="btn btn-primary" @click="triggeredit(item)">Edit</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<image-modal></image-modal>
</div>
</template>
<script>
import AttributeForm from "./AttributeForm.vue";
import Constants from "../../components/utilities/Constants.vue";
import ImageModal from "../../components/utilities/ImageModal.vue";
export default {
	mixins:[Constants],
	components: {
		AttributeForm,ImageModal
	},
	data(){
		return{
			attributes:[],
			categories:[],
			attribute:null,
			isedit:false,
			attribedit:0,
			newattribid:0,
			newattribvalue:'',
			attribcategorymap:[],
			size:50,
		}
	},
	mounted(){
		axios.get('api/siteadmin/attributes')
			.then(response=>this.attributes = response.data)
			.catch(error=>console.log(error));
		axios.post('api/categories/withfilters')
			.then(response=>this.processCategoryResponse(response.data))
			.catch(error=>console.log(error));
	},
	methods:{
		categorycheckboxevent(categoryitem,filteritem,event){
			let param={attribute_id:filteritem.id,category_id:categoryitem.id,value:event.target.checked?1:0};
			axios.post('api/siteadmin/attribute/updatecategory',param)
			.then(response=>{
				this.newattribid=0;
				item.predefinedvalues.push(response.data);
			})
			.catch(error=>console.log(error));
		},
		processCategoryResponse(data){
    		this.categories = data;
    		this.attribcategorymap = data.reduce((acc, item) => {
    			acc[item.id] = [];
    			let selected = {};
    			item.filters.forEach(function(item1,index){
    				selected[item1.attribute_id]=true;
    			});
    			acc[item.id] = selected;
    			/*item.filters.forEach(function(item1,index){
                	acc[item.id][item1.attribute_id] = true;
                });*/
                return acc;
            }, {});
    	},
		addattribvalue(item){
			let param={attribute_id:item.id,value:this.newattribvalue};
			axios.post('api/siteadmin/attribute/value/createupdate',param)
			.then(response=>{
				this.newattribid=0;
				item.predefinedvalues.push(response.data);
			})
			.catch(error=>console.log(error));
		},
		addnewattribvalue(item){
			this.newattribid = item.id;
		},
		updateattribvalue(attrib){
			let param={id:attrib.id,value:attrib.value};
			axios.post('api/siteadmin/attribute/value/createupdate',param)
			.then(response=>this.attribedit=0)
			.catch(error=>console.log(error));
		},
		checkboxevent(type,item,event){
			let param = {};
			if(type==1){
				param={id:item.id,display:event.target.checked?1:0};
			}
			else if(type==2){
				param={id:item.id,multiple:event.target.checked?1:0};
			}
			else if(type==3){
				param={id:item.id,predefined:event.target.checked?1:0};
			}
			axios.post('api/siteadmin/attribute/createupdate',param)
				//.then(response=>this.attributes = response.data)
				.catch(error=>console.log(error));
		},
		triggeredit(item){
    		this.isedit = !this.isedit;
    		this.attribute = item;
    	},
    	add(){
    		this.attribute = null;
    		this.isedit = !this.isedit;
    	},
		editingcompleted(){
    		//if found then update otherwise add
    		let self = this;
    		let found = 0;
    		this.attributes.forEach(function(item,index){
    			if(self.attribute.id == item.id){
    				Vue.set(self.attributes, index, self.attribute);
    				found = 1;
    			}
    		});
    		if(found == 0){
    			this.attributes.push(this.attribute);
    		}
    	},
    	getimageurl(imageitem,item){
			return window.axios.defaults.baseURL+"/attributes/"+imageitem.id+'/'+this.size+'x'+this.size+'/'+item.url+"-"+imageitem.id+".jpg";
		},
		imageLoadError(imageitem,item){
			let param = {type:1,id:item.id,imageid:imageitem.id,size:this.size};
			//item.imageid = 0;
			axios.post('api/image/getcreateurl', param)
			.then((response) => {
				item.imageid = response.data.id;
			}).catch((err) => {
	            console.log('', err)
		    });
		},
		// triggerimagemodal(item){
    	// 	this.attribute = item;
    	// 	this.$modal.show('imagemodal');
    	// },
    	saveimage(imageid){
    		//post the category id and the image id
    		if(this.attribute!=null){
    			let param = {attributeid:this.attribute.id,imageid:imageid};
    			axios.post('api/attribute/processimage', param)
    			.then((response) => {
    				this.refreshimages(response.data);
				}).catch((err) => {
		            console.log('Error in uploading image', err)
    		    });
    		}
    	},
    	refreshimages(data){
    		let self = this;
    		self.attribute.image = data;
    		this.attribute.forEach(function(item,index){
    			if(self.attribute.id == item.id){
    				Vue.set(self.attribute, index, self.attribute);
    			}
    		});
    	},
		addnew(){
			this.$router.push({name:'addattribute'})
		}
	}
}
</script>