<template>
    <!-- <div v-if="this.$parent.viewno == 1">
            <div>
                <h5><span class="ml-10">{{ this.item.wattsapptemplatename }}</span></h5>
            </div>
            <div class="temp_size">
                <div>
                    <h6 class="m0px"><span class="ml-10">Header</span></h6>
                </div>
                <div class="temp_header flex-justify-center">
                    <div class=" ">
                        <div class="" v-if="this.getjsonformat() == 'IMAGE'">
                            <div v-if="this.sampleurl != null">
                                <img :src="this.sampleurl" style="width: 180px;height: 140px;object-fit: contain;" />
                            </div>

                        </div>
                        <div class="" v-if="this.getjsonformat() == 'VIDEO'">
                            <video id="video" width="250" controls>
                                <source :src="this.sampleurl" type="video/mp4">
                            </video>

                        </div>
                        <div class="" v-if="this.getjsonformat() == 'DOCUMENT'">
                            <div>
                                <i class='bx bxs-file-doc' style="font-size: 100px;"></i>
                            </div>

                        </div>

                    </div>
                   
                </div>
                <div>
                    <h6 class="m0px"><span class="ml-10">Body</span></h6>
                </div>

                <div style="padding: 0px 10px;">
                    <div class="whatsapp_body">
                        <span class="ml-5">{{ this.body }}</span>
                    </div>
                </div>
            </div>
            <div class="flex-around-row">
                <button class="btn btn-success" v-if="this.item.status == null" @click="editfun(this.item.id)">Edit</button>
                <button class="btn btn-primary" v-if="this.item.status == null"
                    style="background: #f94400;border: 1px solid #f94400;" @click="approval()">Request For Approval</button>
                <button class="btn btn-primary" v-if="this.item.status == 'PENDING'">Pending</button>
                <button class="btn btn-primary" v-if="this.item.status == 'APPROVED'">Approved</button>
            </div>
        </div> -->
    <!-- <div> -->
    <!-- <div>
                <div class="temp_size">
                    <div class="row p-10">
                        <div class="col-md-5 flex-row">
                            <label>Template Name : </label>
                        </div>
                        <div class="col-md-7">
                            <input type="text" class="temp_select" v-model="templatename" />
                        </div>
                    </div>
                    <div class="row p-10">
                        <div class="col-md-5 flex-row">
                            <label>Category :</label>
                        </div>
                        <div class="col-md-7">
                            <select class="temp_select" v-model="category">
                                <option value="MARKETING">MARKETING</option>
                                <option value="MARKETING123">MARKETING123</option>
                                <option value="MARKETING456">MARKETING456</option>
                            </select>
                        </div>
                    </div>
                    <div class="row p-10">
                        <div class="col-md-5 flex-row">
                            <label>Language :</label>
                        </div>
                        <div class="col-md-7 ">
                            <select class="temp_select" v-model="language">
                                <option value="hi-IN">hi-IN</option>
                                <option value="en_US">en_US</option>
                                <option value="en_ZA">en_ZA</option>
                                <option value="en_GB">en_GB</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h6 class="m0px"><span class="ml-10">Header</span></h6>
                    </div>
                    <div class="">
                        <div class="temp_header">
                        </div>
                    </div>
                    <div>
                        <h6 class="m0px"><span class="ml-10">Body</span></h6>
                    </div>
                    <div class="">
                        <div style="padding: 0px 10px;">
                            <textarea cols="31" rows="3" v-model="body" style="width: 100%;"></textarea>
                        </div>
                    </div>

                </div>

                <div class="flex-around-row" v-if="this.edit == 1">
                    <button class="btn btn-success" @click="saveTemplate()">Save</button>
                    <button class="btn btn-danger" @click="cancel">Cancel</button>
                </div>
            </div> -->

    <div class="col-lg-12 row">
        <!-- <div class="" style="display: flex;"> -->
        <div class="col-lg-8 create_temp">
            <div class="col-md-12">
                <div class="">
                    <div class="mb-20 mt-20">
                        <div class="row" style="border-bottom: 3px solid #313e5d;">
                            <div class="col-md-10">
                                <h6 v-if="this.templateid == 0">New Whats App Tempate</h6>
                                <h6 v-else>Edit template</h6>
                            </div>
                            <div class="col-md-2 text-end mb-10">
                                <button class="action_btn" style="background: #313e5d;" @click="backBtn()"> <i
                                        class='bx bx-arrow-back'></i> Back</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mb-20">
                        <div class="row">
                            <div class="col-md-4">
                                <label>Template Name </label><span class="danger">*</span>
                                <input type="text" class="form-control" v-model="templatename"
                                    :readonly="this.templateid == 0 ? false : true" />
                            </div>
                            <div class="col-md-4">
                                <label>Category </label><span class="danger">*</span>
                                <select class="form-control" v-model="category">
                                    <option value="MARKETING">MARKETING</option>
                                    <option value="UTILITY">UTILITY</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label>Language </label><span class="danger">*</span>
                                <select class="form-control" v-model="language">
                                    <option value="hi">hi</option>
                                    <option value="en_US">en_US</option>
                                    <option value="en_ZA">en_ZA</option>
                                    <option value="en_GB">en_GB</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 ">
                        <div class="mb-20">
                            <div>
                                <label>Initial Message</label>
                            </div>
                            <div class=" form-control">
                                <div class="mb-10">
                                    <div>
                                        <h6>Body Text <span class="danger">*</span></h6>
                                    </div>
                                    <div class="col-md-12 ">
                                        <textarea class="form-control" rows="4" v-model="body"
                                            placeholder="Enter Message here...."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=" form-control mb-20">
                            <div>

                                <div>
                                    <h6>Header <span class="optional">(optional)</span></h6>
                                </div>
                                <div class="">
                                    <span>Choose which type of media do you want for header</span>
                                </div>
                                <div class="">
                                    <div class="col-md-12 mb-20">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <select class="form-control" v-model="headertype">
                                                    <option value="1">Select</option>
                                                    <!-- <option value="2">Text</option> -->
                                                    <option value="3">IMAGE</option>
                                                    <option value="5">VIDEO</option>
                                                    <option value="4">DOCUMENT</option>
                                                    <!-- <option value="6">LOCATION</option> -->
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <button class="new-btn" @click="mediaRefresh()"><i
                                                        class="bx bx-refresh fs-25"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div>
                                            <label>Media</label><span class="danger">*</span>
                                        </div>
                                        <div class="col-md-12 mb-10">
                                            <div class="row" v-if="headertype > 1">
                                                <div class="col-md-4 ">
                                                    <div class="flex-justify-center img_div">
                                                        <div v-if="getFileType() == 3">
                                                            <img :src="this.sampleurl"
                                                                style="width: 247px;height: 158px;object-fit: contain;">
                                                        </div>
                                                        <div v-if="getFileType() == 5">
                                                            <video id="video" width="245" height="150" controls>
                                                                <source :src="this.sampleurl" type="video/mp4">
                                                            </video>
                                                        </div>
                                                        <div v-if="getFileType() == 4">
                                                            <i class='bx bxs-file-doc' style="font-size: 60px;"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-5 flex-align-end">
                                                    <input type="file" class="form-control" name="files"
                                                        @change="uploadFile($event)" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-20">
                            <div class=" form-control">
                                <div class="mb-20">
                                    <div>
                                        <h6>Buttons <span class="optional">(optional)</span>
                                        </h6>
                                    </div>
                                    <span>Make your template content actionable with suitable option.</span>
                                </div>
                                <div v-if="templateid == 0">
                                    <button-component></button-component>
                                </div>
                                <div v-else>
                                    <button-component :edit="1"></button-component>
                                </div>
                                <div>
                                    <div class="mb-10 mt-10 " v-if="this.buttonarray?.length > 0">
                                        <div>
                                            <div class="form-control">
                                                <div class="col-md-12 mb-10" v-for="(item, index) in this.buttonarray"
                                                    :key="item.index">
                                                    <div class="row" v-if="getButtonType(item) == 1">
                                                        <div class="col-md-3 flex-align-center">
                                                            <label>Go to website</label>
                                                        </div>
                                                        <div class="col-md-3 flex-align-center-start">
                                                            <button class="new-btn"
                                                                style="background:#00800038;color: green;">{{
                                                                    item.json.text
                                                                }}</button>
                                                        </div>
                                                        <div class="col-md-5 form-control">
                                                            <span>{{ item.json.url }}</span>
                                                        </div>
                                                        <div class="col-md-1 text-end">
                                                            <button class="btn" @click="deleteBtn(item)">
                                                                <i class='bx bxs-trash fs-25 danger'></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="row" v-if="getButtonType(item) == 2">
                                                        <div class="col-md-3 flex-align-center">
                                                            <label>Call phone number</label>
                                                        </div>
                                                        <div class="col-md-3 flex-align-center-start">
                                                            <button class="new-btn"
                                                                style="background:#00800038;color: green;">{{
                                                                    item.json.text
                                                                }}</button>
                                                        </div>
                                                        <div class="col-md-5 form-control">
                                                            <span>{{ item.json.phone_number }}</span>
                                                        </div>
                                                        <div class="col-md-1 text-end">
                                                            <button class="btn" @click="deleteBtn(item)">
                                                                <i class='bx bxs-trash fs-25 danger'></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="flex-align-center" v-if="getButtonType(item) == 3">
                                                        <div class="col-md-3 flex-align-center">
                                                            <label>Custom Button</label>
                                                        </div>
                                                        <div class="col-md-8 ">
                                                            <button class="new-btn"
                                                                style="background:#00800038;color: green;">{{
                                                                    item.json.text
                                                                }}</button>
                                                        </div>

                                                        <div class="col-md-1 text-end">
                                                            <button class="btn" @click="deleteBtn(item)">
                                                                <i class='bx bxs-trash fs-25 danger'></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-40">
                            <div class="flex-around-row">
                                <button class="new-btn" @click="saveTemplate()">Save Template</button>
                                <button class="new-btn" style="background: red;" @click="backBtn()">Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 whatsapp_bg">
            <div class="">
                <div class="whatsapp_container">
                    <div>
                        <h6>Message Preview</h6>
                    </div>
                    <div>
                        <div class="form-control mb-5">
                            <div class="col-md-12">
                                <div class="mb-10" v-if="headertype > 1">
                                    <div class="flex-justify-center img_div"
                                        
                                        >
                                        <div v-if="getFileType() == 3">
                                            <img :src="this.sampleurl"
                                                style="width: 249px;height: 176px;object-fit: contain;">
                                        </div>
                                        <div v-if="getFileType() == 5">
                                            <video id="video" width="250" height="160" controls>
                                                <source :src="this.sampleurl" type="video/mp4">
                                            </video>
                                        </div>
                                        <div v-if="getFileType() == 4">
                                            <i class='bx bxs-file-doc' style="font-size: 60px;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-break" style="min-height: 80px;">
                                    <div>
                                        <p class="m0px" v-if="body != ''">{{ body }}</p>
                                        <p v-else style="color: gray;">Text message...</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="" v-if="this.buttonarray?.length > 0">
                            <div class="col-md-12 ">
                                <div class=" text-center">
                                    <div v-for="item in this.buttonarray" :key="item.index" class="col-md-12 "
                                        style="margin-bottom: 2px;">
                                        <div class="" style="padding: 0px 5px;">
                                            <div class="display_btn">
                                                <button>
                                                    <i class='bx bx-link-external' v-if="item.buttontype == 1"></i>
                                                    <i class="bx bxs-phone" v-if="item.buttontype == 2"></i>
                                                    <i class="bx bxs-share" v-if="item.buttontype == 3"></i>
                                                    {{ item.json?.text
                                                    }}</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </div>
    <!-- </div> -->
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

