<template>
    <div class="mt-10">
        <div>
            <div class="col-md-12">
                <div class="row" style="margin-top:20px">
                    <div class="col-md-8">
                        <h3 class="page-header"> Add Module </h3>
                    </div>
                    <!-- <div class="col-md-4 text-end">
                        <button @click="add()" class="btn btn-primary btn-sm"><i class="fa fa fa-user"></i> Add
                            New</button>
                        <button @click="refresh()" class="btn btn-primary btn-sm ml-10"><i class="fa fa-refresh"></i>
                            Refresh</button>
                    </div> -->
                </div>
            </div>
        </div>

        <form class="col-md-12" @submit.prevent="onSubmit" @keydown="keydownform($event)">
            <div class="panel panel-cascade">
                <div class="panel-body">
                    <div class="form-horizontal cascde-forms">
                        <div class="form-group row CHK">
                            <label class=" col-lg-2 col-md-3 control-label">
                                Module<span style="color: rgba(255, 0, 0, 0.67)">*</span>
                            </label>
                            <div class="col-lg-6 col-md-9">
                                <input class="form-control form-cascade-control input-small" v-model="form.module"
                                    type="text">
                            </div>
                            <div class="col-lg-4 col-md-9">
                                <input type="button" value="Submit" @click="submit()" class="btn bg-primary text-white btn-sm">
                                <input type="button" value="Cancel" @click="cancel()" class="btn bg-danger text-white btn-sm ml-10">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="row" style="text-align:center;">
                   
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
// import Constants from '../access/Constants.vue'
export default {
    // mixins:[Constants],

    data() {
        return {
            form: new window.Form({
                id: 0,
                module: '',
                projectid: 5
            }),
        }
    },
    computed: {
        ...mapGetters([
            'viewno', 'edititem',
        ]),
    },
    mounted() {
        this.initializedata();
    },
    watch: {
        edititem: function () {
            this.initializedata();
        }
    },
    methods: {
        initializedata() {
            if (this.edititem != null) {
                this.form.id = this.edititem.id;
                this.form.module = this.edititem.module;
            }
        },
        keydownform(event) {
            this.form.errors.clear(event.target.name);
            this.errormessage = '';
        },
        submit(){
            axios.post('api/access/modules/createupdate',this.form)
                .then(response=>this.processResponse(response.data))
                .catch(error=>console.log(error));
        },
        processResponse(data) {
            console.log("data after api call ",data)
            this.$store.commit('updateappendaccessmodules', data)
            this.$store.commit('assignviewno', 1)
        },
        cancel() {
           this.form.reset();
            this.$store.commit('assignviewno', 1)
        }
    }
}
</script>