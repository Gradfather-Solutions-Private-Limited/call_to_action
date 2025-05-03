<template>
      
                        <div class="autocomplte-div">
                            <div class="col-md-12 "><span class="heading-border">Categories</span></div>
                            <input type="search" v-model="valuesearch" class="form-control"
                                @input="getallcategories($event)">
                            <div class="autocomplete-items" v-show="autoVisibility1">
                                <ul class="autocomplte-continer">
                                    <li v-for="item in listcategories">
                                        <a href="javascript:void(0);" @click="selectedvalueurl(item)">{{ item.name }}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="copyoftextbox" v-if="selectcategoriesitem.length > 0">
                                <div v-for="item in selectcategoriesitem" class="selected-cate-box">
                                    <a href="javascript:void(0);">
                                        {{ item.name }}
                                        <i class='bx bx-message-alt-x multi-remove' @click="remove_data(item)"></i>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
</template>
<script>
import debounce from 'lodash.debounce'

import { mapGetters } from 'vuex'
    export default {
        components: {
			debounce
  	  	},
        data() {
            return {
                listcategories:[],
                valuesearch:'',
                autoVisibility1:false,
            }
        },
        computed:{
            ...mapGetters([
                'categories','selectcategoriesitem'
            ]),
        },
        mounted() {
            window.addEventListener('click', this.vClosePopup);
        },
        methods: {
            vClosePopup(){
                this.autoVisibility1 = false;
            },
            getallcategories(event){
                this.autoVisibility1 = true;
                var tempcategories = this.categories;
				 let newvalue = tempcategories.filter((item)=>{
                    let name = item.name.toUpperCase();
  		    	   return (name.startsWith(event.target.value.toUpperCase()))
				 })
				 this.listcategories = newvalue;
            },
            // getallcategories: debounce( 
			// function (param) {
            //     console.log(param);
            //     axios.get('api/autocomplete/category/search?query=' + param)
            //         .then(response => {
            //                 this.autoVisibility1 = true;
            //                 this.listcategories = response.data;
                            
            //          })
            //     .catch(error => console.log(error));
		    // },1000),
            remove_data(data) {
                for (let i = 0; i < this.selectcategoriesitem.length; i++) {
                    if (this.selectcategoriesitem[i] == data) {
                        this.selectcategoriesitem.splice(i, 1);
                        this.$parent.selectcategories.splice(i, 1);
                    }
                }
            },
            selectedvalueurl(data) {
                this.autoVisibility1 = false;
                this.valuesearch = data.name;
                this.selectcategoriesitem.push(data)
                this.$parent.selectcategories.push(data.id)
            },
        }
    }
</script>