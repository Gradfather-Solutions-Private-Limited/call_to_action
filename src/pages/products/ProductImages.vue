<template>
    <div class="container " style="margin-top: 10px;">
        <!-- display all the product images and then display the left out images -->
        <div class="row">
            <div class="col-md-8" style="background: #fff;">
                <div class="col-md-12 ">
                    <div class="row justify-content-between">
                        <div class="col-md-3">
                            <div class="pull-right" @click="goback()">
                                <button class="btn btn-primary">Back</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row">

                            <div class="col-md-12" v-for="(size, sizeindex) in imagessizes" v-bind:key="index">
                                <div v-if="accessid(size.acessid)">
                                    <div class="col-md-12">
                                        <div class=" webnavbg">
                                            <div class="nav nav-tabs scrollmenu" id="nav-tab" role="tablist">
                                                <a style="font-size: 25px;cursor: pointer;text-decoration: none; color: black;"
                                                    :class="newactiveclass + [(shownavtab == sizeindex ? 'active' : '')]"
                                                    @click="changetab(sizeindex)">
                                                    {{ size.width }}x{{ size.height }}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <h6>Image lists {{ size.width }}x{{ size.height }}</h6>
                                    <display-image :size="size" :sequence="index"></display-image>
                                </div>
                            </div>
                            <!-- <div class="col-md-6" v-for="(size,sizeindex) in imagessizes" v-bind:key="index">
                        <h6 >Image lists {{size.width}}x{{size.height}}</h6>
                        <display-image :size="size" :sequence="index" v-show="shownavtab==sizeindex"></display-image>
                    </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 img-uploadright">
                <div>
                    <h4>Upload Images</h4>
                </div>
                <div class="size-images col-md-12">

                    <div class="row">
                        <div class="col-md-6">
                            <label><b>Select Size</b></label>
                            <select class="form-control" v-model="sizeindexrow" @change="chnagesize()">
                                <template v-for="(size, sizeindex) in imagessizes">
                                    <option :value="sizeindex">{{ size.width }}x{{ size.height }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label><b>Number of Image</b></label>
                            <input v-if="imagecountfun" type="number" v-model="imagecount" class="form-control " />
                        </div>

                    </div>
                    <span class="imagesizetext red">{{ errortext }}</span>
                </div>
                <div class="col-md-12 upladbox-cat">
                    <input type="file" id="attach_file" name="files" @change="processFile2($event)"
                        style="padding-top: 17px;padding-bottom: 29px;">
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import ImageModal from "../../components/utilities/ImageModal.vue";
import DisplayImage from "../../components/utilities/DisplayImage.vue"
import Constants from "../../components/access/Constants.vue";
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue'
export default {
    mixins: [Constants, UploadMixin2],
    components: { ImageModal, DisplayImage },
    data() {
        return {
            imagessizes: [{ width: 90, height: 90, acessid: 311 }, { width: 270, height: 360, acessid: 312 },
            { width: 300, height: 300, acessid: 313 }, { width: '1000', height: '1000', acessid: 314 }],
            productimages: [],
            width: 0,
            height: 0,
            signedurlid: 0,
            imageindex: '',
            indexsize: [],
            imagecount: 1,
            sizeindexrow: 0,

        }
    },
    computed: {
        ...mapGetters([
            'edititem', 'productimages'
        ]),
        imagecountfun: function () {
            this.productimages;
            this.chnagesize();
            return true;
        }
    },
    mounted() {
        this.refresh();
        this.$store.commit("assignaddpageheading", 'Add Product Images');
    },
    methods: {
        changetab(num) {
            this.shownavtab = num;
        },
        chnagesize(item) {
            var selectrow = [];
            selectrow = this.imagessizes[this.sizeindexrow];
            let listimg = this.productimages.filter(obj => obj.width === selectrow.width && obj.height === selectrow.height);

            this.imagecount = 1;
            if (listimg.length > 0) {
                this.imagecount = listimg.length + 1;
            }

            let obj = { 'type': 2, 'width': selectrow.width, 'height': selectrow.height, 'directorypath': 'product/' + this.productid, 'counter': this.imagecount, 'typeid': this.productid }

            this.errortext = "Image size should be " + selectrow.width + "*" + selectrow.height;
            console.log(obj);
            this.$store.commit('assignfilecomponents', obj);

        },
        refresh() {
            this.productid = this.$route.params.productid
            let param = { type: 2, typeid: this.productid }
            axios.post("api/siteadmin/images/fetch", param)
                .then((response) => this.Processresponse(response.data))
                .catch(error => console.log(error));
        },
        Processresponse(data) {
            console.log("Stage2")
            console.log(data)
            this.productimages = data
            this.$store.commit('assignproductimages', data)
        },
        isimagepresent(size, index) {
            console.log("Looking for the image:" + size.width)
            let images = this.edititem.images.filter(function (item) {
                if (item.width === size.width && item.height === size.height) {
                    return true;
                }
                return false
            });
            if (typeof images !== 'undefined') {
                if (images.length >= index) {
                    return true
                }
            }
            return false
        },
        uploaded() {
            this.refresh();
            alert('upload');
        },
        getImageObj(size, index) {
            let images = this.edititem.images.filter(function (item) {
                if (item.width === size.width && item.height === size.height) {
                    return true;
                }
                return false
            });

            if (typeof images !== 'undefined') {
                if (images.length >= index) {

                    return images[index - 1];
                }
            }
            return '#'
        },

        processFileResponse(file, data) {
            //if everything is fine then upload to the server
            if (!data.success) {
                alert(data.message)
            } else {
                this.signedurlid = data.presignedid
                this.uploadImageToS3(file, data)
            }
        },
        uploadImageToS3(file, signedurlobject) {
            //this.$modal.show('loadingmodal');

            let newfile = new File([file], signedurlobject.filename, { type: file.type });
            let instance = axios.create();
            delete instance.defaults.headers.common['Authorization'];


            instance.put(signedurlobject.uploadUrl, newfile, {
                headers: {
                    'Content-Type': file.type,

                }
            }).then(response => this.processUploadResponse(response))
                .catch(error => console.log(error));

        },
        goback() {
            this.$router.push({ name: "products" });
        },
    }
}
</script>
<style scoped>
.imagesizetext {
    font-size: 20px;
    font-weight: 700;
}

.red {
    color: red;
}
</style>