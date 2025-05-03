<template>
    <div>
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="card-title">Add New Vehicle</h5>
                    </div>
                    <div class="col-md-6">
                        <!-- <button class="btn btn-primary float-end" @click="resetForm">Reset</button> -->
                    </div>
                </div>
            </div>
            <div class="card-body">
                <!-- <form> -->
                <div class="row">
                    <!-- Vehicle Number (Read-Only) -->

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Date:</label>
                        <input type="date" class="form-control" v-model="form.date" />
                    </div>
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Vehicle Number:</label>
                        <input type="text" class="form-control" v-model="vehicleNumber" />
                    </div>

                    <div class="col-md-4">
                        <label class="form-label"></label>
                        <button class="button-3" @click="submitForm()">Save
                            <div class="arrow-wrapper">
                                <div class="arrow"></div>
                            </div>
                        </button>
                    </div>
                </div>
                <!-- </form> -->
            </div>
        </div>
        <div v-if="this.vehicle != null">
            <div class="card mt-10">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Purpose:</label>
                            <select class="form-select" v-model="form.purpose">
                                <option :value="0">Select</option>
                                <option v-for="item in this.PURPOSE" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>

                        <!-- Material -->
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Goods:</label>
                            <select class="form-select" v-model="form.material">
                                <option :value="0">Select</option>
                                <option v-for="item in MATERIAL" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <!-- Driver Name -->
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Driver Name:</label>
                            <input type="text" class="form-control" v-model="form.driverName"
                                placeholder="Enter driver name" />
                        </div>
                        <!-- Person Load Unload -->
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Person Load Unload:</label>
                            <input type="text" class="form-control" v-model="form.personLoadUnload"
                                placeholder="Enter person load unload" />
                        </div>
                        <!-- <div class="col-md-6 mb-3">
                        <div class="d-flex flex-wrap gap-2">
                            <button type="button" class="btn btn-outline-success">
                                Submit
                            </button>

                            <button type="button" @click="CancelForm()" class="btn btn-outline-danger">
                                Cancel
                            </button>
                        </div>
                    </div> -->
                    </div>
                </div>
            </div>
            <div class="card mt-10">
                <div class="card-body">
                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label class="form-label">Gross Weight:</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" v-model="form.grossweight1" value="40240.0">
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" v-model="form.grossweight2" class="form-control"
                                        value="Jan. 21, 2025, 3:53 p.m.">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 col-md-6 ">
                            <label class="form-label">Tare Weight:</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <input type="text" v-model="form.tareweight1" class="form-control" value="0">
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" v-model="form.tareweight2" class="form-control" value="None">
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 col-md-3 ">
                            <label class="form-label">Net Weight:</label>
                            <input type="text" v-model="form.netweight" class="form-control" value="0">
                        </div>
                        <div class="mb-3 col-md-3 ">
                            <label class="form-label">Token Number:</label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <select class="form-select">
                                        <option :value="0">Select</option>
                                        <option selected :value="1">KLDWHTOK-24</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" v-model="form.tokennumber" class="form-control" value="8">
                                </div>
                            </div>

                        </div>

                        <div class="mb-3 col-md-3 ">
                            <label class="form-label">Token Date:</label>
                            <input type="date" v-model="form.tokendate" class="form-control" value="2025-01-21">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-10">
                <div class="card-body">
                    <div class="row">
                        <div class=" mb-3 col-md-6">
                            <label class="form-label">Front View</label>
                            <div v-if="this.frontimage==''">
                                <input type="file" class="form-control" accept="image/*;capture=camera" @change="uploadImage($event,'Front',1)">
                            </div>
                            <img v-else :src="this.frontimage"  alt="Front View" style="width: 100%;">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label class="form-label">Back View</label>
                            <div v-if="this.backimage==''">
                                <input type="file" class="form-control" accept="image/*;capture=camera" @change="uploadImage($event,'Back',2)">
                            </div>
                            <img v-else  :src="this.backimage"  alt="Back View" style="width: 100%;">
                        </div>
                        <div class="mb-3  col-md-6">
                            <label class="form-label">Right Side View</label>
                            <div v-if="this.rightimage==''">
                                <input type="file" class="form-control" accept="image/*;capture=camera" @change="uploadImage($event,'Right',3)">
                            </div>
                            <img v-else :src="this.rightimage"  alt="Right Side View" style="width: 100%;">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label class="form-label">Left Side View</label>
                            <div v-if="this.leftimage==''">
                                <input type="file" class="form-control" accept="image/*;capture=camera" @change="uploadImage($event,'Left',4)">
                            </div>
                            <img v-else :src="this.leftimage"  alt="Left Side View" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex gap-2">
                <button class="btn btn-primary" @click="updateForm()">Submit</button>
                <button class="btn btn-danger" @click="resetForm()">Cancel</button>
            </div>
        </div>

    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import Constants from '../../components/utilities/Constants.vue';
