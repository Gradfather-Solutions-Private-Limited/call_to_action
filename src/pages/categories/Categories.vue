<template>
	<div>
		<div class="col-md-12">
			<div class="card mt-10">
				<div class="card-header">
					<h5 class="card-title">Categories</h5>
				</div>
				<div class="card-body">
					<div class="col-md-12">
						<div class="row">
							<div>

								<!-- <Datepicker
								v-for="(date, index) in dates"
								:key="index"
								v-model="dates[index]"
								:placeholder="'Select date ' + (index + 1)"
								@update:modelValue="updateDates"
								/> -->
								<button @click="addDatePicker">Add Another Date</button>

<!-- Textbox Showing Selected Dates -->
<input
  type="text"
  v-model="formattedDates"
  placeholder="Selected Dates"
  readonly
/>
							</div>
							
							<div class="col-md-4">
								<div class="col-md-12 ">
									<div class="col-md-12 "><span class="heading-border">Categories</span></div>
									<category-autocomplete boxname="search_category_id"></category-autocomplete>
									<input type="hidden" v-model="search_category_id">
								</div>
							</div>
							<div class="col-md-6">
								<div class="row">
									<div class="col-md-3 ">
										<label class="heading-border">Categories:</label>
										<input type="checkbox" v-model="categories_view" >
									</div>
									<div class="col-md-4 ">
										<label class="heading-border">Sub Categories:</label>
										<input type="checkbox" v-model="sub_categories_view" >
									</div>
								</div>
								
							</div>
						</div>
						<div class="col-md-12 mt-20 ">
							<button class="btn btn-success" @click="getcategoriesname()">
								<i class='bx bx-save'></i> Search
							</button>
							<button class="btn btn-success" @click="addnew()">Add New</button>
							<q-spinner-hourglass color="blue" v-if="issave" size="3em" />
							<button class="btn btn-danger cancel-btn" @click="cancel()">
								<i class='bx bx-arrow-back'></i>Cancel
							</button>
						</div>
					</div>
				</div>
			</div>



		</div>
		<div class="col-md-12">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>S.no</th>
							<th>Name</th>
							<th>Url</th>
							<th>Parent Id</th>
							<th>Attributes</th>
							<th>Disable</th>
							<th>Image</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<admin-categories-row v-for="(item, index) in categories" v-bind:key="item.id" :item="item"
							:index="index"></admin-categories-row>
					</tbody>
				</table>
			</div>
		</div>
		<image-modal></image-modal>
	</div>
