<template>
    <div>
        <div class="col-md-12">
            <div>

                <div class="">
                    <!-- <div class="col-md-12 text-center">
                        <h5 class="control-label mt-20 mb-20"><span class="selected-temp">Selected Template</span></h5>
                    </div> -->
                    <!-- <div class="col-md-6 text-end">
                            <label class="control-label">Mobile no.</label>
                            <input type="text" class="customer_data" v-model="mobileno" style="margin-left: 10px;">
                        </div> -->
                </div>

                <div class="flex-around-row">

                    <div class="col-md-4">
                        <div class="temp_size">
                            <div v-if="checkHeader() == 1">
                                <!-- <div>
                                    <h5 class="mt-10"><span class="ml-10">Image</span></h5>
                                </div> -->
                                <div class="col-md-12">
                                    <div class="temp_header text-center">
                                        <img :src="this.edititem.components[checkHeader()]['sampleurl']"
                                            style="width: 100%;height: 200px;">
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-12">
                                <!-- <div>
                                    <h5 class="mt-10"><span class="ml-20">Content</span></h5>
                                </div> -->
                                <div class="">
                                    <div
                                        :class="checkHeader() == 1 ? 'temp_body text-start ' : 'text-start new_temp_body'">
                                        <div class="col-md-12">
                                            <span style="word-wrap: break-word;">{{ getjsondata() }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mb-20 mt-20 flex-align-center">
                        <div class="col-md-4">
                            <div class="logo-div">
                                <div class="col-md-12 attach">
                                    <input type="file" id="logo-1" @change="readExcelFile($event)" class="inputfile"
                                        hidden />
                                    <label for="logo-1" class="attach" v-if="!uploaddiv">
                                        <i class='bx bx-cloud-upload' style="font-size: 50px;color: gray;"></i><br>
                                        <span style="font-weight: 500;font-size: 15px;">Choose Excel file...</span>
                                    </label>
                                    <label v-if="uploaddiv">
                                        <i class='bx bx-check-circle' style="font-size: 50px;color: green;"></i><br>
                                        <span style="font-weight: 500;font-size: 15px;color: green;">Successfully
                                            Uploaded...</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-md-12 mb-10" >
                        <div class="form-horizontal cascde-forms mt-20">
                            <div class="col-md-12 row">
                                <div class="col-md-3 flex-align-center">
                                    <label style="font-weight: bold;">Send Message by : </label>
                                </div>
                                <div class="col-md-7 ">
                                    <div class="row flowtype">
                                        <div class="col-md-6" style="border-right: 2px solid gray;">
                                            <input type="radio" id="withflow" name="flow" v-model="flowtype" value="1">
                                            <label for="withflow" class="ml-5">Using Flow</label>
                                        </div>
                                        <div class="col-md-6 ">
                                            <input type="radio" id="withoutflow" name="flow" v-model="flowtype" value="2">
                                            <label for="withoutflow" class="ml-5">Without Flow</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="col-md-12 mb-10" v-if="this.flow">
                        <div class="form-horizontal cascde-forms mt-20">
                            <div class="col-md-12 row">
                                <div class="col-md-3 flex-align-center">
                                    <label style="font-weight: bold;">Add Campaign Name : </label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" class="form-control form-cascade-control input-small"
                                        v-model="campaign"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mb-20">
                        <div class="form-horizontal cascde-forms mt-20">
                            <div class="col-md-12 row">
                                <div class="col-md-1"></div>
                                <div class="col-md-2 flex-align-center">
                                    <label style="font-weight: bold;">Mobile no. : </label>
                                </div>
                                <div class="col-md-7">
                                    <div class="text-end"><span style="color: orange">Enter mobile no. with comma(,)
                                            seprated.</span></div>
                                    <textarea class="form-control form-cascade-control input-small" type="text" rows="7"
                                        v-model="mobileno"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="flex-around-row " v-if="this.flow">
                            <div class="col-md-4 mt-20 ">
                                <button class="btn btn-primary" @click="sendFlowTemplate()">Send
                                </button>
                                <button class="btn btn-danger ml-20" @click="cancel()">Cancel
                                </button>
                            </div>
                        </div>
                        <div class="flex-around-row " v-else>
                            <div class="col-md-4 mt-20 ">
                                <button class="btn btn-success" @click="sendTemplate()">Send
                                </button>
                                <button class="btn btn-danger ml-20" @click="cancel()">Cancel
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue'
import readXlsxFile from 'read-excel-file'
// import WhatsAppUser from '../../pages/whatsapp/WhatsAppUser.vue'

export default {
    mixins: [UploadMixin2],
    components: {},
    props:['flow'],
    data() {
        return {
            sample: [],
            mobileno: '',
            uploaddiv: false,
            flowtype: 0,
            campaign: '',
        }
    },
    mounted() {
        this.$store.dispatch('fetchcreditused')
        if(this.flow){
            this.fetchflows()
        }
    },
    computed: {
        ...mapGetters(['edititem','creditused'])
    },
    methods: {
        readExcelFile(event) {
            let newArray = []
            let file = event.target.files[0]
            let extention = file.name.split('.').pop()
            let self = this
            if (extention == 'xlsx') {
                this.$store.commit('assignloadingstatus', 1)
                readXlsxFile(file).then(function (data) {
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].length; j++) {
                            let mobileNameObj = {"mobilename":data[i][0],"mobileno":data[i][1]}
                            const found = newArray.some(person => person.mobileno === data[i][1]);
                            if(!found)
                                newArray.push(mobileNameObj)
                            //}
                        }
                    }
                    
                    
                
                    
                    if (self.creditused?.creditused >= newArray.length) {
                        if (newArray?.length > 1000) {
                            alert('Limit exceed. (' + newArray?.length + ')')
                            self.cancel()
                        } else {
                            self.uploaddiv = true
                            self.mobileno = JSON.stringify(newArray)
                        }
                    } else {
                        alert('You have only ' + this.creditused?.creditused + ' credit')
                        self.cancel()
                    }
                    self.$store.commit('assignloadingstatus', 0)
                })
                
            } else {
                alert('Choose excel file.')
                this.cancel()
            }

        },
        // uploaded() {
        //     // this.sample = this.uploadedimage
        //     this.$store.commit('assignsampleimage',this.uploadedimage)
        //     this.$store.commit('assignloadingstatus',0)
        //     console.log('Sample image here ',this.sampleimage)
        // },
        getjsondata() {
            let value = null
            this.edititem.components.find(function (element) {
                if (element.componenttypeint == 2) {
                    value = element.bodytext
                }
            })
            return value
        },
        checkHeader() {
            let value = 0
            this.edititem.components.find((element) => {
                if (element.componenttypeint == 1) {
                    value = element.componenttypeint
                }
            })
            return value
        },
        sendFlowTemplate(){
            if (this.mobileno == '' || this.mobileno.length==0) {
                alert("Enter mobile no.")
            } else if (this.campaign == '') {
                alert("Add campaign name.")
            } else {

                

                this.$store.commit('assignloadingstatus', 1)
                let json = { mobilenoswithnames: JSON.parse(this.mobileno), sendtotype: 2, templateid: this.edititem.id,
                    templatename: this.edititem.wattsapptemplatename, language: this.edititem.language,
                    imageurl: this.edititem.components[this.checkHeader()]['sampleurl']
                }
                let param = { jsontext: JSON.stringify(json), flowid: this.flowtype?.flowid, campaign: this.campaign }
                console.log("param", param)

                axios.post('api/send/sms/message', param)
                    .then((response) => this.processSendResponse(response.data))
                    .catch((error) => console.log(error))
            }
        },
        sendTemplate() {
            if (this.mobileno == '') {
                alert("Enter mobile no.")
            } else {
                this.$store.commit('assignloadingstatus', 1)
                let param = {
                    templateid: this.edititem.id, templatename: this.edititem.wattsapptemplatename,
                    language: this.edititem.language, imageurl: this.edititem.components[this.checkHeader()]['sampleurl'],
                    mobilenoswithnames: this.mobileno, sendtotype: 2
                }
                console.log("Params here", param)
                axios.post('api/threads/wattsapp/bulk', param)
                    .then((response) => this.processSendResponse(response.data))
                    .catch((error) => console.log(error))
            }
        },
        processSendResponse(data) {
            console.log("response ", data)
            // this.savetemplate = data
            this.$store.commit('assignedititem', null)
            this.mobileno = ''
            // this.$store.commit('assignviewno', 1)
            this.$store.commit('assignloadingstatus', 0)
        },
        cancel() {
            this.$store.commit('assignedititem', null)
        },
        fetchflows(){
            window.axios.get('api/flow/fetch')
            .then((response)=>this.processFlowResponse(response.data))
            .catch((error)=>console.log(error))
        },
        processFlowResponse(data){
            if(data.flows?.length>0){
                this.flowtype = data.flows?.find(o=>o.flowtype==2)
            }
        }

    }
}
</script>