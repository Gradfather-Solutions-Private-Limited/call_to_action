<template lang="">
        <div class="container">
            <div class="card mt-10">
                    <div class="card-header">
                        <!-- <h5 class="card-title">Navigations form</h5> -->
                    </div>
                    <div class="card-body">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="col-md-12 ">
                                        <div class="col-md-12 "><span class="heading-border">Url</span></div>
                                        <input type="text" v-model="form.url"  class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="col-md-12 ">
                                        <div class="col-md-12 "><span class="heading-border">Title</span></div>
                                        <input type="text" v-model="form.title"  class="form-control" @change="changeTitle('title')"
                                     >
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="col-md-12 ">
                                        <div class="col-md-12 "><span class="heading-border">Meta Deta</span></div>
                                        <textarea class="form-control" v-model="form.metadata" ></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="col-md-12 ">
                                        <div class="col-md-12 "><span class="heading-border">Keywords</span></div>
                                        <textarea class="form-control" v-model="form.keywords" ></textarea>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="col-md-12 ">
                                        <div class="col-md-12 "><span class="heading-border">Description</span></div>
                                        <textarea class="form-control" v-model="form.description" @input="changeTitle('description')" ></textarea>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <multiple-categories :lable="categlist"></multiple-categories>
                                </div>
                                <ckeditor-component></ckeditor-component>
                                <div class="col-md-12 mt-10">
                                    <button class="btn btn-primary " @click="submit()" type="button">SUBMIT</button>
                                    <button class="btn btn-danger mr-10" @click="cancel()" type="button">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
import MultipleCategories from "./../utility/MultipleCategories.vue";
import CkeditorComponent from "./../utility/CkeditorComponent.vue";


export default {
    props: ['editdata'],
    components: { MultipleCategories, CkeditorComponent },
    data() {
        return {
            form: new Form({
                id: '',
                title: '',
                url: '',
                metadata: '',
                keywords: '',
                description: '',
                description2: '',
            }),
            selectcategories: [],
            selectcategoriesitem: [],
        }
    },
    computed: {
        ...mapGetters([
            'categories', 'Ckeditortext'
        ]),
    },
    mounted() {
        let item = this.$parent.editdata;
        if (item.length != 0) {
            if (item.categoryids != null) {
                var newcategory = item.categoryids.split(",");

                for (var i = 0; i < newcategory.length; i++) {
                    let string = this.categories.find(c => c.id == newcategory[i]);

                    if (string != null) {
                        this.selectcategoriesitem.push(string);
                        this.selectcategories.push(string.id);
                    }
                }
                this.$store.commit('assignselectcategoriesitem', this.selectcategoriesitem)
            }
            const obj = JSON.parse(item.json);
            this.$store.commit('assignCkeditortext', obj.description2)
            this.form.id = item.id;
            this.form.title = obj.title;
            this.form.url = item.url;
            this.form.metadata = obj.metadata;
            this.form.keywords = obj.keywords;
            this.form.description = obj.description;
        }
    },
    methods: {
        submit() {
            this.form['categories'] = this.selectcategories;
            console.log(this.form);
            console.log(this.Ckeditortext);
            axios.post('api/seo/insertnavdata', this.form)
                .then(response => {
                    this.cancel();
                    this.$parent.getnavigationlogs();
                })
                .catch(error => {
                    console.log(error);
                })
        },
        cancel() {
            this.form.id = '';
            this.form.title = '';
            this.form.url = '';
            this.form.metadata = '';
            this.form.keywords = '';
            this.form.description = '';
            this.$parent.editdata = [];
            this.$store.commit('assignselectcategoriesitem', [])
            this.$parent.flag = 0;
        },
        setFormValue(item) {
            console.log(item);
        },
        changeTitle(name) {
            let string = this.form[name];
            if (string) {
                this.form[name] = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }


        },
      


    }

}
</script>
<style lang="">

</style>