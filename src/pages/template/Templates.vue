<template>
    <div>
        Templates
        <table>
            <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>No of Images for Products</th>
                <th>Sizes for Product Images</th>
                <th></th>
            </tr>
            <tr v-for="(item,index) in templates" v-bind:key="item.templateid">
                <td>{{index}}</td>
                <td>{{item.templatename}}</td>
                <td>{{item.productnoofimages}}</td>
                <td>
                    <div v-for="(item,index) in sizes(item.productimagesizes)" v-bind:key="index">
                        {{ item.w }}x{{item.h}}
                    </div>
                </td>
                <td><button type="button" @click="edit(item)">Edit</button></td>
            </tr>

        </table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
    mounted(){
        axios.post("api/siteadmin/templates/fetch/all")
            .then(response => this.processResponse(response.data))
            .catch(error => console.log(error));
    },
    computed:{
        ...mapGetters([
            'templates'
        ]),
        
    },
    methods:{
        sizes(stringvalue){
            return JSON.parse(stringvalue)
        },
        processResponse(data){
            this.$store.commit("assigntemplates",data)
        },
        edit(item){
            this.$router.push({path:'templates/createupdate/'+item.templateid})
        }
    }
}
</script>