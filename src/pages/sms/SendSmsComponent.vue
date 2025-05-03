<template>
    <div class="container">
        <div class="flex-row flex-center">
            <div class="col-md-5 sms_template" style="margin-left: 4pc;">
                {{ this.template?.message }}
            </div>
        </div>
        <div class="col-md-12 row login-box mt-20">
            <div class="col-md-9 row mb-20">
                <div class="col-md-3 flex-justify-center">
                    <label>Campaign Name : </label>
                </div>
                <div class="col-md-9 ">
                    <textarea rows="1 " v-model="campaign" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-md-9 row mb-20">
                <div class="col-md-3 flex-justify-center">
                    <label>Long url : </label>
                </div>
                <div class="col-md-9 ">
                    <textarea rows="2 " v-model="longurl" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-md-12 mb-20 mt-20 flex-align-center">
                <div class="col-md-4">
                    <div class="logo-div">
                        <div class="col-md-12 attach">
                            <input type="file" id="logo-1" @change="readExcelFile($event)" class="inputfile" hidden />
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
            <!-- <div class="col-md-9 row mb-20">
                <div class="col-md-3 flex-justify-center">
                    <label>Campaign : </label>
                </div>
                <div class="col-md-9 ">
                    <textarea rows="1 " v-model="campaign" class="form-control"></textarea>
                </div>
            </div> -->
            <div class="col-md-9 row">
                <div class="col-md-3 flex-justify-center">
                    <label>Mobile no. : </label>
                </div>
                <div class="col-md-9">
                    <textarea rows="5" v-model="mobilenos" class="form-control"></textarea>
                </div>
            </div>
        </div>
        <div class="col-md-12 text-center">
            <div>
                <button class="btn btn-primary mt-20" @click="sendSMS()">Send SMS</button>
                <button class="btn btn-danger mt-20 ml-10" @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import readXlsxFile from 'read-excel-file'
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue';
export default {
    props: ['template'],
    mixins: [UploadMixin2],
    data() {
        return {
            mobilenos: '',
            longurl: '',
            campaign: '',
            flowtype: [],
            uploaddiv: false,
        }
    },
    computed: {

    },
    mounted() {
        this.fetchflows()
        let obj = { 'type': 5, 'directorypath': '', 'counter': 0, 'typeid': 0, 'typeint':19 }
        this.$store.commit('assignfilecomponents', obj);
    },
    methods: {
        excelUpload(event) {
            let file = event.target.files[0];
            let extention = file.name.split('.').pop();
            if (extention == 'xlsx' || extention == 'csv') {
                this.$store.commit('assignloadingstatus',1)
                this.processFile2(event)
            } else {
                alert('Choose .xlsx or .csv file')
            }
        },
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
                            const found = newArray.some(person => person.mobileno === data[i][0]);
                            if(!found)
                                newArray.push(mobileNameObj)
                            //}
                        }
                    }
                    self.mobilenos = JSON.stringify(newArray)
                    self.$store.commit('assignloadingstatus', 0)
                    console.log(newArray)
                    self.uploaddiv = true
                })
                
                
                // setTimeout(() => {
                //     if (this.creditused?.creditused >= newArray.length) {
                //         if (newArray?.length > 1000) {
                //             alert('Limit exceed. (' + newArray?.length + ')')
                //             this.cancel()
                //         } else {
                //             this.uploaddiv = true
                //             this.mobileno = newArray.join()
                //         }
                //     } else {
                //         alert('You have only ' + this.creditused?.creditused + ' credit')
                //         this.cancel()
                //     }
                //     this.$store.commit('assignloadingstatus', 0)
                // }, 2000);
            } else {
                alert('Choose excel file.')
                this.cancel()
            }

        },


        sendSMS() {
            if (this.mobilenos != '') {
                let json = {
                    'mobilenoswithnames': JSON.parse(this.mobilenos),
                    'longurl': this.longurl,
                    'smstemplateid': this.template?.id ?? 0
                }

                // let json = {
                //     'mobilenos' : this.mobilenos,
                //     'sendtotype' : 2,
                //     'templateid': 71,
                //     'templatename' : 'new_solar_panel_subsidy',
                //     'language' : 'en_US',
                //     'imageurl' : 'https://gradmainbucket.s3.amazonaws.com/gradpowerimages/2/wattsapp/06213e71-e66b-4dca-b1cc-7c3bbddfcd72.jpeg'
                // }
                let param = {
                    jsontext: JSON.stringify(json), flowid: this.flowtype?.flowid,
                    campaign: this.campaign
                }
                console.log("param", param)
                axios.post('api/send/sms/message', param)
                    .then((response) => this.processSendSmsResponse(response.data))
                    .catch((error) => console.log(error))
            }
        },
        processSendSmsResponse(data) {
            if (data.initiate != null) {
                this.$parent.viewno = 1
            }
        },
        fetchflows() {
            window.axios.get('api/flow/fetch')
                .then((response) => this.processFlowResponse(response.data))
                .catch((error) => console.log(error))
        },
        processFlowResponse(data) {
            if (data.flows?.length > 0) {
                this.flowtype = data.flows?.find(o => o.flowtype == 1)
            }
        },
        cancel() {
            this.$parent.viewno = 1
        }
    },
}
</script>