</template>
<script>
import AdminCategoriesRow from './AdminCategoriesRow.vue'
import ImageModal from "../../components/utilities/ImageModal.vue";
import { mapGetters } from 'vuex'
import Constants from '../../components/utilities/Constants.vue'
import CategoryAutocomplete from '../../components/autocomplete/CategoryAutocomplete.vue';
// import Datepicker from 'vue3-datepicker';
	export default {
		mixins: [Constants],
		components: {
			ImageModal, AdminCategoriesRow,CategoryAutocomplete//,Datepicker
  	  	},
		data() {
			return {
				
				categoryArray:[],
				status:{'0':'Disabled','1':'Active'},
				isedit:false,
				category:null,
				size:250,
				dates: [''],
				attributes:[],
				attribcategorymap:[],
				categories_view:true,
				sub_categories_view:'',
				searchname:'',
				searchurl:'',
				searchrole:0,
				searchstatus:1,

				noofrecords1: 50,
				totalrecord1: '',
				noofpages1: '',
				currentpage1: 1,
			}
		},
		mounted(){
		 
			this.listfun();
			this.$store.dispatch('fetchattributes')
			this.getcategoriesname();
		},
		computed: {
			//    categorieslist(){
			// 	return this.categories.slice((this.page-1)*this.noofrecords, (this.page-1)*this.noofrecords+this.noofrecords);
			// 	},
			formattedDates() {
				return this.dates.filter(date => date).join(', ');
			},
			...mapGetters([
				'loggedinuser', 'viewno', 'categories'
			]),
  		},
		methods: {
			addDatePicker() {
      			this.dates.push(''); // Add another date entry
			},
			updateDates(value, index) {
			this.dates[index] = value;
			},
		getcategoriesname(){
			let cate_view = 0
			if(this.categories_view){
				 cate_view = 1
			} 
			if(this.sub_categories_view){
				cate_view = 2
			}
			let parm = {'categoryid':this.search_category_id,'cate_view':cate_view} 
			axios.post('api/siteadmin/categories/withfilters',parm)
			.then(response => this.processCategoryResponse(response.data))
			.catch(error => console.log(error));
			this.$store.dispatch('fetchattributes')
			let param = { searchstatus: this.searchstatus }
			axios.post('api/siteadmin/attribute/all', param)
				.then((response) => this.processAttributeallListResponse(response.data))
				.catch((err) => {
					console.log('', err)
			});

		},
			countlistfun(){
				axios.post('api/siteadmin/categories/withfilters2count')
                .then(
                    response => {
                        this.totalrecord1 = response.data
                        this.noofpages1 = Math.ceil(this.totalrecord1 / this.noofrecords1);
                    }
                )
                .catch(error => console.log(error));
			},
			listfun(){
				let param = {currentpage:this.currentpage1 }
				axios.post('api/siteadmin/categories/withfilters2',param)
    			.then(response=>this.processCategoryResponse(response.data))
    			.catch(error=>console.log(error));
			},
			clickCallback1(data) {
				this.currentpage1 = data;
				this.listfun();
			},
			
			deleteimage(imageitem, item) {
				let param = { imageid: imageitem.id };
				axios.post('image/remove', param)
					.then(response => {
						let index = item.images.findIndex(block => block.id == imageitem.id)
						if (index > -1) {
							item.images.splice(index, 1)
						}
					})
					.catch(error => console.log(error));
			},
		clickCallback(pageNum) {
			this.page = pageNum;
			this.searchName();
		},
		
		searchName() {

			let param = { searchname: this.searchname, searchstatus: this.searchstatus, searchurl: this.searchurl, searchrole: this.searchrole, pageno: this.page, noofrecords: this.noofrecords }

			axios.post('api/siteadmin/category/search', param)
				.then((response) => this.processCategoryResponse(response.data))
				.catch((err) => {
					console.log('', err)
				});

		},
		processAttributeallListResponse(data) {
			this.noofpages = data;
			this.noofpages = Math.ceil(this.noofpages / this.noofrecords);
		},
		processloggedinuser(data) {
			this.$store.commit("assignloggedinuser", data)
		},

		categorycheckboxevent(categoryitem, filteritem, event) {
			let param = { attribute_id: filteritem.id, category_id: categoryitem.id, value: event.target.checked ? 1 : 0 };
			axios.post('api/siteadmin/attribute/updatecategory', param)
				.then(response => {
					this.newattribid = 0;
					item.predefinedvalues.push(response.data);
				})
				.catch(error => console.log(error));
		},
		getimageurl(imageitem, item) {
			return window.axios.defaults.baseURL + "/categories/" + imageitem.id + '/' + this.size + 'x' + this.size + '/' + item.url + "-" + imageitem.id + ".jpg";
		},
		imageLoadError(imageitem, item) {
			let param = { type: 1, id: item.id, imageid: imageitem.id, size: this.size };
			//item.imageid = 0;
			/*axios.post('api/image/getcreateurl', param)
			.then((response) => {
				item.imageid = response.data.id;
			}).catch((err) => {
				console.log('', err)
			});*/
		},
		processCategoryResponse(data) {
			this.$store.commit('assigncategories', data)

			this.page = 1;
			/*this.categoryArray = data.reduce((acc, item) => {
				acc[item.id] = item.name;
				return acc;
			}, {});
			this.categoryArray[0]='All/None';*/
		},
		add() {
			this.$store.commit('assignviewno', 2)
			this.$store.commit('assignedititem', null)

		},
		editingcompleted() {
			//if found then update otherwise add
			let self = this;
			let found = 0;
			this.categories.forEach(function (item, index) {
				if (self.category.id == item.id) {
					self.$set(self.categories, index, self.category);
					found = 1;
				}
			});
			if (found == 0) {
				this.categories.push(this.category);
			}
		},

		saveimage(imageid) {
			//post the category id and the image id
			let param = { categoryid: this.category.id, imageid: imageid };
			if (this.category != null) {
				axios.post('api/category/processimage', param)
					.then((response) => {
						this.refreshimages(response.data);
					}).catch((err) => {
						console.log('Failed to get an S3 signed upload URL', err)
					});
			}
		},
		refreshimages(data) {
			let self = this;
			self.category.images = data;
			let index = this.categories.findIndex(block => block.id == self.category.id)
			if (index > -1) {
				console.log("Setting")
				self.$set(self.categories, index, self.category);
			}
		},
		addnew() {
			this.$router.push({ name: 'newcategories' })
			this.$store.commit("assignedititem", null)
		}
	}

}
</script>