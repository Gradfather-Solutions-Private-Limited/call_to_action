<template>
    
    <div class="container-fluid mt-10">
        <div class="card ">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr >
                            <th>Id</th>
                            <th>Name</th>
                            <th>Eamil</th>
                            <th>Mobile No</th>
                            <th style="width:170px;">Job Name</th>
                            <th>CV</th>
                        </tr>
                        </thead>
                        <tbody>                        
                            <tr v-for="(item,index) in lists">
                                <td>{{index+1}}</td>
                                <td class="text-info">{{item.name}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.mobile}}</td>
                                <td class="text-success" style="width:170px;">{{item?.job?.title || 'N/A'}}</td>
                                <td class="text-success">
                                    <a v-if="item.downloadUrl" target="_blank" :href="item.downloadUrl">Download</a>
                                    <a v-else>Contact form</a>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
        </div>
    </div>
</template>

<script>

export default{
    components:{},
    data(){
        return{
            flag:0,
            lists:[],
            editdata:[],
        }
    },

    mounted(){
        this.$store.commit("assignaddpageheading", 'Lists of applied jobs');
        this.getlist();
    },
    methods:{
        getlist(){
                axios.post('api/hayat/getappliedjob').then(response => {
                   // this.listofitems = response.data.seolist;
                   this.lists=response.data;
                   
                });
    },
     open(n){
        this.flag=n;
        console.log('form page')
     },
     edititem(item) {
            this.editdata = item;
            this.flag = 1;
    },

    deletejob(item){
        axios.post('api/hayat/deletejob',item).then(response =>{
           
        });
    }
    }, 


}

</script>


