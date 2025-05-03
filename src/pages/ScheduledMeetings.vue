<template>
  <div class="container-fluid">
    <div class="card mt-10">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div class="col-md-12">
              <div class="col-md-12"><span class="heading-border">Select Date</span></div>

              <!-- Date Filter -->
              <div class="date-filter">

                <input type="date" v-model="searchCriteria.searchDate" @change="onDateChange" class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="card-body">
          <div class="col-md-12  ">
            <button class="btn btn-primary" @click="searchFun()">Search</button>
          </div>
        </div>
      </div>

      <!-- Meetings Table -->
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Date and Time</th>
                  <th>Visitor Name</th>
                  <th>Mobile No</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(meeting, index) in meetings" :key="index">
                  <td>{{ formatDateTime(meeting.meettime) }}</td>
                  <td>{{ meeting.user?.name }}</td>
                  <td>{{ meeting.user?.mobiles[0]?.mobile }}</td>
                  <td>{{ meeting.description }}</td>
                  <td>
                      <select v-model="meeting.status" class="form-control" @change="updateStatus(meeting.id, meeting.status)">
                        <option :value="0">Pending</option>
                        <option :value="1">Approved</option>
                        <option :value="2">Rejected</option>
                      </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination Controls -->
          <!-- <div class="pagination">
            <button @click="prevMeetingPage" :disabled="meetingPagination.currentPage === 1" class="btn btn-primary btn-sm">Previous</button>
            <span>Page {{ meetingPagination.currentPage }} of {{ totalMeetingPages }}</span>
            <button @click="nextMeetingPage"
              :disabled="meetingPagination.currentPage === totalMeetingPages" class="btn btn-primary btn-sm">Next</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MeetingTable',
  data() {
    return {
      searchCriteria: {
        searchDate: new Date().toISOString().slice(0,10),
        status: '',
      },
    };
  },
  computed: {
    ...mapGetters(['meetings', 'meetingPagination', 'meetingSearchCriteria', 'addpageheading']),
    totalMeetingPages() {
      return Math.ceil(this.meetingPagination.totalMeetings / this.meetingPagination.pageSize);
    },
  },
  methods: {
    ...mapActions(['fetchMeetings', 'setMeetingSearchDate', 'setMeetingCurrentPage']),
    onDateChange() {
      this.setMeetingSearchDate(this.searchCriteria);
    },
    formatDateTime(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    },
    nextMeetingPage() {
      if (this.meetingPagination.currentPage < this.totalMeetingPages) {
        this.setMeetingCurrentPage(this.meetingPagination.currentPage + 1);
      }
    },
    prevMeetingPage() {
      if (this.meetingPagination.currentPage > 1) {
        this.setMeetingCurrentPage(this.meetingPagination.currentPage - 1);
      }
    },
    searchFun(){
      console.log("search", this.searchCriteria)
      this.fetchMeetings();
    },
    updateStatus(id, status) {
      let param = {
        id: id,
        status: status
      }
      axios.post('api/meeting/status/update',param)
       .then(response => {
        if(response.status){
          this.$swal({
            title: 'Status Updated',
            text: 'Meeting status updated successfully',
            type:'success',
            confirmButtonText: 'Okay'
          });
        }
          // this.fetchMeetings();
        }).then
    }
  },
  mounted() {
    this.$store.commit("assignaddpageheading", 'Scheduled Meetings');

    this.fetchMeetings();
  },

};
</script>

<style scoped>
.meeting-table {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  max-width: 100%;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-filter {
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.pagination {
  display: flex;
  justify-content:center;
  margin-top: 20px;
  align-items: center;

}


button {
  padding: 3px 3px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  margin:0 10px;
 
} 
</style>