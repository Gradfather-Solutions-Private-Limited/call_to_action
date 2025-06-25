<template>
    <div style="background-color:white">
        <div class="info-box  bg-seagreen  text-white">
            <div class="info-details">
                <h4>Add Operation</h4>
            </div>
        </div>

                                
        <form class="col-md-12 mb-20" @submit.prevent="onSubmit" @keydown="keydownform($event)">
              <div class="panel panel-cascade">
                <div class="panel-body ">
                    <div class="form-horizontal cascde-forms">
                        <div class="form-group row CHK">
                            <label class=" col-lg-2 col-md-3 control-label">
                                Operation<span style="color: rgba(255, 0, 0, 0.67)">*</span>
                            </label>
                            <div class="col-lg-6 col-md-9">
                                <input class="form-control form-cascade-control input-small" v-model="form.operation"
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
        </form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Constants from '../../components/utilities/Constants.vue'
export default {
    // mixins:[Constants],

    data() {
        return {
            form: new window.Form({
                id: 0,
                moduleid: 0,
                operation: ''
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
                console.log("edititem")
                this.form.id = this.edititem.id;
                this.form.moduleid = this.edititem.moduleid;
                this.form.operation = this.edititem.operation;
            }
        },
        keydownform(event) {
            this.form.errors.clear(event.target.name);
            this.errormessage = '';
        },
        submit() {
            axios.post('api/access/modules/operation/createupdate',this.form)
                .then(response => this.processResponse(response.data))
                .catch(error => {
                    console.log(error)
                });
        },
        processResponse(data) {
            this.$store.commit('updateappendaccessmodules', data)
            this.$store.commit('assignviewno', 1)
        },
        cancel() {
            this.form.reset();
            
            this.$store.commit('assignviewno', 1)
        },

    }
}
</script>