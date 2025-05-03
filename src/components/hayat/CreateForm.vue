<template>

    <div class="col--md-12">
        
        <div class="card">
            <div class="card-body row">
                <div class="col-md-4">
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <span class="heading-border">Title</span>
                        </div>
                        <input type="text" v-model="form.title" class="form-control" />
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <span class="heading-border">Location</span>
                        </div>
                        <input type="text" v-model="form.city" class="form-control" />
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <span class="heading-border">type</span>
                        </div>
                            <select v-model="form.type" id="type" class="form-control">
                                <option value="">--Select--</option>
                                <option value="0">Full Time</option>
                                <option value="1">Part Time</option>
                            </select>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <span class="heading-border">Job Discription</span>
                        </div>
                        <CkeditorComponent  ></CkeditorComponent>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">
                        <button @click="savedata()" class="btn btn-primary">Submit</button>
                    </div>
                    <div class="col">
                        <button @click="closepage(0)" class="btn btn-info">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div>

    </div>
</template>

<script>

import CkeditorComponent from "../../pages/utility/CkeditorComponent.vue";
export default {



    props: ['flag'],

    components: { CkeditorComponent },

    data() {
        return {
            form: new Form({
                title: ' ',
                description: '',
                city: ' ',
                salary: ' ',
                type: '0',
                id: '',
            }),
        }
    },
    mounted() {
        let item = this.$parent.editdata;
        this.form.id = item.id;
        this.form.title = item.title;
        this.$store.commit('assignCkeditortext', item.description);
        this.form.description = item.description;
        this.form.city = item.cityname;
        this.form.salary = item.salary;


    },
    methods: {
        savedata() {
            axios.post('api/hayat/createjob', this.form)
                .then(response => {
                    this.$parent.getlist();
                    this.closepage(0);
                })
                .catch(error => {
                    console.log(error);
                })

        },
        closepage(n) {
            this.form.reset();
            this.$parent.flag = 0
        }
    }
}
</script>
