<template>
    <div class="autocomplte-div">
                        <input type="search" v-model="productsearch" class="form-control" @input="chnageinput">
                        <div class="autocomplete-items" v-show="autoVisibility">
                                <ul class="autocomplte-continer">
                                    <li v-for="item in listcategories">
                                        <a href="javascript:void(0);" @click="selectedvalue(item)">{{item.name}}</a>
                                    </li>
                                </ul>
                        </div>
                    </div>
</template>
<script>
export default {
    mixins:[],
    props: ['boxname','changeevent'],
    data() {
        return {
            listcategories:[],
            autoVisibility:false,
            productsearch:'',
        }
    },
    methods:{
        selectedvalue(item){
            this.productsearch =  item.name;
            this.$parent[this.boxname] = item.id;
            if(this.changeevent == 1){
                this.$parent.changeeventproduct(item);
                if(this.boxname=='product_id'){
                    this.$parent.selectproductlist(item.url)
                }
            }
            this.autoVisibility = false;
        },
        chnageinput(){
            if(this.productsearch != ''){
                let param={searchtxt:this.productsearch}
                    axios.post('api/siteadmin/categories/autoAutocomplete',param)
                                .then(response=>{
                                    this.autoVisibility = true;
                                    this.listcategories = response.data;
                                })
                        .catch(error=>console.log(error));
            }else{
                this.autoVisibility = false;
            }
            
        },
    }
}

</script>