<template>
    <div class="card mt-20">
        <div class="card-body">
            <div class="col-md-12">
                <div class="col-md-12 flex-between-row flex-gap-10 pb-20">
                    <div class="flex-between-row flex-gap-10 col-md-6" v-if="accessid(328)">
                        <label for="">Select Banner</label>
                        <select v-model="selectedtype" @change="banners()" class="form-control">
                            <option value="0">Select</option>
                            <option v-bind:key="bannertype.id" :value="bannertype.id"
                                v-for="(bannertype) in bannertypes">{{ bannertype.label }}</option>
                        </select>

                        <button type="button" class="btn btn-success" v-if="selectedtype > 0 && loggedinuser?.role == 3"
                            @click="edit()">Edit Banner</button>
                        <button type="button" class="btn btn-primary" v-if="selectedtype > 0 && loggedinuser?.role == 3"
                            @click="addnewimage()">Add new Image Detail</button>
                    </div>

                    <button v-if="accessid(221)" type="button" class="btn btn-primary" @click="addtype()">Add New
                        Banner</button>
                </div>
            </div>
            <div class="col-md-12">
                <p style="color:red">* You Have to Upload {{ bannertype?.maximages }} images in this Banner</p>
            </div>
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Title</th>
                                <th>Url</th>
                                <th>Description</th>
                                <th>Upload</th>
                                <th>Image</th>
                                <!-- <th>Edit</th> -->
                                <!-- <th>Delete</th> -->
                                <th>Upload Image Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in listofbanners" :key="item.id">
                                <td scope="row">{{ index + 1 }}</td>
                                <td>{{ item.title }} <i class='bx bx-edit-alt' style="color:#199208"
                                        @click="opentitle = !opentitle"></i>
                                    <div>
                                        <input type="text" v-if="opentitle" v-model="item.title"
                                            @change="updatefield('title', item.title, item)">
                                    </div>
                                </td>
                                <td>{{ item.hyperlink }} <i class='bx bx-edit-alt' style="color:#199208"
                                        @click="openurl = !openurl"></i>
                                    <div>
                                        <input type="text" v-if="openurl" v-model="item.hyperlink"
                                            @change="updatefield('hyperlink', item.hyperlink, item)">
                                    </div>
                                </td>
                                <td>{{ item.description }} <i class='bx bx-edit-alt' style="color:#199208"
                                        @click="opendescription = !opendescription"></i>
                                    <div>
                                        <textarea type="text" v-if="opendescription" v-model="item.description"
                                            @change="updatefield('description', item.description, item)"></textarea>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="bannersizes != null">
                                        <div v-for="(sizeitem) in bannersizes" v-bind:key="sizeitem.id">
                                            <div>Width:{{ sizeitem.w }} x Height:{{ sizeitem.h }}</div>
                                            <banner-image :banner="item" :counter="index"
                                                :size="sizeitem"></banner-image>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="item.images != null">
                                        <div v-for="image in item.images" :key="image.id">
                                            <img :src="image.fullurl" alt="" width="50" height="50">
                                            <button type="button" class="btn btn-outline-danger ml-10"
                                                style="border: none" @click="removeimages(image)">
                                                <i class='bx bx-x-circle'></i>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="item.images != null">
                                        <div v-for="image in item.images" :key="image.id">
                                            <div><label for="">Width:</label> {{ image.width / 10 }}</div>
                                            <div><label for="">Height:</label> {{ image.height / 10 }}</div>
                                            <div><label for="">File Type:</label> {{ image.filetype }}</div>
                                        </div>
                                    </div>
                                </td>
                                <!-- <td><button v-if="loggedinuser?.user?.role==3" type="button" class="btn btn-success">Edit</button></td> -->
                                <td><button v-if="loggedinuser?.user?.role == 3" type="button"
                                        class="btn btn-outline-danger" style="font-size: 22px;"
                                        @click="deleteBannerDetail(item)"><i class='bx bx-trash-alt'></i></button></td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <image-modal></image-modal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ImageModal from '../../components/utilities/ImageModal.vue'
import AddNewType from './AddNewType.vue'
import BannerImage from './BannerImage.vue'
import Constants from '../../components/utilities/Constants.vue'
export default {
    components: { AddNewType, BannerImage, ImageModal },
    mixins: [Constants],
    data() {
        return {
            selectedtype: 0,
            listofbanners: [],
            listofimages: [],
            opentitle: false,
            opendescription: false,
            openurl: false
        }
    },
    mounted() {
        this.refresh()
        this.$store.commit("assignaddpageheading", 'Banners');
    },
    computed: {
        ...mapGetters([
            'bannertypeimage', 'viewno', 'bannertypes', 'loggedinuser'
        ]),

        bannertype() {
            let bannertype = this.bannertypes.find(block => block.id == this.selectedtype)
            return bannertype
        },
        bannersizes() {
            if (this.bannertype != null) {
                return JSON.parse(this.bannertype.sizes)
            }
        },
    },
    methods: {

        banners() {
            let param = { bannertypeid: this.selectedtype }
            axios.post("api/siteadmin/banner/details/fetch", param)
                .then(response => {
                    this.processBannerDetailResponse(response.data)
                })
                .catch(error => console.log(error));
            // let param1={bannertypeid:this.selectedtype}
            axios.post("api/siteadmin/banner/images/fetch", param)
                .then(response => {
                    this.processBannerImagesResponse(response.data)
                })
                .catch(error => console.log(error));
        },
        processBannerDetailResponse(data) {
            this.listofbanners = data
        },
        processBannerImagesResponse(data) {
            this.listofimages = data
        },
        edit() {
            this.$router.push({ path: 'banner/createupdate/' + this.selectedtype })
        },
        changed() {

            this.$store.commit('assignselectedbannertypeid', this.selectedtype)
            /*let param = {typeid:this.selectedtype}
            axios.post('banner/images',param)
            .then(response=>this.processResponse(response.data))
            .catch(error=>console.log(error));
            */
        },
        refresh() {
            axios.post("api/siteadmin/banner/types/fetch")
                .then(response => this.processBannerTypeResponse(response.data))
                .catch(error => console.log(error));
        },
        processBannerTypeResponse(data) {
            this.$store.commit('assignbannertypes', data)
            //this.bannertypes = data;
        },
        addtype() {
            this.$router.push({ path: 'banner/createupdate' })
        },
        addnewimage() {
            this.$router.push({ path: 'banner/addnewimage/' + this.selectedtype })
        },
        deleteBannerDetail(item) {
            if (confirm("DO you really want to delete")) {
                let param = { id: item.id }
                axios.post("api/siteadmin/banner/details/delete", param)
                    .then(response => this.processBannerDeleteResponse(response.data))
                    .catch(error => console.log(error));
            }
        },
        processBannerDeleteResponse() {
            alert("Deleted successfully")
            this.refresh()
        },
        updatefield(text, value, item) {
            let param = { column: text, id: item.id, value: value }
            axios.post("api/siteadmin/bannerDetails/updatefield", param)
                .then(response => this.processBannerUpdatefieldResponse(response.data))
                .catch(error => console.log(error));
        },
        processBannerUpdatefieldResponse() {
            alert("Updated")
            this.opentitle = false
            this.opendescription = false
            this.openurl = false
        }
    },
}
</script>