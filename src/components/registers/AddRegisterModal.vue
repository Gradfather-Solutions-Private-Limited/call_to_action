<template>
    <div>
        <div class="">
            <div class="col-md-12 boxshow heading-box">
                <div class="row">
                    <div class="col-md-10">
                        <h4 class="headding-font">Add Registers</h4>
                    </div>
                    <div class="col-md-2 text-right">
                        <button class="btn btn-info" @click="this.$parent.viewno = 0">
                           Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label class="lable">Register name</label>
                            <input type="text" class="form-control" v-model="name">
                        </div>
                    </div>
                    <div class="flex-between-row mt-20">
                        <div class="col-md-1">
                            <button class="btn btn-info" @click="addRegister()">Save</button>
                        </div>
                        <!-- <div class="col-md-5 text-right">
                            <label class="">Total Records {{ total_no_of_records }}</label>
                                <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-end pagina-extra" style="">
                                    <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1"
                                    @click="goToPage(pagination.current_page - 1)" :disabled="pagination.current_page === 1"
                                    >Previous</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">{{ pagination.current_page }}</a></li>
                                    <li class="page-item"><a class="page-link" href="#">...</a></li>
                                    <li class="page-item"><a class="page-link" href="#">{{ pagination.last_page }}</a></li>
                                    <li class="page-item">
                                    <a class="page-link" href="#"
                                    @click="goToPage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page"
                                    >Next</a>
                                    </li>
                                </ul>
                                </nav>
                        </div> -->
                    </div>
                </div>

        </div>
        <div class="mt-10">
            
            <div class="col-md-12 m-top-10 boxshow">
				<div class="table-responsive">
					<table class="table">
						<thead>
                            <tr>
                                <th>#</th>
                                <th>Register Name</th>
                               <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr  v-for="(item,index) in registers" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name ?? 'N/A'}}</td>
                                <td>
                                    <button class="btn-sm btn btn-info" @click=editFun(item)>Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    
    data(){
        return {
            id:0,
            name: '',
            openingbal: 0,
            registers:[],
            total_no_of_records:0,
            pagination: {
                current_page: 1,
                last_page: 1,
            },
            page:1,
        }
    },
    mounted() {
        
        this.refresh()
    },
    methods: {
        refresh(){
            axios.get('api/registers')
                .then(response=>{
                    this.registers = response.data
                })
                .catch(error=>console.error(error))
        },
        addRegister() {
            const param = { id: this.id, name: this.name, isregister: 1, openingbal: this.openingbal };
			axios.post('api/profile/createupdate', param)
				.then(response => {
                    console.log(response.data);
                    this.cancel()
                })
				.catch(error => console.log(error));
        },
        cancel() {
            this.id = 0;
            this.name = '';
            this.openingbal = 0;
            this.refresh()
        },
        editFun(item) {
            this.id = item.id;
            this.name = item.name;
        },
    },
}
</script>
<style scoped>

</style>
