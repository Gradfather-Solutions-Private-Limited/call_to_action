<template>
    <div>
        <div>

            <div class="col-md-12">
                <div>
                    <h5><span class="ml-10">{{ this.item.wattsapptemplatename }}</span></h5>
                </div>
                <div class="temp_size">
                    <div v-if="checkHeader() == 1">
                        <!-- <div>
                        <h6 class="mt-10"><span class="ml-20">Image</span></h6>
                    </div> -->
                        <div class="col-md-12">
                            <div class="temp_header text-center">
                                <img :src="this.item.components[checkHeader()]['sampleurl']"
                                    style="width: 100%;height: 200px;">
                            </div>
                        </div>

                    </div>
                    <div>
                        <!-- <div>
                        <h6 class="mt-10"><span class="ml-20">Content</span></h6>
                    </div> -->
                        <div class="col-md-12">
                            <div :class="checkHeader() == 1 ? 'temp_body' : 'new_temp_body'">
                                <!-- Body -->
                                <div class="col-md-12 ">
                                    <span style="word-wrap: break-word;">{{ getjsondata() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-info text-white " style="background: #1c1c30;border: 1px solid #1c1c30;"
                        @click="select()">Select</button>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    // mixins:[UploadMixin2],

    props: ['item', 'gallerytemplate', 'edit'],
    data() {
        return {
            jsondata: [],
            result: false,
            templatename: '',
            body: '',
            jsonValue: [],
            newresult: [],
            samples: [],
            sample: null,
            headertype: 5,
            headertext: null
        };
    },
    computed: {
        ...mapGetters(['edititem'])
    },
    mounted() {
        let obj = { 'type': 5, 'directorypath': '', 'counter': 0, 'typeid': 0, 'typeint': 7 }
        this.$store.commit('assignfilecomponents', obj);
    },
    methods: {
        getjsondata() {
            let value = null
            this.item.components.find(function (element) {
                if (element.componenttypeint == 2) {
                    value = element.bodytext
                }
            })
            return value
        },

        select() {
            this.$store.commit('assignloadingstatus', 1)
            setTimeout(() => {
                this.$store.commit('assignloadingstatus', 0)
                this.$store.commit('assignedititem', this.item)
                // console.log("edititem here ",this.edititem)
            }, 500);

        },
        checkHeader() {
            let value = 0
            this.item.components.find((element) => {
                if (element.componenttypeint == 1) {
                    value = element.componenttypeint
                }
            })
            return value
        },


    },
}
</script>