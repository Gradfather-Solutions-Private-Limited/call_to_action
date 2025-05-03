<template>
  <div>
  </div>
  <div class="container mt-2">
    <div v-if="showform == 1">
      <div class="card">
        <div class="card-body">
          <user-info-form :userid="this.userid" :userformdata="userformdata" @setdatauser="setdatauser1"
            @backtopage="showformfun" ref="userFormRef"  submitbtn="1">  </user-info-form>
        </div>
      </div>
    </div>
    <div v-if="showform == 3">
      <div class="card">
        <div class="card-body">
          <address-form :userid="this.userid" :userformdata="userformdata" @backtopage="showformfun" submitbtn="1"
            ref="addressFormRef"></address-form>
        </div>
      </div>
    </div>
    <div v-if="showform == 4">
      <div class="card">
        <div class="card-body">
          <customer-document :userid="this.userid" @backtopage="showformfun" submitbtn="1"></customer-document>
        </div>
      </div>
    </div>
    <div v-if="showform == 5">
      <div class="card">
        <div class="card-body">
          <co-applicant-form :userid="this.userid" :userformdata="userformdata" @backtopage="showformfun" submitbtn="1"
            ref="coApplicantFormRef"></co-applicant-form>
        </div>
      </div>
    </div>
    <div v-if="showform == 6">
      <div class="card">
        <div class="card-body">
          <job-income-form :userid="this.userid" :userformdata="userformdata" @backtopage="showformfun" submitbtn="1"
            ref="coSignatoryFormRef"></job-income-form>
        </div>
      </div>
    </div>
    <div v-if="showform == 7">
      <div class="card">
        <div class="card-body">
          <bank-details-form :userid="this.userid" :userformdata="userformdata" @backtopage="showformfun" submitbtn="1"
            ref="coSignatoryFormRef"></bank-details-form>
        </div>
      </div>
    </div>
    <div class="row" v-if="showform == 0">
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <div class="text-left">
              <span class="badge bg-danger" @click="downloadPDF()">
                <i class='bx bxs-file-pdf'></i>
                  PDF Form
              </span>
            </div>
            <div class="text-right">
              
              <i class='bx bx-edit' @click="edituserdata()"></i>
            </div>
            <table class="table table-bordered usersummry-table">
              <tbody>
                <tr>
                  <th>Created On</th>
                  <td>Admin App</td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>----</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td><span class="badge bg-success">Active</span></td>
                </tr>
                <tr>
                  <th>Branch</th>
                  <td>Lucknow Nilmatha</td>
                </tr>
                <tr>
                  <th>Enrollment Date</th>
                  <td> {{ formatDate2() }}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    <!-- <span v-if="userdata.name != null">{{ userdata.name }}</span> -->
                    <span v-if="userdata?.firstname != null">{{ userdata?.firstname + ' ' + userdata?.lastname ?? ''
                      }}</span>
                  </td>
                </tr>
                <tr>
                  <th>DOB</th>
                  <td>{{ userdata?.dob }}</td>
                </tr>
                <tr>
                  <th>Age</th>
                  <td>{{ calculateAge(userdata?.dob) }}</td>
                </tr>
                <tr>
                  <th>Senior Citizen</th>
                  <td><span class="badge bg-danger">No</span></td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>
                    <span v-if="userdata?.gender > 0">{{ getMasterLabelByType(userdata?.gender, MASTER_GENDER) }}</span>
                    <span v-else>N/A</span>

                  </td>
                </tr>
                <!-- <tr>
                  <th>Folio No.</th>
                  <td>----</td>
                </tr> -->
                <tr>
                  <th>Father Name</th>
                  <td>{{ userinfo?.fatherName }}</td>
                </tr>
                <tr>
                  <th>Mother Name</th>
                  <td>{{ userinfo?.motherName }}</td>
                </tr>
                <tr>
                  <th>Adhar Number</th>
                  <td>{{ userdata?.adhar }}</td>
                </tr>
                <tr>
                  <th>PAN Number</th>
                  <td>{{ userdata?.pan }}</td>
                </tr>
                <tr>
                  <th>Marital Status</th>
                  <td>
                    <span v-if="userdata?.m_status > 0">{{ getMasterLabelByType(userdata?.m_status, MASTER_MARITAL_STATUS)
                      }}</span>
                    <span v-else>N/A</span>
                  </td>
                </tr>
                <tr>
                  <th>Religion</th>
                  <td>
                    <span v-if="userdata?.religion > 0">{{ getMasterLabelByType(userdata?.religion, MASTER_RELIGION)
                      }}</span>
                    <span v-else>N/A</span>

                  </td>
                </tr>
                <tr>
                  <th>Qualification</th>
                  <td>{{ userinfo?.qualification ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <th>Husband/Wife Name</th>
                  <td>{{ userinfo?.spouseName ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <th>Husband/Wife D.O.B</th>
                  <td>{{ userinfo?.spouseDob }}</td>
                </tr>
                <tr>
                  <th>Occupation</th>
                  <td>{{ userinfo?.occupation }}</td>
                </tr>
                <tr>
                  <th>Monthly Income</th>
                  <td>{{ userdata?.payscale ?? 0 }}</td>
                </tr>
                <tr>
                  <th>Collection Time</th>
                  <td>{{ userinfo?.collectiontime }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="col-md-12 text-center pb-2" v-if="profile?.images?.downloadurl">
          <img :src="profile?.images?.downloadurl" class="avatar" alt="...">
        </div>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div style="font-size: 12px;">Co-Applicant Details</div>
                <div>
                  <span @click="addLocation(5)" style="font-size: 12px;">Edit</span> |
                  <i class='bx bx-chevron-down' @click="showBoxData(1)"></i>
                </div>
              </div>
            </div>
            <div class="card-body" v-if="boxid == 1">
              <div>
                <table class="table fzi12">
                  <tr>
                    <td>Co-Applicant Name</td>
                    <td>{{ coapplicant?.name }}</td>
                  </tr>
                  <tr>
                    <td>Co-Applicant Mobile No</td>
                    <td>{{ coapplicant?.mobile }}</td>
                  </tr>
                  <tr>
                    <td>Co-Applicant Address</td>
                    <td>{{ coapplicant?.address }}</td>
                  </tr>
                  <tr>
                    <td>Co-Applicant Relation:</td>
                    <td>{{ coapplicant?.relation }}</td>
                  </tr>
                  <tr>
                    <td>PAN Card Number:</td>
                    <td>{{ coapplicant?.pan_card }}</td>
                  </tr>
                  <tr>
                    <td>Aadhar Card Number:</td>
                    <td>{{ coapplicant?.aadhar_card }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div style="font-size: 12px;">Job Income Details</div>
                <div>
                  <span @click="addLocation(6)" style="font-size: 12px;">Edit</span> |
                  <i class='bx bx-chevron-down' @click="showBoxData(2)"></i>
                </div>
              </div>
            </div>
            <div class="card-body" v-if="boxid == 2">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <td><strong>Job Type</strong></td>
                    <td>{{ financialData.jobType }}</td>
                  </tr>
                  <tr>
                    <td><strong>Income Type</strong></td>
                    <td>{{ financialData.incomeType }}</td>
                  </tr>
                  <tr>
                    <td><strong>Income Amount</strong></td>
                    <td>{{ financialData.incomeAmount }}</td>
                  </tr>
                  <tr>
                    <td><strong>Income Time</strong></td>
                    <td>{{ financialData.incomeTime }}</td>
                  </tr>
                  <tr>
                    <td><strong>Min Amount</strong></td>
                    <td>{{ financialData.minAmount }}</td>
                  </tr>
                  <tr>
                    <td><strong>Max Amount</strong></td>
                    <td>{{ financialData.maxAmount }}</td>
                  </tr>
                  <tr>
                    <td><strong>Business Name</strong></td>
                    <td>{{ financialData.businessName }}</td>
                  </tr>
                  <tr>
                    <td><strong>Business Address</strong></td>
                    <td>{{ financialData.businessAddress }}</td>
                  </tr>
                  <tr>
                    <td><strong>Office Phone</strong></td>
                    <td>{{ financialData.officePhone }}</td>
                  </tr>
                  <tr>
                    <td><strong>Family Monthly Expenses</strong></td>
                    <td>{{ financialData.familyExpenses }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="d-flex justify-content-between">
                <div style="font-size: 12px;">Bank Details </div>
                <div>
                  <span @click="addLocation(7)" style="font-size: 12px;">Edit</span> |
                  <i class='bx bx-chevron-down' @click="showBoxData(3)"></i>
                </div>
              </div>
            </div>
            <div class="card-body" v-if="boxid == 3">
                <div class="table-responsive">
                    <table class="table">
                        <tr style="font-size: 10px;">
                            <th>S.No</th>
                            <th>A. Name</th>
                            <th>Account No</th>
                            <th>Bank Name</th>
                            <th>IFSC Code</th>
                            <th>Branch</th>
                            <th>City</th>
                            <th>State</th>
                            <th>PhonePay</th>
                            <th>GPay</th>
                            <th>Paytm</th>
                        </tr>
                        <tr style="font-size: 10px;" v-for="(item, index) in this.userdata?.banks">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.accountname }}</td>
                            <td>{{ item.accountno }}</td>
                            <td>{{ item.bankname }}</td>
                            <td>{{ item.ifsccode }}</td>
                            <td>{{ item.branch }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.state }}</td>
                            <td>{{ item.phonepay }}</td>
                            <td>{{ item.gpay }}</td>
                            <td>{{ item.paytm }}</td>
                        </tr>
                    </table>
                </div>
            </div>
          </div>
        </div>
        <div class="accordion" id="userDetailsAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button text-white bg-success" @click="toggleSection(index)">
                Mobile & Email Details
              </button>
            </h2>
            <div class="accordion-collapse">
              <div class="accordion-body">
                <div>
                  <label for="mobile">Email:</label>
                  {{ this.userdata?.email }}
                </div>
                <div>

                  <table class="table" >
                    <tr>
                      <th>Mobile</th>
                      <th class="text-right">
                        <i class='bx bx-message-alt-x'></i>
                      </th>
                    </tr>
                    <tr v-for="item in this.userdata?.mobiles">
                      <td>{{ item.mobile }}</td>
                      <td style="color:brown" class="text-right">
                        <i class='bx bx-message-alt-x'></i></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion" id="userDetailsAccordion">
          <div class="accordion-item">
            <div class="d-flex p-2 justify-content-between bg-warning">
              <div> Address & Contact Info</div>
              <button class="btn btn-warning btn-sm" @click="addLocation(3)">Add Address</button>
            </div>
            <div class="accordion-collapse">
              <div class="tab-pane fade show active" id="activeAccount">
                <div class="accordion-body">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.userdata?.addressess">
                        <td>{{ item.street }}</td>
                        <td>{{ item.city }}</td>
                        <td>{{ getMasterLabelByType(item.state, MASTER_STATES) }}</td>
                        <td>{{ item.zipcode }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="d-flex p-2 justify-content-between bg-warning">
            <div>Documents</div>
            <button class="btn btn-primary btn-sm" @click="addLocation(4)">Add Documents</button>
          </div>
          <div class="col-md-12">
            <div class="row justify-content-between">
                <div class="col-md-6" v-for="item in this.documentlist" :key="item.id">
                  <a :href="item.images?.downloadurl" target="_blank">
                  <i class='bx bx-images'></i>
                  {{ item.title }}
                </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
        </div>
</template>

<script>
import moment from 'moment';
import html2pdf from 'html2pdf.js';
import Constants from '../../components/utilities/Constants.vue';
import UserInfoForm from '../../components/user/UserInfoForm.vue';
import AddressForm from '../../components/address/AddressForm.vue'
import CustomerDocument from '../../components/user/CustomerDocument.vue';
import CoApplicantForm from '../../pages/user/CoApplicantForm.vue'
import JobIncomeForm from '../../pages/user/JobIncomeForm.vue'
import BankDetailsForm from '../../pages/user/BankDetailsForm.vue'
import PDFUserinfo from '../../pages/user/PDFUserinfo.vue'


import axios from 'axios';

export default {
  mixins: [Constants],
  props: ['fetchcolumns'],
  name: "UserSummary",
  components: { UserInfoForm, AddressForm, CustomerDocument, CoApplicantForm, JobIncomeForm, BankDetailsForm,
    PDFUserinfo
  },
  data() {
    return {
      userinfo: {},
      documentlist: [],
      userid: 0,
      showform: 0,
      profile: {},
      boxid: 0,
      coapplicant: {},
      fetchcolumns : 'id,name,email,firstname,lastname,adhar,pan,dob,created_at,gender,religion,m_status,payscale',
      financialData: {},
      showPDFContent: false,
      sections: [

      ],
      activeTab: "activeAccount",
      userdata :'',
    };
  },
  mounted() {
    this.jsonconvert();
    this.userid = this.$route.params.id;
    this.userformdata = this.userdata;
    this.setdatauser1();
  },
  methods: {
    // Handle date conversion
   
    initialize() {
      let param = { userid: this.$route.params.id }
      axios.post('api/finance/document/fetch', param)
        .then(response => {
          this.documentlist = response.data.documents
          let profile = this.documentlist.find(doc => doc.title === 'Profile Photo');
          if (profile) {
            this.profile = profile;
          }
        })
        .catch(error => console.log(error))
    },
    setdatauser1() {
      let parm = { userid: this.userid, 'fetchcolumns': this.fetchcolumns, 'fetchtables': 'mobiles,addressess,userinfo,banks' }
      axios.post('api/finance/users/fetch', parm)
        .then(response => {
          if (response.data) {
            //this.userdata = response.data;
            this.initialize();
            this.userformdata =  response.data;
            this.userdata = response.data;
            this.jsonconvert();
          }
        })
    },
    addBoxData() {

    },
    addLocation(n) {
      this.showform = n;
    },
    edituserdata() {
      this.showform = 1;
      this.userformdata = this.userdata;
    },
    formatDate2(date) {
      return moment(date).format('DD-MMM-YYYY');
    },
    jsonconvert() {
      if (this.userdata?.userinfo?.jsonobj != null) {
        this.userinfo = JSON.parse(this.userdata?.userinfo?.jsonobj);
      }
      if (this.userdata?.userinfo?.jsonobj2 != null) {
        this.coapplicant = JSON.parse(this.userdata?.userinfo?.jsonobj2);
      }
      if (this.userdata?.userinfo?.jsonobj3 != null) {
        this.financialData = JSON.parse(this.userdata?.userinfo?.jsonobj3);
      }
    },

    toggleSection(index) {
      this.sections[index].open = !this.sections[index].open;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
   
    showformfun() {
      this.showform = 0;
      location.reload();
    },
    showBoxData(n) {
      this.boxid = n;
    },
    // Handle age calculation
    calculateAge(dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      console.log(birthDate);

      let age = today.getFullYear() - birthDate.getFullYear(); // Use `let`
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Now allowed since `age` is declared with `let`
      }

      return age;
    }

  },

};
</script>

<style>
.card-header {
  font-size: 1.2rem;
  font-weight: bold;
}

.badge {
  font-size: 0.9rem;
}

.title-end {
  display: block;
}

.avatar {
  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.fzi12 {
  font-size: 12px;
}
.hidden-pdf {
  position: absolute;
  left: -9999px;
  top: 0;
  width: 1000px; /* Set fixed width if needed for PDF formatting */
  background-color: white;
}
</style>