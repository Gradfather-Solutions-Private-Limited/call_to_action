<template>
    <tr v-if="item != null">
        <td>{{ ((page - 1) * noofrecords) + index + 1 }}</td>
        <td>{{ item.name }} <br>
            <input type="checkbox" :checked="item.homepage == 1" @change="updatecheckboxincolumn($event, 'homepage')">HomePage <br>
            <input type="checkbox" :checked="item.hidesiblingcategory == 1" @change="updatecheckboxincolumn($event, 'hidesiblingcategory')"> Hide From Filters <br>
            <input type="checkbox" :checked="item.topcategories == 1" @change="updatecheckboxincolumn($event, 'topcategories')"> Top Categories <br>
            <input type="checkbox" :checked="item.brand == 1" @change="updatecheckboxincolumn($event, 'brand')">Brand<br>
        </td>
        <td v-text="item.url"></td>
        <td v-if="item.parentcategory != null">{{ item.parentcategory.name }}</td>
        <td v-else>None</td>
        <td>
            <div style="overflow:auto; height:150px">
                <div v-for="(item) in attributes" :key="item.id">
                    <input type="checkbox" :value="item.id" v-model="selectedids" @change="updateselectedattributes()">{{
                        item.name }}
                </div>
            </div>
        </td>
        <td><a href="#"  @click="toggelactivebtn(item)" style="margin-right: -4px;">{{ item.active == 1 ? 'Active' : 'Disabled' }} </a></td>
        <!-- <td>
        <i class="fa fa-pencil "></i> 
        <button class=" btn-primary btn-sm" style="margin-right: -4px;" @click="triggerimagemodal(item)">Add </button>
        <div class="card_1" style="width: 120px;" >
            <ul  v-for="(imageitem) in item.images" v-bind:key="imageitem.id">
                <img v-bind:src="getimageurl(imageitem)" width="50">
            </ul>
            
            <button class=" btn-danger btn-sm" @click="removeimages(product)"><i class="fa fa-xmark"></i>Delete</button>
        </div>
    </td> -->
        <td>
            
            <button type="button" @click="configimages()" class="btn btn-primary">Images1</button>
            
            <div class="card_1">
                <ul style="margin-bottom:1px;padding:0;" v-for="(imageitem, index) in item.images" v-bind:key="index">
                    <img v-bind:src="imageitem.fullurl" width="50" />
                    <button type="button" class="btn btn-outline-danger btn-xs" style="border: none;margin-left:10px"
                        @click="removeimages(imageitem)">
                        <i class="fa fa-times">x</i>
                    </button>
                </ul>
            </div>
        </td>
        <td>
            <i class="fa fa-pencil btn"> </i> <button class="btn btn-primary btn-sm"
                @click="triggeredit(item, 'newcategories')">Edit</button>
        </td>
    </tr>
</template>
<script>
import Constants from '../../components/utilities/Constants.vue'
import { mapGetters } from 'vuex'
export default {
    mixins: [Constants],
    props: ['item', 'index'],
    data() {
        return {
            selectedids: []
        }
    },
    computed: {
        ...mapGetters([
            'attributes'
        ]),
    },
    mounted() {
        this.selectedids = this.item.filters?.map(a => a.attribute_id)
    },
    methods: {
        updateselectedattributes() {
            let param = { category_id: this.item.id, attributeids: this.selectedids.join() };
            axios.post('api/siteadmin/category/updateattributes', param)
                .then(response => this.processCategoryResponse(response.data))
                .catch(error => console.log(error));
        },
        updatecheckboxincolumn(event, columnname) {
            let param = { id: this.item.id, columnname: columnname, value: event.target.checked ? 1 : 0 };
            axios.post('api/siteadmin/category/updatecolumn', param)
                .then(response => this.processCategoryResponse(response.data))
                .catch(error => console.log(error));
        },
        processCategoryResponse(data) {
            this.$store.commit('addupdatecategory', data);
        },
        configimages(){
			// this.$store.commit('assignviewno',3)
			this.$router.push({path:'/category/images/'+this.item.id})
			
		},
        toggelactivebtn(data){
            let item = false;
            let key = 1;
            if(data.active==1){
                item = confirm('Do you want to Disable');
                key = 0;
            }else{
                item = confirm('Do you want to Active');
                key = 1;
            }
            if(item){
                let param = { id: data.id, active:key };
                axios.post('api/category/updateactive', param)
                   .then(response => {
                        this.$parent.getcategoriesname();
                   })
                   .catch(error => console.log(error));
            }
        }
    }
}
</script>