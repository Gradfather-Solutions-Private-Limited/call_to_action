<template>
    <div>
        <div class="col-md-12 mb-10">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-floating">
                        <select class="form-select" v-model="selectedtype" id="floatingSelect" @change="selectOption()">
                            <option value="0">Select</option>
                            <option value="1">Go to website ( 2 buttons maximum )</option>
                            <option value="2">Call phone number ( 1 buttons maximum )</option>
                            <option value="3">Custom Button</option>
                            <!-- <option value="3">Complete form ( 1 buttons maximum )</option> -->
                            <!-- <option value="4">Copy offer code ( 1 buttons maximum )</option> -->
                        </select>
                        <label for="floatingSelect"> + Add a button</label>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-12 form-control" v-if="selectedtype > 0">
            <div class="col-md-12">
                <h6>Call to action</h6>
            </div>
            <div v-if="selectedtype == 1" class="">
                <div class="col-md-12 p-10">
                    <div class="row mb-10">
                        <div class="form-control col-md-11" style="padding: 15px;">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Type of action</label>
                                    <!-- <input type="text" v-model="buttontext" class="form-control"> -->
                                    <select class="form-control" v-model="selectedtype">
                                        <option value="0">Select</option>
                                        <option value="1">Go to website</option>
                                        <option value="2">Call phone number</option>
                                        <option value="3">Quick Reply</option>
                                        <!-- <option value="4">Copy offer code</option> -->
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Button Text</label>
                                    <input type="text" v-model="buttontext" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label>Website Url</label>
                                    <input type="text" v-model="websiteurl" class="form-control">
                                </div>
                            </div>

                        </div>
                        <div class="col-md-1 flex-justify-center">
                            <button class="btn" @click="removeBtn()">X</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedtype == 2">
                <div class="col-md-12 p-10">
                    <div class="row mb-10">
                        <div class="form-control col-md-11" style="padding: 15px;">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Type of action</label>
                                    <!-- <input type="text" v-model="buttontext" class="form-control"> -->
                                    <select class="form-control" v-model="selectedtype">
                                        <option value="0">Select</option>
                                        <option value="1">Go to website</option>
                                        <option value="2">Call phone number</option>
                                        <option value="3">Quick Reply</option>
                                        <!-- <option value="4">Copy offer code</option> -->
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label>Button Text</label>
                                    <input type="text" v-model="buttontext" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <label>Phone number</label>
                                    <input type="text" v-model="mobileno" class="form-control" @input="mobilenoValidation()"
                                        style="padding: 5px 5px 6px 3rem;">
                                    <span class="mobile_code">+91</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1 flex-justify-center">
                            <button class="btn" @click="removeBtn()">X</button>
                        </div>
                    </div>

                </div>
            </div>
            <div v-if="selectedtype == 3">
                <div class="col-md-12 p-10">
                    <div class="row mb-10">
                        <div class="form-control col-md-11" style="padding: 15px;">
                            <div class="row">
                                <div class="col-md-3">
                                    <label>Type of action</label>
                                    <!-- <input type="text" v-model="buttontext" class="form-control"> -->
                                    <select class="form-control" v-model="selectedtype">
                                        <option value="0">Select</option>
                                        <option value="1">Go to website</option>
                                        <option value="2">Call phone number</option>
                                        <option value="3">Quick Reply</option>
                                        <!-- <option value="4">Copy offer code</option> -->
                                    </select>
                                </div>
                                <div class="col-md-9">
                                    <label>Button Text</label>
                                    <input type="text" v-model="buttontext" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1 flex-justify-center">
                            <button class="btn" @click="removeBtn()">X</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 text-center mb-10">
                <button class="new-btn" v-if="this.show" @click="saveformat()" style="background: #313e5d;">Save
                    Button</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Constants from '../../components/utilities/Constants.vue'
export default {
    mixins:[Constants],
    props: ['edit'],
    data() {
        return {
            selectedtype: 0,
            buttontext: '',
            websiteurl: '',
            mobileno: '',
            makeArray: [],
            makeNewArray: [],
            show: false,
            makeArrayForCall: [],
            webcount: 0,
            phone_no_count: 0,
        }
    },
    computed: {
        ...mapGetters(['buttonarray', 'buttondata', 'websitecount', 'phonecount']),
    },
    methods: {
        saveformat() {
            if (this.selectedtype == 1) {
                if (this.buttontext != '') {
                    let json = []
                    // let index = 0
                    json = {
                        "type": "URL",
                        "text": this.buttontext,
                        "url": this.websiteurl
                    }
                    // if (this.buttonarray?.length == 0) {
                    //     index = 1
                    // } else {
                    //     index++
                    // }

                    this.buttonSave(json, this.selectedtype)

                } else {
                    alert('Fill these field.')
                }

            }
            else if (this.selectedtype == 2) {
                if (this.buttontext != "") {
                    let json = []
                    json = {
                        "type": "PHONE_NUMBER",
                        "text": this.buttontext,
                        "phone_number": "+91" + this.mobileno
                    }
                    this.buttonSave(json, this.selectedtype)
                } else {
                    alert('Fill these field')
                }

            } else if (this.selectedtype == 3) {
                if (this.buttontext != "") {
                    let json = []
                    json = {
                        "type": "QUICK_REPLY",
                        "text": this.buttontext,
                    }
                    this.buttonSave(json, this.selectedtype)
                } else {
                    alert('Fill these field')
                }

            }
            this.show = false
        },
        buttonSave(json, selectedtype) {

            let param = { json: json, buttontype: selectedtype }
            if (this.edit == 1) {
                this.buttonarray?.push(param)
                this.buttondata.push(json)
            } else {
                this.makeArray.push(param)
                this.$store.commit('assignbuttonarray', this.makeArray)
                this.makeNewArray.push(json)
                this.$store.commit('assignbuttondata', this.makeNewArray)
            }
            if (selectedtype == 1) {
                this.webcount++
                this.$store.commit('assignwebsitecount', this.webcount)
            } else if (selectedtype == 2) {
                this.phone_no_count++
                this.$store.commit('assignphonecount', this.phone_no_count)
            }
            this.clear()
        },
        clear() {
            this.selectedtype = 0
            this.buttontext = ''
            this.websiteurl = ''
            this.mobileno = ''
            this.show = false
        },
        selectOption() {
            this.show = true
            if (this.selectedtype == 1) {
                if (this.websitecount > 1) {
                    this.selectedtype = 0
                    this.show = false
                    alert('maximum 2 button added.')
                }
            } else if (this.selectedtype == 2) {
                if (this.phonecount > 0) {
                    this.selectedtype = 0
                    this.show = false
                    alert('maximum 1 button added.')
                }
            }
        },

        removeBtn() {
            if (this.selectedtype > 0) {
                this.clear()
            }
        },
    }
}
</script>