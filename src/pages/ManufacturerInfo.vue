<template>
    <div class="container-fluid">
        <div class="card mt-10">
            <div class="card-header">

            </div>
            <div class="card-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="col-md-12 ">
                                <div class="col-md-12 "><span class="heading-border">Name</span></div>
                                <input type="text" v-model="name" class="form-control">
                                <span style="color: red;font-size: 12px;" v-if="flag">Field is required</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="col-md-12 mt-20 ">
                    <button class="btn btn-success " @click="submit()">
                        <i class='bx bx-save'></i> Save
                    </button>
                    <button class="btn btn-danger " style="margin-left: 15px;" @click="cancel()">
                        <i class='bx bx-arrow-back'></i>Back
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in manufacturer_list">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.name }}</td>
                        <td><i class='bx bx-edit' @click="edit_manufacturer(item)" style="font-size: 24px;"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            name: '',
            id: '',
            manufacturer_list:[],
            flag:false,
        }
    },
    computed: {
        ...mapGetters([
            'loggedinuser'
        ]),
    },
    mounted() {
        this.get_list();
        this.$store.commit("assignaddpageheading", 'Manufacturer information');
    },
    methods: {

        submit() {
            if (this.name === '') {
                this.flag = true;
                return;
            }else{
                this.flag = false;
                let parm = { 'name': this.name, 'id': this.id }
                axios.post('/api/manufacturer/save', parm).then(res => {
                    this.title = res.data.title;
                    this.content = res.data.content;
                    this.get_list();
                    this.reset();
                })
            }
            
        },
        get_list() {
            axios.post('/api/getmanufacturerinfos').then(res => {
                this.manufacturer_list = res.data;
            })
        },
        edit_manufacturer(data){
            this.name = data.name;
            this.id = data.id;
        },
        reset(){
            this.name = '';
            this.id = '';
        },
        cancel() {
            this.$router.back();
        }


    }
}
</script>