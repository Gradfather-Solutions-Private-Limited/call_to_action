<template>

    <div class="container">
        <hr>
        <div>
            <h4 class="text-center">Customer's Info</h4>
        </div>
        <div class="row ">
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">First Name </label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form1.firstname" class="form-control" placeholder="Enter First Name">
                </div>
            </div>
            <!-- <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Middle Name </label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" v-model="form1.middleName" class="form-control"
                            placeholder="Enter Middle Name">
                    </div>
                </div> -->
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Last Name</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form1.lastname" class="form-control" placeholder="Enter Last Name">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Gender</label>
                </div>
                <div class="col-md-7">
                    <select v-model="form1.gender" class="form-control">
                        <option :value="0">Select</option>
                        <option v-for="option in getmastertype(MASTER_GENDER)" v-bind:key="option.labelid"
                            v-bind:value="option.labelid" v-text="option.label" />
                    </select>
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Qualification</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form2.qualification" class="form-control"
                        placeholder="Enter Qualification">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Date of Birth</label>
                </div>
                <div class="col-md-7">
                    <input type="date" v-model="form1.dob" class="form-control" />
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Occupation</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form2.occupation" class="form-control" placeholder="Enter Occupation">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Monthly Income</label>
                </div>
                <div class="col-md-7">
                    <input type="number" v-model="form1.payscale" class="form-control" placeholder="Enter Monthly Income">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Father Name</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form2.fatherName" class="form-control" placeholder="Enter Father Name">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Mother Name</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form2.motherName" class="form-control" placeholder="Enter Mother Name">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Husband/Wife Name</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form2.spouseName" class="form-control" placeholder="Enter Spouse Name">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Husband/Wife DOB</label>
                </div>
                <div class="col-md-7">
                    <input type="date" v-model="form2.spouseDob" class="form-control">
                </div>
            </div>

            <!-- <div class="col-md-4 mt-3">
                    <label class="form-label">Mobile No. *</label>
                    <div class="input-group">
                        <span class="input-group-text">+91</span>
                        <input type="text" v-model="form.mobile" class="form-control" placeholder="Enter Mobile No.">
                    </div>
                </div> -->
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Marital Status</label>
                </div>
                <div class="col-md-7">
                    <select v-model="form1.m_status" class="form-control">
                        <option :value="0">Select</option>
                        <option v-for="option in getmastertype(MASTER_MARITAL_STATUS)" v-bind:key="option.labelid"
                            v-bind:value="option.labelid" v-text="option.label" />
                    </select>
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Collection Time</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form2.collectiontime" class="form-control"
                        placeholder="Enter Collection Time">
                </div>
            </div>

            <!-- <div class="col-md-6 row mt-3">
                    <div class="col-md-4 title-end">
                        <label class="form-label">Email</label>
                    </div>
                    <div class="col-md-7">
                        <input type="text" v-model="form1.email" class="form-control"
                            placeholder="Enter Collection Time">
                    </div>
                </div> -->
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Adhaar No.</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form1.adhar" class="form-control" maxlength="12"
                        @input="validateAadhaar" placeholder="Enter 12-digit Aadhaar">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">PAN No.</label>
                </div>
                <div class="col-md-7">
                    <input type="text" v-model="form1.pan" class="form-control" placeholder="Enter Collection PAN No">
                </div>
            </div>
            <div class="col-md-6 row mt-3">
                <div class="col-md-4 title-end">
                    <label class="form-label">Customer Religion</label>
                </div>
                <div class="col-md-7">
                    <select v-model="form1.religion" class="form-control">
                        <option :value="0">Select</option>
                        <option v-for="option in getmastertype(MASTER_RELIGION)" v-bind:key="option.labelid"
                            v-bind:value="option.labelid" v-text="option.label" />
                    </select>
                </div>
            </div>
        </div>
        <div class="row" v-if="submitbtn == 1">
            <div class="d-flex gap-2 justify-content-center py-5">
                <button @click="submitForm()" class="btn btn-primary">Submit</button>
                <button @click="this.$emit('backtopage', 0,1)" class="btn btn-danger">Cancel</button>
            </div>
        </div>
        <!-- <div class="text-end mt-4">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div> -->
    </div>
</template>
<script>
import Constants from '../../components/utilities/Constants.vue';
export default {
    props: ['userid', 'userformdata','submitbtn'],
    mixins: [Constants],
    data() {
        return {
            form1: {
                gender: 0,
                firstname: '',
                // middleName: '',
                lastname: '',
                dob: '',
                payscale: 0,
                m_status: 0,
                religion: 0,
                email: '',
                pan: '',
                adhar: ''
            },
            form2: {
                // title: '',
                qualification: '',
                occupation: '',
                fatherName: '',
                motherName: '',
                spouseName: '',
                spouseDob: '',
                collectiontime: '',
            },
            editlogs: 0

        };
    },
    mounted() {
        if (this.userformdata) {
            Object.keys(this.form1).forEach((key) => {
                if (this.userformdata.hasOwnProperty(key)) {
                    this.form1[key] = this.userformdata[key];
                }
            });
            if (this.userformdata.userinfo != null) {
                let userinfo_jsonobj = JSON.parse(this.userformdata.userinfo.jsonobj);
                Object.keys(this.form2).forEach((key) => {
                    if (userinfo_jsonobj.hasOwnProperty(key)) {
                        this.form2[key] = userinfo_jsonobj[key];
                    }
                });
            }
        }
    },
    methods: {
        async submitForm() {
            let param = { userid: this.userid, form1: this.form1, form2: this.form2 };
            await axios.post('api/finance/userinfo/save', param)
                .then(response => {
                    this.$store.dispatch("triggerNotification", {
                        message: "Data saved successfully!",
                        type: "success",
                    });
                    this.$emit('backtopage', param);
                })
                .catch(error => console.log(error))
        },
        validateAadhaar() {
            const aadhaarPattern = /^[2-9][0-9]{11}$/; // Aadhaar should not start with 0 or 1
            if (!this.form1.adhar.match(aadhaarPattern)) {
                this.error = "Invalid Aadhaar: Must be 12 digits & not start with 0 or 1";
                return;
            }
            if (!this.isValidVerhoeff(this.form1.adhar)) {
                this.error = "Invalid Aadhaar: Fails Verhoeff Checksum";
                return;
            }
            this.error = ""; // Aadhaar is valid
        },

        // Verhoeff Algorithm for Aadhaar validation
        isValidVerhoeff(number) {
            const d = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
                [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
                [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
                [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
                [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
                [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
                [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
                [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
                [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            ];
            const p = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
                [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
                [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
                [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
                [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
                [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
                [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
            ];
            const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

            let c = 0;
            const numArray = number.split("").reverse().map(Number);

            for (let i = 0; i < numArray.length; i++) {
                c = d[c][p[i % 8][numArray[i]]];
            }
            return c === 0; // Valid if result is 0

        },

        cancel() {
            this.$emit('backtopage', 0);
            this.form2 = {
                qualification: '',
                occupation: '',
                fatherName: '',
                motherName: '',
                spouseName: '',
                spouseDob: '',
                collectiontime: '',
            }
            this.form1 = {
                gender: 0,
                firstname: '',
                // middleName: '',
                lastName: '',
                dob: '',
                payscale: '',
                m_status: 0,
                religion: 0,
                email: '',
                pan: '',
                adhar: ''
            }

        }
    }
};
</script>
<style scoped>
label {
    margin: 0px;
}
</style>