
<template>
    <div>
        <div class="">

            <div class="" >
                <div class="col-md-12 row p1020" >
                    <div class=" col-md-10">
                        <!-- <h4 class=" m0px">Templates</h4> -->
                    </div>
                    
                    <div class="col-md-2 text-end" v-if="viewno == 1">
                        <!-- <button class="action_btn" style="background: none;color: #007bbb;" @click="fullrefresh()">
                            <i class='bx bx-refresh ' style="font-size: 35px;"></i> -->
                            <button @click="fullrefresh()" class="action_btn" style="background: #1d1b31" >Refresh</button>
                        <!-- </button> -->
                        
                    </div>
                </div>
            </div>
            <div class="">
                <div class="container" v-if="viewno == 1">
                    <div class="col-md-12 form-control" style="padding: 10px;margin: 10px 0px;">
                        <div class="row">
                            <div class="col-md-3">
                                <div>
                                    <input type="text" class="form-control" style="line-height: 1.2;font-size: 0.9rem;"
                                        placeholder="Search" v-model="templatename" @keypress.enter="refresh()" />
                                </div>

                            </div>
                            <div class="col-md-3">
                                <div>
                                    <select class="form-select" v-model="category" @change="refresh()"
                                        style="line-height: 1.2;font-size: 0.9rem;">
                                        <option value=""> Category</option>
                                        <option>MARKETING</option>
                                        <option>UTILITY</option>
                                    </select>
                                </div>

                            </div>
                            <div class="col-md-3">
                                <div>
                                    <select class="form-select" v-model="language" @change="refresh()"
                                        style="line-height: 1.2;font-size: 0.9rem;">
                                        <option value="">Language</option>
                                        <option value="hi">hi</option>
                                        <option value="en_US">en_US</option>
                                        <option value="en_ZA">en_ZA</option>
                                        <option value="en_GB">en_GB</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <!-- <button class="action_btn" style="background: #313e5d;font-size: 0.9rem;">Search</button> -->
                            </div>
                            <div class="col-md-2 text-end" v-if="accessid(276)">
                                <button class="action_btn" style="font-size: 0.9rem;background: #007bbb;"
                                    @click="addTemplate()">Create Template</button>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-12">
                        <!-- <div class="col-md-4 mb-30" v-for="item in list" v-bind:key="item.id">
                            <watts-app-template :item="item" :key="item.id"></watts-app-template>
                        </div> -->
                        <table class="table table-responsive">
                            <thead>
                                <th>#</th>
                                <th>Template name</th>
                                <th>Category</th>
                                <th>Language</th>
                                <th>Status</th>
                                <th>Last updated</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in list" :key="item.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <div>{{ item.wattsapptemplatename }}</div>
                                        <div v-if="item.status == 'APPROVED'">
                                            <button @click="insight(item.id)" class="insight">Insights</button>
                                        </div>

                                    </td>
                                    <td>{{ item.category }}</td>
                                    <td>{{ item.language }}</td>
                                    <td>{{ item.status }}</td>
                                    <td>{{ moment(item.updated_at).format('DD-MM-YYYY') }}</td>
                                    <td>
                                        <div class="">
                                            <button class="action_btn" v-if="item.status == null"
                                                @click="editfun(item.id)">Edit</button>
                                            <button class="action_btn" v-if="item.status == null"
                                                style="background: #f94400" @click="approval(item)">Approval</button>
                                            <button class="action_btn" v-if="item.status == 'PENDING'"
                                                style="background: #1e84ba;">Pending</button>
                                            <button class="action_btn" v-if="item.status == 'APPROVED'"
                                                style="background: #00304f;">Approved</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <div v-if="viewno == 2" style="padding: 0px 20px;">
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <watts-app-template :edit="1"></watts-app-template>
                        </div>

                    </div>
                </div>

            </div>
            <!-- <div v-if="editview">
        <watts-app-template :gallerytemplate="selectedgallerytemplate" :edit="1"></watts-app-template>
    </div> -->
        </div>
    </div>
</template>
    
<script>
import { mapGetters } from 'vuex';
import WattsAppTemplate from './WattsAppTemplate.vue';
import moment from 'moment';
import axios from 'axios';
import Constants from '../../components/access/Constants.vue';
export default {
    mixins: [Constants],
    components: { WattsAppTemplate },
    data() {
        return {
            leftDrawerOpen: false,
            users: 0,
            records: 0,
            apprecords: 0,
            editview: false,
            selectgallery: false,
            showlist: true,
            selectedgallerytemplate: null,
            viewno: 1,
            moment: moment,
            category: '',
            templatename: '',
            language: '',
            newresult: []
        };
    },
    computed: {
        ...mapGetters(['loggedinuser', 'list'])
    },
    mounted() {
        this.$store.commit('assignaddpageheading','Templates')
        this.refresh();
    },
    methods: {
        fullrefresh(){
            this.templatename=""
            this.language = ""
            this.category = ""
            this.refresh() 
        },
        refresh() {
            //get the wattsapp templates
            let param = { templatename: this.templatename, category: this.category, language: this.language }

            this.$store.commit('assignloadingstatus', 1)
            axios.post("api/threads/wattsapp/company/templates/fetch", param)
                .then(response => this.processResponse(response.data))
                .catch(error => console.log(error));
        },
        processResponse(data) {
            this.$store.commit('assignlist', data.list);
            this.$store.commit('assignloadingstatus', 0)

        },
        addTemplate() {

            let templateid = 0
            this.$router.push({ path: '/template/createupdate/' + templateid })

        },
        approval(item) {
            let param = { templateid: item.id }
            this.$store.commit('assignloadingstatus',1)
            console.log("data_id",param),
            axios.post('api/threads/wattsapp/company/template/approval', param)
                .then((response) => this.processApprovalResponse(response.data))
                .catch((error) => console.log(error))
        },
        processApprovalResponse(data) {
            this.newresult = data.response
            this.refresh();
            this.$store.commit('assignloadingstatus',0)

        },
        editfun(templateid) {
            this.$router.push({ path: '/template/createupdate/' + templateid })
        },
        search() {
            console.log()
            if (this.category != "" || this.language != "" || this.tempname != "") {
                console.log("hello")
                // this.$store.commit('assignloadingstatus',1)
                // let param = {templatename:this.tempname, language:this.language, category:this.category}
                // axios.post('api/threads/wattsapp/templates/filter',param)
                //     .then((response)=>this.processFilterResponse(response.data))
                //     .catch((error)=>console.log(error))
            }
        },
        processFilterResponse(data) {
            this.$store.commit('assignloadingstatus', 0)
            console.log("Filter Response", data)
        },
        insight(templateid){
            this.$router.push({ path: '/insights/' + templateid })

        }
    },
}
</script>
<style scoped>
.grd-bg-info {
    background-color: #80d3f9;
}

.grd-orange {
    background: #FF9933;
}

.bg-green,
.bg-green>.small-box-footer {
    background-color: #138808;
    color: black;
}

.grd-white {
    background: white;
    color: black;
}

.grd-white-color {
    color: black;
}

.chakra {
    background-image: url(../assets/flagchakra2.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

}


/* .temp_size {
    height: 220px;
    width: 220px;
} */

.table>tbody td {
    padding: 12px;
    font-size: 12px;
}
</style>
    