import UploadMixin2 from '../../components/utilities/UploadMixin2.vue'
import ButtonComponent from './ButtonComponent.vue';
import { event } from 'quasar';
export default {
    mixins: [UploadMixin2],
    components: { ButtonComponent },
    props: ['item', 'gallerytemplate'],
    data() {
        return {
            result: false,
            templatename: '',
            body: '',
            sample: null,
            headertype: 1,
            headertext: null,
            language: '',
            category: '',
            sampleurl: '',
            formatdata: '',
            sample: '',
            sampleurl: '',
            templateid: 0,
            template: [],
            editBody: '',
            editSampleUrl: '',
            fileExtension: '',
            uploadedid: '',
            amazonsigned: 0,

        };
    },
    computed: {
        ...mapGetters(['list', 'buttonarray', 'uploadedimage', 'buttondata', 'websitecount', 'phonecount']),
    },
    mounted() {
        this.templateid = this.$route.params.templateid;

        // let obj = { 'type': 5, 'directorypath': 'wattsapp', 'counter': 0, 'typeid': 0, 'typeint': 11 }
        // this.$store.commit('assignfilecomponents', obj);
        this.getTemplate()
    },
    methods: {

        saveTemplate() {
            let param = null
            let header = null
            if (this.headertype > 1) {
                if (this.headertype == 2) {
                    header = {}
                    header["format"] = "TEXT";
                    header["text"] = this.headertext;
                } else if (this.headertype == 3) {
                    header = {}
                    header["format"] = "IMAGE";
                    header["example"] = {}
                    header["example"]['header_handle'] = [];
                    header["example"]['header_handle'].push(this.uploadedid)
                } else if (this.headertype == 5) {
                    header = {}
                    header["format"] = "VIDEO";
                    header["example"] = {}
                    header["example"]['header_handle'] = [];
                    header["example"]['header_handle'].push(this.uploadedid)
                } else if (this.headertype == 4) {
                    header = {}
                    header["format"] = "DOCUMENT";
                    header["example"] = {}
                    header["example"]['header_handle'] = [];
                    header["example"]['header_handle'].push(this.uploadedid)
                }
            }

            if (this.body != '' && this.templatename != '' && this.category != '' && this.language != '') {
                this.$store.commit('assignloadingstatus', 1)
                let template_name = this.templatename?.trim().toLowerCase().replaceAll(" ", "_")
                param = {
                    templateid: this.templateid,
                    body1: this.body, templatename: template_name, filetype: this.fileExtension, category: this.category,
                    language: this.language, header1: header, sampleurl: this.sampleurl, buttons: this.buttondata,
                    bodytext: this.buttonarray, amazonsigned: this.amazonsigned
                }
                console.log("Param", param)
                axios.post('api/threads/wattsapp/templates/save', param)
                    .then((response) => this.processApiResponse(response.data))
                    .catch((error) => console.log(error))
            } else {
                if (this.body == "") {
                    alert('Body is mandatory.')
                } else if (this.templatename == "") {
                    alert('Template name is mandatory.')
                } else if (this.category == "") {
                    alert('Category is mandatory.')
                } else if (this.language == "") {
                    alert('Language is mandatory.')
                }
            }
        },
        processApiResponse(data) {
            this.result = data
            this.backBtn()

        },
        backBtn() {
            this.$store.commit('assignloadingstatus', 0)
            this.$store.commit('assignbuttonarray', null)
            this.$store.commit('assignbuttondata', null)
            window.history.back()
        },

        // getjsonformat() {
        //     let value = ''
        //     this.item.components.find(function (element) {
        //         let componentjsondata = JSON.parse(element.componentjson)
        //         if (componentjsondata.hasOwnProperty('format')) {
        //             value = componentjsondata.format
        //         }
        //     })
        //     return value
        // },
        getFileType() {
            let extension = this.fileExtension
            let fileType = 0
            if (extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'JPG' || extension == 'JPEG' || extension == 'PNG') {
                fileType = 3
                return fileType;
            } else if (extension == 'mp4' || extension == 'MP4') {
                fileType = 5
                return fileType;
            } else if (extension == 'pdf' || extension == 'PDF') {
                fileType = 4
                return fileType;
            }
            return fileType;
        },
        uploadFile($event) {
            let obj = { 'type': 5, 'directorypath': 'wattsapp', 'width': '1000', 'height': '1000', 'counter': 0, 'typeid': 0, 'typeint': 11 }
            this.$store.commit('assignfilecomponents', obj);
            this.processFile2($event)
        },
        uploaded() {
            this.$store.commit('assignloadingstatus', 0)
            this.sample = this.uploadedimage
            this.sampleurl = this.sample?.amazonsigned?.downloadurl
            this.fileExtension = this.sample?.amazonsigned?.filetype
            this.uploadedid = this.sample?.uploadedid
            this.amazonsigned = this.sample?.amazonsignedid

        },
        mediaRefresh() {
            this.headertype = 1
            this.sample = null
        },
        getButtonType(item) {
            let buttontype = item.buttontype
            return buttontype
        },

        getTemplate() {
            if (this.templateid != 0) {
                this.$store.commit('assignloadingstatus', 1)
                let param = { templateid: this.templateid }
                axios.post("api/threads/wattsapp/company/template", param)
                    .then(response => this.processTemplateResponse(response.data))
                    .catch(error => console.log(error));
            } else {
                console.log("outside template")
            }

        },
        processTemplateResponse(data) {
            this.$store.commit('assignloadingstatus', 0)
            this.template = data.template
            this.$store.commit('assignbuttonarray', null)
            this.getComponents()
            this.initialize()
        },
        initialize() {


            if (this.template != null) {
                console.log("inside initialize")
                this.templatename = this.template?.wattsapptemplatename
                this.category = this.template?.category
                this.language = this.template?.language
                this.body = this.editbody
                this.sampleurl = this.editSampleUrl
                this.headertype = this.getFileType()
            }
        },
        deleteBtn(item) {
            let webbutton = this.websitecount
            let phonebutton = this.phonecount
            if (this.buttonarray.length > 0) {
                for (let i = 0; i < this.buttonarray?.length; i++) {
                    if (this.buttonarray[i]?.buttontype == 1) {
                        if (this.buttonarray[i]?.json?.url == item?.json?.url) {
                            webbutton--
                            this.$store.commit('assignwebsitecount', webbutton)
                            this.buttonarray.splice(i, 1)
                        }
                    }
                    if (this.buttonarray[i]?.buttontype == 2) {
                        if (this.buttonarray[i]?.json?.phone_number == item?.json?.phone_number) {
                            phonebutton--
                            this.$store.commit('assignphonecount', phonebutton)
                            this.buttonarray.splice(i, 1)
                        }
                    }
                    if (this.buttonarray[i]?.buttontype == 3) {
                        if (this.buttonarray[i]?.json?.text == item?.json?.text) {
                            console.log("delete")
                            this.buttonarray.splice(i, 1)
                        }
                    }
                    // this.buttondata.splice(i, 1)
                }
            }
        },
        getComponents() {
            let components = this.template?.components
            let makeArray = []
            let webbutton = 0
            let phonebutton = 0
            components.forEach(element => {
                if (element.componenttypeint == 2) {
                    this.editbody = element.bodytext
                } else if (element.componenttypeint == 1) {
                    this.editSampleUrl = element.sampleurl
                    this.amazonsigned = element.amazonsigned
                    this.fileExtension = element.filetype
                    if (element.componentjson != null) {
                        let componentjson = JSON.parse(element.componentjson)
                        this.uploadedid = componentjson.example?.header_handle[0]
                    }
                } else if (element.componenttypeint == 4) {
                    if (element.componentjson != null) {
                        let componentjson = JSON.parse(element.componentjson)
                        this.$store.commit('assignbuttondata', componentjson.buttons)
                    }
                    if (element.bodytext != null) {
                        let bodytext = JSON.parse(element.bodytext)
                        bodytext.forEach(value => {
                            if (value.buttontype == 1) {
                                webbutton++
                                this.$store.commit('assignwebsitecount', webbutton)
                            } else {
                                phonebutton++
                                this.$store.commit('assignphonecount', phonebutton)
                            }
                            makeArray.push(value)
                        })
                        this.$store.commit('assignbuttonarray', makeArray)

                    }

                }
            })
        }
    },



}
</script>
<style>
label {
    font-size: 16px;
    font-weight: 600;
}

.gray-bdr {
    border: 1px solid lightgray;
    border-radius: 4px;
}

.display_btn {
    padding: 3px;
    border-radius: 3px;
    background: #fff;
}

.display_btn button {
    background: #fff;
    border: 1px solid #fff;
    color: #1e84ba;
}

.create_temp {
    border-right: 1px solid silver;
    font-family: system-ui;
    padding: 0px 10px 0px 25px;
}

.danger {
    color: red;
}

.optional {
    color: gray;
    font-size: 15px;
}

.fs-25 {
    font-size: 25px;
}

.whatsapp-btn {
    background: #00800047;
    color: green;
    padding: 5px 10px;
}

.whatsapp_bg {
    background-image: url('../../../src/assets/whatsapp_new.jpg');
}

.whatsapp_container {
    padding: 0px 60px;
    margin-top: 20%;
}

.img_div {
    border: 1px solid lightgray;
    border-radius: 4px;
    min-height: 180px;
    /* background: #d3d3d338; */
}

.mobile_code {
    position: relative;
    top: -30px;
    background: #c0c0c085;
    padding: 9px 7px;
    border-radius: 5px 0px 0px 5px;
}
</style>