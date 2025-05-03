<template>
    <div v-if="images!=null" class="col-md-12">
        <div class="row" >
            <div class="col-md-4"  v-for="(image,sizeindex) in images">
                <div class="card text-center" >
                    <img :src="image.fullurl" style="width: 100%;"  >
                    <div class="card-body">
                        <button class="btn btn-danger" @click="removeimages(image)"><span class="">Delete</span></button>
                        <div class="cal-md-12">
                                <input type="text" class="form-control" @change="handleChange($event,image)" v-bind:value="image.counter" >
                        </div>
                        <div class="col-md-12">
                                <label><b>Select Images type </b></label>
                                <select name="cars" id="cars" @change="changeimagetype(image)" class="form-control">
                                    <option value="0">---Select---</option>
                                    <option value="1">Primary image</option>
                                </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { event } from "quasar";
import { mapGetters } from "vuex";
export default {
    props:['size','sequence'],
    computed:{
        ...mapGetters([
            'productimages'
        ]),
        images(){
            let self = this
            let result = [];
            if(Object.keys(this.productimages).length>0){
                result = this.productimages.filter(obj => obj.width === this.size.width && obj.height === this.size.height);
                if(this.size.width=='1000' && this.size.height=='1000'){
                    result = this.productimages.filter(obj => obj.width === 1000 && obj.height === 1000);
                }
            }
            
            return result;
        }
    },
    data() {
        return {
            imglist:'',
        } 
    },
    methods: {
        
        changeimagetype(item){
                console.log(item.id);
                let param={imageid:item.id}
				axios.post("api/siteadmin/image/primaryimage",item)
					.then(response => {
                        alert('Updated successfully')
                        this.$parent.refresh();
                    })
					.catch(error => console.log(error))
        },
        handleChange(e,image){
                
                let param={imageid:image.id,value:e.target.value}
				axios.post("api/siteadmin/image/changecounter",param)
					.then(response => {
                        alert('Updated successfully')
                    })
					.catch(error => console.log(error))
        },
        removeimages(item){
			if(confirm("Do you really want to delete")==true){
				let param={imageid:item.id}
				axios.post("api/siteadmin/image/remove",param)
					.then(response => this.processResponse(response.data))
					.catch(error => console.log(error))
			}
        },
        processResponse(){
            alert('delete successfully')
            this.$parent.refresh();
        }
    },
}
</script>