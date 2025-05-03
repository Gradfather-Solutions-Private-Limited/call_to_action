<template>
  <div>
    <!-- Filters -->
    <!-- <div class="filters">
      <input
        v-model="complainFilters.complainNo"
        type="text"
        placeholder="Filter by Complaint No"
        @input="updateFilters"
      />
      <input
        v-model="complainFilters.status"
        type="text"
        placeholder="Filter by Status"
        @input="updateFilters"
      />
      <input
        v-model="complainFilters.productSerialNo"
        type="text"
        placeholder="Filter by Product Serial No"
        @input="updateFilters"
      />
      <input
        v-model="complainFilters.userMobileNo"
        type="text"
        placeholder="Filter by User Mobile No"
        @input="updateFilters"
      />
    </div> -->

    <!-- Complaints Table -->
    <div class="mt-10 card">
      <div class="card-body col-md-12 row">
        <div class="col-md-3">
          <label>From : </label>
          <input type="date" class="form-control" v-model="complainFilters.fromdate">
        </div>
        <div class="col-md-3">
          <label>To : </label>
          <input type="date" class="form-control" v-model="complainFilters.todate">
        </div>

      </div>
    </div>
    <div class="col-md-12 mt-10">
      <button class="new-btn " @click="updateFilters()">Filter</button>
    </div>
    <div class="card mt-10">
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Complain No</th>
              <th >Status</th>
              <th>Serial no.</th>
              <th style="width: 20%;">User Information</th>
              <!-- <th>User Mobile</th> -->
              <th>Date & Address</th>
              <!-- <th>Date</th> -->
              <th>Slot Date/Time</th>
              <th style="width: 15%;">Document</th>
              <th>Problem</th>
              <th>Location</th>
              <th style="width: 15%;">Assign</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="complain in complains" :key="complain.id">
              <td>{{ complain.complain_no }}</td>
              <td>
                <select class="form-control" v-model="complain.status" @change="updateComplaint(complain)">
                  <option value="0">Pending</option>
                  <option value="1">Professional Assigned</option>
                  <option value="2">Service Started</option>
                  <option value="3">Service Closed</option>
                </select>
              </td>
              <td>{{ complain.product_serial_no }}</td>
              <td style="width: 20%;">
                <div >
                  <strong> Name: </strong> <span class="ml-5">{{ complain.user_name?? 'N/A' }}</span>
                </div>
                <div >
                  <strong> Mob.: </strong> <span class="ml-5">{{ complain.user_mobile_no?? 'N/A' }}</span>
                </div>
                
                <!-- <table>
                  <tr> 
                    <td>{{ complain.user_name?? 'N/A' }}</td>
                  </tr>
                  <tr v-if="complain.user_mobile_no">
                    <td>{{ complain.user_mobile_no ?? '' }}</td>
                  </tr>
                  <tr v-if="complain.address">
                    <td>{{  complain.address ?? '' }}</td>
                  </tr>
                </table> -->
              </td>
              <!-- <td>{{ complain.user_name ?? '' }}</td>
              <td>{{ complain.user_mobile_no }}</td> -->
              <td>{{ formatDate(complain.created_at) }} <br> <strong>Add. :</strong> {{ complain.address ?? 'N/A' }}</td>
              <td>{{ formatSlotDateTime(complain.slotdatetime) }}</td>
              <td style="width: 15%;">
                <div class="row">
                  <div class="col-md-6" v-for="(doc, i) in complain.documents" :key="i">
                    <a :href="doc?.images?.downloadurl" target="_blank">{{ getDocumentName(doc) }}</a>
                  </div>
                </div>
              </td>
              <td>{{ complain.description ?? '' }}</td>
              <td>
                <div v-if="complain.latitude != null && complain.longitude != null">
                  <a :href='`https://www.google.com/maps/search/?api=1&query=${complain.latitude},${complain.longitude}`'
                    target="_blank">
                    <i class='bx bxs-map-pin location_pin'></i>
                  </a>
                </div>

              </td>
              <td style="width: 15%;">
                <div class="row">
                  <div class="col-md-10">
                    <select class="form-control" v-model="complain.assignuserid"
                      @change="selectAssignee($event, complain)">
                      <option value="">Select Assignee</option>
                      <option v-for="user in servicemen" :key="user.id" :value="user.id">
                        {{ user.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button :disabled="complainPagination.current_page === 1"
        @click="changePage(complainPagination.current_page - 1)">
        Previous
      </button>
      <span>Page {{ complainPagination.page }} of {{ totalPages }}</span>
      <button :disabled="complainPagination.current_page === totalPages"
        @click="changePage(complainPagination.current_page + 1)">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { format } from "quasar";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["complains", "complainFilters", "complainPagination"]),
    ...mapGetters(["complainPagination", "servicemen"]),
    totalPages() {
      return Math.ceil(this.complainPagination.total / this.complainPagination.limit);
    },
  },
  methods: {
    ...mapActions(["fetchComplains", "setComplainFilters", "setPage", "fetchServiceMen"]),
    updateFilters() {
      this.setComplainFilters(this.complainFilters);
      this.fetchComplains();
    },
    changePage(page) {
      this.setPage(page);
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
    updateComplaint(item) {
      // Update complaint status here
      console.log(item);
      let param = { id: item.id, status: item.status }
      axios.post('api/complaints/status', param)
        .then((response => {
          if (response.data) {
            this.createStepStatus(item)
          }
        })).catch(error => console.log(error))
    },
    createStepStatus(complain) {
      let status = complain.status
      let stepname = ''
      if(status==0 || status==null) stepname = 'Pending'
      else if(status==1 || status=='1') stepname = 'Professional Assigned'
      else if(status==2 || status=='2') stepname = 'Service Started'
      else if(status==3 || status=='3')stepname = 'Service Closed'
      let param = {
        stepname: stepname, stepdescription: '', complain_no: complain.complain_no,
        assigneduserid: 0, status: status
      }
      axios.post('api/complaints/createstep', param)
        .then((response) => {
          console.log(response.data)
          this.fetchComplains();
        })
        .catch(error => console.log(error))
    },
    getDocumentName(doc) {
      let name = '';
      switch (doc.documenttype) {
        case 'selfie': name = 'Selfie'; break;
        case 'adharfront': name = 'Addhar Front'; break;
        case 'adharback': name = 'Addhar Back'; break;
        case 'pancard': name = 'Pancard'; break;
        case 'gst': name = 'GST'; break;
        case 'gst': name = 'GST'; break;
        case 'shop_image': name = 'Shop Image'; break;
        case 'sign': name = 'Signature'; break;
        case 'complain_product': name = 'Complain'; break;
        case 'invoice_image': name = 'Invoice'; break;
        default:
          break;
      }
      return name;
    },
    selectAssignee(event, complain) {
      if (event.target.value != "") {
        if (confirm('Do you want to assign.')) {
          let assignuerid = event.target.value;
          let param = { id: complain.id, assignuserid: assignuerid, status: 1 }
          axios.post('api/complaints/assign/update', param)
            .then((response => {
              if (response.data) {
                this.updatestatus(complain, assignuerid)
              }
            })).catch(error => console.log(error))
        } else {
          event.target.value = "";
        }
      }
    },
    updatestatus(complain, assigneduserid) {
      let param = {
        stepname: 'Professional Assigned', stepdescription: '', complain_no: complain.complain_no,
        assigneduserid: assigneduserid, status: 1
      }
      axios.post('api/complaints/createstep', param)
        .then((response) => {
          console.log(response.data)
          this.fetchComplains();
        })
        .catch(error => console.log(error))
      // this.fetchComplains();
    },
    formatSlotDateTime(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      return date.toLocaleString('en-US', options);
    }
  },
  mounted() {
    this.fetchServiceMen()
    this.fetchComplains();
    this.$store.commit("assignaddpageheading", 'Complaints List');

  },
};
</script>

<style scoped>
/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}


.card-body {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table {
  min-width: 100%;
  width: auto;
}

</style>
