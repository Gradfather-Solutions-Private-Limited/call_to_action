<template>
    <div class="container">
        <div class="col-md-12" v-if="viewno == 1">
            <div class="col-md-12 text-end mt-10">
                <button class="action_btn" v-if="accessid(281)" @click="createTemplate()">Create Template</button>
            </div>
            <div class="row">
                <div class="col-md-4" v-for="item in templates" :key="item.id">
                    <div class="sms_template" @click="selectedSms(item)">
                        {{ item.message }}
                    </div>
                    <!-- <div class="text-center">
                        <button class="btn btn-primary mt-10 text-white " @click="selectedSms(item.id)"> Select</button>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-12" v-if="viewno == 3">
            <div class="col-md-12">
                <div class="flex-justify-center">
                    <div class="col-md-7 mt-40 sms_div">
                        <div class="row mb-20">
                            <div class="col-md-4 flex-justify-center">
                                <label>Approve Template Id :</label>
                            </div>
                            <div class="col-md-8">
                                <input class="form-control" type="text" v-model="form.flowid" />
                            </div>
                        </div>
                        <div class="row mb-20">
                            <div class="col-md-4 flex-justify-center">
                                <label>Message : </label>
                            </div>
                            <div class="col-md-8">
                                <textarea rows="5" v-model="form.message" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="row mb-20">
                            <div class="col-md-4 flex-justify-center">
                                <label>Sender Id :</label>
                            </div>
                            <div class="col-md-8">
                                <input class="form-control" type="text" v-model="form.senderid" />
                            </div>
                        </div>
                        <div class="row mb-20">
                            <div class="col-md-4 flex-justify-center">
                                <label>Route :</label>
                            </div>
                            <div class="col-md-8">
                                <select class="form-control" v-model="form.route">
                                    <option value="0">Select</option>
                                    <option value="1">1</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mb-20">
                            <div class="col-md-4 flex-justify-center">
                                <label>Transactional :</label>
                            </div>
                            <div class="col-md-8">
                                <input class="form-control" type="number" v-model="form.istransactional" />
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="action_btn" @click="savetemplate()">Save Template</button>
                            <button class="action_btn" style="background: red;" @click="cancel()">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <send-sms-component v-if="viewno == 2" :template="template"></send-sms-component>
    </div>
</template>

<script>
import SendSmsComponent from './SendSmsComponent.vue'
import Constants from '../../components/access/Constants.vue';
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue';
export default {
    mixins:[Constants,UploadMixin2],
    components: { SendSmsComponent },
    data() {
        return {
            templates: [],
            viewno: 1,
            template: [],
            form : new window.Form({
                flowid: '',message:'',senderid:'',route:0,istransactional:0
            }),
           

        }
    },
    computed: {

    },
    mounted() {
        this.$store.commit('assignaddpageheading', 'SMS Flow')
        this.refresh()
    },
    methods: {
        refresh() {
            axios.get('api/sms/template/fetch')
                .then((response) => this.processFetchTemplate(response.data))
                .catch((error) => console.log(error))
        },
        processFetchTemplate(data) {
            this.templates = data.template
        },
        selectedSms(item) {
            this.viewno = 2
            this.template = item
        },
        createTemplate() {
            this.viewno = 3
        },
        savetemplate(){
            if(this.form.flowid == ''){
                alert("Enter sms template id...")
            }else if (this.form.message=='') {
                alert('Enter message...')
            }else if (this.form.message==''){
                alert('Enter sender id...')
            }else {
                this.form.senderid= this.form.senderid.toUpperCase()
                console.log(this.form)
                 axios.post('api/sms/template/save',this.form)
                    .then((response)=>this.processSmsSaveResponse(response.data))
                    .catch((error)=>console.log(error))
            }
        },
        processSmsSaveResponse(data){
            if(data.status){
                this.viewno=1
                this.refresh()
            }
        },
        cancel() {
            this.viewno=1
        }

    }
}
</script>
<style>
.sms_template {
    padding: 20px;
    word-wrap: break-word;
    margin-top: 10px;
    background: #fff;
    cursor: pointer;
    border-radius: 10px;
    overflow-y: auto;
    height: 12rem;
}
.sms_div{
    border: 1px solid #1c1c30a3;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 1px 7px #1c1c30;
}
</style>