import UploadMixin2 from '../../components/utilities/UploadMixin2.vue';
export default {
    mixins: [Constants,UploadMixin2],
    props: ['showBox', 'editVehicle'],

    data() {
        return {
            vehicleNumber: '',
            vehicle: null,
            vehicleid: 0,
            frontimage:'',
            backimage:'',
            rightimage:'',
            leftimage:'',
            form: new Form(
                {
                    date: '',
                    purpose: 0,
                    material: 0,
                    driverName: '',
                    personLoadUnload: '',
                    grossweight1: '',
                    grossweight2: '',
                    tareweight1: '',
                    tareweight2: '',
                    netweight: '',
                    tokennumber: '',
                    tokendate: '',
                }
            ),
        }
    },
    computed: {
        ...mapGetters(['uplaodeddocument']),
    },
    mounted() {
        this.initialize();

    },
    methods: {
        async initialize() {
            if (this.editVehicle != null) {
                this.vehicleid = this.editVehicle.id;
                this.vehicleNumber = this.editVehicle.vehicleno;
                this.vehicle = this.editVehicle;
                let editVehicleJson = JSON.parse(this.editVehicle.jsontext)
                this.form = new Form(editVehicleJson)
                await this.getAllImages(this.editVehicle)
            }
        },
        async getAllImages(vehicle) {
            let param  = {id:vehicle.id }
            await axios.post('api/vechile/images',param)
               .then((response) => {
                  let documents = response.data.documents
                  if(documents.length > 0){
                    this.frontimage = documents.find(x => x.title === 'Front')?.images?.downloadurl || ''
                    this.backimage = documents.find(x => x.title === 'Back')?.images?.downloadurl || ''
                    this.rightimage = documents.find(x => x.title === 'Right')?.images?.downloadurl || ''
                    this.leftimage = documents.find(x => x.title === 'Left')?.images?.downloadurl || ''
                  }
                })
               .catch((err) => {
                    console.log(err);
                });
        },
        submitForm() {
            if (this.form.date == '') {
                this.form.date = this.getCurrentDate()
            }
            let getData = {
                date: this.form.date,
                purpose: this.form.purpose,
                material: this.form.material,
                driverName: this.form.driverName,
                personLoadUnload: this.form.personLoadUnload,
                grossweight1: this.form.grossweight1,
                grossweight2: this.form.grossweight2,
                tareweight1: this.form.tareweight1,
                tareweight2: this.form.tareweight2,
                netweight: this.form.netweight,
                tokennumber: this.form.tokennumber,
                tokendate: this.form.tokendate,
            }
            let param = { vehicleid: this.vehicleid, vehicleno: this.vehicleNumber, jsontext: JSON.stringify(getData) }
            axios.post('api/vehicle-entry', param)
                .then((response) => {
                    this.vehicle = response.data;
                })
                .catch((err) => {
                    console.log('', err)
                });
        },
        updateForm() {
            let getData = {
                date: this.form.date,
                purpose: this.form.purpose,
                material: this.form.material,
                driverName: this.form.driverName,
                personLoadUnload: this.form.personLoadUnload,
                grossweight1: this.form.grossweight1,
                grossweight2: this.form.grossweight2,
                tareweight1: this.form.tareweight1,
                tareweight2: this.form.tareweight2,
                netweight: this.form.netweight,
                tokennumber: this.form.tokennumber,
                tokendate: this.form.tokendate,
            }
            let param = { vehicleno: this.vehicle?.vehicleno ?? '', jsontext: JSON.stringify(getData) }
            axios.post('api/vehicle-entry/' + this.vehicle.id, param)
                .then((response) => {
                    this.resetForm();
                })
                .catch((err) => {
                    console.log('', err)
                });
        },
        resetForm() {
            this.vehicleNumber = '';
            this.form = new Form(
                {
                    date: '',
                    purpose: 0,
                    material: 0,
                    driverName: '',
                    personLoadUnload: '',
                    grossweight1: '',
                    grossweight2: '',
                    tareweight1: '',
                    tareweight2: '',
                    netweight: '',
                    tokennumber: '',
                    tokendate: '',
                }
            ),
            this.$parent.showBox = true;
            this.$parent.refresh()
        },
        uploadImage(event,title,val) {
            let obj = { 'type': 0, 'directorypath': 'vehicle/'+this.vehicle.id, 'width': '1000', 'height': '1000', 'counter': 0, 'typeid': 0, 'typeint': 18 }
            this.$store.commit('assignfilecomponents', obj);
            let fieldjson={'productid':this.vehicle.id, 'title':title }
            this.$store.commit('assignfieldjson', fieldjson);
            this.processFile2(event)
            this.$store.commit('assignloadingstatus', 1)
           
        },
        uploaded() {
            if(this.fieldjson.title == 'Front'){
                this.frontimage = this.uplaodeddocument.downloadUrl
            }else if(this.fieldjson.title == 'Back'){
                this.backimage = this.uplaodeddocument.downloadUrl
            }else if(this.fieldjson.title == 'Right'){
                this.rightimage = this.uplaodeddocument.downloadUrl
            }else if(this.fieldjson.title == 'Left'){
                this.leftimage = this.uplaodeddocument.downloadUrl
            }
            this.$store.commit('assignfilecomponents', []);

            alert("Upload successfully.")
            this.$store.commit('assignloadingstatus', 0)
            this.$store.commit('assignfieldjson', null);
            this.$store.commit('assignuplaodeddocument',null)
        },
    }
}
</script>