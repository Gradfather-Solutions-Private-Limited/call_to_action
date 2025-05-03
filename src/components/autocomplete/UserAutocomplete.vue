<template>
    <div class="autocomplte-div">
                        <input type="search" v-model="usersearch" class="form-control" @input="chnageinput">
                        <div class="autocomplete-items" v-show="autoVisibility">
                                <ul class="autocomplte-continer">
                                    <li value="">
                                        <a href="javascript:void(0);" @click="selectedvalue({name:'All',id:''})">All</a>
                                    </li>
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
            usersearch:'',
        }
    },
    methods:{
        selectedvalue(item){
            this.usersearch =  item.name;
            this.$parent[this.boxname] = item.id;
            this.autoVisibility = false;
        },
        chnageinput(){
                let param={searchtxt:this.usersearch}
                    axios.post('api/user/autocompletefetchname',param)
                                .then(response=>{
                                    this.autoVisibility = true;
                                    this.listcategories = response.data;
                                })
                        .catch(error=>console.log(error));
            
        },
    }
}

</script>