<template>
<Modal name="imagespop"  v-model="modalshow" width="70%" :close="closeModal" @before-enter="beforeEnter" height="200" :scrollable="true">
	
	<div class="card imagespop-css" >
		<div class="txt-decr" >
			 UPLOAD FILES
		</div>
		<div class="col-md-12">
			<hr>
			<div class=" fileupload-buttonbar  " style="">
				<div class="row">
					<upload></upload>
					<div class="col-md-7" style="margin-top: 20px;">
						<img v-bind:src="uploadedimage.fullurl"  v-if="uploadedimage!=null" style="width:100%">
					</div>

				</div>
				<div class="col-md-12">
					<hr>
						<div class="row">
							<div class="col-md-6 " style="text-align: right;">
								
							</div>	
							<div class="col-md-6" style="text-align: right;padding:5px ">
								<!-- <button  style="text-align:center" class="btn btn-primary" @click="saveimage" type="button" v-if="uploadedimage!=null">Save</button> -->
								<button class="btn btn-danger" @click="cancel" type="button">Cancel</button> 
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
	
	

		
</Modal>
</template>
    
<script>
import { mapGetters } from 'vuex'
// import LoadingModal from "./LoadingModal";
import Upload from "../upload/Upload.vue";
export default {

	mixins:[],
	components:{Upload},
	data(){
		return {
			imageuploaded:null,
			
		}
	},
	mounted(){
		//initialize the array as 0 for each module
		
	},
	computed: {
		...mapGetters([
			'uploadedimage','modalshow'
		]),
		getimagurl:function(){
			let url = "#";
			if(this.uploadedimage!=null)
			{
				url = window.axios.defaults.baseURL+"/"+this.uploadedimage.path+"/"+this.uploadedimage.name;
			}
			return url;
		}
	},
	methods:{
		beforeEnter() {
			this.imageuploaded = null;
			this.$store.commit('assignuploadedimage',null)
			},
		closeModal() {
			this.imageuploaded = null;
			this.$store.commit('assignuploadedimage',null)
			},
		saveimage(){
			//take the category id and post the image id and category id
			this.$parent.saveimage(this.uploadedimage.id);
			// this.$modal.hide('imagemodal');
		},
		onSuccess(){
			this.$store.commit("assignmodalshow",false)
			// this.$modal.hide('imagemodal');
			
		},
		cancel(){
			this.$store.commit("assignmodalshow",false)
			// this.$modal.hide('imagemodal');
		},
	}
};
</script>
<style>
	.file_bar{
		border: 1px solid #dadada;
		border-width:4px;  
		border-style: dashed;
		margin-top:10px;    
		height: 150px;
	}
	.up_icon{
		font-size: 32px;
		font-weight: 100;
		padding-top: 14px;
	}
</style>